import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface MarketingTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'automation' | 'content' | 'analytics' | 'communication';
  premium: boolean;
  price?: string;
  features: string[];
  benefits: string[];
}

interface SupplierMarketingToolsProps {
  className?: string;
}

export default function SupplierMarketingTools({ className = "" }: SupplierMarketingToolsProps) {
  const [activeTab, setActiveTab] = useState<'tools' | 'templates' | 'insights'>('tools');
  const [emailTemplate, setEmailTemplate] = useState('');
  const [promoSettings, setPromoSettings] = useState({
    autoDiscount: false,
    seasonalPromotions: false,
    lowStockAlerts: true,
    priceTracking: false
  });

  const marketingTools: MarketingTool[] = [
    {
      id: 'auto-email',
      name: 'Email-маркетинг',
      description: 'Автоматические рассылки покупателям и рекламные кампании',
      icon: 'Mail',
      category: 'communication',
      premium: false,
      features: [
        'Готовые шаблоны писем',
        'Сегментация покупателей',
        'A/B тестирование',
        'Статистика открытий и кликов'
      ],
      benefits: [
        '+40% повторных покупок',
        'Автоматизация коммуникаций',
        'Персонализированные предложения'
      ]
    },
    {
      id: 'seo-optimizer',
      name: 'SEO-оптимизация',
      description: 'Автоматическая оптимизация описаний товаров для поиска',
      icon: 'Search',
      category: 'content',
      premium: true,
      price: '490 ₽/мес',
      features: [
        'Анализ ключевых слов',
        'Оптимизация заголовков',
        'Мета-описания товаров',
        'Отчеты по позициям'
      ],
      benefits: [
        '+60% трафика из поиска',
        'Автоматическая оптимизация',
        'Отслеживание конкурентов'
      ]
    },
    {
      id: 'price-monitor',
      name: 'Мониторинг цен',
      description: 'Отслеживание цен конкурентов и автоматическая корректировка',
      icon: 'BarChart3',
      category: 'analytics',
      premium: true,
      price: '990 ₽/мес',
      features: [
        'Мониторинг 50+ площадок',
        'Автоматическое изменение цен',
        'Уведомления о изменениях',
        'Анализ конкурентов'
      ],
      benefits: [
        'Всегда конкурентные цены',
        'Защита от демпинга',
        '+25% прибыли'
      ]
    },
    {
      id: 'social-media',
      name: 'Социальные сети',
      description: 'Автоматическая публикация товаров в соцсетях',
      icon: 'Share2',
      category: 'communication',
      premium: false,
      features: [
        'Публикация в ВК, Телеграм',
        'Готовые посты с товарами',
        'Планировщик публикаций',
        'Статистика охватов'
      ],
      benefits: [
        '+30% узнаваемости бренда',
        'Автоматический контент',
        'Новые каналы продаж'
      ]
    },
    {
      id: 'review-manager',
      name: 'Управление отзывами',
      description: 'Получение и обработка отзывов покупателей',
      icon: 'MessageSquare',
      category: 'communication',
      premium: false,
      features: [
        'Автозапросы отзывов',
        'Шаблоны ответов',
        'Мониторинг репутации',
        'Анализ настроений'
      ],
      benefits: [
        '+80% больше отзывов',
        'Улучшение репутации',
        'Увеличение доверия'
      ]
    },
    {
      id: 'inventory-ai',
      name: 'ИИ для складских остатков',
      description: 'Прогнозирование спроса и оптимизация закупок',
      icon: 'Bot',
      category: 'automation',
      premium: true,
      price: '1490 ₽/мес',
      features: [
        'Прогноз спроса на 30 дней',
        'Рекомендации по закупкам',
        'Анализ сезонности',
        'Оптимизация остатков'
      ],
      benefits: [
        '-40% затрат на хранение',
        'Никогда не заканчивается товар',
        'Умные закупки'
      ]
    }
  ];

  const emailTemplates = [
    {
      id: 'welcome',
      name: 'Приветствие нового клиента',
      subject: 'Добро пожаловать! Ваш первый заказ готов',
      content: `Здравствуйте, {customer_name}!

Спасибо за ваш заказ в нашем магазине. Мы очень рады видеть вас среди наших клиентов!

Ваш заказ #{order_number} на сумму {order_total} уже обрабатывается.

Как постоянному клиенту, предлагаем вам скидку 10% на следующую покупку по промокоду WELCOME10.

С уважением,
Команда {supplier_name}`
    },
    {
      id: 'abandoned-cart',
      name: 'Брошенная корзина',
      subject: 'Вы забыли что-то важное в корзине!',
      content: `Здравствуйте, {customer_name}!

Мы заметили, что вы добавили товары в корзину, но не завершили заказ.

В вашей корзине:
{cart_items}

Завершите покупку в течение 24 часов и получите бесплатную доставку!

{cart_link}

С уважением,
{supplier_name}`
    },
    {
      id: 'restock',
      name: 'Товар снова в наличии',
      subject: 'Отличные новости! {product_name} снова в наличии',
      content: `Здравствуйте, {customer_name}!

Спешим сообщить, что товар "{product_name}", который вас интересовал, снова доступен для заказа.

Успейте оформить заказ, пока товар в наличии!

{product_link}

С уважением,
{supplier_name}`
    }
  ];

  const marketingInsights = [
    {
      metric: 'Конверсия email-рассылок',
      value: '8.3%',
      trend: '+12%',
      recommendation: 'Увеличьте частоту персонализированных предложений'
    },
    {
      metric: 'Эффективность соцсетей',
      value: '156 переходов',
      trend: '+34%',
      recommendation: 'Запустите рекламу в Telegram для расширения охвата'
    },
    {
      metric: 'SEO позиции',
      value: 'ТОП-10',
      trend: '+5 позиций',
      recommendation: 'Добавьте больше ключевых слов в описания товаров'
    },
    {
      metric: 'Управление отзывами',
      value: '4.7/5',
      trend: '+0.3',
      recommendation: 'Продолжайте быстро отвечать на отзывы клиентов'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'automation': return 'Bot';
      case 'content': return 'FileText';
      case 'analytics': return 'BarChart3';
      case 'communication': return 'MessageSquare';
      default: return 'Star';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'automation': return 'bg-purple-100 text-purple-800';
      case 'content': return 'bg-blue-100 text-blue-800';
      case 'analytics': return 'bg-green-100 text-green-800';
      case 'communication': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Заголовок */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Маркетинговые инструменты</h2>
          <p className="text-gray-600">Автоматизируйте продвижение и увеличивайте продажи</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Icon name="HelpCircle" size={16} className="mr-2" />
            Обучение
          </Button>
          <Button>
            <Icon name="Zap" size={16} className="mr-2" />
            Получить Pro
          </Button>
        </div>
      </div>

      {/* Табы */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'tools' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('tools')}
        >
          <Icon name="Wrench" size={16} className="mr-2" />
          Инструменты
        </Button>
        <Button
          variant={activeTab === 'templates' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('templates')}
        >
          <Icon name="FileText" size={16} className="mr-2" />
          Шаблоны
        </Button>
        <Button
          variant={activeTab === 'insights' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('insights')}
        >
          <Icon name="TrendingUp" size={16} className="mr-2" />
          Аналитика
        </Button>
      </div>

      {/* Контент табов */}
      {activeTab === 'tools' && (
        <div className="space-y-6">
          {/* Быстрые настройки */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Settings" size={20} />
                Быстрые настройки автоматизации
              </CardTitle>
              <CardDescription>
                Включите автоматические функции для экономии времени
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Автоскидки</h4>
                    <p className="text-sm text-gray-600">Автоматические скидки при низких продажах</p>
                  </div>
                  <Switch
                    checked={promoSettings.autoDiscount}
                    onCheckedChange={(checked) => setPromoSettings({...promoSettings, autoDiscount: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Сезонные акции</h4>
                    <p className="text-sm text-gray-600">Автоматические праздничные скидки</p>
                  </div>
                  <Switch
                    checked={promoSettings.seasonalPromotions}
                    onCheckedChange={(checked) => setPromoSettings({...promoSettings, seasonalPromotions: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Уведомления об остатках</h4>
                    <p className="text-sm text-gray-600">Алерты при низких складских остатках</p>
                  </div>
                  <Switch
                    checked={promoSettings.lowStockAlerts}
                    onCheckedChange={(checked) => setPromoSettings({...promoSettings, lowStockAlerts: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Мониторинг цен</h4>
                    <p className="text-sm text-gray-600">Отслеживание цен конкурентов</p>
                  </div>
                  <Switch
                    checked={promoSettings.priceTracking}
                    onCheckedChange={(checked) => setPromoSettings({...promoSettings, priceTracking: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Маркетинговые инструменты */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketingTools.map((tool) => (
              <Card key={tool.id} className={`relative ${tool.premium ? 'border-yellow-300' : ''}`}>
                {tool.premium && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      ⭐ PRO
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${getCategoryColor(tool.category)}`}>
                      <Icon name={tool.icon as any} size={20} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      {tool.price && (
                        <p className="text-sm font-medium text-green-600">{tool.price}</p>
                      )}
                    </div>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Возможности:</h4>
                    <ul className="space-y-1">
                      {tool.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <Icon name="Check" size={12} className="text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Результат:</h4>
                    <ul className="space-y-1">
                      {tool.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-green-700">
                          <Icon name="TrendingUp" size={12} className="text-green-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full" variant={tool.premium ? 'default' : 'outline'}>
                    {tool.premium ? 'Подключить PRO' : 'Настроить'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Mail" size={20} />
                Email-шаблоны для клиентов
              </CardTitle>
              <CardDescription>
                Готовые шаблоны писем для различных ситуаций
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {emailTemplates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription className="text-sm font-medium">
                        {template.subject}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-600 mb-4 line-clamp-6">
                        {template.content}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Просмотр
                        </Button>
                        <Button size="sm" className="flex-1">
                          Использовать
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Редактор шаблонов */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Edit" size={20} />
                Создать свой шаблон
              </CardTitle>
              <CardDescription>
                Персонализированные письма для ваших клиентов
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email-subject">Тема письма</Label>
                <Input
                  id="email-subject"
                  placeholder="Специальное предложение для вас!"
                />
              </div>
              <div>
                <Label htmlFor="email-content">Текст письма</Label>
                <Textarea
                  id="email-content"
                  value={emailTemplate}
                  onChange={(e) => setEmailTemplate(e.target.value)}
                  placeholder="Здравствуйте, {customer_name}!&#10;&#10;У нас для вас специальное предложение..."
                  rows={8}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Icon name="Eye" size={16} className="mr-2" />
                  Предпросмотр
                </Button>
                <Button>
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить шаблон
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketingInsights.map((insight, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">{insight.metric}</p>
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      {insight.trend}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{insight.value}</p>
                  <p className="text-xs text-gray-600">{insight.recommendation}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Детальная аналитика */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BarChart3" size={20} />
                Эффективность маркетинговых каналов
              </CardTitle>
              <CardDescription>
                Сравнение результативности различных инструментов продвижения
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { channel: 'Email-маркетинг', traffic: 1240, conversion: 8.3, roi: 340 },
                  { channel: 'Социальные сети', traffic: 890, conversion: 4.1, roi: 180 },
                  { channel: 'SEO-оптимизация', traffic: 2150, conversion: 12.7, roi: 520 },
                  { channel: 'Управление отзывами', traffic: 0, conversion: 0, roi: 290 }
                ].map((channel, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="font-medium text-gray-900">{channel.channel}</div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{channel.traffic || '—'}</div>
                        <div className="text-gray-600">переходов</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{channel.conversion || '—'}%</div>
                        <div className="text-gray-600">конверсия</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-green-600">{channel.roi}%</div>
                        <div className="text-gray-600">ROI</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}