import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Logo from "@/components/ui/logo";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Определяем активный пункт меню
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Управление разделами
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-40">
      <div className={`transition-all duration-300 overflow-hidden ${
        isHovered ? 'ml-64' : 'ml-16'
      }`}>
        <div className="container mx-auto px-4 py-4 max-w-none">
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
              <Button variant="outline" size="sm" className="text-xs md:text-sm px-2 md:px-3">
                <Icon name="LogIn" size={14} className="mr-1 md:mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">Войти</span>
                <span className="sm:hidden">Вход</span>
              </Button>
              <Button size="sm" className="text-xs md:text-sm px-2 md:px-3">
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
          isHovered ? 'w-64' : 'w-16'
        }`}
        style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-4 border-b flex items-center justify-center">
          {isHovered ? <Logo /> : <Icon name="Menu" size={28} className="text-primary font-bold" />}
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-4">
            {/* Основная навигация */}
            <div>
              <a 
                href="/" 
                className={`flex items-center justify-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-primary text-white' 
                    : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <Icon name="Home" size={22} className="font-bold" />
                {isHovered && <span>Главная</span>}
              </a>
            </div>

            {/* Заказы и продажи */}
            <div>
              <div className="space-y-1">
                <button 
                  onClick={() => toggleSection('orders')}
                  className={`w-full flex items-center justify-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/orders') || openSection === 'orders'
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="ShoppingBag" size={22} className="font-bold" />
                    {isHovered && <span>Заказы и продажи</span>}
                  </div>
                  {isHovered && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">24</span>
                      <Icon 
                        name={openSection === 'orders' ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                      />
                    </div>
                  )}
                </button>
                {openSection === 'orders' && isHovered && (
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
                      {isHovered && <span>Все заказы</span>}
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
                      {isHovered && <span>В ожидании</span>}
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
                      {isHovered && <span>В обработке</span>}
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
                      {isHovered && <span>Выполненные</span>}
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
                      {isHovered && <span>Аналитика продаж</span>}
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
                  className={`w-full flex items-center justify-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/catalog') || openSection === 'catalog'
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Grid3x3" size={22} className="font-bold" />
                    {isHovered && <span>Товары и каталог</span>}
                  </div>
                  {isHovered && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">2.5k</span>
                      <Icon 
                        name={openSection === 'catalog' ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                      />
                    </div>
                  )}
                </button>
                {openSection === 'catalog' && isHovered && (
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
                      {isHovered && <span>Все товары</span>}
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
                      {isHovered && <span>Категории</span>}
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
                      {isHovered && <span>Склад и остатки</span>}
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
                      {isHovered && <span>Возвраты</span>}
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
                  className={`w-full flex items-center justify-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/suppliers') || openSection === 'suppliers'
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Users" size={22} className="font-bold" />
                    {isHovered && <span>Поставщики</span>}
                  </div>
                  {isHovered && (
                    <Icon 
                      name={openSection === 'suppliers' ? 'ChevronUp' : 'ChevronDown'} 
                      size={16} 
                    />
                  )}
                </button>
                {openSection === 'suppliers' && isHovered && (
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
                      {isHovered && <span>Все поставщики</span>}
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
                      {isHovered && <span>Закупки</span>}
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
                      {isHovered && <span>Договоры</span>}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Финансы */}
            <div>
              <div className="space-y-1">
                <button 
                  onClick={() => toggleSection('finance')}
                  className={`w-full flex items-center justify-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/finance') || openSection === 'finance'
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="DollarSign" size={22} className="font-bold" />
                    {isHovered && <span>Финансы</span>}
                  </div>
                  {isHovered && (
                    <Icon 
                      name={openSection === 'finance' ? 'ChevronUp' : 'ChevronDown'} 
                      size={16} 
                    />
                  )}
                </button>
                {openSection === 'finance' && isHovered && (
                  <div className="space-y-1 ml-6">
                    <a 
                      href="/finance" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/finance') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="TrendingUp" size={16} />
                      {isHovered && <span>Общая статистика</span>}
                    </a>
                    <a 
                      href="/invoices" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/invoices') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="Receipt" size={16} />
                      {isHovered && <span>Счета</span>}
                    </a>
                    <a 
                      href="/pricing" 
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                        isActive('/pricing') 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                      }`}
                    >
                      <Icon name="CreditCard" size={16} />
                      {isHovered && <span>Тарифы</span>}
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
                  className={`flex items-center justify-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/settings') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <Icon name="Settings" size={22} className="font-bold" />
                  {isHovered && <span>Настройки</span>}
                </a>
                <a 
                  href="#contacts" 
                  className={`flex items-center justify-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.hash === '#contacts' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <Icon name="Phone" size={22} className="font-bold" />
                  {isHovered && <span>Контакты</span>}
                </a>
                <a 
                  href="#about" 
                  className={`flex items-center justify-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.hash === '#about' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <Icon name="Info" size={22} className="font-bold" />
                  {isHovered && <span>О компании</span>}
                </a>
                <a 
                  href="/help" 
                  className={`flex items-center justify-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/help') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <Icon name="HelpCircle" size={22} className="font-bold" />
                  {isHovered && <span>Помощь</span>}
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