import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserProfile from './header/UserProfile';
import SidebarNavigation from './header/SidebarNavigation';
import MobileMenu from './header/MobileMenu';
import Logo from '@/components/ui/logo';
import Icon from '@/components/ui/icon';
import TrialExpirationNotice from '@/components/notifications/TrialExpirationNotice';
import { useAuth } from '@/contexts/AuthContext';
import { useLayout } from '@/contexts/LayoutContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { isMobile, isMenuOpen, setIsMenuOpen } = useLayout();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: number; name: string; category: string; price: string }[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }
    setSearchLoading(true);
    const mockProducts = [
      { id: 57, name: "Гидравлический подъемник H-2000", category: "Погрузочное оборудование", price: "850 000 ₽" },
      { id: 58, name: "Электрическая тележка E-1500", category: "Складское оборудование", price: "320 000 ₽" },
      { id: 59, name: "Конвейерная лента KL-500", category: "Транспортировка", price: "145 000 ₽" },
      { id: 60, name: "Автопогрузчик Toyota 8FBE25", category: "Погрузочное оборудование", price: "1 250 000 ₽" },
      { id: 61, name: "Стеллаж металлический SM-300", category: "Складское оборудование", price: "25 000 ₽" },
    ];
    const filtered = mockProducts.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    setTimeout(() => {
      setSearchResults(filtered);
      setShowSearchDropdown(true);
      setSearchLoading(false);
    }, 300);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    searchProducts(value);
  };

  const handleProductClick = (productId: number) => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    navigate(`/product/${productId}`);
  };

  // Закрывать мобильное меню при переходе по маршруту
  useEffect(() => {
    if (isMobile) setIsMenuOpen(false);
  }, [location.pathname, isMobile]);

  return (
    <>
      {/* Overlay при открытом поиске */}
      {showSearchDropdown && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[45] animate-in fade-in duration-200"
          onClick={() => setShowSearchDropdown(false)}
        />
      )}

      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div>
          <div className="container mx-auto px-4 py-3 max-w-none">
            <div className="flex items-center justify-between gap-3">

              {/* Бургер-кнопка на мобильном */}
              {isMobile && (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                  aria-label="Открыть меню"
                >
                  <Icon name={isMenuOpen ? "X" : "Menu"} size={22} className="text-gray-600" />
                </button>
              )}

              {/* Логотип */}
              <div className="flex-shrink-0">
                <Logo isCollapsed={isMobile} />
              </div>

              {/* ТЕСТОВО: навигация перенесена между логотипом и избранным */}
              {!isMobile && (
                <div className="flex-1 min-w-0">
                  <SidebarNavigation isActive={isActive} />
                </div>
              )}

              {/* Поиск — только на главной */}
              {location.pathname === '/' ? (
                <div className="flex-1 mx-4 lg:mx-6 hidden md:block relative">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Icon name="Search" size={22} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Найти товары, бренды, категории..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                          navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
                          setShowSearchDropdown(false);
                        }
                      }}
                      onFocus={() => searchQuery && setShowSearchDropdown(true)}
                      onBlur={() => setTimeout(() => setShowSearchDropdown(false), 300)}
                      className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl leading-5 bg-white/80 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary text-base transition-all duration-200 shadow-sm hover:shadow-md hover:border-gray-300"
                    />
                    {searchLoading && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <Icon name="Loader2" size={20} className="text-primary animate-spin" />
                      </div>
                    )}
                  </div>

                  {showSearchDropdown && searchResults.length > 0 && (
                    <div
                      onMouseDown={(e) => e.preventDefault()}
                      className="absolute left-0 right-0 top-full mt-2 bg-white border-2 border-gray-200/80 rounded-2xl shadow-2xl z-[100] max-h-96 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      {searchResults.map((product, index) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product.id)}
                          style={{ animationDelay: `${index * 30}ms` }}
                          className="w-full px-5 py-4 text-left hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent border-b border-gray-100/60 last:border-b-0 transition-all duration-200 group animate-in fade-in slide-in-from-left-1"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 text-base group-hover:text-primary transition-colors">{product.name}</div>
                              <div className="text-sm text-gray-500 mt-1.5">{product.category}</div>
                            </div>
                            <div className="text-base font-bold text-primary ml-6">{product.price}</div>
                          </div>
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
                          setShowSearchDropdown(false);
                        }}
                        className="w-full px-5 py-4 text-center text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 font-semibold text-base border-t-2 border-gray-200/50 backdrop-blur-sm rounded-b-2xl transition-all duration-200"
                      >
                        Показать все результаты поиска
                      </button>
                    </div>
                  )}

                  {showSearchDropdown && searchResults.length === 0 && searchQuery && !searchLoading && (
                    <div
                      onMouseDown={(e) => e.preventDefault()}
                      className="absolute left-0 right-0 top-full mt-2 bg-white border-2 border-gray-200/80 rounded-2xl shadow-2xl z-[100] p-6 text-center text-gray-500 text-base animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      Товары не найдены
                    </div>
                  )}
                </div>
              ) : (
                isMobile && <div className="flex-1" />
              )}

              <UserProfile
                isLoggedIn={isAuthenticated}
                user={user}
                onLogout={logout}
              />
            </div>
          </div>
        </div>
      </header>

      {isMobile && (
        <MobileMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} isActive={isActive} />
      )}

      {/* ТЕСТОВО: поисковик товаров, добавлен под шапкой */}
      <div className="container mx-auto px-4 pt-4 max-w-none">
        <div className="relative w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon name="Search" size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Найти товары, бренды, категории..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
                  setShowSearchDropdown(false);
                }
              }}
              onFocus={() => searchQuery && setShowSearchDropdown(true)}
              onBlur={() => setTimeout(() => setShowSearchDropdown(false), 300)}
              className="block w-full pl-11 pr-4 py-2.5 border-2 border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:border-gray-300"
            />
            {searchLoading && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <Icon name="Loader2" size={18} className="text-primary animate-spin" />
              </div>
            )}
          </div>

          {showSearchDropdown && searchResults.length > 0 && (
            <div
              onMouseDown={(e) => e.preventDefault()}
              className="absolute left-0 right-0 top-full mt-2 bg-white border-2 border-gray-200/80 rounded-2xl shadow-2xl z-[100] max-h-96 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {searchResults.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  style={{ animationDelay: `${index * 30}ms` }}
                  className="w-full px-5 py-4 text-left hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent border-b border-gray-100/60 last:border-b-0 transition-all duration-200 group animate-in fade-in slide-in-from-left-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-base group-hover:text-primary transition-colors">{product.name}</div>
                      <div className="text-sm text-gray-500 mt-1.5">{product.category}</div>
                    </div>
                    <div className="text-base font-bold text-primary ml-6">{product.price}</div>
                  </div>
                </button>
              ))}
              <button
                onClick={() => {
                  navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
                  setShowSearchDropdown(false);
                }}
                className="w-full px-5 py-4 text-center text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 font-semibold text-base border-t-2 border-gray-200/50 backdrop-blur-sm rounded-b-2xl transition-all duration-200"
              >
                Показать все результаты поиска
              </button>
            </div>
          )}

          {showSearchDropdown && searchResults.length === 0 && searchQuery && !searchLoading && (
            <div
              onMouseDown={(e) => e.preventDefault()}
              className="absolute left-0 right-0 top-full mt-2 bg-white border-2 border-gray-200/80 rounded-2xl shadow-2xl z-[100] p-6 text-center text-gray-500 text-base animate-in fade-in slide-in-from-top-2 duration-200"
            >
              Товары не найдены
            </div>
          )}
        </div>
      </div>

      {/* Уведомления о пробном периоде */}
      {user && user.user_type === 'supplier' && (
        <div className="container mx-auto px-4 pt-4 max-w-none">
          <TrialExpirationNotice
            onUpgrade={() => navigate('/pricing')}
            onDismiss={() => {}}
          />
        </div>
      )}
    </>
  );
};

export default Header;