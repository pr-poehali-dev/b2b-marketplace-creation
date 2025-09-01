import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SuppliersMap from "@/components/SuppliersMap";

const Suppliers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [regionFilter, setRegionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [activeView, setActiveView] = useState("list");
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Расширенная база поставщиков с дополнительными данными
  const suppliers = [
    {
      id: 1,
      name: "ООО «Металл-Трейд»",
      inn: "7701234567",
      ogrn: "1027700123456",
      logo: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Металлопрокат",
      region: "Москва",
      verified: true,
      rating: 4.9,
      reviewsCount: 156,
      products: 350,
      experience: 12,
      foundedYear: 2012,
      description: "Крупнейший поставщик металлопроката в России. Широкий ассортимент стальных труб, листового металла и арматуры.",
      specializations: ["Трубы стальные", "Листовой металл", "Арматура"],
      minOrder: 500000,
      phone: "+7 (495) 123-45-67",
      email: "info@metall-trade.ru",
      website: "www.metall-trade.ru",
      address: "Москва, ул. Промышленная, 15",
      warehouse: "3 склада в МО",
      employeesCount: 85,
      monthlyOrders: 340,
      certifications: ["ISO 9001", "ISO 14001", "ГОСТ Р"],
      paymentMethods: ["Безналичный", "Аккредитив", "Факторинг"],
      deliveryRegions: ["Москва", "МО", "Центральный ФО"],
      workingHours: "Пн-Пт: 9:00-18:00",
      benefits: ["Скидки постоянным клиентам", "Бесплатная доставка от 1 млн", "Отсрочка до 30 дней"],
      recentNews: [
        { date: "2024-08-15", title: "Запуск нового склада в Подольске", type: "expansion" },
        { date: "2024-07-20", title: "Получен сертификат ISO 14001", type: "certification" }
      ]
    },
    {
      id: 2,
      name: "АО «СтройБаза Регион»",
      inn: "7812345678",
      ogrn: "1027812345678",
      logo: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Стройматериалы",
      region: "Санкт-Петербург",
      verified: true,
      rating: 4.8,
      reviewsCount: 203,
      products: 520,
      experience: 8,
      foundedYear: 2016,
      description: "Надежный партнер в области строительных материалов. Цемент, бетон, кирпич и другие материалы высокого качества.",
      specializations: ["Цемент", "Бетонные смеси", "Кирпич"],
      minOrder: 200000,
      phone: "+7 (812) 987-65-43",
      email: "orders@stroybaza.ru",
      website: "www.stroybaza.ru",
      address: "СПб, Индустриальный пр., 25",
      warehouse: "2 склада в СПб",
      employeesCount: 45,
      monthlyOrders: 180,
      certifications: ["ГОСТ Р", "СТО"],
      paymentMethods: ["Безналичный", "НДС зачет"],
      deliveryRegions: ["СПб", "ЛО", "СЗФО"],
      workingHours: "Пн-Пт: 8:00-17:00",
      benefits: ["Прямые поставки с заводов", "Техническая поддержка", "Проектные расчеты"],
      recentNews: [
        { date: "2024-08-01", title: "Новые поставки кирпича от ЛСР", type: "product" },
        { date: "2024-07-10", title: "Расширение географии доставки", type: "logistics" }
      ]
    },
    {
      id: 3,
      name: "ИП Электроника-Опт",
      inn: "5423456789",
      ogrn: "",
      logo: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Электроника",
      region: "Новосибирск",
      verified: false,
      rating: 4.6,
      reviewsCount: 89,
      products: 180,
      experience: 5,
      foundedYear: 2019,
      description: "Оптовые поставки электронных компонентов и радиодеталей. Микроконтроллеры, платы, датчики.",
      specializations: ["Arduino", "Raspberry Pi", "Датчики"],
      minOrder: 50000,
      phone: "+7 (383) 555-12-34",
      email: "sales@electronika-opt.ru",
      website: "www.electronika-opt.ru",
      address: "Новосибирск, ул. Электронная, 7",
      warehouse: "1 склад",
      employeesCount: 8,
      monthlyOrders: 120,
      certifications: ["РСТ"],
      paymentMethods: ["Безналичный", "Предоплата"],
      deliveryRegions: ["Новосибирск", "Сибирский ФО"],
      workingHours: "Пн-Пт: 10:00-19:00",
      benefits: ["Быстрая отгрузка", "Техподдержка", "Индивидуальные решения"],
      recentNews: [
        { date: "2024-07-25", title: "Новая линейка Arduino модулей", type: "product" }
      ]
    },
    {
      id: 4,
      name: "ООО «Кровля-Проф»",
      inn: "6634567890",
      ogrn: "1026634567890",
      logo: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Стройматериалы",
      region: "Екатеринбург",
      verified: true,
      rating: 4.7,
      reviewsCount: 134,
      products: 280,
      experience: 15,
      foundedYear: 2009,
      description: "Специализация на кровельных материалах и системах. Профнастил, металлочерепица, водосточные системы.",
      specializations: ["Профнастил", "Металлочерепица", "Водостоки"],
      minOrder: 300000,
      phone: "+7 (343) 222-33-44",
      email: "info@krovlya-prof.ru",
      website: "www.krovlya-prof.ru",
      address: "Екатеринбург, ул. Кровельная, 42",
      warehouse: "1 основной склад",
      employeesCount: 32,
      monthlyOrders: 95,
      certifications: ["ГОСТ Р", "ISO 9001"],
      paymentMethods: ["Безналичный", "Рассрочка"],
      deliveryRegions: ["Екатеринбург", "Свердловская обл.", "УрФО"],
      workingHours: "Пн-Пт: 8:00-17:00, Сб: 9:00-15:00",
      benefits: ["Собственное производство", "Гарантия 10 лет", "Монтажные работы"],
      recentNews: [
        { date: "2024-08-10", title: "Новая линия металлочерепицы", type: "product" },
        { date: "2024-06-15", title: "Открытие представительства в Тюмени", type: "expansion" }
      ]
    }
  ];

  // Статистика по поставщикам
  const supplierStats = {
    total: suppliers.length,
    verified: suppliers.filter(s => s.verified).length,
    categories: [...new Set(suppliers.map(s => s.category))].length,
    regions: [...new Set(suppliers.map(s => s.region))].length,
    averageRating: (suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1),
    totalProducts: suppliers.reduce((sum, s) => sum + s.products, 0)
  };

  // Фильтрация и сортировка поставщиков
  const filteredSuppliers = suppliers
    .filter(supplier => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           supplier.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || supplier.category === categoryFilter;
      const matchesVerified = !verifiedOnly || supplier.verified;
      const matchesRating = supplier.rating >= ratingRange[0] && supplier.rating <= ratingRange[1];
      const matchesRegion = regionFilter === "all" || supplier.region === regionFilter;
      
      return matchesSearch && matchesCategory && matchesVerified && matchesRating && matchesRegion;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "products":
          return b.products - a.products;
        case "experience":
          return b.experience - a.experience;
        case "reviews":
          return b.reviewsCount - a.reviewsCount;
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
    setRatingRange([0, 5]);
    setRegionFilter("all");
    setSortBy("name");
  };

  const SupplierDetailModal = ({ supplier, onClose }) => {
    if (!supplier) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={supplier.logo} alt={supplier.name} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{supplier.name}</h2>
                <p className="text-gray-600">{supplier.category} • {supplier.region}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
          
          <div className="p-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="products">Товары</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                <TabsTrigger value="documents">Документы</TabsTrigger>
                <TabsTrigger value="contact">Контакты</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Star" size={20} className="text-yellow-500" />
                        <span className="font-semibold text-lg">{supplier.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600">{supplier.reviewsCount} отзывов</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Package" size={20} className="text-blue-500" />
                        <span className="font-semibold text-lg">{supplier.products}</span>
                      </div>
                      <p className="text-sm text-gray-600">Товарных позиций</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Calendar" size={20} className="text-green-500" />
                        <span className="font-semibold text-lg">{supplier.experience}</span>
                      </div>
                      <p className="text-sm text-gray-600">Лет на рынке</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">О компании</h3>
                    <p className="text-gray-700">{supplier.description}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Основная информация</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Год основания:</span>
                          <span>{supplier.foundedYear}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Сотрудников:</span>
                          <span>{supplier.employeesCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Заказов в месяц:</span>
                          <span>{supplier.monthlyOrders}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Мин. заказ:</span>
                          <span>{supplier.minOrder.toLocaleString()} ₽</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Преимущества</h4>
                      <ul className="space-y-1 text-sm">
                        {supplier.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Icon name="Check" size={14} className="text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Контактная информация</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Icon name="Phone" size={16} />
                        <span>{supplier.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon name="Mail" size={16} />
                        <span>{supplier.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon name="Globe" size={16} />
                        <span>{supplier.website}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="MapPin" size={16} className="mt-1" />
                        <span>{supplier.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon name="Clock" size={16} />
                        <span>{supplier.workingHours}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Реквизиты</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">ИНН:</span>
                        <span>{supplier.inn}</span>
                      </div>
                      {supplier.ogrn && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">ОГРН:</span>
                          <span>{supplier.ogrn}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Регион доставки:</span>
                        <span>{supplier.deliveryRegions.join(", ")}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
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
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{supplierStats.averageRating}</div>
                <div className="text-sm text-blue-100">Средний рейтинг</div>
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
                  <Card className="sticky top-4">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                          <Icon name="Filter" size={20} className="mr-2" />
                          Фильтры
                        </span>
                        <Button variant="ghost" size="sm" onClick={resetFilters}>
                          <Icon name="RotateCcw" size={16} />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Поиск */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Поиск</label>
                        <Input
                          placeholder="Название или описание..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>

                      {/* Категория */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Категория</label>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Все категории" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все категории</SelectItem>
                            {categories.map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Регион */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Регион</label>
                        <Select value={regionFilter} onValueChange={setRegionFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Все регионы" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все регионы</SelectItem>
                            {regions.map(region => (
                              <SelectItem key={region} value={region}>{region}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Рейтинг */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Рейтинг: {ratingRange[0]} - {ratingRange[1]}
                        </label>
                        <Slider
                          value={ratingRange}
                          onValueChange={setRatingRange}
                          max={5}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                      </div>

                      {/* Верифицированные */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="verified"
                          checked={verifiedOnly}
                          onCheckedChange={setVerifiedOnly}
                        />
                        <label htmlFor="verified" className="text-sm font-medium">
                          Только верифицированные
                        </label>
                      </div>
                    </CardContent>
                  </Card>
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
                          <SelectItem value="rating">По рейтингу</SelectItem>
                          <SelectItem value="products">По количеству товаров</SelectItem>
                          <SelectItem value="experience">По опыту работы</SelectItem>
                          <SelectItem value="reviews">По отзывам</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Список поставщиков */}
                  {filteredSuppliers.length > 0 ? (
                    <div className="space-y-6">
                      {filteredSuppliers.map((supplier) => (
                        <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-6">
                              <img 
                                src={supplier.logo} 
                                alt={supplier.name}
                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                              />
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-4">
                                  <div>
                                    <div className="flex items-center gap-3 mb-2">
                                      <h3 className="text-xl font-bold text-gray-900">{supplier.name}</h3>
                                      {supplier.verified && (
                                        <Badge variant="default" className="text-xs bg-green-100 text-green-700">
                                          <Icon name="CheckCircle" size={12} className="mr-1" />
                                          Верифицирован
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                      <span className="flex items-center">
                                        <Icon name="MapPin" size={14} className="mr-1" />
                                        {supplier.region}
                                      </span>
                                      <span className="flex items-center">
                                        <Icon name="Tag" size={14} className="mr-1" />
                                        {supplier.category}
                                      </span>
                                      <span className="flex items-center">
                                        <Icon name="Calendar" size={14} className="mr-1" />
                                        {supplier.experience} лет опыта
                                      </span>
                                      <span className="flex items-center">
                                        <Icon name="Users" size={14} className="mr-1" />
                                        {supplier.employeesCount} сотрудников
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="text-right">
                                    <div className="flex items-center gap-1 mb-2">
                                      <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                                      <span className="font-semibold">{supplier.rating}</span>
                                      <span className="text-sm text-gray-500">({supplier.reviewsCount})</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{supplier.products} товаров</p>
                                  </div>
                                </div>

                                <p className="text-gray-700 mb-4">{supplier.description}</p>

                                <div className="grid md:grid-cols-3 gap-4 mb-4">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Специализация:</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {supplier.specializations.slice(0, 3).map(spec => (
                                        <Badge key={spec} variant="outline" className="text-xs">
                                          {spec}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Минимальный заказ:</h4>
                                    <p className="text-sm text-gray-600">
                                      {supplier.minOrder.toLocaleString('ru-RU')} ₽
                                    </p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Сертификаты:</h4>
                                    <div className="flex flex-wrap gap-1">
                                      {supplier.certifications.slice(0, 2).map(cert => (
                                        <Badge key={cert} variant="secondary" className="text-xs">
                                          {cert}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t">
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center">
                                      <Icon name="Phone" size={14} className="mr-1" />
                                      {supplier.phone}
                                    </span>
                                    <span className="flex items-center">
                                      <Icon name="Mail" size={14} className="mr-1" />
                                      {supplier.email}
                                    </span>
                                    <span className="flex items-center">
                                      <Icon name="Warehouse" size={14} className="mr-1" />
                                      {supplier.warehouse}
                                    </span>
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                      <Icon name="MessageCircle" size={16} className="mr-2" />
                                      Написать
                                    </Button>
                                    <Button 
                                      size="sm"
                                      onClick={() => setSelectedSupplier(supplier)}
                                    >
                                      <Icon name="Eye" size={16} className="mr-2" />
                                      Подробнее
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => {
                  const categorySuppliers = suppliers.filter(s => s.category === category);
                  const avgRating = (categorySuppliers.reduce((sum, s) => sum + s.rating, 0) / categorySuppliers.length).toFixed(1);
                  
                  return (
                    <Card key={category} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Icon name="Package" size={24} className="text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{category}</h3>
                            <p className="text-sm text-gray-600">{categorySuppliers.length} поставщиков</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Средний рейтинг:</span>
                            <span className="font-medium">{avgRating}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Верифицированных:</span>
                            <span className="font-medium">{categorySuppliers.filter(s => s.verified).length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Товарных позиций:</span>
                            <span className="font-medium">{categorySuppliers.reduce((sum, s) => sum + s.products, 0)}</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full mt-4" 
                          variant="outline"
                          onClick={() => {
                            setCategoryFilter(category);
                            setActiveView("suppliers");
                          }}
                        >
                          Смотреть поставщиков
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Map Tab */}
            <TabsContent value="map">
              <SuppliersMap suppliers={filteredSuppliers} />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Распределение по регионам</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {regions.map(region => {
                        const regionSuppliers = suppliers.filter(s => s.region === region);
                        const percentage = (regionSuppliers.length / suppliers.length * 100).toFixed(1);
                        
                        return (
                          <div key={region} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{region}</span>
                            <div className="flex items-center gap-3">
                              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 min-w-[40px]">{percentage}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Рейтинговая статистика</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[5, 4, 3, 2, 1].map(rating => {
                        const ratingSuppliers = suppliers.filter(s => Math.floor(s.rating) === rating);
                        const percentage = (ratingSuppliers.length / suppliers.length * 100).toFixed(1);
                        
                        return (
                          <div key={rating} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{rating}</span>
                              <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-yellow-500 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 min-w-[40px]">{percentage}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
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