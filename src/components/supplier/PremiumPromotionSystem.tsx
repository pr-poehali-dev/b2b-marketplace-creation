import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface PremiumPromotion {
  id: string;
  name: string;
  description: string;
  tier: 'basic' | 'professional' | 'enterprise';
  type: 'priority' | 'exclusive' | 'branding' | 'analytics';
  price: number;
  features: string[];
  benefits: string[];
  metrics: {
    impressions?: number;
    clicks?: number;
    conversions?: number;
    roi?: number;
  };
  active: boolean;
}

interface PremiumPromotionSystemProps {
  currentTier: 'starter' | 'basic' | 'professional' | 'enterprise';
  className?: string;
}

export default function PremiumPromotionSystem({ 
  currentTier = 'basic',
  className = "" 
}: PremiumPromotionSystemProps) {
  const [activeTab, setActiveTab] = useState('promotions');
  const [selectedPromotion, setSelectedPromotion] = useState<string | null>(null);

  const tierBenefits = {
    starter: {
      name: 'Стартовый',
      color: 'bg-gray-100 text-gray-800',
      promotions: []
    },
    basic: {
      name: 'Базовый', 
      color: 'bg-blue-100 text-blue-800',
      promotions: ['priority-search', 'email-promotion']
    },
    professional: {
      name: 'Профессиональный',
      color: 'bg-purple-100 text-purple-800', 
      promotions: ['priority-search', 'email-promotion', 'banner-ads', 'category-highlight', 'brand-page']
    },
    enterprise: {
      name: 'Корпоративный',
      color: 'bg-gold-100 text-gold-800',
      promotions: ['priority-search', 'email-promotion', 'banner-ads', 'category-highlight', 'brand-page', 'homepage-feature', 'exclusive-deals', 'white-label']
    }
  };

  const premiumPromotions: PremiumPromotion[] = [
    {
      id: 'priority-search',
      name: 'Приоритет в поиске',
      description: 'Ваши товары показываются первыми в результатах поиска',
      tier: 'basic',
      type: 'priority',
      price: 0, // Включено в тариф
      features: [
        'Первые 3 позиции в поиске',
        'Выделение цветом',
        'Метка "Рекомендуем"',
        'Автоматическая активация'
      ],
      benefits: [
        '+300% кликов',
        '+150% продаж', 
        'Больше узнаваемости'
      ],
      metrics: {
        impressions: 15420,
        clicks: 2380,
        conversions: 187,
        roi: 340
      },
      active: true
    },
    {
      id: 'email-promotion',
      name: 'Email-рассылки клиентам',
      description: 'Ваши товары в персональных рекомендациях покупателям',
      tier: 'basic',
      type: 'exclusive',
      price: 0,
      features: [
        'Включение в еженедельные рассылки',
        'Персональные рекомендации',
        'Сегментация по интересам',
        'A/B тестирование писем'
      ],
      benefits: [
        '+80% повторных покупок',
        'Увеличение среднего чека',
        'Лояльность клиентов'
      ],
      metrics: {
        impressions: 45600,
        clicks: 1230,
        conversions: 98,
        roi: 280
      },
      active: true
    },
    {
      id: 'banner-ads',
      name: 'Баннерная реклама',
      description: 'Ваши товары в премиум-местах на сайте',
      tier: 'professional',
      type: 'exclusive',
      price: 2990,
      features: [
        'Баннеры на главной странице',
        'Сайдбар в каталоге',
        'Межстраничные баннеры',
        'Мобильная реклама'
      ],
      benefits: [
        'Максимальный охват',
        '+500% показов',
        'Брендинг компании'
      ],
      metrics: {
        impressions: 234000,
        clicks: 8900,
        conversions: 567,
        roi: 450
      },
      active: false
    },
    {
      id: 'category-highlight',
      name: 'Выделение в категориях',
      description: 'Специальное оформление ваших товаров в каталоге',
      tier: 'professional',
      type: 'branding',
      price: 0,
      features: [
        'Золотая рамка товаров',
        'Метка "Premium партнер"',
        'Увеличенные превью',
        'Приоритетная загрузка'
      ],
      benefits: [
        'Премиум восприятие',
        '+40% CTR',
        'Выделение среди конкурентов'
      ],
      metrics: {
        impressions: 89000,
        clicks: 3560,
        conversions: 245,
        roi: 320
      },
      active: true
    },
    {
      id: 'brand-page',
      name: 'Персональная страница бренда',
      description: 'Индивидуальная страница с вашими товарами и брендингом',
      tier: 'professional',
      type: 'branding',
      price: 0,
      features: [
        'Собственный URL /brand/ваш-бренд',
        'Индивидуальный дизайн',
        'Описание компании',
        'Контактная информация',
        'Каталог всех товаров'
      ],
      benefits: [
        'Профессиональный имидж',
        'SEO-продвижение бренда',
        'Прямые ссылки на товары'
      ],
      metrics: {
        impressions: 12400,
        clicks: 890,
        conversions: 67,
        roi: 180
      },
      active: true
    },
    {
      id: 'homepage-feature',
      name: 'Размещение на главной',
      description: 'Ваши товары в блоке "Рекомендуем" на главной странице',
      tier: 'enterprise',
      type: 'exclusive',
      price: 9990,
      features: [
        'Слайдер на главной странице',
        'Блок "Товар дня"',
        'Новинки от партнера',
        'Ротация каждые 2 часа'
      ],
      benefits: [
        'Максимальная видимость',
        '+1000% трафика',
        'Имидж топ-партнера'
      ],
      metrics: {
        impressions: 567000,
        clicks: 23400,
        conversions: 1890,
        roi: 650
      },
      active: false
    },
    {
      id: 'exclusive-deals',
      name: 'Эксклюзивные акции',
      description: 'Специальные предложения только для ваших товаров',
      tier: 'enterprise',
      type: 'exclusive',
      price: 0,
      features: [
        'Персональные промокоды',
        'Флэш-распродажи',
        'VIP-предзаказы',
        'Эксклюзивная рассылка'
      ],
      benefits: [
        'Уникальные предложения',
        '+200% конверсии',
        'Лояльная аудитория'
      ],
      metrics: {
        impressions: 78000,
        clicks: 4200,
        conversions: 890,
        roi: 780
      },
      active: true
    }
  ];

  const availablePromotions = premiumPromotions.filter(promo => 
    tierBenefits[currentTier].promotions.includes(promo.id)
  );

  const lockedPromotions = premiumPromotions.filter(promo => 
    !tierBenefits[currentTier].promotions.includes(promo.id)
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'priority': return 'TrendingUp';
      case 'exclusive': return 'Star';
      case 'branding': return 'Award';
      case 'analytics': return 'BarChart3';
      default: return 'Zap';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'priority': return 'bg-blue-100 text-blue-800';
      case 'exclusive': return 'bg-purple-100 text-purple-800';
      case 'branding': return 'bg-green-100 text-green-800';
      case 'analytics': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierUpgradePromotions = () => {
    const nextTiers = {
      starter: 'basic',
      basic: 'professional', 
      professional: 'enterprise',
      enterprise: 'enterprise'
    };
    
    const nextTier = nextTiers[currentTier] as keyof typeof tierBenefits;
    if (nextTier === currentTier) return [];
    
    return premiumPromotions.filter(promo => 
      tierBenefits[nextTier].promotions.includes(promo.id) &&
      !tierBenefits[currentTier].promotions.includes(promo.id)
    );
  };

  const upgradePromotions = getTierUpgradePromotions();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Заголовок */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Премиум продвижение</h2>
          <p className="text-gray-600">Эксклюзивные возможности для вашего тарифа</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={tierBenefits[currentTier].color}>
            {tierBenefits[currentTier].name} тариф
          </Badge>
          <Button>
            <Icon name="Crown" size={16} className="mr-2" />
            Повысить тариф
          </Button>
        </div>
      </div>

      {/* Статистика эффективности */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Общие показы</p>
                <p className="text-2xl font-bold text-blue-600">
                  {availablePromotions.reduce((sum, p) => sum + (p.metrics.impressions || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Icon name="Eye" size={20} className="text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Клики</p>
                <p className="text-2xl font-bold text-green-600">
                  {availablePromotions.reduce((sum, p) => sum + (p.metrics.clicks || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Icon name="MousePointer" size={20} className="text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Конверсии</p>
                <p className="text-2xl font-bold text-purple-600">
                  {availablePromotions.reduce((sum, p) => sum + (p.metrics.conversions || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Icon name="ShoppingCart" size={20} className="text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Средний ROI</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(
                    availablePromotions.reduce((sum, p) => sum + (p.metrics.roi || 0), 0) / 
                    availablePromotions.length
                  )}%
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Icon name="TrendingUp" size={20} className="text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Рекомендация по апгрейду */}
      {upgradePromotions.length > 0 && (
        <Card className="border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Icon name="Crown" size={24} className="text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold text-yellow-900 text-lg">
                    🚀 Получите {upgradePromotions.length} новых инструментов продвижения!
                  </h3>
                  <p className="text-yellow-700 mt-1">
                    Повысьте тариф и получите доступ к эксклюзивным форматам рекламы
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    {upgradePromotions.slice(0, 3).map((promo, index) => (
                      <Badge key={index} className="bg-yellow-200 text-yellow-800">
                        {promo.name}
                      </Badge>
                    ))}
                    {upgradePromotions.length > 3 && (
                      <span className="text-sm text-yellow-700">+{upgradePromotions.length - 3} еще</span>
                    )}
                  </div>
                </div>
              </div>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                Повысить тариф
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="promotions">Доступные инструменты</TabsTrigger>
          <TabsTrigger value="performance">Эффективность</TabsTrigger>
          <TabsTrigger value="upgrade">Что получу при апгрейде</TabsTrigger>
        </TabsList>

        <TabsContent value="promotions" className="space-y-4">
          {/* Доступные инструменты */}
          {availablePromotions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Zap" size={20} />
                  Активные инструменты продвижения
                </CardTitle>
                <CardDescription>
                  Инструменты, доступные на вашем тарифе "{tierBenefits[currentTier].name}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {availablePromotions.map((promotion) => (
                    <Card key={promotion.id} className="border-2 border-green-200 bg-green-50">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getTypeColor(promotion.type)}`}>
                              <Icon name={getTypeIcon(promotion.type) as any} size={18} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{promotion.name}</CardTitle>
                              <Badge className="bg-green-100 text-green-800 mt-1">
                                ✅ Активно
                              </Badge>
                            </div>
                          </div>
                          <Switch checked={promotion.active} />
                        </div>
                        <CardDescription>{promotion.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Возможности:</h4>
                          <ul className="space-y-1">
                            {promotion.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <Icon name="Check" size={12} className="text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Результаты:</h4>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="text-center p-2 bg-blue-50 rounded">
                              <div className="font-bold text-blue-600">{promotion.metrics.impressions?.toLocaleString()}</div>
                              <div className="text-blue-700">показов</div>
                            </div>
                            <div className="text-center p-2 bg-green-50 rounded">
                              <div className="font-bold text-green-600">{promotion.metrics.clicks?.toLocaleString()}</div>
                              <div className="text-green-700">кликов</div>
                            </div>
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <div className="font-bold text-purple-600">{promotion.metrics.conversions}</div>
                              <div className="text-purple-700">продаж</div>
                            </div>
                            <div className="text-center p-2 bg-orange-50 rounded">
                              <div className="font-bold text-orange-600">{promotion.metrics.roi}%</div>
                              <div className="text-orange-700">ROI</div>
                            </div>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full">
                          <Icon name="Settings" size={16} className="mr-2" />
                          Настроить
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Заблокированные инструменты */}
          {lockedPromotions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Lock" size={20} />
                  Доступно на более высоких тарифах
                </CardTitle>
                <CardDescription>
                  Эти инструменты станут доступны при повышении тарифа
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {lockedPromotions.map((promotion) => (
                    <Card key={promotion.id} className="border-2 border-gray-200 bg-gray-50 opacity-75">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gray-200">
                              <Icon name="Lock" size={18} className="text-gray-500" />
                            </div>
                            <div>
                              <CardTitle className="text-lg text-gray-700">{promotion.name}</CardTitle>
                              <Badge className="bg-gray-200 text-gray-600 mt-1">
                                Требует {promotion.tier === 'professional' ? 'Профессиональный' : 'Корпоративный'} тариф
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <CardDescription className="text-gray-600">{promotion.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Что получите:</h4>
                          <ul className="space-y-1">
                            {promotion.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <Icon name="Star" size={12} className="text-yellow-500" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button className="w-full">
                          <Icon name="Crown" size={16} className="mr-2" />
                          Повысить тариф
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BarChart3" size={20} />
                Эффективность инструментов продвижения
              </CardTitle>
              <CardDescription>
                Сравнение результативности различных форматов рекламы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {availablePromotions.map((promotion, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">{promotion.name}</h4>
                      <Badge className={getTypeColor(promotion.type)}>
                        ROI: {promotion.metrics.roi}%
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {promotion.metrics.impressions?.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Показы</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {promotion.metrics.clicks?.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Клики</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {promotion.metrics.conversions}
                        </div>
                        <div className="text-sm text-gray-600">Продажи</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {promotion.metrics.roi}%
                        </div>
                        <div className="text-sm text-gray-600">ROI</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>CTR (кликабельность)</span>
                        <span>{((promotion.metrics.clicks! / promotion.metrics.impressions!) * 100).toFixed(2)}%</span>
                      </div>
                      <Progress 
                        value={(promotion.metrics.clicks! / promotion.metrics.impressions!) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upgrade" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Crown" size={20} />
                Что получите при повышении тарифа
              </CardTitle>
              <CardDescription>
                Дополнительные инструменты продвижения на более высоких тарифах
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upgradePromotions.length > 0 ? (
                <div className="space-y-6">
                  {upgradePromotions.map((promotion) => (
                    <div key={promotion.id} className="border-2 border-yellow-300 rounded-lg p-4 bg-yellow-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-yellow-100 rounded-lg">
                            <Icon name={getTypeIcon(promotion.type) as any} size={20} className="text-yellow-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-yellow-900">{promotion.name}</h4>
                            <p className="text-sm text-yellow-700">{promotion.description}</p>
                          </div>
                        </div>
                        <Badge className="bg-yellow-200 text-yellow-800">
                          Новое!
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-yellow-900 mb-2">Возможности:</h5>
                          <ul className="space-y-1">
                            {promotion.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-yellow-700">
                                <Icon name="Star" size={12} className="text-yellow-600" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium text-yellow-900 mb-2">Ожидаемые результаты:</h5>
                          <ul className="space-y-1">
                            {promotion.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-yellow-700">
                                <Icon name="TrendingUp" size={12} className="text-yellow-600" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="text-center pt-4">
                    <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700">
                      <Icon name="Crown" size={20} className="mr-2" />
                      Повысить тариф и получить все инструменты
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="p-4 bg-green-100 rounded-lg inline-block mb-4">
                    <Icon name="Crown" size={48} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    🎉 У вас максимальный тариф!
                  </h3>
                  <p className="text-green-700">
                    Вы имеете доступ ко всем инструментам продвижения на платформе
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}