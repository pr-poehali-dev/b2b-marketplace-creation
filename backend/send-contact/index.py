import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с формы обратной связи на email владельца сайта."""

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '')
    email = body.get('email', '')
    phone = body.get('phone', '')
    company = body.get('company', '')
    subject = body.get('subject', '')
    message = body.get('message', '')

    recipient = os.environ['RECIPIENT_EMAIL']

    subject_labels = {
        'general': 'Общий вопрос',
        'sales': 'Продажи и тарифы',
        'support': 'Техническая поддержка',
        'partnership': 'Партнерство',
        'finance': 'Финансовые вопросы',
    }
    subject_text = subject_labels.get(subject, subject)

    html_body = f"""
    <h2>Новая заявка с сайта BM Market</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px">
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Имя</b></td><td style="padding:8px;border:1px solid #ddd">{name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Email</b></td><td style="padding:8px;border:1px solid #ddd"><a href="mailto:{email}">{email}</a></td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Телефон</b></td><td style="padding:8px;border:1px solid #ddd">{phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Компания</b></td><td style="padding:8px;border:1px solid #ddd">{company}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Тема</b></td><td style="padding:8px;border:1px solid #ddd">{subject_text}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Сообщение</b></td><td style="padding:8px;border:1px solid #ddd">{message}</td></tr>
    </table>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'[BM Market] Новая заявка от {name}'
    msg['From'] = recipient
    msg['To'] = recipient
    msg['Reply-To'] = email
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(os.environ['SMTP_USER'], os.environ['SMTP_PASSWORD'])
        server.sendmail(recipient, [recipient], msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'success': True})
    }
