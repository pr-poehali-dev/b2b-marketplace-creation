import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const WelcomeModal = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Показать модал через 2 секунды после загрузки
    const timer = setTimeout(() => {
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
      if (!hasSeenWelcome) {
        setIsVisible(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const handleAction = (action: string) => {
    handleClose();
    navigate(action);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full relative overflow-hidden animate-fade-in-up">
        {/* Декоративный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-50 to-indigo-50"></div>
        
        {/* Анимированные элементы */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-primary/10 rounded-full animate-ping"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 bg-blue-200/50 rounded-full animate-bounce"></div>

        <div className="relative p-8">
          {/* Кнопка закрытия */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full"
          >
            <Icon name="X" size={20} />
          </Button>

          {/* Заголовок с иконкой */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 animate-glow">
              <Icon name="Sparkles" size={40} className="text-primary animate-bounce" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Добро пожаловать в Business Market!
            </h2>
            
            <p className="text-lg text-gray-600">
              Платформа B2B торговли нового поколения
            </p>
          </div>

          {/* Преимущества */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
              <Icon name="Users" size={24} className="text-green-600 mx-auto mb-2" />
              <div className="font-semibold text-green-800">15,000+</div>
              <div className="text-sm text-green-600">Компаний</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
              <Icon name="Package" size={24} className="text-blue-600 mx-auto mb-2" />
              <div className="font-semibold text-blue-800">500k+</div>
              <div className="text-sm text-blue-600">Товаров</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
              <Icon name="Zap" size={24} className="text-purple-600 mx-auto mb-2" />
              <div className="font-semibold text-purple-800">24/7</div>
              <div className="text-sm text-purple-600">Поддержка</div>
            </div>
          </div>

          {/* Специальное предложение */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-orange-200 rounded-2xl p-6 mb-8 text-center">
            <div className="inline-flex items-center bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 animate-pulse">
              🎉 СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ
            </div>
            <h3 className="text-xl font-bold text-orange-800 mb-2">
              Первые 30 дней бесплатно!
            </h3>
            <p className="text-orange-700">
              Полный доступ ко всем функциям платформы без ограничений
            </p>
          </div>

          {/* Кнопки действий */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              size="lg"
              onClick={() => handleAction('/register')}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
            >
              <Icon name="UserPlus" size={20} className="mr-2 group-hover:animate-bounce" />
              Начать бесплатно
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              onClick={() => handleAction('/catalog')}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Icon name="Search" size={20} className="mr-2" />
              Посмотреть товары
            </Button>
          </div>

          {/* Дополнительная информация */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Без обязательств • Отмена в любое время • Поддержка 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;