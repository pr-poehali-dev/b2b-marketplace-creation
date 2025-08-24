import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Logo from "@/components/ui/logo";
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  // Определяем активный пункт меню
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 ml-64">
        <div className="flex items-center justify-end">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Icon name="LogIn" size={16} className="mr-2" />
              Войти
            </Button>
            <Button size="sm">
              <Icon name="UserPlus" size={16} className="mr-2" />
              Регистрация
            </Button>
          </div>
        </div>
      </div>
      
      {/* Боковая навигация */}
      <nav 
        className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r-2 border-gray-300 shadow-xl z-[9999] flex flex-col"
        style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}
      >
        <div className="p-4 border-b">
          <Logo />
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-4">
            {/* Основная навигация */}
            <div>
              <a 
                href="/" 
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                }`}
              >
                <Icon name="Home" size={18} />
                <span>Главная</span>
              </a>
            </div>

            {/* Заказы и продажи */}
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2">
                Продажи и заказы
              </div>
              <div className="space-y-1">
                <a 
                  href="/orders" 
                  className={`flex items-center justify-between space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/orders') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="ShoppingBag" size={18} />
                    <span>Все заказы</span>
                  </div>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">24</span>
                </a>
                <a 
                  href="/orders/pending" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ml-6 ${
                    isActive('/orders/pending') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="Clock" size={16} />
                  <span>В ожидании</span>
                </a>
                <a 
                  href="/orders/processing" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ml-6 ${
                    isActive('/orders/processing') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="Package" size={16} />
                  <span>В обработке</span>
                </a>
                <a 
                  href="/orders/completed" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ml-6 ${
                    isActive('/orders/completed') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="CheckCircle" size={16} />
                  <span>Выполненные</span>
                </a>
                <a 
                  href="/analytics" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/analytics') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="TrendingUp" size={18} />
                  <span>Аналитика продаж</span>
                </a>
              </div>
            </div>

            {/* Товары и каталог */}
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2">
                Товары и каталог
              </div>
              <div className="space-y-1">
                <a 
                  href="/catalog" 
                  className={`flex items-center justify-between space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/catalog') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Grid3x3" size={18} />
                    <span>Каталог товаров</span>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">2.5k</span>
                </a>
                <a 
                  href="/catalog/categories" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ml-6 ${
                    isActive('/catalog/categories') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="FolderOpen" size={16} />
                  <span>Категории</span>
                </a>
                <a 
                  href="/inventory" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/inventory') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="Warehouse" size={18} />
                  <span>Склад и остатки</span>
                </a>
                <a 
                  href="/returns" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/returns') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="RotateCcw" size={18} />
                  <span>Возвраты</span>
                </a>
              </div>
            </div>

            {/* Поставщики и закупки */}
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2">
                Поставщики
              </div>
              <div className="space-y-1">
                <a 
                  href="/suppliers" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/suppliers') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="Users" size={18} />
                  <span>Все поставщики</span>
                </a>
                <a 
                  href="/purchases" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/purchases') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="ShoppingCart" size={18} />
                  <span>Закупки</span>
                </a>
                <a 
                  href="/contracts" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/contracts') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="FileText" size={18} />
                  <span>Договоры</span>
                </a>
              </div>
            </div>

            {/* Финансы */}
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2">
                Финансы
              </div>
              <div className="space-y-1">
                <a 
                  href="/finance" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/finance') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="DollarSign" size={18} />
                  <span>Финансы</span>
                </a>
                <a 
                  href="/invoices" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/invoices') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="Receipt" size={18} />
                  <span>Счета</span>
                </a>
                <a 
                  href="/pricing" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/pricing') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="CreditCard" size={18} />
                  <span>Тарифы</span>
                </a>
              </div>
            </div>

            {/* Настройки и поддержка */}
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2">
                Поддержка
              </div>
              <div className="space-y-1">
                <a 
                  href="/settings" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/settings') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="Settings" size={18} />
                  <span>Настройки</span>
                </a>
                <a 
                  href="#contacts" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.hash === '#contacts' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="Phone" size={18} />
                  <span>Контакты</span>
                </a>
                <a 
                  href="#about" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.hash === '#about' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="Info" size={18} />
                  <span>О компании</span>
                </a>
                <a 
                  href="/help" 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive('/help') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon name="HelpCircle" size={18} />
                  <span>Помощь</span>
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