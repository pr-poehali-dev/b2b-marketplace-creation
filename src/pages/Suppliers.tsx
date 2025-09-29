import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SuppliersMap from "@/components/SuppliersMap";
import SupplierFilters from "@/components/suppliers/SupplierFilters";
import SupplierCard from "@/components/suppliers/SupplierCard";
import SupplierDetailModal from "@/components/suppliers/SupplierDetailModal";
import SupplierCategories from "@/components/suppliers/SupplierCategories";
import SupplierAnalytics from "@/components/suppliers/SupplierAnalytics";
import { suppliersData } from "@/data/suppliersData";

const Suppliers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const [regionFilter, setRegionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const suppliers = suppliersData;

  // Статистика по поставщикам
  const supplierStats = {
    total: suppliers.length,
    verified: suppliers.filter(s => s.verified).length,
    categories: [...new Set(suppliers.map(s => s.category))].length,
    regions: [...new Set(suppliers.map(s => s.region))].length,

    totalProducts: suppliers.reduce((sum, s) => sum + s.products, 0)
  };

  // Фильтрация и сортировка поставщиков
  const filteredSuppliers = suppliers
    .filter(supplier => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           supplier.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || supplier.category === categoryFilter;
      const matchesVerified = !verifiedOnly || supplier.verified;
      const matchesRating = true;
      const matchesRegion = regionFilter === "all" || supplier.region === regionFilter;
      
      return matchesSearch && matchesCategory && matchesVerified && matchesRating && matchesRegion;
    })
    .sort((a, b) => {
      switch (sortBy) {

        case "products":
          return b.products - a.products;
        case "experience":
          return b.experience - a.experience;

        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Получить уникальные категории и регионы
  const categories = [...new Set(suppliers.map(s => s.category))];
  const regions = [...new Set(suppliers.map(s => s.region))];

  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setVerifiedOnly(false);

    setRegionFilter("all");
    setSortBy("name");
  };

  const handleCategorySelect = (category: string) => {
    setCategoryFilter(category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="ml-56 transition-all duration-300">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 mb-8">
            <h1 className="text-4xl font-bold mb-4">База поставщиков Business Market</h1>
            <p className="text-xl mb-6 text-blue-100">
              Найдите надежных партнеров среди {supplierStats.total} проверенных поставщиков
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{supplierStats.verified}</div>
                <div className="text-sm text-blue-100">Верифицированных</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{supplierStats.categories}</div>
                <div className="text-sm text-blue-100">Категорий товаров</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{supplierStats.regions}</div>
                <div className="text-sm text-blue-100">Регионов</div>
              </div>

            </div>
          </div>

          <Tabs defaultValue="suppliers" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
              <TabsTrigger value="suppliers" className="flex items-center">
                <Icon name="Users" size={16} className="mr-2" />
                Поставщики
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center">
                <Icon name="Grid3x3" size={16} className="mr-2" />
                Категории
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center">
                <Icon name="MapPin" size={16} className="mr-2" />
                Карта
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center">
                <Icon name="BarChart3" size={16} className="mr-2" />
                Аналитика
              </TabsTrigger>
            </TabsList>

            {/* Suppliers Tab */}
            <TabsContent value="suppliers">
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Боковая панель с фильтрами */}
                <div className="lg:col-span-1">
                  <SupplierFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    verifiedOnly={verifiedOnly}
                    setVerifiedOnly={setVerifiedOnly}

                    regionFilter={regionFilter}
                    setRegionFilter={setRegionFilter}
                    categories={categories}
                    regions={regions}
                    onResetFilters={resetFilters}
                  />
                </div>

                {/* Основной контент */}
                <div className="lg:col-span-3">
                  {/* Панель сортировки */}
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                      Найдено поставщиков: <span className="font-semibold">{filteredSuppliers.length}</span>
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Сортировать:</span>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">По названию</SelectItem>

                          <SelectItem value="products">По количеству товаров</SelectItem>
                          <SelectItem value="experience">По опыту работы</SelectItem>

                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Список поставщиков */}
                  {filteredSuppliers.length > 0 ? (
                    <div className="space-y-6">
                      {filteredSuppliers.map((supplier) => (
                        <SupplierCard
                          key={supplier.id}
                          supplier={supplier}
                          onViewDetails={setSelectedSupplier}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card className="text-center py-12">
                      <CardContent>
                        <Icon name="Search" size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Поставщики не найдены</h3>
                        <p className="text-gray-600 mb-4">
                          Попробуйте изменить параметры поиска или фильтры
                        </p>
                        <Button onClick={resetFilters}>
                          Сбросить все фильтры
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories">
              <SupplierCategories
                suppliers={suppliers}
                categories={categories}
                onCategorySelect={handleCategorySelect}
              />
            </TabsContent>

            {/* Map Tab */}
            <TabsContent value="map">
              <SuppliersMap suppliers={filteredSuppliers} />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <SupplierAnalytics
                suppliers={suppliers}
                regions={regions}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <Footer />
      </div>
      
      {/* Supplier Detail Modal */}
      {selectedSupplier && (
        <SupplierDetailModal 
          supplier={selectedSupplier} 
          onClose={() => setSelectedSupplier(null)} 
        />
      )}
    </div>
  );
};

export default Suppliers;