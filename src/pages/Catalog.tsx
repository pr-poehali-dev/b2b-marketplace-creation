import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductInquiryModal from "@/components/ProductInquiryModal";
import FlyToCartAnimation from "@/components/FlyToCartAnimation";
import { useCart } from "@/contexts/CartContext";
import CatalogHero from "@/components/catalog/CatalogHero";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import CatalogToolbar from "@/components/catalog/CatalogToolbar";
import CatalogGrid from "@/components/catalog/CatalogGrid";
import QuickViewModal from "@/components/catalog/QuickViewModal";
import ProductComparison from "@/components/catalog/ProductComparison";
import CompareFloatingButton from "@/components/catalog/CompareFloatingButton";
import { Product } from "@/components/catalog/ProductCard";
import { productsData } from "@/data/productsData";

const Catalog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [minOrderFilter, setMinOrderFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
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
  
  // Новые состояния для функциональности
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  
  const { addItem } = useCart();

  // Фильтрация и сортировка товаров
  const filteredProducts = productsData
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      const matchesVerified = !verifiedOnly || product.verified;
      const matchesStock = !inStockOnly || product.inStock;
      const matchesDiscount = !discountOnly || product.discount;
      const matchesFastDelivery = !fastDelivery; // Пока все товары подходят
      const matchesPrice = product.price >= priceRange[0] && (priceRange[1] >= 10000000 || product.price <= priceRange[1]);
      const matchesRating = ratingFilter === 0 || (product.rating && product.rating >= ratingFilter);
      
      const matchesMinOrder = (() => {
        if (minOrderFilter === "all") return true;
        if (minOrderFilter === "1") return product.minOrder?.includes("1 штука");
        
        const minOrderValue = parseInt(product.minOrder?.split(" ")[0] || "1");
        if (minOrderFilter === "small") return minOrderValue <= 10;
        if (minOrderFilter === "medium") return minOrderValue >= 10 && minOrderValue <= 100;
        if (minOrderFilter === "large") return minOrderValue > 100;
        return true;
      })();
      
      const matchesLocation = (() => {
        if (locationFilter === "all") return true;
        const seller = product.seller.toLowerCase();
        switch (locationFilter) {
          case "moscow": return seller.includes("мос") || seller.includes("мск");
          case "spb": return seller.includes("спб") || seller.includes("питер");
          case "ekb": return seller.includes("екатеринбург");
          case "nsk": return seller.includes("новосибирск");
          case "kzn": return seller.includes("казан");
          case "nng": return seller.includes("нижний");
          default: return true;
        }
      })();

      return matchesSearch && matchesCategory && matchesVerified && matchesStock && matchesDiscount && matchesFastDelivery && matchesPrice && matchesRating && matchesMinOrder && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "reviews":
          return (b.reviews || 0) - (a.reviews || 0);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Получаем уникальные категории из товаров
  const categories = [...new Set(productsData.map(p => p.category))];

  // Функция сброса фильтров
  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setVerifiedOnly(false);
    setInStockOnly(false);
    setDiscountOnly(false);
    setFastDelivery(false);
    setPriceRange([0, 10000000]);
    setRatingFilter(0);
    setMinOrderFilter("all");
    setLocationFilter("all");
    setSortBy("name");
  };

  // Обработка добавления в избранное
  const handleToggleFavorite = (productId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (favorites.includes(productId)) {
      setFavorites(prev => prev.filter(id => id !== productId));
    } else {
      setFavorites(prev => [...prev, productId]);
      
      const product = productsData.find(p => p.id === productId);
      if (product) {
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

  // Обработчики новой функциональности
  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
    setIsQuickViewOpen(false);
  };

  const handleAddToCompare = (product: Product) => {
    setCompareProducts(prev => {
      const isAlreadyInCompare = prev.some(p => p.id === product.id);
      
      if (isAlreadyInCompare) {
        // Убираем из сравнения
        return prev.filter(p => p.id !== product.id);
      } else {
        // Добавляем в сравнение (максимум 3 товара)
        if (prev.length >= 3) {
          // Заменяем первый товар новым
          return [product, ...prev.slice(0, 2)];
        }
        return [product, ...prev];
      }
    });
  };

  const handleRemoveFromCompare = (productId: number) => {
    setCompareProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleOpenComparison = () => {
    setIsComparisonOpen(true);
  };

  const handleCloseComparison = () => {
    setIsComparisonOpen(false);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="ml-64">
        <div className="container mx-auto px-6 py-8">
          <CatalogHero />

          <div className="grid lg:grid-cols-5 gap-6">
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
                discountOnly={discountOnly}
                setDiscountOnly={setDiscountOnly}
                fastDelivery={fastDelivery}
                setFastDelivery={setFastDelivery}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                ratingFilter={ratingFilter}
                setRatingFilter={setRatingFilter}
                minOrderFilter={minOrderFilter}
                setMinOrderFilter={setMinOrderFilter}
                locationFilter={locationFilter}
                setLocationFilter={setLocationFilter}
                categories={categories}
                resetFilters={resetFilters}
                totalProducts={productsData.length}
                filteredProducts={filteredProducts.length}
              />
            </div>

            {/* Основной контент */}
            <div className="lg:col-span-4">
              <CatalogToolbar
                filteredProductsCount={filteredProducts.length}
                totalProducts={productsData.length}
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
                onQuickView={handleQuickView}
                onAddToCompare={handleAddToCompare}
                compareProducts={compareProducts.map(p => p.id)}
                onProductClick={handleProductClick}
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
        onAnimationComplete={handleAnimationComplete}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        onSendInquiry={handleSendInquiry}
        onToggleFavorite={(product, event) => {
          event.preventDefault();
          event.stopPropagation();
          if (favorites.includes(product.id)) {
            setFavorites(prev => prev.filter(id => id !== product.id));
          } else {
            setFavorites(prev => [...prev, product.id]);
          }
        }}
        isFavorite={quickViewProduct ? favorites.includes(quickViewProduct.id) : false}
      />

      <ProductComparison
        products={compareProducts}
        isOpen={isComparisonOpen}
        onClose={handleCloseComparison}
        onRemoveProduct={handleRemoveFromCompare}
        onSendInquiry={handleSendInquiry}
      />

      <CompareFloatingButton
        compareProducts={compareProducts}
        onOpenComparison={handleOpenComparison}
        onRemoveProduct={handleRemoveFromCompare}
      />
    </div>
  );
};

export default Catalog;