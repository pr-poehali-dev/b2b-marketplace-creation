import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const SettingsSection = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [maxPrice, setMaxPrice] = useState([50000]);

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Icon name="Settings" size={14} className="mr-1" />
            Персональные настройки
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Настройки платформы
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Настройте работу платформы под ваши потребности и предпочтения
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Уведомления */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Bell" size={20} />
                Уведомления
              </CardTitle>
              <CardDescription>
                Управление системой уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Включить уведомления</Label>
                  <div className="text-sm text-gray-500">
                    Получать уведомления о новых предложениях
                  </div>
                </div>
                <Switch 
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="price-alerts">Ценовые уведомления</Label>
                  <div className="text-sm text-gray-500">
                    Уведомления об изменении цен
                  </div>
                </div>
                <Switch 
                  id="price-alerts"
                  checked={priceAlerts}
                  onCheckedChange={setPriceAlerts}
                />
              </div>

              <div className="space-y-3">
                <Label>Частота уведомлений</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">В реальном времени</SelectItem>
                    <SelectItem value="hourly">Каждый час</SelectItem>
                    <SelectItem value="daily">Ежедневно</SelectItem>
                    <SelectItem value="weekly">Еженедельно</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Торговые настройки */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="TrendingUp" size={20} />
                Торговые настройки
              </CardTitle>
              <CardDescription>
                Параметры для поиска и торговли
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Максимальная цена товара (₽)</Label>
                <div className="px-3">
                  <Slider
                    value={maxPrice}
                    onValueChange={setMaxPrice}
                    max={1000000}
                    min={1000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1,000₽</span>
                    <span className="font-medium">{maxPrice[0].toLocaleString()}₽</span>
                    <span>1,000,000₽</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Регион поставки</Label>
                <Select defaultValue="moscow">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moscow">Москва и МО</SelectItem>
                    <SelectItem value="spb">Санкт-Петербург</SelectItem>
                    <SelectItem value="russia">Вся Россия</SelectItem>
                    <SelectItem value="cis">СНГ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-refresh">Автообновление каталога</Label>
                  <div className="text-sm text-gray-500">
                    Обновлять список товаров автоматически
                  </div>
                </div>
                <Switch 
                  id="auto-refresh"
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                />
              </div>
            </CardContent>
          </Card>

          {/* Профиль компании */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Building" size={20} />
                Профиль компании
              </CardTitle>
              <CardDescription>
                Информация о вашей компании
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Название компании</Label>
                <Input id="company-name" placeholder="ООО 'Ваша компания'" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company-inn">ИНН</Label>
                <Input id="company-inn" placeholder="1234567890" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-phone">Телефон</Label>
                <Input id="company-phone" placeholder="+7 (999) 123-45-67" />
              </div>

              <Button className="w-full" variant="outline">
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить изменения
              </Button>
            </CardContent>
          </Card>

          {/* Безопасность */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Shield" size={20} />
                Безопасность
              </CardTitle>
              <CardDescription>
                Настройки безопасности аккаунта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Key" size={16} className="mr-2" />
                Изменить пароль
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Smartphone" size={16} className="mr-2" />
                Двухфакторная аутентификация
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <Icon name="Download" size={16} className="mr-2" />
                Экспортировать данные
              </Button>

              <div className="pt-4 border-t">
                <Button variant="destructive" className="w-full">
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Удалить аккаунт
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Кнопки управления */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button size="lg" className="text-base h-12">
            <Icon name="Save" size={18} className="mr-2" />
            Сохранить все настройки
          </Button>
          <Button variant="outline" size="lg" className="text-base h-12">
            <Icon name="RotateCcw" size={18} className="mr-2" />
            Сбросить к умолчанию
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SettingsSection;