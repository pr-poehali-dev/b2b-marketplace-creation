import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  status: 'new' | 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
  shippingAddress: string;
  trackingNumber?: string;
  priority: 'low' | 'medium' | 'high';
  paymentStatus: 'pending' | 'paid' | 'refunded';
}

interface OrderManagementProps {
  className?: string;
}

export default function OrderManagement({ className = "" }: OrderManagementProps) {
  const [selectedTab, setSelectedTab] = useState('orders');
  const [filterStatus, setFilterStatus] = useState('all');
  const [automationSettings, setAutomationSettings] = useState({
    autoConfirm: true,
    autoShipping: false,
    autoMessages: true,
    lowStockAlerts: true,
    rushOrderAlerts: true
  });

  const [bulkActions, setBulkActions] = useState({
    selectedOrders: new Set<string>(),
    action: ''
  });

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: '#ORD-2024-001',
      customer: {
        name: 'Иван Петров',
        phone: '+7 (999) 123-45-67',
        email: 'ivan.petrov@example.com'
      },
      items: [
        { name: 'Смартфон iPhone 15', quantity: 1, price: 79990, image: '/api/placeholder/60/60' },
        { name: 'Чехол для iPhone', quantity: 2, price: 1990, image: '/api/placeholder/60/60' }
      ],
      status: 'new',
      total: 83970,
      createdAt: '2024-09-21T10:30:00Z',
      shippingAddress: 'Москва, ул. Ленина, д. 123, кв. 45',
      priority: 'high',
      paymentStatus: 'paid'
    },
    {
      id: '2',
      orderNumber: '#ORD-2024-002',
      customer: {
        name: 'Мария Сидорова',
        phone: '+7 (999) 234-56-78',
        email: 'maria.sidorova@example.com'
      },
      items: [
        { name: 'Ноутбук MacBook Air', quantity: 1, price: 124990, image: '/api/placeholder/60/60' }
      ],
      status: 'processing',
      total: 124990,
      createdAt: '2024-09-21T09:15:00Z',
      shippingAddress: 'СПб, пр. Невский, д. 45, оф. 12',
      trackingNumber: 'TRK123456789',
      priority: 'medium',
      paymentStatus: 'paid'
    },
    {
      id: '3',
      orderNumber: '#ORD-2024-003',
      customer: {
        name: 'Алексей Кузнецов',
        phone: '+7 (999) 345-67-89',
        email: 'alex.kuznetsov@example.com'
      },
      items: [
        { name: 'Наушники AirPods Pro', quantity: 1, price: 24990, image: '/api/placeholder/60/60' },
        { name: 'Зарядка MagSafe', quantity: 1, price: 4990, image: '/api/placeholder/60/60' }
      ],
      status: 'shipped',
      total: 29980,
      createdAt: '2024-09-20T16:45:00Z',
      shippingAddress: 'Екатеринбург, ул. Мира, д. 67, кв. 89',
      trackingNumber: 'TRK987654321',
      priority: 'low',
      paymentStatus: 'paid'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-emerald-100 text-emerald-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'packed': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'processing': return 'В обработке';
      case 'packed': return 'Упакован';
      case 'shipped': return 'Отправлен';
      case 'delivered': return 'Доставлен';
      case 'cancelled': return 'Отменен';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  );

  const handleBulkSelect = (orderId: string, checked: boolean) => {
    const newSelected = new Set(bulkActions.selectedOrders);
    if (checked) {
      newSelected.add(orderId);
    } else {
      newSelected.delete(orderId);
    }
    setBulkActions({ ...bulkActions, selectedOrders: newSelected });
  };

  const handleSelectAll = () => {
    const allIds = filteredOrders.map(order => order.id);
    const newSelected = bulkActions.selectedOrders.size === allIds.length 
      ? new Set<string>() 
      : new Set(allIds);
    setBulkActions({ ...bulkActions, selectedOrders: newSelected });
  };

  const orderStats = {
    new: orders.filter(o => o.status === 'new').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    total: orders.length
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Заголовок */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Управление заказами</h2>
          <p className="text-gray-600">Обрабатывайте заказы быстро и эффективно</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт
          </Button>
          <Button>
            <Icon name="Plus" size={16} className="mr-2" />
            Создать заказ
          </Button>
        </div>
      </div>

      {/* Статистика заказов */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Новые заказы</p>
                <p className="text-2xl font-bold text-emerald-700">{orderStats.new}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Icon name="ShoppingCart" size={20} className="text-emerald-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">В обработке</p>
                <p className="text-2xl font-bold text-yellow-600">{orderStats.processing}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Icon name="Clock" size={20} className="text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Отправлено</p>
                <p className="text-2xl font-bold text-orange-600">{orderStats.shipped}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Icon name="Truck" size={20} className="text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Всего заказов</p>
                <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Icon name="Package" size={20} className="text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="automation">Автоматизация</TabsTrigger>
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          {/* Фильтры и массовые действия */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="status-filter">Статус:</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все заказы</SelectItem>
                      <SelectItem value="new">Новые</SelectItem>
                      <SelectItem value="processing">В обработке</SelectItem>
                      <SelectItem value="shipped">Отправленные</SelectItem>
                      <SelectItem value="delivered">Доставленные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Input placeholder="Поиск по номеру заказа..." className="w-60" />
                  <Button variant="outline" size="sm">
                    <Icon name="Search" size={16} />
                  </Button>
                </div>

                {bulkActions.selectedOrders.size > 0 && (
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-gray-600">
                      Выбрано: {bulkActions.selectedOrders.size}
                    </span>
                    <Select onValueChange={(value) => setBulkActions({...bulkActions, action: value})}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Массовые действия" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confirm">Подтвердить заказы</SelectItem>
                        <SelectItem value="pack">Отметить упакованными</SelectItem>
                        <SelectItem value="ship">Отправить</SelectItem>
                        <SelectItem value="cancel">Отменить</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm">Применить</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Список заказов */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Заказы</CardTitle>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={bulkActions.selectedOrders.size === filteredOrders.length && filteredOrders.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                  <Label className="text-sm">Выбрать все</Label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={bulkActions.selectedOrders.has(order.id)}
                        onChange={(e) => handleBulkSelect(order.id, e.target.checked)}
                        className="mt-1 rounded"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                            <Badge className={getPriorityColor(order.priority)}>
                              {order.priority === 'high' && '🔥'} 
                              {order.priority === 'medium' && '⚡'} 
                              {order.priority === 'low' && '📋'}
                              {order.priority === 'high' ? 'Срочно' : 
                               order.priority === 'medium' ? 'Средний' : 'Обычный'}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">{order.total.toLocaleString()} ₽</p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Покупатель:</h4>
                            <p className="text-sm text-gray-700">{order.customer.name}</p>
                            <p className="text-sm text-gray-600">{order.customer.phone}</p>
                            <p className="text-sm text-gray-600">{order.customer.email}</p>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Товары:</h4>
                            <div className="space-y-1">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
                                  <span className="text-sm text-gray-700">
                                    {item.name} × {item.quantity}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Доставка:</h4>
                            <p className="text-sm text-gray-700">{order.shippingAddress}</p>
                            {order.trackingNumber && (
                              <p className="text-sm text-emerald-700 mt-1">
                                Трек-номер: {order.trackingNumber}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-3 border-t">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Icon name="MessageSquare" size={14} className="mr-1" />
                              Чат
                            </Button>
                            <Button size="sm" variant="outline">
                              <Icon name="Phone" size={14} className="mr-1" />
                              Позвонить
                            </Button>
                          </div>

                          <div className="flex items-center gap-2">
                            {order.status === 'new' && (
                              <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800">
                                <Icon name="Check" size={14} className="mr-1" />
                                Подтвердить
                              </Button>
                            )}
                            {order.status === 'processing' && (
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                <Icon name="Package" size={14} className="mr-1" />
                                Упаковать
                              </Button>
                            )}
                            {order.status === 'packed' && (
                              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                <Icon name="Truck" size={14} className="mr-1" />
                                Отправить
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Icon name="MoreHorizontal" size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="FileText" size={20} />
                Шаблоны сообщений
              </CardTitle>
              <CardDescription>
                Готовые шаблоны для общения с клиентами
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Подтверждение заказа',
                    text: 'Здравствуйте! Ваш заказ #{orderNumber} принят в работу. Ожидаемое время выполнения: 1-2 дня.',
                    category: 'confirmation'
                  },
                  {
                    title: 'Заказ готов к отправке',
                    text: 'Отличные новости! Ваш заказ #{orderNumber} упакован и готов к отправке. Трек-номер: {trackingNumber}',
                    category: 'shipping'
                  },
                  {
                    title: 'Извинения за задержку',
                    text: 'Приносим извинения за задержку заказа #{orderNumber}. Новая дата отправки: {newDate}. Спасибо за понимание!',
                    category: 'delay'
                  },
                  {
                    title: 'Запрос отзыва',
                    text: 'Здравствуйте! Как вам товар из заказа #{orderNumber}? Будем благодарны за отзыв на нашем сайте.',
                    category: 'review'
                  }
                ].map((template, index) => (
                  <Card key={index} className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardContent className="pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">{template.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{template.text}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Изменить</Button>
                        <Button size="sm">Использовать</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}