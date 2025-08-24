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
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
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
      <nav className="fixed left-0 bottom-0 top-0 w-64 bg-white border-r z-40">
        <div className="p-4 border-b">
          <Logo />
        </div>
        <div className="p-4">
          <div className="space-y-2">
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
            <a 
              href="/orders" 
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive('/orders') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
              }`}
            >
              <Icon name="ShoppingBag" size={18} />
              <span>Все заказы</span>
            </a>
            <a 
              href="/catalog" 
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive('/catalog') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
              }`}
            >
              <Icon name="Grid3x3" size={18} />
              <span>Каталог товаров</span>
            </a>
            <a 
              href="/suppliers" 
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive('/suppliers') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
              }`}
            >
              <Icon name="Users" size={18} />
              <span>Поставщики</span>
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
              <span>Наши тарифы</span>
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;