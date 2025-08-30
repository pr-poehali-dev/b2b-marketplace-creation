import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-4 sm:pt-6 pb-12 sm:pb-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Icon name="Star" size={14} className="mr-1" />
                Верифицированная платформа
              </Badge>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                Корпоративная платформа
                <span className="text-primary"> Business Market</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Цифровая торговая площадка для оптовых покупателей и продавцов. Помогаем предприятиям 
                малого и среднего бизнеса быстро находить надежных поставщиков и новых клиентов, 
                эффективно продвигать свою продукцию на рынке.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button size="lg" className="text-sm sm:text-base w-full sm:w-auto" onClick={() => navigate('/login')}>
                <Icon name="Search" size={18} className="mr-2" />
                Начать работу
              </Button>
              <Button variant="outline" size="lg" className="text-sm sm:text-base w-full sm:w-auto" onClick={() => navigate('/register')}>
                <Icon name="Store" size={18} className="mr-2" />
                Подключить поставщика
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4">
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-gray-900">2,500+</div>
                <div className="text-xs sm:text-sm text-gray-600">Поставщиков</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-gray-900">15,000+</div>
                <div className="text-xs sm:text-sm text-gray-600">Товаров</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-gray-900">98%</div>
                <div className="text-xs sm:text-sm text-gray-600">Довольных клиентов</div>
              </div>
            </div>
          </div>

          <div className="relative -mt-8 sm:-mt-16 lg:-mt-24 w-full sm:w-4/5 mx-auto">
            <img 
              src="/img/8b7fccbc-5aa7-4f7b-82e2-aabfd14263ff.jpg" 
              alt="Российские бизнес-партнеры заключают сделку"
              className="rounded-lg shadow-2xl w-full h-48 sm:h-64 lg:h-96 object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-green-500" />
                <span className="font-medium text-sm">Верифицировано</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;