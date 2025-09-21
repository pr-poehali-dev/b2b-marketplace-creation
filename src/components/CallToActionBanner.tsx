import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CallToActionBanner = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="relative bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm overflow-hidden">
        {/* Анимированный фон */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-600/20 to-indigo-600/20 animate-pulse"></div>
        
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-ping"></div>
        </div>

        <div className="relative p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm animate-glow">
                  <Icon name="Zap" size={24} className="text-yellow-300" />
                </div>
                <div className="bg-yellow-300 text-gray-900 px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                  🔥 ГОРЯЧЕЕ ПРЕДЛОЖЕНИЕ
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                Начните торговать сегодня!
                <span className="block text-lg md:text-xl font-normal text-blue-100 mt-1">
                  Первые 30 дней бесплатно
                </span>
              </h2>
              
              <p className="text-blue-100 mb-6 text-base md:text-lg">
                Присоединяйтесь к 15,000+ компаний, которые уже увеличили продажи через Business Market
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg"
                  onClick={() => navigate('/register')}
                  className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
                >
                  <Icon name="Rocket" size={20} className="mr-2 group-hover:animate-bounce" />
                  Регистрация бесплатно
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/catalog')}
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Icon name="Search" size={20} className="mr-2" />
                  Смотреть товары
                </Button>
              </div>
            </div>

            {/* Статистика */}
            <div className="hidden lg:block ml-8">
              <div className="grid grid-cols-1 gap-4 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-yellow-300">15,000+</div>
                  <div className="text-sm text-blue-100">Компаний</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-yellow-300">500k+</div>
                  <div className="text-sm text-blue-100">Товаров</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-yellow-300">24/7</div>
                  <div className="text-sm text-blue-100">Поддержка</div>
                </div>
              </div>
            </div>

            {/* Кнопка закрытия */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Прогресс-бар снизу */}
        <div className="h-1 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 animate-pulse"></div>
      </div>
    </div>
  );
};

export default CallToActionBanner;