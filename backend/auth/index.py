import json
import os
import re
import random
import secrets
import urllib.request
import urllib.parse
from datetime import datetime, timedelta

import psycopg2
import bcrypt

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
MIN_PASSWORD_LEN = 6


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


def _hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def _check_password(password: str, hashed: str) -> bool:
    if not hashed:
        return False
    try:
        return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
    except Exception:
        return False


def _send_sms(phone: str, code: str) -> dict:
    api_id = os.environ.get('SMSRU_API_ID', '')
    if not api_id:
        return {'ok': False, 'reason': 'no_api_id'}
    params = urllib.parse.urlencode({
        'api_id': api_id,
        'to': phone,
        'msg': f'Код подтверждения: {code}',
        'json': 1,
    })
    url = f'https://sms.ru/sms/send?{params}'
    try:
        with urllib.request.urlopen(url, timeout=15) as r:
            data = json.loads(r.read().decode('utf-8'))
        print(f'SMS.RU response for {phone}: {json.dumps(data, ensure_ascii=False)}')
        if data.get('status') != 'OK':
            return {'ok': False, 'reason': data.get('status_text', 'sms_error')}
        sms_info = (data.get('sms') or {}).get(phone, {})
        if sms_info.get('status') != 'OK':
            return {'ok': False, 'reason': sms_info.get('status_text', 'sms_rejected')}
        return {'ok': True}
    except Exception as e:
        print(f'SMS.RU exception for {phone}: {e}')
        return {'ok': False, 'reason': str(e)}


def _is_admin_phone(phone: str) -> bool:
    admin_phone = _normalize_phone(os.environ.get('ADMIN_PHONE', ''))
    return bool(admin_phone) and _normalize_phone(phone or '') == admin_phone


def _user_to_dict(row) -> dict:
    phone = row[1]
    return {
        'id': row[0],
        'phone': phone,
        'user_type': row[2],
        'first_name': row[3] or '',
        'last_name': row[4] or '',
        'email': row[5] or '',
        'company_name': row[6] or '',
        'is_admin': _is_admin_phone(phone),
    }


def _create_session(cur, user_id: int) -> str:
    token = secrets.token_hex(32)
    session_exp = datetime.utcnow() + timedelta(days=SESSION_TTL_DAYS)
    cur.execute(
        "INSERT INTO auth_sessions (user_id, token, expires_at) VALUES (%s, %s, %s)",
        (user_id, token, session_exp),
    )
    return token


def _verify_code_record(cur, phone: str, code: str):
    '''Проверяет SMS-код. Возвращает (ok, error_message). При успехе помечает код использованным.'''
    cur.execute(
        "SELECT id, code, attempts, expires_at FROM sms_codes "
        "WHERE phone = %s AND is_used = FALSE ORDER BY created_at DESC LIMIT 1",
        (phone,),
    )
    rec = cur.fetchone()
    if not rec:
        return False, 'Код не найден. Запросите новый.'
    code_id, real_code, attempts, expires_at = rec
    if expires_at < datetime.utcnow():
        return False, 'Срок действия кода истёк. Запросите новый.'
    if attempts >= MAX_ATTEMPTS:
        cur.execute("UPDATE sms_codes SET is_used = TRUE WHERE id = %s", (code_id,))
        return False, 'Слишком много попыток. Запросите новый код.'
    if code != real_code:
        cur.execute("UPDATE sms_codes SET attempts = attempts + 1 WHERE id = %s", (code_id,))
        return False, 'Неверный код'
    cur.execute("UPDATE sms_codes SET is_used = TRUE WHERE id = %s", (code_id,))
    return True, ''


def handler(event: dict, context) -> dict:
    '''Авторизация: вход по телефону и паролю, регистрация с подтверждением номера через SMS.'''
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
    if action == 'register':
        return _handle_register(body)
    if action == 'login':
        return _handle_login(body)
    if action == 'reset_password':
        return _handle_reset_password(body)
    if action == 'logout':
        return _handle_logout(event)

    return _resp(400, {'error': 'Неизвестное действие'})


def _handle_send_code(body: dict) -> dict:
    phone = _normalize_phone(body.get('phone', ''))
    purpose = body.get('purpose', 'register')
    if len(phone) != 11:
        return _resp(400, {'error': 'Введите корректный номер телефона'})

    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute("SELECT id FROM users WHERE phone = %s", (phone,))
        exists = cur.fetchone() is not None

        if purpose == 'register' and exists:
            return _resp(409, {'error': 'Этот номер уже зарегистрирован. Войдите по паролю.'})
        if purpose == 'reset' and not exists:
            return _resp(404, {'error': 'Пользователь с таким номером не найден.'})

        code = f'{random.randint(0, 9999):04d}'
        expires = datetime.utcnow() + timedelta(minutes=CODE_TTL_MINUTES)
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


def _handle_register(body: dict) -> dict:
    phone = _normalize_phone(body.get('phone', ''))
    code = re.sub(r'\D', '', body.get('code', ''))
    password = body.get('password', '')

    if len(phone) != 11:
        return _resp(400, {'error': 'Некорректный номер телефона'})
    if not code:
        return _resp(400, {'error': 'Введите код из SMS'})
    if len(password) < MIN_PASSWORD_LEN:
        return _resp(400, {'error': f'Пароль должен быть не короче {MIN_PASSWORD_LEN} символов'})

    user_type = body.get('user_type', 'buyer')
    if user_type not in ('buyer', 'supplier'):
        user_type = 'buyer'

    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute("SELECT id FROM users WHERE phone = %s", (phone,))
        if cur.fetchone():
            return _resp(409, {'error': 'Этот номер уже зарегистрирован. Войдите по паролю.'})

        ok, err = _verify_code_record(cur, phone, code)
        if not ok:
            conn.commit()
            return _resp(400, {'error': err})

        cur.execute(
            "INSERT INTO users (phone, user_type, first_name, last_name, email, company_name, password_hash) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s) "
            "RETURNING id, phone, user_type, first_name, last_name, email, company_name",
            (
                phone,
                user_type,
                body.get('first_name', ''),
                body.get('last_name', ''),
                body.get('email', ''),
                body.get('company_name', ''),
                _hash_password(password),
            ),
        )
        user_row = cur.fetchone()
        user = _user_to_dict(user_row)
        token = _create_session(cur, user['id'])
        conn.commit()
        return _resp(200, {'success': True, 'token': token, 'user': user})
    finally:
        conn.close()


def _handle_login(body: dict) -> dict:
    phone = _normalize_phone(body.get('phone', ''))
    password = body.get('password', '')
    if len(phone) != 11 or not password:
        return _resp(400, {'error': 'Введите телефон и пароль'})

    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT id, phone, user_type, first_name, last_name, email, company_name, password_hash, is_active "
            "FROM users WHERE phone = %s",
            (phone,),
        )
        row = cur.fetchone()
        if not row:
            return _resp(401, {'error': 'Неверный телефон или пароль'})
        if not row[8]:
            return _resp(403, {'error': 'Аккаунт заблокирован'})
        if not _check_password(password, row[7]):
            return _resp(401, {'error': 'Неверный телефон или пароль'})

        user = _user_to_dict(row)
        token = _create_session(cur, user['id'])
        conn.commit()
        return _resp(200, {'success': True, 'token': token, 'user': user})
    finally:
        conn.close()


def _handle_reset_password(body: dict) -> dict:
    phone = _normalize_phone(body.get('phone', ''))
    code = re.sub(r'\D', '', body.get('code', ''))
    password = body.get('password', '')

    if len(phone) != 11:
        return _resp(400, {'error': 'Некорректный номер телефона'})
    if not code:
        return _resp(400, {'error': 'Введите код из SMS'})
    if len(password) < MIN_PASSWORD_LEN:
        return _resp(400, {'error': f'Пароль должен быть не короче {MIN_PASSWORD_LEN} символов'})

    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT id, phone, user_type, first_name, last_name, email, company_name "
            "FROM users WHERE phone = %s",
            (phone,),
        )
        user_row = cur.fetchone()
        if not user_row:
            return _resp(404, {'error': 'Пользователь не найден'})

        ok, err = _verify_code_record(cur, phone, code)
        if not ok:
            conn.commit()
            return _resp(400, {'error': err})

        cur.execute(
            "UPDATE users SET password_hash = %s, updated_at = NOW() WHERE id = %s",
            (_hash_password(password), user_row[0]),
        )
        user = _user_to_dict(user_row)
        token = _create_session(cur, user['id'])
        conn.commit()
        return _resp(200, {'success': True, 'token': token, 'user': user})
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