import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Logo from "@/components/ui/logo";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Определяем, должно ли меню быть развернутым
  const isMenuExpanded = isMobile || isHovered;

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-40">
      <div className={`transition-all duration-300 overflow-hidden ${
        isMenuExpanded ? 'ml-56' : 'ml-16'
      }`}>
        <div className="container mx-auto px-4 py-4 max-w-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-base sm:text-lg font-bold text-gray-900">Business Market</span>
              <span className="hidden sm:inline text-sm text-gray-600 ml-2">платформа для бизнеса</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs md:text-sm px-2 md:px-3"
                onClick={() => navigate('/login')}
              >
                <Icon name="LogIn" size={14} className="mr-1 md:mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">Войти</span>
                <span className="sm:hidden">Вход</span>
              </Button>
              <Button 
                size="sm" 
                className="text-xs md:text-sm px-2 md:px-3"
                onClick={() => navigate('/register')}
              >
                <Icon name="UserPlus" size={14} className="mr-1 md:mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">Регистрация</span>
                <span className="sm:hidden">Рег.</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Боковая навигация */}
      <nav 
        className={`fixed left-0 top-0 bottom-0 bg-white border-r-2 border-gray-300 shadow-xl z-[9999] flex flex-col transition-all duration-300 ${
          isMenuExpanded ? 'w-56' : 'w-16'
        }`}
        style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        <div className="py-4 px-6 border-b flex items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-50">
          <Logo isCollapsed={!isMenuExpanded} />
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-2">
            {/* Основная навигация */}
            <div>
              <a 
                href="/" 
                className={`flex items-center ${isMenuExpanded ? 'p-3' : 'p-2 justify-center'} rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-primary text-white' 
                    : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {isMenuExpanded ? (
                  <>
                    <div className="w-6 flex justify-center">
                      <Icon name="Home" size={16} className="font-medium" />
                    </div>
                    <span className="ml-3">Главная</span>
                  </>
                ) : (
                  <Icon name="Home" size={28} className="font-bold" />
                )}
              </a>
            </div>

            {/* Заказы и продажи */}
            <div>
              <div className="space-y-1">
                <button 
                  onClick={() => toggleSection('orders')}
                  className={`w-full flex items-center ${isMenuExpanded ? 'p-3' : 'p-2 justify-center'} rounded-lg transition-colors ${
                    isActive('/orders') || openSection === 'orders'
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {isMenuExpanded ? (
                    <>
                      <div className="w-6 flex justify-center">
                        <Icon name="ShoppingBag" size={16} className="font-medium" />
                      </div>
                      <span className="ml-3 flex-1">Заказы и продажи</span>
                    </>
                  ) : (
                    <Icon name="ShoppingBag" size={28} className="font-bold" />
                  )}
                  {isMenuExpanded && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">24</span>
                      <Icon 
                        name={openSection === 'orders' ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                      />
                    </div>
                  )}
                </button>
                {openSection === 'orders' && isMenuExpanded && (
                  <div className="space-y-1 ml-6">
                    <a 
                      href="/orders" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/orders') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="List" size={16} />
                      {isMenuExpanded && <span>Все заказы</span>}
                    </a>
                    <a 
                      href="/orders/pending" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/orders/pending') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="Clock" size={16} />
                      {isMenuExpanded && <span>В ожидании</span>}
                    </a>
                    <a 
                      href="/orders/processing" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/orders/processing') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="Package" size={16} />
                      {isMenuExpanded && <span>В обработке</span>}
                    </a>
                    <a 
                      href="/orders/completed" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/orders/completed') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="CheckCircle" size={16} />
                      {isMenuExpanded && <span>Выполненные</span>}
                    </a>
                    <a 
                      href="/analytics" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/analytics') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="TrendingUp" size={16} />
                      {isMenuExpanded && <span>Аналитика продаж</span>}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Товары и каталог */}
            <div>
              <div className="space-y-1">
                <button 
                  onClick={() => toggleSection('catalog')}
                  className={`w-full flex items-center ${isMenuExpanded ? 'p-3' : 'p-2 justify-center'} rounded-lg transition-colors ${
                    isActive('/catalog') || openSection === 'catalog'
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {isMenuExpanded ? (
                    <>
                      <div className="w-6 flex justify-center">
                        <Icon name="Grid3x3" size={16} className="font-medium" />
                      </div>
                      <span className="ml-3 flex-1">Товары и каталог</span>
                    </>
                  ) : (
                    <Icon name="Grid3x3" size={28} className="font-bold" />
                  )}
                  {isMenuExpanded && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">2.5k</span>
                      <Icon 
                        name={openSection === 'catalog' ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                      />
                    </div>
                  )}
                </button>
                {openSection === 'catalog' && isMenuExpanded && (
                  <div className="space-y-1 ml-6">
                    <a 
                      href="/catalog" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/catalog') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="List" size={16} />
                      {isMenuExpanded && <span>Все товары</span>}
                    </a>
                    <a 
                      href="/catalog/categories" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/catalog/categories') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="FolderOpen" size={16} />
                      {isMenuExpanded && <span>Категории</span>}
                    </a>
                    <a 
                      href="/inventory" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/inventory') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="Warehouse" size={16} />
                      {isMenuExpanded && <span>Склад и остатки</span>}
                    </a>
                    <a 
                      href="/returns" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/returns') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="RotateCcw" size={16} />
                      {isMenuExpanded && <span>Возвраты</span>}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Поставщики и закупки */}
            <div>
              <div className="space-y-1">
                <button 
                  onClick={() => toggleSection('suppliers')}
                  className={`w-full flex items-center ${isMenuExpanded ? 'p-3' : 'p-2 justify-center'} rounded-lg transition-colors ${
                    isActive('/suppliers') || openSection === 'suppliers'
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {isMenuExpanded ? (
                    <>
                      <div className="w-6 flex justify-center">
                        <Icon name="Users" size={16} className="font-medium" />
                      </div>
                      <span className="ml-3 flex-1">Поставщики</span>
                    </>
                  ) : (
                    <Icon name="Users" size={28} className="font-bold" />
                  )}
                  {isMenuExpanded && (
                    <Icon 
                      name={openSection === 'suppliers' ? 'ChevronUp' : 'ChevronDown'} 
                      size={16} 
                    />
                  )}
                </button>
                {openSection === 'suppliers' && isMenuExpanded && (
                  <div className="space-y-1 ml-6">
                    <a 
                      href="/suppliers" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/suppliers') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="Users" size={16} />
                      {isMenuExpanded && <span>Все поставщики</span>}
                    </a>
                    <a 
                      href="/purchases" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/purchases') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="ShoppingCart" size={16} />
                      {isMenuExpanded && <span>Закупки</span>}
                    </a>
                    <a 
                      href="/contracts" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/contracts') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="FileText" size={16} />
                      {isMenuExpanded && <span>Договоры</span>}
                    </a>
                  </div>
                )}
              </div>
            </div>



            {/* Настройки и поддержка */}
            <div>
              <div className="space-y-1">
                <a 
                  href="/settings" 
                  className={`flex items-center ${isMenuExpanded ? 'p-3' : 'p-2 justify-center'} rounded-lg transition-colors ${
                    isActive('/settings') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {isMenuExpanded ? (
                    <>
                      <div className="w-6 flex justify-center">
                        <Icon name="Settings" size={16} className="font-medium" />
                      </div>
                      <span className="ml-3">Настройки</span>
                    </>
                  ) : (
                    <Icon name="Settings" size={28} className="font-bold" />
                  )}
                </a>

                <a 
                  href="/about" 
                  className={`flex items-center ${isMenuExpanded ? 'p-3' : 'p-2 justify-center'} rounded-lg transition-colors ${
                    isActive('/about') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {isMenuExpanded ? (
                    <>
                      <div className="w-6 flex justify-center">
                        <Icon name="Info" size={16} className="font-medium" />
                      </div>
                      <span className="ml-3">О компании</span>
                    </>
                  ) : (
                    <Icon name="Info" size={28} className="font-bold" />
                  )}
                </a>
                <a 
                  href="/help" 
                  className={`flex items-center ${isMenuExpanded ? 'p-3' : 'p-2 justify-center'} rounded-lg transition-colors ${
                    isActive('/help') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {isMenuExpanded ? (
                    <>
                      <div className="w-6 flex justify-center">
                        <Icon name="HelpCircle" size={16} className="font-medium" />
                      </div>
                      <span className="ml-3">Помощь</span>
                    </>
                  ) : (
                    <Icon name="HelpCircle" size={28} className="font-bold" />
                  )}
                </a>
                <a 
                  href="/contacts" 
                  className={`flex items-center ${isMenuExpanded ? 'p-3' : 'p-2 justify-center'} rounded-lg transition-colors ${
                    isActive('/contacts') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {isMenuExpanded ? (
                    <>
                      <div className="w-6 flex justify-center">
                        <Icon name="Phone" size={16} className="font-medium" />
                      </div>
                      <span className="ml-3">Контакты</span>
                    </>
                  ) : (
                    <Icon name="Phone" size={28} className="font-bold" />
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>


    </header>
  );
};

export default Header;