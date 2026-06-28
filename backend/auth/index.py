import json
import os
import re
import random
import secrets
import urllib.request
import urllib.parse
from datetime import datetime, timedelta

import psycopg2

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json',
}

CODE_TTL_MINUTES = 5
MAX_ATTEMPTS = 5
SESSION_TTL_DAYS = 30


def _resp(status: int, body: dict) -> dict:
    return {
        'statusCode': status,
        'headers': CORS_HEADERS,
        'body': json.dumps(body, ensure_ascii=False),
    }


def _normalize_phone(raw: str) -> str:
    digits = re.sub(r'\D', '', raw or '')
    if digits.startswith('8') and len(digits) == 11:
        digits = '7' + digits[1:]
    if len(digits) == 10:
        digits = '7' + digits
    return digits


def _db():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def _send_sms(phone: str, code: str) -> dict:
    api_id = os.environ.get('SMSRU_API_ID', '')
    if not api_id:
        return {'ok': False, 'reason': 'no_api_id'}
    params = urllib.parse.urlencode({
        'api_id': api_id,
        'to': phone,
        'msg': f'Kod podtverzhdeniya: {code}',
        'json': 1,
    })
    url = f'https://sms.ru/sms/send?{params}'
    try:
        with urllib.request.urlopen(url, timeout=15) as r:
            data = json.loads(r.read().decode('utf-8'))
        if data.get('status') == 'OK':
            return {'ok': True}
        return {'ok': False, 'reason': data.get('status_text', 'sms_error')}
    except Exception as e:
        return {'ok': False, 'reason': str(e)}


def _user_to_dict(row) -> dict:
    return {
        'id': row[0],
        'phone': row[1],
        'user_type': row[2],
        'first_name': row[3] or '',
        'last_name': row[4] or '',
        'email': row[5] or '',
        'company_name': row[6] or '',
    }


def handler(event: dict, context) -> dict:
    '''Авторизация по номеру телефона через SMS-код (SMS.ru).'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    body = {}
    if event.get('body'):
        try:
            body = json.loads(event['body'])
        except Exception:
            return _resp(400, {'error': 'Некорректный запрос'})

    action = body.get('action', '')

    if method == 'GET' or action == 'me':
        return _handle_me(event)
    if action == 'send_code':
        return _handle_send_code(body)
    if action == 'verify':
        return _handle_verify(body)
    if action == 'logout':
        return _handle_logout(event)

    return _resp(400, {'error': 'Неизвестное действие'})


def _handle_send_code(body: dict) -> dict:
    phone = _normalize_phone(body.get('phone', ''))
    if len(phone) != 11:
        return _resp(400, {'error': 'Введите корректный номер телефона'})

    code = f'{random.randint(0, 9999):04d}'
    expires = datetime.utcnow() + timedelta(minutes=CODE_TTL_MINUTES)

    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute(
            "UPDATE sms_codes SET is_used = TRUE WHERE phone = %s AND is_used = FALSE",
            (phone,),
        )
        cur.execute(
            "INSERT INTO sms_codes (phone, code, expires_at) VALUES (%s, %s, %s)",
            (phone, code, expires),
        )
        conn.commit()
    finally:
        conn.close()

    sms = _send_sms(phone, code)
    if not sms['ok']:
        if sms.get('reason') == 'no_api_id':
            return _resp(200, {'success': True, 'sms_sent': False, 'message': 'SMS-сервис не настроен'})
        return _resp(502, {'error': 'Не удалось отправить SMS. Попробуйте позже.'})

    return _resp(200, {'success': True, 'sms_sent': True})


def _handle_verify(body: dict) -> dict:
    phone = _normalize_phone(body.get('phone', ''))
    code = re.sub(r'\D', '', body.get('code', ''))
    if len(phone) != 11:
        return _resp(400, {'error': 'Некорректный номер телефона'})
    if not code:
        return _resp(400, {'error': 'Введите код из SMS'})

    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT id, code, attempts, expires_at FROM sms_codes "
            "WHERE phone = %s AND is_used = FALSE ORDER BY created_at DESC LIMIT 1",
            (phone,),
        )
        rec = cur.fetchone()
        if not rec:
            return _resp(400, {'error': 'Код не найден. Запросите новый.'})

        code_id, real_code, attempts, expires_at = rec
        if expires_at < datetime.utcnow():
            return _resp(400, {'error': 'Срок действия кода истёк. Запросите новый.'})
        if attempts >= MAX_ATTEMPTS:
            cur.execute("UPDATE sms_codes SET is_used = TRUE WHERE id = %s", (code_id,))
            conn.commit()
            return _resp(400, {'error': 'Слишком много попыток. Запросите новый код.'})
        if code != real_code:
            cur.execute("UPDATE sms_codes SET attempts = attempts + 1 WHERE id = %s", (code_id,))
            conn.commit()
            return _resp(400, {'error': 'Неверный код'})

        cur.execute("UPDATE sms_codes SET is_used = TRUE WHERE id = %s", (code_id,))

        cur.execute(
            "SELECT id, phone, user_type, first_name, last_name, email, company_name "
            "FROM users WHERE phone = %s",
            (phone,),
        )
        user_row = cur.fetchone()
        is_new = False

        if not user_row:
            is_new = True
            user_type = body.get('user_type', 'buyer')
            if user_type not in ('buyer', 'supplier'):
                user_type = 'buyer'
            cur.execute(
                "INSERT INTO users (phone, user_type, first_name, last_name, email, company_name) "
                "VALUES (%s, %s, %s, %s, %s, %s) "
                "RETURNING id, phone, user_type, first_name, last_name, email, company_name",
                (
                    phone,
                    user_type,
                    body.get('first_name', ''),
                    body.get('last_name', ''),
                    body.get('email', ''),
                    body.get('company_name', ''),
                ),
            )
            user_row = cur.fetchone()

        user = _user_to_dict(user_row)

        token = secrets.token_hex(32)
        session_exp = datetime.utcnow() + timedelta(days=SESSION_TTL_DAYS)
        cur.execute(
            "INSERT INTO auth_sessions (user_id, token, expires_at) VALUES (%s, %s, %s)",
            (user['id'], token, session_exp),
        )
        conn.commit()

        return _resp(200, {'success': True, 'token': token, 'user': user, 'is_new': is_new})
    finally:
        conn.close()


def _handle_me(event: dict) -> dict:
    headers = event.get('headers', {})
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token', '')
    if not token:
        return _resp(401, {'error': 'Не авторизован'})

    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT u.id, u.phone, u.user_type, u.first_name, u.last_name, u.email, u.company_name "
            "FROM auth_sessions s JOIN users u ON u.id = s.user_id "
            "WHERE s.token = %s AND s.expires_at > NOW()",
            (token,),
        )
        row = cur.fetchone()
        if not row:
            return _resp(401, {'error': 'Сессия истекла'})
        return _resp(200, {'user': _user_to_dict(row)})
    finally:
        conn.close()


def _handle_logout(event: dict) -> dict:
    headers = event.get('headers', {})
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token', '')
    if token:
        conn = _db()
        try:
            cur = conn.cursor()
            cur.execute("UPDATE auth_sessions SET expires_at = NOW() WHERE token = %s", (token,))
            conn.commit()
        finally:
            conn.close()
    return _resp(200, {'success': True})
