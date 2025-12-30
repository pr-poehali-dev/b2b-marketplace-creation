import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import SupplierProductsTable from '@/components/supplier/SupplierProductsTable';
import SupplierStats from '@/components/supplier/SupplierStats';
import SupplierAddProduct from '@/components/supplier/SupplierAddProduct';

const SupplierDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="ml-56 transition-all duration-300">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Личный кабинет поставщика</h1>
            <p className="text-gray-600">Управляйте своими товарами и отслеживайте статистику</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Icon name="BarChart3" size={18} />
                Обзор
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Icon name="Package" size={18} />
                Мои товары
              </TabsTrigger>
              <TabsTrigger value="add" className="flex items-center gap-2">
                <Icon name="Plus" size={18} />
                Добавить товар
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <SupplierStats />
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Мои товары</CardTitle>
                  <CardDescription>Управление выставленными товарами</CardDescription>
                </CardHeader>
                <CardContent>
                  <SupplierProductsTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add" className="space-y-6">
              <SupplierAddProduct />
            </TabsContent>
          </Tabs>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SupplierDashboard;
