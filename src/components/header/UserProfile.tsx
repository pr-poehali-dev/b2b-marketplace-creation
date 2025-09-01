import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';

interface UserProfileProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const UserProfile = ({ isLoggedIn, setIsLoggedIn }: UserProfileProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/user-profile.jpg" alt="Профиль" />
                <AvatarFallback className="bg-primary text-white">ИИ</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <Icon name="User" size={16} className="mr-2" />
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Иван Иванов</p>
                <p className="text-xs text-muted-foreground">ivan@company.ru</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <Icon name="Building2" size={16} className="mr-2" />
              Моя карточка компании
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/settings')}
            >
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/orders')}
            >
              <Icon name="ShoppingBag" size={16} className="mr-2" />
              Мои заказы
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center cursor-pointer text-red-600"
              onClick={() => setIsLoggedIn(false)}
            >
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default UserProfile;