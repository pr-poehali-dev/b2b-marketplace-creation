import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductInquiryModal from "@/components/ProductInquiryModal";
import FlyToCartAnimation from "@/components/FlyToCartAnimation";
import { useCart } from "@/contexts/CartContext";
import CatalogHero from "@/components/catalog/CatalogHero";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import CatalogToolbar from "@/components/catalog/CatalogToolbar";
import CatalogGrid from "@/components/catalog/CatalogGrid";
import { Product } from "@/components/catalog/ProductCard";

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("name");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
  const products: Product[] = [
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

  const handleToggleFavorite = (product: Product, event: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleSendInquiry = (product: Product) => {
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
          <CatalogHero />

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Боковая панель с фильтрами */}
            <div className="lg:col-span-1">
              <CatalogFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                verifiedOnly={verifiedOnly}
                setVerifiedOnly={setVerifiedOnly}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                categories={categories}
                resetFilters={resetFilters}
                totalProducts={products.length}
                filteredProducts={filteredProducts.length}
              />
            </div>

            {/* Основной контент */}
            <div className="lg:col-span-3">
              <CatalogToolbar
                filteredProductsCount={filteredProducts.length}
                totalProducts={products.length}
                viewMode={viewMode}
                setViewMode={setViewMode}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              <CatalogGrid
                products={filteredProducts}
                viewMode={viewMode}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSendInquiry={handleSendInquiry}
                onResetFilters={resetFilters}
              />
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