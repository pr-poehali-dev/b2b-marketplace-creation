import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Logo from "@/components/ui/logo";

const Header = () => {
  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Logo />
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/orders" className="text-gray-600 hover:text-primary transition-colors">Все заказы</a>
              <a href="#catalog" className="text-gray-600 hover:text-primary transition-colors">Каталог товаров</a>
              <a href="#delivery" className="text-gray-600 hover:text-primary transition-colors">Доставка</a>
              <a href="#contacts" className="text-gray-600 hover:text-primary transition-colors">Контакты</a>
              <a href="#about" className="text-gray-600 hover:text-primary transition-colors">О компании</a>
            </nav>
          </div>
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
    </header>
  );
};

export default Header;