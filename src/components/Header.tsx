import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserProfile from './header/UserProfile';
import SidebarNavigation from './header/SidebarNavigation';
import Icon from '@/components/ui/icon';
import TrialExpirationNotice from '@/components/notifications/TrialExpirationNotice';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isPinned, setIsPinned] = useState(true);



  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Определяем активный пункт меню
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Управление разделами
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };



  // Функция поиска товаров
  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }
    
    setSearchLoading(true);
    
    // Симулируем данные товаров (в реальном проекте это будет API)
    const mockProducts = [
      { id: 57, name: "Гидравлический подъемник H-2000", category: "Погрузочное оборудование", price: "850 000 ₽" },
      { id: 58, name: "Электрическая тележка E-1500", category: "Складское оборудование", price: "320 000 ₽" },
      { id: 59, name: "Конвейерная лента KL-500", category: "Транспортировка", price: "145 000 ₽" },
      { id: 60, name: "Автопогрузчик Toyota 8FBE25", category: "Погрузочное оборудование", price: "1 250 000 ₽" },
      { id: 61, name: "Стеллаж металлический SM-300", category: "Складское оборудование", price: "25 000 ₽" },
    ];
    
    // Фильтруем товары по запросу
    const filtered = mockProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setTimeout(() => {
      setSearchResults(filtered);
      setShowSearchDropdown(true);
      setSearchLoading(false);
    }, 300);
  };

  // Обработчик изменения поискового запроса
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    searchProducts(value);
  };

  // Обработчик клика по товару
  const handleProductClick = (productId: number) => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    navigate(`/product/${productId}`);
  };

  // Определяем, должно ли меню быть развернутым
  const isMenuExpanded = isMobile || isHovered || isPinned;

  return (
    <>
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-40">
        <div className={`transition-all duration-300 overflow-hidden ${
          isMenuExpanded ? 'ml-56' : 'ml-16'
        }`}>
          <div className="container mx-auto px-4 py-4 max-w-none">
          <div className="flex items-center justify-between">
            
            {/* Поиск товаров - только на главной странице */}
            {location.pathname === '/' && (
              <div className="flex-1 max-w-md mx-8 hidden md:block relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Search" size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
                      setShowSearchDropdown(false);
                    }
                  }}
                  onFocus={() => searchQuery && setShowSearchDropdown(true)}
                  onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                
                {/* Загрузчик */}
                {searchLoading && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Icon name="Loader2" size={16} className="text-gray-400 animate-spin" />
                  </div>
                )}
              </div>
              
              {/* Выпадающий список результатов */}
              {showSearchDropdown && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-2xl z-[9999] max-h-80 overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full px-4 py-3 text-left hover:bg-white/80 hover:backdrop-blur-md border-b border-gray-100/50 last:border-b-0 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{product.category}</div>
                        </div>
                        <div className="text-sm font-semibold text-blue-600 ml-4">{product.price}</div>
                      </div>
                    </button>
                  ))}
                  
                  {/* Показать все результаты */}
                  <button
                    onClick={() => {
                      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
                      setShowSearchDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-center text-blue-600 hover:bg-blue-50/80 font-medium text-sm border-t border-gray-200/50 backdrop-blur-sm"
                  >
                    Показать все результаты поиска
                  </button>
                </div>
              )}
              
              {/* Нет результатов */}
              {showSearchDropdown && searchResults.length === 0 && searchQuery && !searchLoading && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-2xl z-[9999] p-4 text-center text-gray-500 text-sm">
                  Товары не найдены
                </div>
              )}
              </div>
            )}
            
            <UserProfile 
              isLoggedIn={isLoggedIn} 
              setIsLoggedIn={setIsLoggedIn} 
            />
          </div>
          </div>
        </div>
        
        <SidebarNavigation
          isMenuExpanded={isMenuExpanded}
          isMobile={isMobile}
          openSection={openSection}
          toggleSection={toggleSection}
          isActive={isActive}
          setIsHovered={setIsHovered}
          isPinned={isPinned}
          setIsPinned={handlePinToggle}
        />
      </header>

      {/* Уведомления о пробном периоде */}
      {user && user.user_type === 'supplier' && (
        <div className={`transition-all duration-300 ${
          isMenuExpanded ? 'ml-56' : 'ml-16'
        }`}>
          <div className="container mx-auto px-4 pt-4 max-w-none">
            <TrialExpirationNotice 
              onUpgrade={() => navigate('/pricing')}
              onDismiss={() => {}}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;