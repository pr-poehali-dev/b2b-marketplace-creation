import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('welcomeModalSeen');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('welcomeModalSeen', 'true');
  };

  const handleGetStarted = () => {
    handleClose();
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 relative shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="X" size={24} />
        </button>
        
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Sparkles" size={32} className="text-blue-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Добро пожаловать в
          </h2>
          <h1 className="text-3xl font-black text-blue-600 mb-6">
            Бизнес Маркет
          </h1>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            Ваш надежный партнер в сфере B2B торговли. Тысячи качественных товаров 
            от проверенных поставщиков с выгодными условиями для бизнеса.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={handleGetStarted}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="Search" size={20} />
              Начать поиск товаров
            </button>
            
            <button
              onClick={handleClose}
              className="w-full text-gray-500 py-2 px-6 rounded-xl hover:text-gray-700 transition-colors"
            >
              Посмотреть позже
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={16} />
                <span>Безопасно</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Truck" size={16} />
                <span>Быстрая доставка</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Star" size={16} />
                <span>Качество</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;