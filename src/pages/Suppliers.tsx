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

  // Расширенная база поставщиков
  const suppliers = [
    {
      id: 1,
      name: "ООО «Металл-Трейд»",
      logo: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Металлопрокат",
      region: "Москва",
      verified: true,
      rating: 4.9,
      products: 350,
      experience: 12,
      description: "Крупнейший поставщик металлопроката в России. Широкий ассортимент стальных труб, листового металла и арматуры.",
      specializations: ["Трубы стальные", "Листовой металл", "Арматура"],
      minOrder: 500000,
      phone: "+7 (495) 123-45-67",
      email: "info@metall-trade.ru"
    },
    {
      id: 2,
      name: "АО «СтройБаза Регион»",
      logo: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Стройматериалы",
      region: "Санкт-Петербург",
      verified: true,
      rating: 4.8,
      products: 520,
      experience: 8,
      description: "Надежный партнер в области строительных материалов. Цемент, бетон, кирпич и другие материалы высокого качества.",
      specializations: ["Цемент", "Бетонные смеси", "Кирпич"],
      minOrder: 200000,
      phone: "+7 (812) 987-65-43",
      email: "orders@stroybaza.ru"
    },
    {
      id: 3,
      name: "ИП Электроника-Опт",
      logo: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Электроника",
      region: "Новосибирск",
      verified: false,
      rating: 4.6,
      products: 180,
      experience: 5,
      description: "Оптовые поставки электронных компонентов и радиодеталей. Микроконтроллеры, платы, датчики.",
      specializations: ["Arduino", "Raspberry Pi", "Датчики"],
      minOrder: 50000,
      phone: "+7 (383) 555-12-34",
      email: "sales@electronika-opt.ru"
    },
    {
      id: 4,
      name: "ООО «Кровля-Проф»",
      logo: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Стройматериалы",
      region: "Екатеринбург",
      verified: true,
      rating: 4.7,
      products: 280,
      experience: 15,
      description: "Специализация на кровельных материалах и системах. Профнастил, металлочерепица, водосточные системы.",
      specializations: ["Профнастил", "Металлочерепица", "Водостоки"],
      minOrder: 300000,
      phone: "+7 (343) 222-33-44",
      email: "info@krovlya-prof.ru"
    },
    {
      id: 5,
      name: "ООО «Пак-Сервис»",
      logo: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Упаковка",
      region: "Казань",
      verified: true,
      rating: 4.5,
      products: 420,
      experience: 7,
      description: "Производство и поставка упаковочных материалов. Картонные коробки, пленка, этикетки.",
      specializations: ["Картонная упаковка", "Пленка", "Этикетки"],
      minOrder: 150000,
      phone: "+7 (843) 777-88-99",
      email: "orders@pak-service.ru"
    },
    {
      id: 6,
      name: "АО «КабельСнаб»",
      logo: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Электротехника",
      region: "Москва",
      verified: true,
      rating: 4.9,
      products: 650,
      experience: 20,
      description: "Ведущий поставщик кабельно-проводниковой продукции. Силовые и слаботочные кабели всех типов.",
      specializations: ["Силовые кабели", "Слаботочные кабели", "Провода"],
      minOrder: 400000,
      phone: "+7 (495) 999-11-22",
      email: "sales@kabelsnab.ru"
    },
    {
      id: 7,
      name: "ООО «ОфисСнаб»",
      logo: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Канцелярия",
      region: "Москва",
      verified: true,
      rating: 4.4,
      products: 890,
      experience: 6,
      description: "Комплексные поставки канцелярских товаров и офисной техники для корпоративных клиентов.",
      specializations: ["Канцтовары", "Офисная техника", "Расходные материалы"],
      minOrder: 75000,
      phone: "+7 (495) 333-44-55",
      email: "office@ofissnab.ru"
    },
    {
      id: 8,
      name: "ИП Крепёжников А.В.",
      logo: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Крепёж",
      region: "Воронеж",
      verified: false,
      rating: 4.2,
      products: 1200,
      experience: 10,
      description: "Широкий ассортимент крепежных изделий. Болты, гайки, шайбы, саморезы всех размеров и типов.",
      specializations: ["Болты", "Гайки", "Саморезы"],
      minOrder: 25000,
      phone: "+7 (473) 111-22-33",
      email: "krepezh@inbox.ru"
    }
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="ml-64">
        <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Поставщики</h1>
          <p className="text-gray-600">Найдите надежных партнеров для вашего бизнеса</p>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list" className="flex items-center">
              <Icon name="List" size={16} className="mr-2" />
              Список
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center">
              <Icon name="MapPin" size={16} className="mr-2" />
              Карта
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
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
                    <Icon name="X" size={16} />
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
                                  <Badge variant="default" className="text-xs">
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
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center gap-1 mb-2">
                                <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                                <span className="font-semibold">{supplier.rating}</span>
                              </div>
                              <p className="text-sm text-gray-600">{supplier.products} товаров</p>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">{supplier.description}</p>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Специализация:</h4>
                              <div className="flex flex-wrap gap-2">
                                {supplier.specializations.map(spec => (
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
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Icon name="MessageCircle" size={16} className="mr-2" />
                                Написать
                              </Button>
                              <Button size="sm">
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

          <TabsContent value="map">
            <SuppliersMap suppliers={filteredSuppliers} />
          </TabsContent>
        </Tabs>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Suppliers;