import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Icon name="Star" size={14} className="mr-1" />
                Верифицированная платформа
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                B2B маркетплейс для
                <span className="text-primary"> оптовых продаж</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Крупнейшая платформа для прямых оптовых закупок. Верифицированные поставщики, 
                проверенные документы, выгодные цены для вашего бизнеса.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base">
                <Icon name="Search" size={18} className="mr-2" />
                Найти поставщика
              </Button>
              <Button variant="outline" size="lg" className="text-base">
                <Icon name="Store" size={18} className="mr-2" />
                Стать поставщиком
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">2,500+</div>
                <div className="text-sm text-gray-600">Поставщиков</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">15,000+</div>
                <div className="text-sm text-gray-600">Товаров</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Довольных клиентов</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="/img/e609e60c-cb27-4ef8-809f-b5d3ba4a4fe1.jpg" 
              alt="Деловое рукопожатие"
              className="rounded-lg shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
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