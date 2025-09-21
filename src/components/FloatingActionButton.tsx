import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const FloatingActionButton = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Показать кнопку через 5 секунд
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    // Автоматически развернуть через 7 секунд
    const expandTimer = setTimeout(() => {
      setIsExpanded(true);
      // Свернуть обратно через 5 секунд
      setTimeout(() => setIsExpanded(false), 5000);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(expandTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Основная кнопка */}
        <Button
          onClick={() => navigate('/register')}
          className={`bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-bold shadow-2xl border-0 transition-all duration-500 transform hover:scale-110 active:scale-95 ${
            isExpanded 
              ? 'rounded-full px-6 py-4 pr-12' 
              : 'rounded-full w-16 h-16'
          }`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setTimeout(() => setIsExpanded(false), 2000)}
        >
          <div className="flex items-center">
            <Icon 
              name="Rocket" 
              size={24} 
              className="animate-bounce text-white" 
            />
            {isExpanded && (
              <span className="ml-2 whitespace-nowrap animate-fade-in-left">
                Начать бесплатно!
              </span>
            )}
          </div>
        </Button>

        {/* Пульсирующий эффект */}
        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></div>
        
        {/* Дополнительные кружки */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
        </div>

        {/* Всплывающая подсказка */}
        {isExpanded && (
          <div className="absolute bottom-full right-0 mb-2 animate-fade-in-up">
            <div className="bg-gray-900 text-white text-sm rounded-lg py-2 px-3 whitespace-nowrap shadow-xl">
              🎉 Первые 30 дней бесплатно!
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingActionButton;