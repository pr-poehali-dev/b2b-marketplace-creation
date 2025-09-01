import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";

interface SettingsData {
  notifications: boolean;
  autoRefresh: boolean;
  priceAlerts: boolean;
  maxPrice: number[];
  notificationFrequency: string;
  deliveryRegion: string;
  companyName: string;
  companyInn: string;
  companyPhone: string;
}

const defaultSettings: SettingsData = {
  notifications: true,
  autoRefresh: false,
  priceAlerts: true,
  maxPrice: [50000],
  notificationFrequency: "daily",
  deliveryRegion: "moscow",
  companyName: "",
  companyInn: "",
  companyPhone: ""
};

const SettingsSection = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const originalSettings = useRef<SettingsData>(defaultSettings);

  // Загрузка настроек из localStorage при инициализации
  useEffect(() => {
    const savedSettings = localStorage.getItem('businessMarketSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({...defaultSettings, ...parsed});
        originalSettings.current = {...defaultSettings, ...parsed};
      } catch (error) {
        console.error('Ошибка при загрузке настроек:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить сохраненные настройки",
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  // Отслеживание изменений
  useEffect(() => {
    const changed = JSON.stringify(settings) !== JSON.stringify(originalSettings.current);
    setHasChanges(changed);
  }, [settings]);

  const updateSetting = <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const validateSettings = (): boolean => {
    if (settings.companyName && settings.companyName.length < 2) {
      toast({
        title: "Ошибка валидации",
        description: "Название компании должно содержать минимум 2 символа",
        variant: "destructive"
      });
      return false;
    }

    if (settings.companyInn && !/^\d{10,12}$/.test(settings.companyInn)) {
      toast({
        title: "Ошибка валидации", 
        description: "ИНН должен содержать 10 или 12 цифр",
        variant: "destructive"
      });
      return false;
    }

    if (settings.companyPhone && !/^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/.test(settings.companyPhone)) {
      toast({
        title: "Ошибка валидации",
        description: "Телефон должен быть в формате +7 (999) 123-45-67",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const saveSettings = async () => {
    if (!validateSettings()) return;

    setIsLoading(true);
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('businessMarketSettings', JSON.stringify(settings));
      originalSettings.current = {...settings};
      setHasChanges(false);
      
      toast({
        title: "Успешно сохранено",
        description: "Все настройки были успешно сохранены",
      });
    } catch (error) {
      toast({
        title: "Ошибка сохранения",
        description: "Не удалось сохранить настройки. Попробуйте еще раз.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    originalSettings.current = defaultSettings;
    localStorage.removeItem('businessMarketSettings');
    setHasChanges(false);
    
    toast({
      title: "Настройки сброшены",
      description: "Все настройки возвращены к значениям по умолчанию",
    });
  };

  const exportData = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'business-market-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Данные экспортированы",
      description: "Файл с настройками загружен на ваш компьютер",
    });
  };

  const changePassword = () => {
    toast({
      title: "Смена пароля",
      description: "Функция смены пароля будет доступна в следующем обновлении",
    });
  };

  const toggleTwoFactor = () => {
    toast({
      title: "Двухфакторная аутентификация",
      description: "Настройка 2FA будет доступна в следующем обновлении",
    });
  };

  const deleteAccount = () => {
    if (confirm('Вы действительно хотите удалить аккаунт? Это действие необратимо.')) {
      toast({
        title: "Удаление аккаунта",
        description: "Функция удаления аккаунта будет доступна в следующем обновлении",
        variant: "destructive"
      });
    }
  };

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
                  checked={settings.notifications}
                  onCheckedChange={(checked) => updateSetting('notifications', checked)}
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
                  checked={settings.priceAlerts}
                  onCheckedChange={(checked) => updateSetting('priceAlerts', checked)}
                />
              </div>

              <div className="space-y-3">
                <Label>Частота уведомлений</Label>
                <Select 
                  value={settings.notificationFrequency} 
                  onValueChange={(value) => updateSetting('notificationFrequency', value)}
                >
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
                    value={settings.maxPrice}
                    onValueChange={(value) => updateSetting('maxPrice', value)}
                    max={1000000}
                    min={1000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1,000₽</span>
                    <span className="font-medium">{settings.maxPrice[0].toLocaleString()}₽</span>
                    <span>1,000,000₽</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Регион поставки</Label>
                <Select 
                  value={settings.deliveryRegion} 
                  onValueChange={(value) => updateSetting('deliveryRegion', value)}
                >
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
                  checked={settings.autoRefresh}
                  onCheckedChange={(checked) => updateSetting('autoRefresh', checked)}
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
                <Input 
                  id="company-name" 
                  placeholder="ООО 'Ваша компания'" 
                  value={settings.companyName}
                  onChange={(e) => updateSetting('companyName', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company-inn">ИНН</Label>
                <Input 
                  id="company-inn" 
                  placeholder="1234567890" 
                  value={settings.companyInn}
                  onChange={(e) => updateSetting('companyInn', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-phone">Телефон</Label>
                <Input 
                  id="company-phone" 
                  placeholder="+7 (999) 123-45-67" 
                  value={settings.companyPhone}
                  onChange={(e) => updateSetting('companyPhone', e.target.value)}
                />
              </div>

              <Button 
                className="w-full" 
                variant="outline"
                onClick={saveSettings}
                disabled={!hasChanges || isLoading}
              >
                <Icon name="Save" size={16} className="mr-2" />
                {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
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
              <Button variant="outline" className="w-full justify-start" onClick={changePassword}>
                <Icon name="Key" size={16} className="mr-2" />
                Изменить пароль
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={toggleTwoFactor}>
                <Icon name="Smartphone" size={16} className="mr-2" />
                Двухфакторная аутентификация
              </Button>

              <Button variant="outline" className="w-full justify-start" onClick={exportData}>
                <Icon name="Download" size={16} className="mr-2" />
                Экспортировать данные
              </Button>

              <div className="pt-4 border-t">
                <Button variant="destructive" className="w-full" onClick={deleteAccount}>
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Удалить аккаунт
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Кнопки управления */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button 
            size="lg" 
            className="text-base h-12" 
            onClick={saveSettings}
            disabled={!hasChanges || isLoading}
          >
            <Icon name="Save" size={18} className="mr-2" />
            {isLoading ? 'Сохранение...' : 'Сохранить все настройки'}
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-base h-12"
            onClick={resetSettings}
            disabled={isLoading}
          >
            <Icon name="RotateCcw" size={18} className="mr-2" />
            Сбросить к умолчанию
          </Button>
        </div>
        
        {hasChanges && (
          <div className="text-center mt-4">
            <p className="text-sm text-orange-600 bg-orange-50 px-4 py-2 rounded-lg inline-block">
              <Icon name="AlertTriangle" size={14} className="mr-1 inline" />
              У вас есть несохраненные изменения
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SettingsSection;