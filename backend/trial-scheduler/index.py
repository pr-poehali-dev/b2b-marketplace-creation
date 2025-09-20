import json
import os
import requests
from datetime import datetime, timedelta
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Планировщик для автоматического запуска email-уведомлений о пробном периоде
    Args: event - dict с httpMethod, body; context - объект с request_id, function_name
    Returns: HTTP response с результатом выполнения планировщика
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    # POST запрос - запуск планировщика
    if method == 'POST':
        try:
            # URL функции уведомлений
            notifications_url = os.environ.get(
                'TRIAL_NOTIFICATIONS_URL', 
                'https://functions.poehali.dev/9e8e77f5-a732-4a04-8834-4c01eaab689b'
            )
            
            current_time = datetime.now()
            
            # Получаем статистику перед отправкой
            stats_response = requests.get(
                notifications_url,
                timeout=30,
                headers={'Content-Type': 'application/json'}
            )
            
            initial_stats = {}
            if stats_response.status_code == 200:
                stats_data = stats_response.json()
                initial_stats = stats_data.get('statistics', {})
            
            # Запускаем отправку уведомлений
            send_response = requests.post(
                notifications_url,
                json={},
                timeout=30,
                headers={'Content-Type': 'application/json'}
            )
            
            result = {
                'scheduler_run_time': current_time.isoformat(),
                'notifications_url': notifications_url,
                'initial_stats': initial_stats,
                'request_id': context.request_id
            }
            
            if send_response.status_code == 200:
                send_data = send_response.json()
                result.update({
                    'status': 'success',
                    'notifications_result': send_data,
                    'emails_sent': send_data.get('emails_sent', 0),
                    'total_suppliers': send_data.get('total_suppliers', 0)
                })
                
                # Логируем успешное выполнение
                print(f"Scheduler executed successfully at {current_time}")
                print(f"Emails sent: {send_data.get('emails_sent', 0)}")
                
            else:
                result.update({
                    'status': 'partial_failure',
                    'error': f'Notifications API returned {send_response.status_code}',
                    'response_text': send_response.text[:500]  # Ограничиваем длину
                })
                
                print(f"Notifications API error: {send_response.status_code}")
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result)
            }
            
        except requests.exceptions.Timeout:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({
                    'error': 'Timeout while calling notifications API',
                    'request_id': context.request_id
                })
            }
        except requests.exceptions.RequestException as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({
                    'error': f'Request error: {str(e)}',
                    'request_id': context.request_id
                })
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({
                    'error': f'Unexpected error: {str(e)}',
                    'request_id': context.request_id
                })
            }
    
    # GET запрос - статус планировщика и настройки
    if method == 'GET':
        try:
            notifications_url = os.environ.get(
                'TRIAL_NOTIFICATIONS_URL', 
                'https://functions.poehali.dev/9e8e77f5-a732-4a04-8834-4c01eaab689b'
            )
            
            # Проверяем доступность API уведомлений
            try:
                health_response = requests.get(
                    notifications_url,
                    timeout=10,
                    headers={'Content-Type': 'application/json'}
                )
                api_status = 'healthy' if health_response.status_code == 200 else 'error'
                api_response_time = health_response.elapsed.total_seconds()
            except Exception:
                api_status = 'unreachable'
                api_response_time = None
            
            # Время следующего запуска (каждый день в 10:00 UTC)
            now = datetime.utcnow()
            next_run = now.replace(hour=10, minute=0, second=0, microsecond=0)
            if now.hour >= 10:
                next_run += timedelta(days=1)
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'scheduler_status': 'active',
                    'current_time': now.isoformat(),
                    'next_scheduled_run': next_run.isoformat(),
                    'notifications_api': {
                        'url': notifications_url,
                        'status': api_status,
                        'response_time_seconds': api_response_time
                    },
                    'schedule': {
                        'frequency': 'daily',
                        'time': '10:00 UTC',
                        'description': 'Проверяет поставщиков с истекающим пробным периодом'
                    },
                    'environment': {
                        'function_name': context.function_name,
                        'runtime': 'python311'
                    },
                    'request_id': context.request_id
                })
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({
                    'error': f'Error getting scheduler status: {str(e)}',
                    'request_id': context.request_id
                })
            }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'error': 'Method not allowed'})
    }