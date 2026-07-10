import base64
import json
import os
import re
import uuid
from datetime import datetime, date
from decimal import Decimal

import boto3
import psycopg2

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json',
}

ALLOWED_STATUSES = ('draft', 'active', 'inactive', 'archived')


def _resp(status: int, body: dict) -> dict:
    return {
        'statusCode': status,
        'headers': CORS_HEADERS,
        'body': json.dumps(body, ensure_ascii=False, default=_json_default),
    }


def _json_default(o):
    if isinstance(o, (datetime, date)):
        return o.isoformat()
    if isinstance(o, Decimal):
        return float(o)
    raise TypeError(str(o))


def _db():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def _normalize_phone(raw: str) -> str:
    digits = re.sub(r'\D', '', raw or '')
    if digits.startswith('8') and len(digits) == 11:
        digits = '7' + digits[1:]
    if len(digits) == 10:
        digits = '7' + digits
    return digits


def _current_user(event: dict):
    headers = event.get('headers', {}) or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token', '')
    if not token:
        return None
    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT u.id, u.phone, u.user_type, u.first_name, u.last_name, u.company_name "
            "FROM auth_sessions s JOIN users u ON u.id = s.user_id "
            "WHERE s.token = %s AND s.expires_at > NOW()",
            (token,),
        )
        row = cur.fetchone()
        if not row:
            return None
        return {
            'id': row[0], 'phone': row[1], 'user_type': row[2],
            'first_name': row[3], 'last_name': row[4], 'company_name': row[5],
        }
    finally:
        conn.close()


def _is_admin(user) -> bool:
    if not user:
        return False
    admin_phone = _normalize_phone(os.environ.get('ADMIN_PHONE', ''))
    return bool(admin_phone) and _normalize_phone(user['phone']) == admin_phone


ALLOWED_IMAGE_TYPES = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/webp': 'webp',
    'image/gif': 'gif',
}
MAX_IMAGE_BYTES = 8 * 1024 * 1024


def _handle_upload_image(event: dict, body: dict) -> dict:
    user = _current_user(event)
    if not user:
        return _resp(401, {'error': 'Требуется авторизация'})

    data_url = body.get('file_data', '')
    content_type = body.get('content_type', '')

    if data_url.startswith('data:'):
        try:
            header, encoded = data_url.split(',', 1)
            if not content_type:
                content_type = header.split(';')[0].replace('data:', '')
        except ValueError:
            return _resp(400, {'error': 'Некорректные данные изображения'})
    else:
        encoded = data_url

    if content_type not in ALLOWED_IMAGE_TYPES:
        return _resp(400, {'error': 'Поддерживаются только PNG, JPEG, WEBP и GIF'})

    try:
        raw = base64.b64decode(encoded)
    except Exception:
        return _resp(400, {'error': 'Не удалось декодировать изображение'})

    if len(raw) > MAX_IMAGE_BYTES:
        return _resp(400, {'error': 'Файл слишком большой (максимум 8 МБ)'})

    ext = ALLOWED_IMAGE_TYPES[content_type]
    key = f"products/{user['id']}/{uuid.uuid4().hex}.{ext}"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    s3.put_object(Bucket='files', Key=key, Body=raw, ContentType=content_type)

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
    return _resp(200, {'url': cdn_url})


PRODUCT_COLUMNS = (
    "id, supplier_id, category_id, name, description, short_description, sku, "
    "price, currency, discount_percentage, stock_quantity, min_order_quantity, "
    "max_order_quantity, weight_kg, main_image_url, gallery_images_json, "
    "meta_title, meta_description, tags_json, attributes_json, status, is_featured, "
    "views_count, favorites_count, requests_count, created_at, updated_at, published_at"
)


def _row_to_product(row) -> dict:
    return {
        'id': row[0],
        'supplier_id': row[1],
        'category_id': row[2],
        'name': row[3],
        'description': row[4] or '',
        'short_description': row[5] or '',
        'sku': row[6] or '',
        'price': float(row[7]),
        'currency': row[8],
        'discount_percentage': float(row[9]),
        'stock_quantity': row[10],
        'min_order_quantity': row[11],
        'max_order_quantity': row[12],
        'weight_kg': float(row[13]) if row[13] is not None else None,
        'main_image_url': row[14] or '',
        'gallery_images': row[15] or [],
        'meta_title': row[16] or '',
        'meta_description': row[17] or '',
        'tags': row[18] or [],
        'attributes': row[19] or {},
        'status': row[20],
        'is_featured': row[21],
        'views_count': row[22],
        'favorites_count': row[23],
        'requests_count': row[24],
        'created_at': row[25],
        'updated_at': row[26],
        'published_at': row[27],
    }


def handler(event: dict, context) -> dict:
    """Управление товарами поставщиков: список, карточка, создание, редактирование, удаление, публичный каталог."""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    params = event.get('queryStringParameters') or {}
    action = params.get('action', 'list')
    body = {}
    if event.get('body'):
        try:
            body = json.loads(event['body'])
        except (json.JSONDecodeError, TypeError):
            body = {}

    if action.startswith('promo'):
        return _handle_promotions(event, method, action, body)

    if method == 'POST' and action == 'upload_image':
        return _handle_upload_image(event, body)

    if method == 'GET' and action == 'categories':
        return _handle_categories()
    if method == 'GET' and params.get('id'):
        return _handle_get_one(params)
    if method == 'GET':
        return _handle_list(params, event)
    if method == 'POST' and action == 'delete':
        return _handle_delete(event, body)
    if method == 'POST':
        return _handle_create(event, body)
    if method in ('PUT', 'PATCH'):
        return _handle_update(event, params, body)

    return _resp(405, {'error': 'Метод не поддерживается'})


ALLOWED_PROMO_TYPES = ('featured', 'discount', 'boost', 'banner')

CAMPAIGN_COLUMNS = (
    "id, supplier_id, type, title, description, product_ids_json, start_date, end_date, "
    "budget, status, views, clicks, sales, spent, created_at, updated_at"
)


def _row_to_campaign(row) -> dict:
    return {
        'id': row[0],
        'supplier_id': row[1],
        'type': row[2],
        'title': row[3],
        'description': row[4] or '',
        'product_ids': row[5] or [],
        'start_date': row[6],
        'end_date': row[7],
        'budget': float(row[8]),
        'status': row[9],
        'stats': {'views': row[10], 'clicks': row[11], 'sales': row[12], 'spent': float(row[13])},
        'created_at': row[14],
        'updated_at': row[15],
    }


def _handle_promotions(event: dict, method: str, action: str, body: dict) -> dict:
    user = _current_user(event)
    if not user:
        return _resp(401, {'error': 'Требуется авторизация'})

    if action == 'promo_list' and method == 'GET':
        conn = _db()
        try:
            cur = conn.cursor()
            cur.execute(
                f"SELECT {CAMPAIGN_COLUMNS} FROM promotion_campaigns "
                f"WHERE supplier_id = %s ORDER BY created_at DESC",
                (user['id'],),
            )
            rows = cur.fetchall()
            return _resp(200, {'campaigns': [_row_to_campaign(r) for r in rows]})
        finally:
            conn.close()

    if action == 'promo_create' and method == 'POST':
        if not body.get('title', '').strip():
            return _resp(400, {'error': 'Укажите название кампании'})
        if body.get('type') not in ALLOWED_PROMO_TYPES:
            return _resp(400, {'error': 'Некорректный тип продвижения'})
        conn = _db()
        try:
            cur = conn.cursor()
            cur.execute(
                f"INSERT INTO promotion_campaigns (supplier_id, type, title, description, product_ids_json, "
                f"start_date, end_date, budget, status) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,'active') "
                f"RETURNING {CAMPAIGN_COLUMNS}",
                (
                    user['id'], body['type'], body['title'].strip(), body.get('description') or None,
                    json.dumps(body.get('product_ids', [])),
                    body.get('start_date') or None, body.get('end_date') or None,
                    float(body.get('budget', 0) or 0),
                ),
            )
            row = cur.fetchone()
            conn.commit()
            return _resp(201, _row_to_campaign(row))
        finally:
            conn.close()

    if action == 'promo_toggle' and method == 'POST':
        campaign_id = body.get('id')
        if not campaign_id:
            return _resp(400, {'error': 'Не указана кампания'})
        conn = _db()
        try:
            cur = conn.cursor()
            cur.execute("SELECT supplier_id, status FROM promotion_campaigns WHERE id = %s", (campaign_id,))
            row = cur.fetchone()
            if not row:
                return _resp(404, {'error': 'Кампания не найдена'})
            if row[0] != user['id']:
                return _resp(403, {'error': 'Недостаточно прав'})
            new_status = 'paused' if row[1] == 'active' else 'active'
            cur.execute(
                f"UPDATE promotion_campaigns SET status = %s, updated_at = NOW() WHERE id = %s "
                f"RETURNING {CAMPAIGN_COLUMNS}",
                (new_status, campaign_id),
            )
            result = cur.fetchone()
            conn.commit()
            return _resp(200, _row_to_campaign(result))
        finally:
            conn.close()

    if action == 'promo_delete' and method == 'POST':
        campaign_id = body.get('id')
        if not campaign_id:
            return _resp(400, {'error': 'Не указана кампания'})
        conn = _db()
        try:
            cur = conn.cursor()
            cur.execute("SELECT supplier_id FROM promotion_campaigns WHERE id = %s", (campaign_id,))
            row = cur.fetchone()
            if not row:
                return _resp(404, {'error': 'Кампания не найдена'})
            if row[0] != user['id']:
                return _resp(403, {'error': 'Недостаточно прав'})
            cur.execute("DELETE FROM promotion_campaigns WHERE id = %s", (campaign_id,))
            conn.commit()
            return _resp(200, {'success': True})
        finally:
            conn.close()

    return _resp(405, {'error': 'Метод не поддерживается'})


def _handle_categories() -> dict:
    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, name, slug FROM categories ORDER BY name")
        rows = cur.fetchall()
        return _resp(200, {'categories': [{'id': r[0], 'name': r[1], 'slug': r[2]} for r in rows]})
    finally:
        conn.close()


def _handle_list(params: dict, event: dict) -> dict:
    mine = params.get('mine') == '1'
    page = max(1, int(params.get('page', '1') or '1'))
    limit = min(50, max(1, int(params.get('limit', '12') or '12')))
    offset = (page - 1) * limit

    where = []
    args = []

    if mine:
        user = _current_user(event)
        if not user:
            return _resp(401, {'error': 'Требуется авторизация'})
        where.append("supplier_id = %s")
        args.append(user['id'])
    else:
        where.append("status = 'active'")

    if params.get('search'):
        where.append("(name ILIKE %s OR description ILIKE %s)")
        term = f"%{params['search']}%"
        args.extend([term, term])
    if params.get('status') and params['status'] != 'all' and mine:
        where.append("status = %s")
        args.append(params['status'])
    if params.get('category_id') and params['category_id'] != 'all':
        where.append("category_id = %s")
        args.append(int(params['category_id']))

    where_sql = ' AND '.join(where) if where else '1=1'

    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute(f"SELECT COUNT(*) FROM products WHERE {where_sql}", args)
        total_count = cur.fetchone()[0]

        cur.execute(
            f"SELECT p.id, p.supplier_id, p.category_id, p.name, p.description, p.short_description, "
            f"p.sku, p.price, p.currency, p.discount_percentage, p.stock_quantity, p.min_order_quantity, "
            f"p.max_order_quantity, p.weight_kg, p.main_image_url, p.gallery_images_json, "
            f"p.meta_title, p.meta_description, p.tags_json, p.attributes_json, p.status, p.is_featured, "
            f"p.views_count, p.favorites_count, p.requests_count, p.created_at, p.updated_at, p.published_at, "
            f"c.name, u.company_name, u.first_name, u.last_name "
            f"FROM products p JOIN categories c ON c.id = p.category_id "
            f"JOIN users u ON u.id = p.supplier_id "
            f"WHERE {where_sql} ORDER BY p.created_at DESC LIMIT %s OFFSET %s",
            args + [limit, offset],
        )
        rows = cur.fetchall()
        products = []
        for r in rows:
            item = _row_to_product(r[:28])
            item['category_name'] = r[28]
            item['supplier_name'] = r[29] or f"{r[30] or ''} {r[31] or ''}".strip() or 'Поставщик'
            products.append(item)

        total_pages = max(1, (total_count + limit - 1) // limit)
        return _resp(200, {
            'products': products,
            'pagination': {'page': page, 'limit': limit, 'total_count': total_count, 'total_pages': total_pages},
        })
    finally:
        conn.close()


def _handle_get_one(params: dict) -> dict:
    product_id = params.get('id')
    prefixed_columns = ', '.join(f"products.{c.strip()}" for c in PRODUCT_COLUMNS.split(','))
    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute(
            f"SELECT {prefixed_columns}, categories.name, "
            f"users.company_name, users.first_name, users.last_name "
            f"FROM products "
            f"JOIN categories ON categories.id = products.category_id "
            f"JOIN users ON users.id = products.supplier_id "
            f"WHERE products.id = %s",
            (product_id,),
        )
        row = cur.fetchone()
        if not row:
            return _resp(404, {'error': 'Товар не найден'})
        cur.execute("UPDATE products SET views_count = views_count + 1 WHERE id = %s", (product_id,))
        conn.commit()
        item = _row_to_product(row[:28])
        item['category_name'] = row[28]
        item['supplier_name'] = row[29] or f"{row[30] or ''} {row[31] or ''}".strip() or 'Поставщик'
        return _resp(200, item)
    finally:
        conn.close()


def _validate_product_data(data: dict) -> str:
    if not data.get('name', '').strip():
        return 'Название товара обязательно'
    if not data.get('category_id'):
        return 'Выберите категорию'
    try:
        if float(data.get('price', -1)) < 0:
            return 'Укажите корректную цену'
    except (TypeError, ValueError):
        return 'Укажите корректную цену'
    if data.get('status') and data['status'] not in ALLOWED_STATUSES:
        return 'Некорректный статус товара'
    return ''


def _handle_create(event: dict, body: dict) -> dict:
    user = _current_user(event)
    if not user:
        return _resp(401, {'error': 'Требуется авторизация'})

    error = _validate_product_data(body)
    if error:
        return _resp(400, {'error': error})

    status = body.get('status', 'draft')
    publish_expr = "NOW()" if status == 'active' else "NULL"

    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO products (supplier_id, category_id, name, description, short_description, sku, "
            "price, currency, discount_percentage, stock_quantity, min_order_quantity, max_order_quantity, "
            "weight_kg, main_image_url, gallery_images_json, meta_title, meta_description, tags_json, "
            "attributes_json, status, is_featured, published_at) "
            f"VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, {publish_expr}) "
            f"RETURNING {PRODUCT_COLUMNS}",
            (
                user['id'], int(body['category_id']), body['name'].strip(),
                body.get('description') or None, body.get('short_description') or None,
                body.get('sku') or None, float(body['price']), body.get('currency', 'RUB'),
                float(body.get('discount_percentage', 0) or 0), int(body.get('stock_quantity', 0) or 0),
                int(body.get('min_order_quantity', 1) or 1),
                int(body['max_order_quantity']) if body.get('max_order_quantity') else None,
                float(body['weight_kg']) if body.get('weight_kg') else None,
                body.get('main_image_url') or None,
                json.dumps(body.get('gallery_images', [])),
                body.get('meta_title') or None, body.get('meta_description') or None,
                json.dumps(body.get('tags', [])), json.dumps(body.get('attributes', {})),
                status, bool(body.get('is_featured', False)),
            ),
        )
        row = cur.fetchone()
        conn.commit()
        return _resp(201, _row_to_product(row))
    finally:
        conn.close()


def _handle_update(event: dict, params: dict, body: dict) -> dict:
    user = _current_user(event)
    if not user:
        return _resp(401, {'error': 'Требуется авторизация'})

    product_id = params.get('id') or body.get('id')
    if not product_id:
        return _resp(400, {'error': 'Не указан товар'})

    error = _validate_product_data(body)
    if error:
        return _resp(400, {'error': error})

    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute("SELECT supplier_id FROM products WHERE id = %s", (product_id,))
        row = cur.fetchone()
        if not row:
            return _resp(404, {'error': 'Товар не найден'})
        if row[0] != user['id'] and not _is_admin(user):
            return _resp(403, {'error': 'Недостаточно прав'})

        status = body.get('status', 'draft')
        publish_clause = "published_at = COALESCE(published_at, NOW())" if status == 'active' else "published_at = published_at"

        cur.execute(
            f"UPDATE products SET category_id=%s, name=%s, description=%s, short_description=%s, sku=%s, "
            f"price=%s, currency=%s, discount_percentage=%s, stock_quantity=%s, min_order_quantity=%s, "
            f"max_order_quantity=%s, weight_kg=%s, main_image_url=%s, gallery_images_json=%s, "
            f"meta_title=%s, meta_description=%s, tags_json=%s, attributes_json=%s, status=%s, "
            f"is_featured=%s, updated_at=NOW(), {publish_clause} "
            f"WHERE id=%s RETURNING {PRODUCT_COLUMNS}",
            (
                int(body['category_id']), body['name'].strip(), body.get('description') or None,
                body.get('short_description') or None, body.get('sku') or None, float(body['price']),
                body.get('currency', 'RUB'), float(body.get('discount_percentage', 0) or 0),
                int(body.get('stock_quantity', 0) or 0), int(body.get('min_order_quantity', 1) or 1),
                int(body['max_order_quantity']) if body.get('max_order_quantity') else None,
                float(body['weight_kg']) if body.get('weight_kg') else None,
                body.get('main_image_url') or None, json.dumps(body.get('gallery_images', [])),
                body.get('meta_title') or None, body.get('meta_description') or None,
                json.dumps(body.get('tags', [])), json.dumps(body.get('attributes', {})),
                status, bool(body.get('is_featured', False)), product_id,
            ),
        )
        result = cur.fetchone()
        conn.commit()
        return _resp(200, _row_to_product(result))
    finally:
        conn.close()


def _handle_delete(event: dict, body: dict) -> dict:
    user = _current_user(event)
    if not user:
        return _resp(401, {'error': 'Требуется авторизация'})

    product_id = body.get('id') or body.get('product_id')
    if not product_id:
        return _resp(400, {'error': 'Не указан товар'})

    conn = _db()
    try:
        cur = conn.cursor()
        cur.execute("SELECT supplier_id FROM products WHERE id = %s", (product_id,))
        row = cur.fetchone()
        if not row:
            return _resp(404, {'error': 'Товар не найден'})
        if row[0] != user['id'] and not _is_admin(user):
            return _resp(403, {'error': 'Недостаточно прав'})

        cur.execute("DELETE FROM products WHERE id = %s", (product_id,))
        conn.commit()
        return _resp(200, {'success': True})
    finally:
        conn.close()