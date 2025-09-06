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
import ProductInquiryModal from "@/components/ProductInquiryModal";
import FlyToCartAnimation from "@/components/FlyToCartAnimation";
import { useCart } from "@/contexts/CartContext";

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("name");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [flyingAnimation, setFlyingAnimation] = useState<{
    isActive: boolean;
    startElement: HTMLElement | null;
    productImage?: string;
  }>({
    isActive: false,
    startElement: null,
    productImage: undefined
  });
  
  const { addItem } = useCart();

  // Расширенный каталог товаров
  const products = [
    {
      id: 1,
      name: "Труба стальная бесшовная 108x4 мм ГОСТ 8732-78",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Металлопрокат",
      seller: "ООО «МетПром-Сталь»",
      verified: true,
      price: 45600,
      oldPrice: 48000,
      unit: "за тонну",
      minOrder: "5 тонн",
      available: "120 тонн",
      rating: 4.9,
      reviews: 127,
      inStock: true,
      discount: 5,
      description: "Высококачественная стальная труба для промышленного использования"
    },
    {
      id: 2,
      name: "Цемент ПЦ 400-Д20 навалом, М-400",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Стройматериалы",
      seller: "АО «СтройБаза Регион»",
      verified: true,
      price: 3850,
      unit: "за тонну",
      minOrder: "20 тонн",
      available: "500+ тонн",
      rating: 4.8,
      reviews: 89,
      inStock: true,
      description: "Портландцемент высокого качества для строительных работ"
    },
    {
      id: 3,
      name: "Arduino Uno R3 + набор датчиков (комплект)",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Электроника",
      seller: "ТД «Электро-Компонент»",
      verified: true,
      price: 1290,
      oldPrice: 1450,
      unit: "за комплект",
      minOrder: "50 комплектов",
      available: "2,000+ шт",
      rating: 4.6,
      reviews: 234,
      inStock: true,
      discount: 11,
      description: "Полный стартовый набор для изучения Arduino с документацией"
    },
    {
      id: 4,
      name: "Профнастил оцинкованный С8-1150-0.5",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      category: "Кровельные материалы",
      seller: "ООО «КровляСтрой»",
      verified: true,
      price: 485,
      unit: "за м²",
      minOrder: "200 м²",
      available: "5,000+ м²",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      description: "Качественный профлист для кровельных и фасадных работ"
    },
    {
      id: 5,
      name: "Упаковка картонная гофрированная 300x200x100",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Упаковочные материалы",
      seller: "ООО «УпакТрейд»",
      verified: true,
      price: 18.50,
      unit: "за штуку",
      minOrder: "1,000 шт",
      available: "50,000+ шт",
      rating: 4.5,
      reviews: 67,
      inStock: false,
      description: "Прочная картонная упаковка для транспортировки товаров"
    },
    {
      id: 6,
      name: "Кабель ВВГнг-LS 3x2.5 (бухта 100м)",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Электротехника",
      seller: "АО «КабельСистемы»",
      verified: true,
      price: 2340,
      unit: "за бухту",
      minOrder: "10 бухт",
      available: "200+ бухт",
      rating: 4.9,
      reviews: 98,
      inStock: true,
      description: "Негорючий силовой кабель для внутренней проводки"
    },
    {
      id: 7,
      name: "Бумага офисная А4 Svetocopy 80г/м² (500л.)",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Канцелярские товары",
      seller: "ООО «ОфисСнаб Плюс»",
      verified: true,
      price: 280,
      oldPrice: 320,
      unit: "за пачку",
      minOrder: "50 пачек",
      available: "1,000+ пачек",
      rating: 4.4,
      reviews: 145,
      inStock: true,
      discount: 13,
      description: "Высококачественная офисная бумага для печати и копирования"
    },
    {
      id: 8,
      name: "Комплект крепежа М12x60 (болт + гайка + шайба)",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Крепёжные изделия",
      seller: "ИП Крепёжкин А.В.",
      verified: false,
      price: 15,
      unit: "за комплект",
      minOrder: "500 комплектов",
      available: "10,000+ комплектов",
      rating: 4.2,
      reviews: 78,
      inStock: true,
      description: "Надежный крепежный набор из оцинкованной стали"
    },
    {
      id: 9,
      name: "Светодиодная лента RGB 5050 (5м + контроллер)",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Светотехника",
      seller: "ТД «СветДиод»",
      verified: true,
      price: 1250,
      oldPrice: 1400,
      unit: "за комплект",
      minOrder: "20 комплектов",
      available: "500+ комплектов",
      rating: 4.6,
      reviews: 112,
      inStock: true,
      discount: 11,
      description: "Многоцветная LED-лента с пультом управления и контроллером"
    },
    {
      id: 10,
      name: "Плитка керамическая 30x30 см матовая",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      category: "Отделочные материалы",
      seller: "ООО «КерамПро»",
      verified: true,
      price: 890,
      unit: "за м²",
      minOrder: "50 м²",
      available: "2,000+ м²",
      rating: 4.5,
      reviews: 89,
      inStock: true,
      description: "Износостойкая керамическая плитка для внутренней отделки"
    },
    {
      id: 11,
      name: "Пленка полиэтиленовая техническая 200 мкм",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Полимерные материалы",
      seller: "АО «ПолиПак»",
      verified: true,
      price: 145,
      unit: "за м²",
      minOrder: "200 м²",
      available: "10,000+ м²",
      rating: 4.3,
      reviews: 56,
      inStock: true,
      description: "Прочная техническая пленка для упаковки и защиты"
    },
    {
      id: 12,
      name: "Инструмент измерительный: штангенциркуль 0-150мм",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Измерительные приборы",
      seller: "ТД «ТехПрибор»",
      verified: true,
      price: 850,
      unit: "за штуку",
      minOrder: "10 штук",
      available: "150+ штук",
      rating: 4.8,
      reviews: 43,
      inStock: true,
      description: "Высокоточный штангенциркуль с цифровым индикатором"
    }
  ];

  // Фильтрация и сортировка товаров
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
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
        case "popular":
          return (b.reviews || 0) - (a.reviews || 0);
        case "discount":
          return (b.discount || 0) - (a.discount || 0);
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

  const handleToggleFavorite = (product: typeof products[0], event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const isFavorite = favorites.includes(product.id);
    
    if (isFavorite) {
      setFavorites(prev => prev.filter(id => id !== product.id));
    } else {
      setFavorites(prev => [...prev, product.id]);
      
      // Находим карточку товара (родительский элемент)
      const cardElement = event.currentTarget.closest('[data-product-card]') as HTMLElement;
      
      // Запускаем анимацию полета в корзину от карточки товара
      setFlyingAnimation({
        isActive: true,
        startElement: cardElement || event.currentTarget,
        productImage: product.image
      });
      
      // Добавляем товар в корзину при добавлении в избранное
      addItem({
        id: product.id.toString(),
        title: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        company: product.seller
      });
    }
  };

  const handleAnimationComplete = () => {
    setFlyingAnimation(prev => ({
      ...prev,
      isActive: false
    }));
  };

  const handleSendInquiry = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setSelectedProduct(null);
    setIsInquiryModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="ml-64">
        <div className="container mx-auto px-6 py-8">
          {/* Hero секция */}
          <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-3">Каталог товаров</h1>
              <p className="text-xl text-blue-100 mb-6">Более 10,000 товаров от проверенных поставщиков</p>
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={16} className="text-blue-200" />
                  <span>Проверенные поставщики</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Truck" size={16} className="text-blue-200" />
                  <span>Быстрая доставка</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Award" size={16} className="text-blue-200" />
                  <span>Гарантия качества</span>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-64 bg-gradient-to-l from-white/10 to-transparent"></div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Боковая панель с фильтрами */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center text-gray-800">
                      <Icon name="Filter" size={20} className="mr-2 text-blue-600" />
                      Фильтры
                    </span>
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="text-gray-600 hover:text-blue-600">
                      <Icon name="RotateCcw" size={16} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  {/* Поиск */}
                  <div>
                    <label className="text-sm font-semibold mb-3 block text-gray-700">Поиск товаров</label>
                    <div className="relative">
                      <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Название, категория..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Категория */}
                  <div>
                    <label className="text-sm font-semibold mb-3 block text-gray-700">Категория</label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="border-gray-200 focus:border-blue-500">
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
                    <label className="text-sm font-semibold mb-3 block text-gray-700">
                      Цена: {priceRange[0].toLocaleString('ru-RU')} - {priceRange[1].toLocaleString('ru-RU')} ₽
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100000}
                      min={0}
                      step={500}
                      className="w-full"
                    />
                  </div>

                  {/* Чекбоксы */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="verified"
                        checked={verifiedOnly}
                        onCheckedChange={setVerifiedOnly}
                      />
                      <label htmlFor="verified" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Только верифицированные поставщики
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="inStock"
                        checked={inStockOnly}
                        onCheckedChange={setInStockOnly}
                      />
                      <label htmlFor="inStock" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Только товары в наличии
                      </label>
                    </div>
                  </div>

                  {/* Статистика */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Статистика каталога</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Всего товаров:</span>
                        <span className="font-medium">{products.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Найдено:</span>
                        <span className="font-medium text-blue-600">{filteredProducts.length}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Основной контент */}
            <div className="lg:col-span-3">
              {/* Панель управления */}
              <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <p className="text-gray-700 font-medium">
                    Показано <span className="text-blue-600 font-semibold">{filteredProducts.length}</span> из {products.length} товаров
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Переключатель вида */}
                  <div className="flex items-center border border-gray-200 rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="px-3"
                    >
                      <Icon name="Grid3x3" size={16} />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="px-3"
                    >
                      <Icon name="List" size={16} />
                    </Button>
                  </div>

                  {/* Сортировка */}
                  <div className="flex items-center gap-2">
                    <Icon name="ArrowUpDown" size={16} className="text-gray-500" />
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48 border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">По названию</SelectItem>
                        <SelectItem value="price_asc">Сначала дешевые</SelectItem>
                        <SelectItem value="price_desc">Сначала дорогие</SelectItem>
                        <SelectItem value="rating">По рейтингу</SelectItem>
                        <SelectItem value="popular">По популярности</SelectItem>
                        <SelectItem value="discount">По скидке</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Сетка товаров */}
              {filteredProducts.length > 0 ? (
                <div className={viewMode === 'grid' 
                  ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "space-y-4"
                }>
                  {filteredProducts.map((product) => (
                    <Card 
                      key={product.id} 
                      className={`group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 ${
                        viewMode === 'list' ? 'flex flex-row h-48' : ''
                      }`}
                      data-product-card
                    >
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'w-64 h-48' : 'aspect-video'
                      }`}>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          <Badge className="bg-white/95 text-gray-700 text-xs">
                            {product.category}
                          </Badge>
                          {product.discount && (
                            <Badge variant="destructive" className="text-xs">
                              -{product.discount}%
                            </Badge>
                          )}
                        </div>
                        
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                            <Badge variant="secondary" className="text-sm">
                              Нет в наличии
                            </Badge>
                          </div>
                        )}

                        {/* Кнопка избранного */}
                        <Button 
                          variant="secondary"
                          size="icon"
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm"
                          onClick={(e) => handleToggleFavorite(product, e)}
                        >
                          <Icon 
                            name="Heart"
                            size={14} 
                            className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}
                          />
                        </Button>
                      </div>
                      
                      <CardContent className={`p-5 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                        <div className="space-y-3">
                          {/* Название товара */}
                          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          
                          {/* Продавец */}
                          <div className="flex items-center gap-2">
                            <Icon name="Store" size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600 flex-1">{product.seller}</span>
                            {product.verified && (
                              <Badge variant="outline" className="text-xs h-5 border-green-200 text-green-700">
                                <Icon name="CheckCircle" size={10} className="mr-1" />
                                Верифицирован
                              </Badge>
                            )}
                          </div>

                          {/* Рейтинг и отзывы */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{product.rating}</span>
                            </div>
                            <span className="text-xs text-gray-500">({product.reviews} отзывов)</span>
                          </div>

                          {/* Описание (только в режиме списка) */}
                          {viewMode === 'list' && (
                            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                          )}

                          <div className="border-t pt-3">
                            {/* Цена */}
                            <div className="flex items-baseline gap-2 mb-3">
                              <span className="text-2xl font-bold text-blue-600">
                                {product.price.toLocaleString('ru-RU')} ₽
                              </span>
                              <span className="text-sm text-gray-500">{product.unit}</span>
                              {product.oldPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  {product.oldPrice.toLocaleString('ru-RU')} ₽
                                </span>
                              )}
                            </div>
                            
                            {/* Информация о заказе */}
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                              <div className="flex items-center gap-1">
                                <Icon name="Package" size={12} className="text-gray-400" />
                                <span>Мин: {product.minOrder}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Truck" size={12} className="text-gray-400" />
                                <span>{product.available}</span>
                              </div>
                            </div>
                          </div>

                          {/* Кнопки действий */}
                          <div className="flex gap-2 pt-2">
                            <Button 
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleSendInquiry(product)}
                              disabled={!product.inStock}
                            >
                              <Icon name="Mail" size={16} className="mr-2" />
                              Отправить заявку
                            </Button>
                            <Button 
                              variant="outline"
                              size="icon"
                              onClick={() => handleSendInquiry(product)}
                              className="border-gray-200 hover:border-blue-300"
                            >
                              <Icon name="MessageCircle" size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-16 shadow-lg border-0">
                  <CardContent>
                    <div className="max-w-md mx-auto">
                      <Icon name="SearchX" size={64} className="mx-auto text-gray-300 mb-6" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Товары не найдены</h3>
                      <p className="text-gray-600 mb-6">
                        К сожалению, по вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.
                      </p>
                      <Button onClick={resetFilters} className="bg-blue-600 hover:bg-blue-700">
                        <Icon name="RotateCcw" size={16} className="mr-2" />
                        Сбросить все фильтры
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
        
        <Footer />
      </div>

      <ProductInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={handleCloseInquiry}
        product={selectedProduct}
      />

      <FlyToCartAnimation
        isActive={flyingAnimation.isActive}
        startElement={flyingAnimation.startElement}
        productImage={flyingAnimation.productImage}
        onComplete={handleAnimationComplete}
      />
    </div>
  );
};

export default Catalog;