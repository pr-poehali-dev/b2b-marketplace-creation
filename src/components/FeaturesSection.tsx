import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const FeaturesSection = () => {
  const features = [
    {
      icon: "Shield",
      title: "Верификация юридических лиц",
      description: "Полная проверка документов и статуса компании для безопасных сделок"
    },
    {
      icon: "Users",
      title: "Прямые контакты с поставщиками",
      description: "Работайте напрямую с производителями и оптовыми поставщиками"
    },
    {
      icon: "TrendingUp",
      title: "Оптовые цены",
      description: "Специальные условия для крупных закупок и долгосрочного сотрудничества"
    },
    {
      icon: "FileCheck",
      title: "Проверка документов",
      description: "Автоматическая верификация сертификатов и лицензий поставщиков"
    }
  ];

  const categories = [
    { name: "Промышленные товары", count: "2,500+" },
    { name: "Строительные материалы", count: "1,800+" },
    { name: "Продукты питания", count: "3,200+" },
    { name: "Текстиль и одежда", count: "1,500+" },
    { name: "Электроника", count: "950+" },
    { name: "Химическая продукция", count: "720+" }
  ];

  return (
    <>
      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Почему выбирают нашу платформу
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Мы создали безопасную и эффективную среду для B2B торговли с полной проверкой участников
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="catalog" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Каталог товаров
            </h2>
            <p className="text-lg text-gray-600">
              Широкий ассортимент товаров от проверенных поставщиков
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base">{category.name}</CardTitle>
                  <Icon name="ArrowRight" size={20} className="text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{category.count}</div>
                  <p className="text-xs text-gray-600 mt-1">товаров в категории</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;