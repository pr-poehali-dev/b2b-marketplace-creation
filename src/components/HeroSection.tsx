import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-6 sm:pt-8 pb-16 sm:pb-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center">
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-5 sm:space-y-6">
              <Badge variant="secondary" className="w-fit">
                <Icon name="Star" size={14} className="mr-1" />
                Верифицированная платформа
              </Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] sm:leading-tight">
                Корпоративная платформа
                <span className="text-primary"> Business Market</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Цифровая торговая площадка для оптовых покупателей и продавцов. Помогаем предприятиям 
                малого и среднего бизнеса быстро находить надежных поставщиков и новых клиентов, 
                эффективно продвигать свою продукцию на рынке.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
              <Button size="lg" className="text-base sm:text-lg h-12 sm:h-14 w-full sm:w-auto font-semibold" onClick={() => navigate('/login')}>
                <Icon name="Search" size={18} className="mr-2" />
                Начать работу
              </Button>
              <Button variant="outline" size="lg" className="text-base sm:text-lg h-12 sm:h-14 w-full sm:w-auto font-semibold" onClick={() => navigate('/register')}>
                <Icon name="Store" size={18} className="mr-2" />
                Подключить поставщика
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">2,500+</div>
                <div className="text-sm sm:text-base text-gray-600 mt-1">Поставщиков</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">15,000+</div>
                <div className="text-sm sm:text-base text-gray-600 mt-1">Товаров</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">98%</div>
                <div className="text-sm sm:text-base text-gray-600 mt-1">Довольных клиентов</div>
              </div>
            </div>
          </div>

          <div className="relative order-first lg:order-last mt-8 lg:-mt-16 w-full sm:w-5/6 lg:w-4/5 mx-auto">
            <img 
              src="/img/8b7fccbc-5aa7-4f7b-82e2-aabfd14263ff.jpg" 
              alt="Российские бизнес-партнеры заключают сделку"
              className="rounded-xl shadow-2xl w-full h-56 sm:h-72 lg:h-96 object-cover"
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