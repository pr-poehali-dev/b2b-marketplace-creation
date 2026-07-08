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
        action = 'list'

    if action == 'list':
        return _handle_list(event)
    return _handle_create(body)


def _handle_list(event: dict) -> dict:
    params = event.get('queryStringParameters') or {}
    user_id = params.get('user_id')
    conn = _db()
    try:
        cur = conn.cursor()
        if user_id:
            cur.execute(
                "SELECT id, title, category, description, quantity, unit, budget, region, "
                "deadline, status, matched_suppliers, created_at FROM buyer_requests "
                "WHERE user_id = %s ORDER BY created_at DESC LIMIT 100",
                (user_id,),
            )
        else:
            cur.execute(
                "SELECT id, title, category, description, quantity, unit, budget, region, "
                "deadline, status, matched_suppliers, created_at FROM buyer_requests "
                "ORDER BY created_at DESC LIMIT 100"
            )
        rows = cur.fetchall()
        items = [{
            'id': r[0], 'title': r[1], 'category': r[2], 'description': r[3],
            'quantity': r[4], 'unit': r[5], 'budget': r[6], 'region': r[7],
            'deadline': r[8], 'status': r[9], 'matched_suppliers': r[10],
            'created_at': r[11].isoformat() if r[11] else None,
        } for r in rows]
        return _resp(200, {'success': True, 'requests': items})
    finally:
        conn.close()


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
