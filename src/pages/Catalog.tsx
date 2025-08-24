import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("name");

  // Расширенный каталог товаров
  const products = [
    {
      id: 1,
      name: "Труба стальная 108x4 ГОСТ 8732",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Металлопрокат",
      seller: "ООО «Металл-Трейд»",
      verified: true,
      price: 45600,
      unit: "за тонну",
      minOrder: "5 тонн",
      available: "120 тонн",
      rating: 4.9,
      inStock: true
    },
    {
      id: 2,
      name: "Цемент ПЦ 400-Д20 навалом",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Стройматериалы",
      seller: "АО «СтройБаза Регион»",
      verified: true,
      price: 3850,
      unit: "за тонну",
      minOrder: "20 тонн",
      available: "500+ тонн",
      rating: 4.8,
      inStock: true
    },
    {
      id: 3,
      name: "Платы Arduino Uno R3 (партия)",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Электроника",
      seller: "ИП Электроника-Опт",
      verified: false,
      price: 890,
      unit: "за штуку",
      minOrder: "100 шт",
      available: "2,000 шт",
      rating: 4.6,
      inStock: true
    },
    {
      id: 4,
      name: "Профнастил С8 оцинкованный",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Стройматериалы",
      seller: "ООО «Кровля-Проф»",
      verified: true,
      price: 485,
      unit: "за м²",
      minOrder: "200 м²",
      available: "5,000+ м²",
      rating: 4.7,
      inStock: true
    },
    {
      id: 5,
      name: "Упаковка картонная 300x200x100",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Упаковка",
      seller: "ООО «Пак-Сервис»",
      verified: true,
      price: 18.50,
      unit: "за штуку",
      minOrder: "1,000 шт",
      available: "50,000+ шт",
      rating: 4.5,
      inStock: false
    },
    {
      id: 6,
      name: "Кабель ВВГ 3x2.5 (бухта 100м)",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Электротехника",
      seller: "АО «КабельСнаб»",
      verified: true,
      price: 2340,
      unit: "за бухту",
      minOrder: "10 бухт",
      available: "200+ бухт",
      rating: 4.9,
      inStock: true
    },
    {
      id: 7,
      name: "Офисная бумага А4 80г/м²",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Канцелярия",
      seller: "ООО «ОфисСнаб»",
      verified: true,
      price: 280,
      unit: "за пачку",
      minOrder: "50 пачек",
      available: "1,000+ пачек",
      rating: 4.4,
      inStock: true
    },
    {
      id: 8,
      name: "Болты М12x60 с гайками",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Крепёж",
      seller: "ИП Крепёжников",
      verified: false,
      price: 15,
      unit: "за комплект",
      minOrder: "500 комплектов",
      available: "10,000+ комплектов",
      rating: 4.2,
      inStock: true
    }
  ];

  // Фильтрация и сортировка товаров
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.seller.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      const matchesVerified = !verifiedOnly || product.verified;
      const matchesStock = !inStockOnly || product.inStock;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesVerified && matchesStock && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Получить уникальные категории
  const categories = [...new Set(products.map(p => p.category))];

  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setVerifiedOnly(false);
    setInStockOnly(false);
    setPriceRange([0, 100000]);
    setSortBy("name");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="ml-64">
        <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Каталог товаров</h1>
          <p className="text-gray-600">Широкий ассортимент товаров от проверенных поставщиков</p>
        </div>

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
                    placeholder="Название товара..."
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

                {/* Ценовой диапазон */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Цена: {priceRange[0].toLocaleString('ru-RU')} - {priceRange[1].toLocaleString('ru-RU')} ₽
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100000}
                    min={0}
                    step={100}
                    className="w-full"
                  />
                </div>

                {/* Чекбоксы */}
                <div className="space-y-4">
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
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={inStockOnly}
                      onCheckedChange={setInStockOnly}
                    />
                    <label htmlFor="inStock" className="text-sm font-medium">
                      Только в наличии
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Основной контент */}
          <div className="lg:col-span-3">
            {/* Панель сортировки */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Найдено товаров: <span className="font-semibold">{filteredProducts.length}</span>
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Сортировать:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">По названию</SelectItem>
                    <SelectItem value="price_asc">По цене (возрастанию)</SelectItem>
                    <SelectItem value="price_desc">По цене (убыванию)</SelectItem>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Сетка товаров */}
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700">
                        {product.category}
                      </Badge>
                      {!product.inStock && (
                        <Badge variant="destructive" className="absolute top-3 right-3">
                          Нет в наличии
                        </Badge>
                      )}
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center gap-2">
                          <Icon name="Store" size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-600 flex-1">{product.seller}</span>
                          {product.verified && (
                            <Badge variant="default" className="text-xs h-5">
                              <Icon name="CheckCircle" size={10} className="mr-1" />
                              Верифицирован
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>

                        <div className="border-t pt-3">
                          <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-xl font-bold text-primary">
                              {product.price.toLocaleString('ru-RU')} ₽
                            </span>
                            <span className="text-sm text-gray-500">{product.unit}</span>
                          </div>
                          
                          <div className="space-y-1 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                              <Icon name="Package" size={12} />
                              <span>Мин. заказ: {product.minOrder}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="Truck" size={12} />
                              <span>В наличии: {product.available}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button className="flex-1" disabled={!product.inStock}>
                            <Icon name="ShoppingCart" size={16} className="mr-2" />
                            {product.inStock ? "В корзину" : "Нет в наличии"}
                          </Button>
                          <Button variant="outline" size="icon">
                            <Icon name="Heart" size={16} />
                          </Button>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Товары не найдены</h3>
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
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Catalog;