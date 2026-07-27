import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import PageLayout from '@/components/layout/PageLayout';
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import CatalogToolbar from "@/components/catalog/CatalogToolbar";
import CatalogGrid from "@/components/catalog/CatalogGrid";
import ProductInquiryModal from "@/components/ProductInquiryModal";
import QuickViewModal from "@/components/catalog/QuickViewModal";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import PopularProducts from "@/components/PopularProducts";
import HeroSection from "@/components/HeroSection";
import SupplierSection from "@/components/SupplierSection";
import FeaturesSection from "@/components/FeaturesSection";
import NewsSection from "@/components/NewsSection";
import DeliverySection from "@/components/DeliverySection";
import WelcomeModal from "@/components/WelcomeModal";
import { Product } from "@/components/catalog/ProductCard";
import { mapBackendProduct, BackendProduct } from "@/utils/mapBackendProduct";

const PRODUCTS_URL = 'https://functions.poehali.dev/65a30f37-03fa-4e12-ad16-d14f83cd61b4';

const Index = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldRestartSlideshow, setShouldRestartSlideshow] = useState(false);

  const [productsData, setProductsData] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setProductsLoading(true);
      try {
        const res = await fetch(`${PRODUCTS_URL}?limit=24`);
        const data = await res.json();
        const list: BackendProduct[] = data.products || [];
        setProductsData(list.map(mapBackendProduct));
      } catch {
        setProductsData([]);
      } finally {
        setProductsLoading(false);
      }
    })();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [customOrderOnly, setCustomOrderOnly] = useState(false);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [minOrderFilter, setMinOrderFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const categories = [...new Set(productsData.map((p) => p.category))];

  const filteredProducts = productsData
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesVerified = !verifiedOnly || product.verified;
      const matchesStock = !inStockOnly || product.inStock;
      const matchesDiscount = !discountOnly || product.discount;
      const matchesFastDelivery = !fastDelivery || product.fastDelivery;
      const matchesCustomOrder = !customOrderOnly || !product.inStock;
      const matchesPrice = (() => {
        const fromPrice = priceFrom ? parseFloat(priceFrom) : 0;
        const toPrice = priceTo ? parseFloat(priceTo) : Infinity;
        return product.price >= fromPrice && product.price <= toPrice;
      })();
      const matchesMinOrder = (() => {
        if (minOrderFilter === 'all') return true;
        if (minOrderFilter === '1') return product.minOrder?.includes('1 штука');
        const minOrderValue = parseInt(product.minOrder?.split(' ')[0] || '1');
        if (minOrderFilter === 'small') return minOrderValue <= 10;
        if (minOrderFilter === 'medium') return minOrderValue >= 10 && minOrderValue <= 100;
        if (minOrderFilter === 'large') return minOrderValue > 100;
        return true;
      })();
      return matchesSearch && matchesCategory && matchesVerified && matchesStock &&
        matchesDiscount && matchesFastDelivery && matchesCustomOrder && matchesPrice && matchesMinOrder;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        default: return a.name.localeCompare(b.name);
      }
    });

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setVerifiedOnly(false);
    setInStockOnly(false);
    setDiscountOnly(false);
    setFastDelivery(false);
    setCustomOrderOnly(false);
    setPriceFrom('');
    setPriceTo('');
    setMinOrderFilter('all');
    setLocationFilter('all');
    setSortBy('name');
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setShouldRestartSlideshow(true);
    setTimeout(() => setShouldRestartSlideshow(false), 100);
  };

  const handleSendInquiry = (product: Product) => {
    setSelectedProduct(product);
    setIsInquiryModalOpen(true);
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <WelcomeModal onOpen={handleModalOpen} onClose={handleModalClose} />
      <PageLayout>
        <CategoriesGrid />

        <div className="container mx-auto px-4 sm:px-6 pt-6 max-w-7xl">
          <PopularProducts limit={4} />
        </div>

        {/* Раздел товаров на главной: поиск → категории → товары с фильтрами */}
        <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Товары от поставщиков</h1>
            <button
              onClick={() => navigate('/catalog')}
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              Весь каталог
              <Icon name="ArrowRight" size={14} />
            </button>
          </div>

          {/* Поисковик */}
          <div className="relative mb-4">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск товаров, поставщиков, категорий..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-base transition-colors"
            />
          </div>

          {/* Категории */}
          {categories.length > 0 && (
            <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  categoryFilter === 'all'
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white border text-gray-700 hover:border-primary/40 hover:text-primary'
                }`}
              >
                Все товары
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    categoryFilter === cat
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white border text-gray-700 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Товары с фильтрами */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
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
                customOrderOnly={customOrderOnly}
                setCustomOrderOnly={setCustomOrderOnly}
                priceFrom={priceFrom}
                setPriceFrom={setPriceFrom}
                priceTo={priceTo}
                setPriceTo={setPriceTo}
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

            <div className="flex-1 min-w-0">
              <CatalogToolbar
                filteredProductsCount={filteredProducts.length}
                totalProducts={productsData.length}
                viewMode={viewMode}
                setViewMode={setViewMode}
                sortBy={sortBy}
                setSortBy={setSortBy}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                allProducts={productsData}
              />

              <div className="mt-4">
                {productsLoading ? (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="animate-pulse rounded-xl border-0 shadow-md overflow-hidden">
                        <div className="aspect-video bg-gray-200" />
                        <div className="p-5 space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-3 bg-gray-200 rounded w-1/2" />
                          <div className="h-6 bg-gray-200 rounded w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : productsData.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-xl shadow-md">
                    <Icon name="PackageSearch" size={64} className="mx-auto text-gray-300 mb-6" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">В каталоге пока нет товаров</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Поставщики ещё не добавили товары. Загляните позже — каталог пополняется.
                    </p>
                  </div>
                ) : (
                  <CatalogGrid
                    products={filteredProducts}
                    viewMode={viewMode}
                    onSendInquiry={handleSendInquiry}
                    onResetFilters={resetFilters}
                    onQuickView={handleQuickView}
                    onProductClick={(id) => navigate(`/product/${id}`)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <SupplierSection />
        <FeaturesSection />
        {/* ВЫКЛЮЧЕНО ТЕСТОВО: блок новостей. Чтобы вернуть — убрать false && (...) ниже. */}
        {false && <NewsSection />}
        <DeliverySection />
        <Footer />
      </PageLayout>

      <ProductInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        product={selectedProduct}
      />
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onSendInquiry={handleSendInquiry}
      />
    </div>
  );
};

export default Index;