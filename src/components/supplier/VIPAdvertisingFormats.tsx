import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface VIPAdFormat {
  id: string;
  name: string;
  description: string;
  tier: 'professional' | 'enterprise';
  price: number;
  priceType: 'daily' | 'monthly' | 'click' | 'impression';
  placements: string[];
  specifications: {
    size?: string;
    duration?: string;
    targeting?: string[];
    frequency?: string;
  };
  performance: {
    averageCTR: number;
    averageROI: number;
    impressionsPerDay: number;
    conversionRate: number;
  };
  features: string[];
  active: boolean;
}

interface VIPAdvertisingFormatsProps {
  currentTier: 'starter' | 'basic' | 'professional' | 'enterprise';
  className?: string;
}

export default function VIPAdvertisingFormats({ 
  currentTier = 'professional',
  className = "" 
}: VIPAdvertisingFormatsProps) {
  const [activeTab, setActiveTab] = useState('formats');
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [campaignSettings, setCampaignSettings] = useState({
    budget: 10000,
    duration: 7,
    targetAudience: 'all',
    autoOptimization: true
  });

  const vipFormats: VIPAdFormat[] = [
    {
      id: 'homepage-hero',
      name: 'Главный баннер сайта',
      description: 'Огромный баннер в верхней части главной страницы - первое что видят все посетители',
      tier: 'enterprise',
      price: 15000,
      priceType: 'daily',
      placements: ['Главная страница - верх', 'Мобильная версия'],
      specifications: {
        size: '1200x400px (десктоп), 320x200px (мобайл)',
        duration: 'Ротация каждые 5 секунд',
        targeting: ['География', 'Интересы', 'Время дня'],
        frequency: 'Максимум 3 показа в день на пользователя'
      },
      performance: {
        averageCTR: 4.8,
        averageROI: 320,
        impressionsPerDay: 150000,
        conversionRate: 2.1
      },
      features: [
        'Максимальная видимость',
        'Первый показ всем посетителям',
        'Адаптивный дизайн',
        'Видео-поддержка',
        'A/B тестирование'
      ],
      active: false
    },
    {
      id: 'category-takeover',
      name: 'Полное оформление категории',
      description: 'Ваш бренд и товары занимают всю страницу категории - покупатели видят только вас',
      tier: 'enterprise',
      price: 8000,
      priceType: 'daily',
      placements: ['Страницы категорий', 'Фильтры товаров', 'Сайдбар'],
      specifications: {
        size: 'Различные размеры под дизайн страницы',
        duration: 'Весь день на выбранной категории',
        targeting: ['Конкретные категории', 'Поведение', 'История покупок'],
        frequency: 'Постоянно для целевой аудитории'
      },
      performance: {
        averageCTR: 12.3,
        averageROI: 580,
        impressionsPerDay: 45000,
        conversionRate: 8.7
      },
      features: [
        'Эксклюзивность в категории',
        'Брендинг всей страницы',
        'Множественные точки контакта',
        'Интеграция с каталогом',
        'Персонализация контента'
      ],
      active: true
    },
    {
      id: 'video-advertising',
      name: 'Видеореклама премиум',
      description: 'Короткие рекламные ролики в стратегических местах сайта с высоким вовлечением',
      tier: 'professional',
      price: 50,
      priceType: 'click',
      placements: ['Между товарами', 'В результатах поиска', 'В карточках товаров'],
      specifications: {
        size: '16:9, до 30 секунд',
        duration: 'По кликам',
        targeting: ['Демография', 'Интересы', 'Предыдущие покупки'],
        frequency: 'Максимум 2 ролика в сессию'
      },
      performance: {
        averageCTR: 8.9,
        averageROI: 240,
        impressionsPerDay: 25000,
        conversionRate: 5.2
      },
      features: [
        'Высокое вовлечение',
        'Эмоциональное воздействие',
        'Звуковое сопровождение',
        'Интерактивные элементы',
        'Детальная аналитика'
      ],
      active: false
    },
    {
      id: 'push-notifications',
      name: 'VIP push-уведомления',
      description: 'Персональные push-уведомления о ваших товарах и акциях прямо на устройства покупателей',
      tier: 'professional',
      price: 5,
      priceType: 'impression',
      placements: ['Мобильные устройства', 'Десктоп браузеры', 'PWA приложение'],
      specifications: {
        size: 'Заголовок 50 символов, текст 125 символов',
        duration: 'Мгновенная доставка',
        targeting: ['Поведение', 'Геолокация', 'Время активности'],
        frequency: 'До 3 уведомлений в неделю'
      },
      performance: {
        averageCTR: 15.7,
        averageROI: 450,
        impressionsPerDay: 12000,
        conversionRate: 12.8
      },
      features: [
        'Мгновенная доставка',
        'Высокий CTR',
        'Персонализация',
        'Геотаргетинг',
        'Контроль частоты'
      ],
      active: true
    },
    {
      id: 'search-spotlight',
      name: 'Прожектор в поиске',
      description: 'Ваши товары всегда в топ-3 результатов поиска с премиум оформлением',
      tier: 'professional',
      price: 25,
      priceType: 'click',
      placements: ['Результаты поиска', 'Автодополнение', 'Популярные запросы'],
      specifications: {
        size: 'Увеличенная карточка товара',
        duration: 'По ключевым словам',
        targeting: ['Поисковые запросы', 'История поиска', 'Категории'],
        frequency: 'При каждом релевантном поиске'
      },
      performance: {
        averageCTR: 18.4,
        averageROI: 380,
        impressionsPerDay: 35000,
        conversionRate: 11.2
      },
      features: [
        'Гарантированный топ-3',
        'Премиум оформление',
        'Множественные фото',
        'Расширенное описание',
        'Бейджи качества'
      ],
      active: true
    },
    {
      id: 'email-exclusive',
      name: 'Эксклюзивные email-кампании',
      description: 'Персональные рассылки с вашими товарами целевой аудитории с высокой вероятностью покупки',
      tier: 'professional',
      price: 3500,
      priceType: 'monthly',
      placements: ['Email рассылки', 'Триггерные письма', 'Дайджесты'],
      specifications: {
        size: 'Полноформатные баннеры в письмах',
        duration: 'Ежемесячные кампании',
        targeting: ['Покупательская история', 'Предпочтения', 'Сегментация'],
        frequency: '2-4 рассылки в месяц'
      },
      performance: {
        averageCTR: 6.2,
        averageROI: 290,
        impressionsPerDay: 8000,
        conversionRate: 7.8
      },
      features: [
        'Высокая релевантность',
        'Персонализация',
        'A/B тестирование писем',
        'Сегментация аудитории',
        'Детальная аналитика'
      ],
      active: false
    }
  ];

  const availableFormats = vipFormats.filter(format => {
    if (currentTier === 'enterprise') return true;
    if (currentTier === 'professional') return format.tier === 'professional';
    return false;
  });

  const lockedFormats = vipFormats.filter(format => !availableFormats.includes(format));

  const getPriceDisplay = (format: VIPAdFormat) => {
    const typeMap = {
      daily: 'день',
      monthly: 'месяц', 
      click: 'клик',
      impression: '1000 показов'
    };
    return `${format.price.toLocaleString()} ₽/${typeMap[format.priceType]}`;
  };

  const getTotalBudget = () => {
    return campaignSettings.budget.toLocaleString();
  };

  const getEstimatedResults = () => {
    const avgROI = availableFormats.reduce((sum, f) => sum + f.performance.averageROI, 0) / availableFormats.length;
    const estimatedRevenue = campaignSettings.budget * (avgROI / 100);
    const estimatedProfit = estimatedRevenue - campaignSettings.budget;
    return { estimatedRevenue, estimatedProfit, avgROI };
  };

  const { estimatedRevenue, estimatedProfit, avgROI } = getEstimatedResults();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Заголовок */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">VIP форматы рекламы</h2>
          <p className="text-gray-600">Эксклюзивные рекламные возможности для максимального охвата</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-purple-100 text-purple-800">
            {currentTier === 'enterprise' ? 'Корпоративный' : 'Профессиональный'} тариф
          </Badge>
          <Button>
            <Icon name="Zap" size={16} className="mr-2" />
            Запустить кампанию
          </Button>
        </div>
      </div>

      {/* Калькулятор бюджета */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Calculator" size={20} />
            Калькулятор рекламного бюджета
          </CardTitle>
          <CardDescription>
            Рассчитайте ожидаемую прибыль от VIP-рекламы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="budget">Бюджет на рекламу</Label>
              <Input
                id="budget"
                type="number"
                value={campaignSettings.budget}
                onChange={(e) => setCampaignSettings({...campaignSettings, budget: parseInt(e.target.value) || 0})}
                placeholder="10000"
              />
              <p className="text-xs text-gray-600 mt-1">рублей</p>
            </div>
            
            <div className="text-center p-3 bg-blue-100 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{getTotalBudget()} ₽</div>
              <div className="text-sm text-blue-700">Бюджет</div>
            </div>
            
            <div className="text-center p-3 bg-green-100 rounded-lg">
              <div className="text-lg font-bold text-green-600">{estimatedRevenue.toLocaleString()} ₽</div>
              <div className="text-sm text-green-700">Ожидаемая выручка</div>
            </div>
            
            <div className="text-center p-3 bg-purple-100 rounded-lg">
              <div className="text-lg font-bold text-purple-600">+{estimatedProfit.toLocaleString()} ₽</div>
              <div className="text-sm text-purple-700">Прибыль (ROI {Math.round(avgROI)}%)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="formats">Доступные форматы</TabsTrigger>
          <TabsTrigger value="campaigns">Мои кампании</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="formats" className="space-y-4">
          {/* Доступные форматы */}
          {availableFormats.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Crown" size={20} />
                  VIP форматы рекламы
                </CardTitle>
                <CardDescription>
                  Эксклюзивные рекламные форматы для вашего тарифа
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {availableFormats.map((format) => (
                    <Card key={format.id} className="border-2 border-purple-200 bg-purple-50">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {format.name}
                              {format.tier === 'enterprise' && (
                                <Badge className="bg-gold-100 text-gold-800">
                                  👑 Эксклюзив
                                </Badge>
                              )}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className="bg-green-100 text-green-800">
                                {getPriceDisplay(format)}
                              </Badge>
                              {format.active && (
                                <Badge className="bg-blue-100 text-blue-800">
                                  ⚡ Активна
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <CardDescription>{format.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Размещение:</h4>
                          <div className="flex flex-wrap gap-1">
                            {format.placements.map((placement, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {placement}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Производительность:</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-center p-2 bg-blue-100 rounded">
                              <div className="font-bold text-blue-600">{format.performance.averageCTR}%</div>
                              <div className="text-blue-700">CTR</div>
                            </div>
                            <div className="text-center p-2 bg-green-100 rounded">
                              <div className="font-bold text-green-600">{format.performance.averageROI}%</div>
                              <div className="text-green-700">ROI</div>
                            </div>
                            <div className="text-center p-2 bg-purple-100 rounded">
                              <div className="font-bold text-purple-600">{format.performance.impressionsPerDay.toLocaleString()}</div>
                              <div className="text-purple-700">показов/день</div>
                            </div>
                            <div className="text-center p-2 bg-orange-100 rounded">
                              <div className="font-bold text-orange-600">{format.performance.conversionRate}%</div>
                              <div className="text-orange-700">конверсия</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Особенности:</h4>
                          <ul className="space-y-1">
                            {format.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <Icon name="Star" size={12} className="text-purple-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button 
                            className="flex-1" 
                            variant={format.active ? "outline" : "default"}
                          >
                            {format.active ? (
                              <>
                                <Icon name="Settings" size={16} className="mr-2" />
                                Настроить
                              </>
                            ) : (
                              <>
                                <Icon name="Play" size={16} className="mr-2" />
                                Запустить
                              </>
                            )}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Info" size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Заблокированные форматы */}
          {lockedFormats.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Lock" size={20} />
                  Эксклюзивные форматы (требуется апгрейд)
                </CardTitle>
                <CardDescription>
                  Эти премиум форматы доступны на корпоративном тарифе
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {lockedFormats.map((format) => (
                    <Card key={format.id} className="border-2 border-gray-200 bg-gray-50 opacity-75">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
                              <Icon name="Lock" size={16} className="text-gray-500" />
                              {format.name}
                            </CardTitle>
                            <Badge className="bg-gray-200 text-gray-600 mt-1">
                              Корпоративный тариф
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-gray-600">{format.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="text-center py-4">
                          <div className="p-3 bg-gold-100 rounded-lg inline-block mb-3">
                            <Icon name="Crown" size={24} className="text-gold-600" />
                          </div>
                          <p className="text-lg font-bold text-gold-600">{getPriceDisplay(format)}</p>
                          <p className="text-sm text-gray-600 mb-3">
                            Средний ROI: {format.performance.averageROI}%
                          </p>
                        </div>

                        <Button className="w-full bg-gold-600 hover:bg-gold-700">
                          <Icon name="Crown" size={16} className="mr-2" />
                          Повысить до корпоративного
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BarChart3" size={20} />
                Активные рекламные кампании
              </CardTitle>
              <CardDescription>
                Управление текущими VIP кампаниями
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableFormats.filter(f => f.active).map((format) => (
                  <div key={format.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Icon name="Play" size={16} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{format.name}</h4>
                          <p className="text-sm text-gray-600">{getPriceDisplay(format)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">Активна</Badge>
                        <Button size="sm" variant="outline">
                          <Icon name="Pause" size={14} className="mr-1" />
                          Пауза
                        </Button>
                        <Button size="sm" variant="outline">
                          <Icon name="Settings" size={14} />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="font-bold text-blue-600">{format.performance.impressionsPerDay.toLocaleString()}</div>
                        <div className="text-sm text-blue-700">показов/день</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="font-bold text-green-600">{format.performance.averageCTR}%</div>
                        <div className="text-sm text-green-700">CTR</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="font-bold text-purple-600">{format.performance.conversionRate}%</div>
                        <div className="text-sm text-purple-700">конверсия</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded">
                        <div className="font-bold text-orange-600">{format.performance.averageROI}%</div>
                        <div className="text-sm text-orange-700">ROI</div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Дневной бюджет: 5,000 ₽</span>
                        <span>Потрачено: 3,240 ₽ (65%)</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                ))}

                {availableFormats.filter(f => f.active).length === 0 && (
                  <div className="text-center py-8">
                    <div className="p-4 bg-gray-100 rounded-lg inline-block mb-4">
                      <Icon name="PauseCircle" size={48} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Нет активных кампаний</h3>
                    <p className="text-gray-600 mb-4">
                      Запустите VIP рекламу для максимального охвата аудитории
                    </p>
                    <Button>
                      <Icon name="Play" size={16} className="mr-2" />
                      Создать кампанию
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BarChart3" size={20} />
                Эффективность VIP рекламы
              </CardTitle>
              <CardDescription>
                Детальная аналитика по всем форматам рекламы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2.4M</div>
                    <div className="text-sm text-gray-600">Общие показы</div>
                    <div className="text-xs text-green-600">+18% к прошлому месяцу</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">8.7%</div>
                    <div className="text-sm text-gray-600">Средний CTR</div>
                    <div className="text-xs text-green-600">+2.3% к среднему</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">340%</div>
                    <div className="text-sm text-gray-600">Средний ROI</div>
                    <div className="text-xs text-green-600">+45% к цели</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Сравнение форматов</h4>
                  <div className="space-y-3">
                    {availableFormats.map((format, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{format.name}</h5>
                          <Badge className="bg-purple-100 text-purple-800">
                            ROI: {format.performance.averageROI}%
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-3 text-sm">
                          <div>
                            <div className="font-medium text-blue-600">
                              {format.performance.impressionsPerDay.toLocaleString()}
                            </div>
                            <div className="text-gray-600">показов</div>
                          </div>
                          <div>
                            <div className="font-medium text-green-600">
                              {format.performance.averageCTR}%
                            </div>
                            <div className="text-gray-600">CTR</div>
                          </div>
                          <div>
                            <div className="font-medium text-purple-600">
                              {format.performance.conversionRate}%
                            </div>
                            <div className="text-gray-600">конверсия</div>
                          </div>
                          <div>
                            <div className="font-medium text-orange-600">
                              {getPriceDisplay(format)}
                            </div>
                            <div className="text-gray-600">цена</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}