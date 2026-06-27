import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки/заказа на товар на email поставщика (с копией админу).
    Принимает type (inquiry/order), supplier_email, контакты, товары."""

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if event.get('httpMethod') != 'POST':
        return {
            'statusCode': 405,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Method not allowed'})
        }

    body = json.loads(event.get('body', '{}'))

    inquiry_type = body.get('type', 'inquiry')  # 'inquiry' (заявка) или 'order' (заказ)
    supplier_email = (body.get('supplier_email') or '').strip()

    buyer_company = body.get('buyer_company', '')
    buyer_name = body.get('buyer_name', '')
    buyer_email = body.get('buyer_email', '')
    buyer_phone = body.get('buyer_phone', '')
    message = body.get('message', '')
    items = body.get('items', [])  # список товаров: [{name, seller, price, unit, quantity, category}]

    import re

    def clean_email(value):
        # Извлекаем валидный email из строки (убирает невидимые символы, пробелы, кавычки)
        if not value:
            return ''
        match = re.search(r'[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}', value)
        return match.group(0) if match else value.strip()

    admin_email = clean_email(os.environ.get('RECIPIENT_EMAIL', ''))
    smtp_user = clean_email(os.environ.get('SMTP_USER', ''))
    # Убираем пробелы внутри пароля (Яндекс показывает его группами по 4 символа)
    smtp_password = os.environ['SMTP_PASSWORD'].replace(' ', '').strip()

    # Если RECIPIENT_EMAIL невалиден — используем логин SMTP как получателя
    if '@' not in admin_email:
        admin_email = smtp_user

    # Получатель: email поставщика, если указан и валиден; иначе админ
    recipients = []
    if supplier_email and '@' in supplier_email:
        recipients.append(supplier_email)
    recipients.append(admin_email)
    recipients = list(dict.fromkeys(recipients))  # убираем дубли

    type_label = 'Новый заказ' if inquiry_type == 'order' else 'Новая заявка'

    rows = ''
    total = 0
    for it in items:
        name = it.get('name', '')
        seller = it.get('seller', '')
        price = it.get('price', 0) or 0
        unit = it.get('unit', '')
        qty = it.get('quantity', '') or it.get('qty', '')
        category = it.get('category', '')
        try:
            total += float(price)
        except (TypeError, ValueError):
            pass
        rows += (
            f'<tr>'
            f'<td style="padding:8px;border:1px solid #ddd">{name}</td>'
            f'<td style="padding:8px;border:1px solid #ddd">{seller}</td>'
            f'<td style="padding:8px;border:1px solid #ddd">{category}</td>'
            f'<td style="padding:8px;border:1px solid #ddd">{price:,} ₽ {unit}</td>'
            f'<td style="padding:8px;border:1px solid #ddd">{qty or "—"}</td>'
            f'</tr>'
        )

    items_table = ''
    if rows:
        items_table = f"""
        <h3 style="margin-top:20px">Товары</h3>
        <table style="border-collapse:collapse;width:100%;max-width:700px">
          <tr style="background:#f5f5f5">
            <th style="padding:8px;border:1px solid #ddd;text-align:left">Товар</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:left">Поставщик</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:left">Категория</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:left">Цена</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:left">Кол-во</th>
          </tr>
          {rows}
        </table>
        """

    html_body = f"""
    <h2>{type_label} с BM Market</h2>
    <h3>Контакты покупателя</h3>
    <table style="border-collapse:collapse;width:100%;max-width:700px">
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Компания</b></td><td style="padding:8px;border:1px solid #ddd">{buyer_company}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Контактное лицо</b></td><td style="padding:8px;border:1px solid #ddd">{buyer_name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Email</b></td><td style="padding:8px;border:1px solid #ddd"><a href="mailto:{buyer_email}">{buyer_email}</a></td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Телефон</b></td><td style="padding:8px;border:1px solid #ddd">{buyer_phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Сообщение</b></td><td style="padding:8px;border:1px solid #ddd">{message or "—"}</td></tr>
    </table>
    {items_table}
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'[BM Market] {type_label} от {buyer_company or buyer_name}'
    msg['From'] = smtp_user
    msg['To'] = ', '.join(recipients)
    if buyer_email and '@' in buyer_email:
        msg['Reply-To'] = buyer_email
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    raw_user = os.environ.get('SMTP_USER', '')
    raw_pwd = os.environ.get('SMTP_PASSWORD', '')
    # Маскируем логин: первые 2 символа + домен
    if '@' in smtp_user:
        local, _, domain = smtp_user.partition('@')
        masked_user = (local[:2] + '***@' + domain) if local else smtp_user
    else:
        masked_user = (smtp_user[:2] + '***') if smtp_user else '(пусто)'

    diagnostics = {
        'smtp_user_masked': masked_user,
        'smtp_user_has_at': '@' in smtp_user,
        'smtp_user_raw_len': len(raw_user),
        'smtp_user_trimmed_len': len(smtp_user),
        'password_length': len(smtp_password),
        'password_raw_length': len(raw_pwd),
        'password_had_spaces': ' ' in raw_pwd,
    }

    try:
        with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
            server.login(smtp_user, smtp_password)
            refused = server.sendmail(smtp_user, recipients, msg.as_string())
        diagnostics['refused'] = refused
        print(f'INQUIRY OK from={smtp_user} to={recipients} refused={refused}')
    except smtplib.SMTPAuthenticationError as e:
        diagnostics['yandex_response'] = str(e)
        print(f'AUTH FAIL: {e}')
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({
                'success': False,
                'error': 'Ошибка авторизации почты Яндекс.',
                'diagnostics': diagnostics
            }, ensure_ascii=False)
        }
    except Exception as e:
        diagnostics['smtp_error'] = f'{type(e).__name__}: {e}'
        print(f'SMTP ERROR: {type(e).__name__}: {e}')
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({
                'success': False,
                'error': 'Ошибка отправки письма.',
                'diagnostics': diagnostics
            }, ensure_ascii=False)
        }

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'success': True, 'sent_to': recipients, 'diagnostics': diagnostics}, ensure_ascii=False)
    }