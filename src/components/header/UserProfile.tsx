import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';
import UserTypeSelector from '@/components/auth/UserTypeSelector';

interface AuthUser {
  id: number;
  phone: string;
  user_type: 'buyer' | 'supplier';
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
}

interface UserProfileProps {
  isLoggedIn: boolean;
  user: AuthUser | null;
  onLogout: () => void;
}

const UserProfile = ({ isLoggedIn, user, onLogout }: UserProfileProps) => {
  const navigate = useNavigate();
  const { getTotalFavorites } = useFavorites();
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(false);

  const isSupplier = user?.user_type === 'supplier';
  const displayName = user
    ? [user.first_name, user.last_name].filter(Boolean).join(' ') || user.company_name || user.phone
    : '';
  const displayContact = user?.email || user?.phone || '';

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
      {isLoggedIn && (
        <Button
          variant="ghost"
          size="sm"
          className="relative"
          onClick={() => navigate('/favorites')}
          data-favorites-icon
        >
          <Icon name="Heart" size={20} />
          {getTotalFavorites() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-white">
              {getTotalFavorites()}
            </Badge>
          )}
        </Button>
      )}
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-white">
                  <Icon name="User" size={16} />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <Icon name="User" size={16} className="mr-2" />
              <div className="flex flex-col space-y-1 flex-1">
                <p className="text-sm font-medium leading-none">{displayName}</p>
                <p className="text-xs text-muted-foreground">{displayContact}</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
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
              Все заказы
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/orders/pending')}
            >
              <Icon name="Clock" size={16} className="mr-2" />
              В ожидании
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/orders/processing')}
            >
              <Icon name="Package" size={16} className="mr-2" />
              В обработке
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/orders/completed')}
            >
              <Icon name="CheckCircle" size={16} className="mr-2" />
              Выполненные
            </DropdownMenuItem>
            {isSupplier && (
              <DropdownMenuItem 
                className="flex items-center cursor-pointer"
                onClick={() => navigate('/analytics')}
              >
                <Icon name="TrendingUp" size={16} className="mr-2" />
                Аналитика продаж
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center cursor-pointer text-red-600"
              onClick={handleLogout}
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
            onClick={() => setShowUserTypeSelector(true)}
          >
            <Icon name="UserPlus" size={14} className="mr-1 md:mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Регистрация</span>
            <span className="sm:hidden">Рег.</span>
          </Button>
        </>
      )}
      
      {/* Селектор типа пользователя */}
      {showUserTypeSelector && (
        <UserTypeSelector onClose={() => setShowUserTypeSelector(false)} />
      )}
    </div>
  );
};

export default UserProfile;