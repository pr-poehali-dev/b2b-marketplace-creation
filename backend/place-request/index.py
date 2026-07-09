import json
import os
import re
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import psycopg2

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json',
}


def _resp(status: int, body: dict) -> dict:
    return {
        'statusCode': status,
        'headers': CORS_HEADERS,
        'body': json.dumps(body, ensure_ascii=False),
    }


def _db():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def _clean_email(value: str) -> str:
    if not value:
        return ''
    m = re.search(r'[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}', value)
    return m.group(0) if m else value.strip()


def handler(event: dict, context) -> dict:
    '''Приём заявки покупателя: сохраняет в БД и рассылает подобранным поставщикам на email.
    action=create — создать заявку и разослать; action=list — заявки пользователя.'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    body = {}
    if event.get('body'):
        try:
            body = json.loads(event['body'])
        except Exception:
            return _resp(400, {'error': 'Некорректный запрос'})

    action = body.get('action', 'create')
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        action = params.get('action', 'list')

    if action == 'list':
        return _handle_list(event)
    if action == 'responses':
        return _handle_responses(event)
    if action == 'respond':
        return _handle_respond(body)
    return _handle_create(body)


def _handle_list(event: dict) -> dict:
    params = event.get('queryStringParameters') or {}
    user_id = params.get('user_id')
    only_mine = params.get('mine') == '1'
    conn = _db()
    try:
        cur = conn.cursor()
        base = (
            "SELECT b.id, b.title, b.category, b.description, b.quantity, b.unit, b.budget, "
            "b.region, b.deadline, b.status, b.matched_suppliers, b.created_at, b.company_name, "
            "b.contact_name, (SELECT COUNT(*) FROM request_responses r WHERE r.request_id = b.id) "
            "FROM buyer_requests b "
        )
        if only_mine and user_id:
            cur.execute(base + "WHERE b.user_id = %s ORDER BY b.created_at DESC LIMIT 100", (user_id,))
        else:
            cur.execute(base + "ORDER BY b.created_at DESC LIMIT 100")
        rows = cur.fetchall()
        items = [{
            'id': r[0], 'title': r[1], 'category': r[2], 'description': r[3],
            'quantity': r[4], 'unit': r[5], 'budget': r[6], 'region': r[7],
            'deadline': r[8], 'status': r[9], 'matched_suppliers': r[10],
            'created_at': r[11].isoformat() if r[11] else None,
            'company_name': r[12], 'contact_name': r[13],
            'responses_count': r[14],
        } for r in rows]
        return _resp(200, {'success': True, 'requests': items})
    finally:
        conn.close()


def _handle_responses(event: dict) -> dict:
    params = event.get('queryStringParameters') or {}
    request_id = params.get('request_id')
    if not request_id:
        return _resp(400, {'error': 'Не указана заявка'})
    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT id, supplier_name, supplier_phone, supplier_email, price, message, created_at "
            "FROM request_responses WHERE request_id = %s ORDER BY created_at DESC LIMIT 200",
            (request_id,),
        )
        rows = cur.fetchall()
        items = [{
            'id': r[0], 'supplier_name': r[1], 'supplier_phone': r[2],
            'supplier_email': r[3], 'price': r[4], 'message': r[5],
            'created_at': r[6].isoformat() if r[6] else None,
        } for r in rows]
        return _resp(200, {'success': True, 'responses': items})
    finally:
        conn.close()


def _handle_respond(body: dict) -> dict:
    request_id = body.get('request_id')
    supplier_name = (body.get('supplier_name') or '').strip()
    message = (body.get('message') or '').strip()
    if not request_id:
        return _resp(400, {'error': 'Не указана заявка'})
    if not supplier_name:
        return _resp(400, {'error': 'Укажите название компании'})
    if not message:
        return _resp(400, {'error': 'Напишите ваше предложение'})

    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute("SELECT contact_email, title FROM buyer_requests WHERE id = %s", (request_id,))
        row = cur.fetchone()
        if not row:
            return _resp(404, {'error': 'Заявка не найдена'})
        buyer_email, req_title = row[0], row[1]

        cur.execute(
            "INSERT INTO request_responses (request_id, supplier_user_id, supplier_name, "
            "supplier_phone, supplier_email, price, message) VALUES (%s,%s,%s,%s,%s,%s,%s) RETURNING id",
            (request_id, body.get('supplier_user_id'), supplier_name,
             body.get('supplier_phone', ''), body.get('supplier_email', ''),
             body.get('price', ''), message),
        )
        response_id = cur.fetchone()[0]
        conn.commit()
    finally:
        conn.close()

    _notify_buyer(buyer_email, req_title, supplier_name, body.get('price', ''),
                  message, body.get('supplier_phone', ''), body.get('supplier_email', ''))

    return _resp(200, {'success': True, 'response_id': response_id})


def _notify_buyer(buyer_email, req_title, supplier_name, price, message, phone, email):
    smtp_user = _clean_email(os.environ.get('SMTP_USER', ''))
    smtp_password = os.environ.get('SMTP_PASSWORD', '').replace(' ', '').strip()
    admin_email = _clean_email(os.environ.get('RECIPIENT_EMAIL', '')) or smtp_user
    if not smtp_user or not smtp_password:
        return
    to = _clean_email(buyer_email) if buyer_email and '@' in (buyer_email or '') else admin_email

    html = f"""
    <h2>Новый отклик на вашу заявку — BM Market</h2>
    <p>По заявке «<b>{req_title}</b>» поступило предложение от поставщика.</p>
    <table style="border-collapse:collapse;width:100%;max-width:700px">
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Поставщик</b></td><td style="padding:8px;border:1px solid #ddd">{supplier_name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Цена</b></td><td style="padding:8px;border:1px solid #ddd">{price or '—'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Сообщение</b></td><td style="padding:8px;border:1px solid #ddd">{message}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Телефон</b></td><td style="padding:8px;border:1px solid #ddd">{phone or '—'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Email</b></td><td style="padding:8px;border:1px solid #ddd">{email or '—'}</td></tr>
    </table>
    """
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'[BM Market] Отклик на заявку: {req_title}'
        msg['From'] = smtp_user
        msg['To'] = to
        reply = _clean_email(email)
        if reply and '@' in reply:
            msg['Reply-To'] = reply
        msg.attach(MIMEText(html, 'html', 'utf-8'))
        with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, [to], msg.as_string())
    except Exception:
        pass


def _handle_create(body: dict) -> dict:
    title = (body.get('title') or '').strip()
    category = (body.get('category') or '').strip()
    description = (body.get('description') or '').strip()
    contact_name = (body.get('contact_name') or '').strip()
    contact_phone = (body.get('contact_phone') or '').strip()

    if not title:
        return _resp(400, {'error': 'Укажите, что вы ищете'})
    if not category:
        return _resp(400, {'error': 'Выберите категорию'})
    if not description:
        return _resp(400, {'error': 'Опишите вашу заявку'})
    if not contact_name or not contact_phone:
        return _resp(400, {'error': 'Укажите контактное имя и телефон'})

    suppliers = body.get('suppliers') or []  # [{id, name, email, reason}]

    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO buyer_requests (user_id, title, category, description, quantity, unit, "
            "budget, region, deadline, contact_name, contact_phone, contact_email, company_name, "
            "matched_suppliers) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id",
            (
                body.get('user_id'),
                title, category, description,
                body.get('quantity', ''), body.get('unit', ''),
                body.get('budget', ''), body.get('region', ''), body.get('deadline', ''),
                contact_name, contact_phone,
                body.get('contact_email', ''), body.get('company_name', ''),
                len(suppliers),
            ),
        )
        request_id = cur.fetchone()[0]

        for s in suppliers:
            cur.execute(
                "INSERT INTO request_deliveries (request_id, supplier_id, supplier_name, "
                "supplier_email, match_reason) VALUES (%s,%s,%s,%s,%s)",
                (request_id, s.get('id'), s.get('name', ''),
                 s.get('email', ''), s.get('reason', '')),
            )
        conn.commit()
    finally:
        conn.close()

    sent = _send_emails(request_id, title, category, description, body, suppliers)

    return _resp(200, {
        'success': True,
        'request_id': request_id,
        'matched_suppliers': len(suppliers),
        'emails_sent': sent,
    })


def _send_emails(request_id, title, category, description, body, suppliers) -> int:
    smtp_user = _clean_email(os.environ.get('SMTP_USER', ''))
    smtp_password = os.environ.get('SMTP_PASSWORD', '').replace(' ', '').strip()
    admin_email = _clean_email(os.environ.get('RECIPIENT_EMAIL', '')) or smtp_user
    if not smtp_user or not smtp_password:
        return 0

    quantity = body.get('quantity', '')
    unit = body.get('unit', '')
    budget = body.get('budget', '')
    region = body.get('region', '')
    deadline = body.get('deadline', '')
    contact_name = body.get('contact_name', '')
    contact_phone = body.get('contact_phone', '')
    contact_email = _clean_email(body.get('contact_email', ''))
    company_name = body.get('company_name', '')

    def esc(v):
        return str(v or '—')

    html = f"""
    <h2>Новая заявка на закупку — BM Market</h2>
    <p>Ваша компания подобрана как подходящий поставщик по этой заявке.</p>
    <table style="border-collapse:collapse;width:100%;max-width:700px">
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Что нужно</b></td><td style="padding:8px;border:1px solid #ddd">{esc(title)}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Категория</b></td><td style="padding:8px;border:1px solid #ddd">{esc(category)}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Описание</b></td><td style="padding:8px;border:1px solid #ddd">{esc(description)}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Количество</b></td><td style="padding:8px;border:1px solid #ddd">{esc(quantity)} {esc(unit) if quantity else ''}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Бюджет</b></td><td style="padding:8px;border:1px solid #ddd">{esc(budget)}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Регион</b></td><td style="padding:8px;border:1px solid #ddd">{esc(region)}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Срок</b></td><td style="padding:8px;border:1px solid #ddd">{esc(deadline)}</td></tr>
    </table>
    <h3 style="margin-top:20px">Контакты покупателя</h3>
    <table style="border-collapse:collapse;width:100%;max-width:700px">
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Компания</b></td><td style="padding:8px;border:1px solid #ddd">{esc(company_name)}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Контактное лицо</b></td><td style="padding:8px;border:1px solid #ddd">{esc(contact_name)}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Телефон</b></td><td style="padding:8px;border:1px solid #ddd">{esc(contact_phone)}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Email</b></td><td style="padding:8px;border:1px solid #ddd">{esc(contact_email)}</td></tr>
    </table>
    <p style="color:#888;margin-top:16px">Заявка №{request_id}</p>
    """

    supplier_emails = []
    for s in suppliers:
        em = _clean_email(s.get('email', ''))
        if em and '@' in em:
            supplier_emails.append(em)
    supplier_emails = list(dict.fromkeys(supplier_emails))

    sent = 0
    try:
        with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
            server.login(smtp_user, smtp_password)
            for em in supplier_emails:
                msg = MIMEMultipart('alternative')
                msg['Subject'] = f'[BM Market] Новая заявка: {title}'
                msg['From'] = smtp_user
                msg['To'] = em
                if contact_email and '@' in contact_email:
                    msg['Reply-To'] = contact_email
                msg.attach(MIMEText(html, 'html', 'utf-8'))
                try:
                    server.sendmail(smtp_user, [em], msg.as_string())
                    sent += 1
                except Exception:
                    pass

            # копия админу — сводка
            admin_msg = MIMEMultipart('alternative')
            admin_msg['Subject'] = f'[BM Market] Заявка №{request_id}: {title} ({len(supplier_emails)} поставщиков)'
            admin_msg['From'] = smtp_user
            admin_msg['To'] = admin_email
            admin_html = html + f'<p><b>Разослано поставщикам:</b> {len(supplier_emails)}</p>'
            admin_msg.attach(MIMEText(admin_html, 'html', 'utf-8'))
            try:
                server.sendmail(smtp_user, [admin_email], admin_msg.as_string())
            except Exception:
                pass
    except Exception:
        return sent

    return sent