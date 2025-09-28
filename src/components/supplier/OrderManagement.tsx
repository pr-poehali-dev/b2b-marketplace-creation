import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import OrderStats from './OrderStats';
import OrderFilters from './OrderFilters';
import OrderList from './OrderList';
import AutomationSettings from './AutomationSettings';
import MessageTemplates from './MessageTemplates';

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
      <OrderStats orderStats={orderStats} />

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="automation">Автоматизация</TabsTrigger>
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          {/* Фильтры и массовые действия */}
          <OrderFilters 
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            bulkActions={bulkActions}
            setBulkActions={setBulkActions}
          />

          {/* Список заказов */}
          <OrderList 
            filteredOrders={filteredOrders}
            bulkActions={bulkActions}
            handleBulkSelect={handleBulkSelect}
            handleSelectAll={handleSelectAll}
          />
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <AutomationSettings 
            automationSettings={automationSettings}
            setAutomationSettings={setAutomationSettings}
          />
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <MessageTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
}