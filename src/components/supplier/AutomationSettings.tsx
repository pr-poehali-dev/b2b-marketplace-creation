import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface AutomationSettingsProps {
  automationSettings: {
    autoConfirm: boolean;
    autoShipping: boolean;
    autoMessages: boolean;
    lowStockAlerts: boolean;
    rushOrderAlerts: boolean;
  };
  setAutomationSettings: (settings: any) => void;
}

export default function AutomationSettings({ 
  automationSettings, 
  setAutomationSettings 
}: AutomationSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Bot" size={20} />
          Настройки автоматизации
        </CardTitle>
        <CardDescription>
          Автоматизируйте рутинные процессы для экономии времени
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Автоподтверждение заказов</h4>
                <p className="text-sm text-gray-600">Автоматически подтверждать оплаченные заказы</p>
              </div>
              <Switch
                checked={automationSettings.autoConfirm}
                onCheckedChange={(checked) => 
                  setAutomationSettings({...automationSettings, autoConfirm: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Автоотправка уведомлений</h4>
                <p className="text-sm text-gray-600">SMS и email о статусе заказа</p>
              </div>
              <Switch
                checked={automationSettings.autoMessages}
                onCheckedChange={(checked) => 
                  setAutomationSettings({...automationSettings, autoMessages: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Уведомления о низких остатках</h4>
                <p className="text-sm text-gray-600">Алерты при остатке менее 5 штук</p>
              </div>
              <Switch
                checked={automationSettings.lowStockAlerts}
                onCheckedChange={(checked) => 
                  setAutomationSettings({...automationSettings, lowStockAlerts: checked})
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Автоматическая отправка</h4>
                <p className="text-sm text-gray-600">Отправлять заказы через API службы доставки</p>
              </div>
              <Switch
                checked={automationSettings.autoShipping}
                onCheckedChange={(checked) => 
                  setAutomationSettings({...automationSettings, autoShipping: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Срочные заказы</h4>
                <p className="text-sm text-gray-600">Уведомления о заказах с высоким приоритетом</p>
              </div>
              <Switch
                checked={automationSettings.rushOrderAlerts}
                onCheckedChange={(checked) => 
                  setAutomationSettings({...automationSettings, rushOrderAlerts: checked})
                }
              />
            </div>

            <div className="p-4 border rounded-lg bg-emerald-50">
              <h4 className="font-medium text-emerald-900 mb-2">💡 Совет по автоматизации</h4>
              <p className="text-sm text-emerald-700">
                Включите автоподтверждение заказов и автоуведомления для экономии до 2 часов в день!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}