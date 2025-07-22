import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const Index = () => {
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

  const suppliers = [
    {
      name: "ООО \"Промышленные решения\"",
      verified: true,
      category: "Металлургия",
      products: "150+ товаров",
      rating: 4.8
    },
    {
      name: "АО \"СтройМатериалы Регион\"",
      verified: true,
      category: "Строительство",
      products: "320+ товаров",
      rating: 4.9
    },
    {
      name: "ИП Петров А.В.\"",
      verified: false,
      category: "Продукты питания",
      products: "85+ товаров",
      rating: 4.6
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Icon name="Building" size={24} className="text-primary" />
                <span className="text-xl font-bold text-gray-900">B2B Маркетплейс</span>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#suppliers" className="text-gray-600 hover:text-primary transition-colors">Поставщики</a>
                <a href="#catalog" className="text-gray-600 hover:text-primary transition-colors">Каталог</a>
                <a href="#buyers" className="text-gray-600 hover:text-primary transition-colors">Покупатели</a>
                <a href="#contacts" className="text-gray-600 hover:text-primary transition-colors">Контакты</a>
              </nav>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
              <Button size="sm">
                <Icon name="UserPlus" size={16} className="mr-2" />
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
              Найдите то, что нужно вашему бизнесу
            </h2>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input 
                    placeholder="Поиск товаров, категорий, поставщиков..." 
                    className="text-base h-12"
                  />
                </div>
                <Button size="lg" className="px-8">
                  <Icon name="Search" size={20} className="mr-2" />
                  Поиск
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-sm text-gray-600">Популярные запросы:</span>
                {["Металлопрокат", "Стройматериалы", "Продукты питания", "Упаковка"].map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Suppliers Section */}
      <section id="suppliers" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Верифицированные поставщики
              </h2>
              <p className="text-lg text-gray-600">
                Каждый поставщик проходит тщательную проверку документов, лицензий и 
                деловой репутации. Работайте только с надежными партнерами.
              </p>
              
              <div className="space-y-4">
                {suppliers.map((supplier, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{supplier.name}</h4>
                          {supplier.verified && (
                            <Badge variant="default" className="text-xs">
                              <Icon name="CheckCircle" size={12} className="mr-1" />
                              Верифицирован
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{supplier.category} • {supplier.products}</p>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{supplier.rating}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Связаться
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <Button size="lg" className="w-full">
                <Icon name="Users" size={18} className="mr-2" />
                Посмотреть всех поставщиков
              </Button>
            </div>

            <div className="relative">
              <img 
                src="/img/559113ab-05d9-4e39-9c9c-dcbdbe63e35b.jpg" 
                alt="Склад и логистика"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section id="buyers" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold">
              Готовы начать оптовые закупки?
            </h2>
            <p className="text-lg opacity-90">
              Присоединяйтесь к тысячам компаний, которые уже экономят время и деньги 
              на нашей платформе. Регистрация бесплатная.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base">
                <Icon name="Building" size={18} className="mr-2" />
                Регистрация покупателя
              </Button>
              <Button size="lg" variant="outline" className="text-base border-white text-white hover:bg-white hover:text-primary">
                <Icon name="Store" size={18} className="mr-2" />
                Регистрация поставщика
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <Icon name="Shield" size={24} className="mx-auto mb-2 opacity-80" />
                <div className="font-semibold">Безопасные сделки</div>
                <div className="text-sm opacity-80">Гарантия качества</div>
              </div>
              <div className="text-center">
                <Icon name="Clock" size={24} className="mx-auto mb-2 opacity-80" />
                <div className="font-semibold">Быстрый поиск</div>
                <div className="text-sm opacity-80">Экономия времени</div>
              </div>
              <div className="text-center">
                <Icon name="DollarSign" size={24} className="mx-auto mb-2 opacity-80" />
                <div className="font-semibold">Лучшие цены</div>
                <div className="text-sm opacity-80">Оптовые скидки</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacts" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Icon name="Building" size={24} className="text-primary" />
                <span className="text-xl font-bold">B2B Маркетплейс</span>
              </div>
              <p className="text-gray-400 text-sm">
                Надежная платформа для оптовых продаж и закупок между юридическими лицами.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Поиск поставщиков</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Каталог товаров</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Как покупать</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Поставщикам</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Размещение товаров</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Верификация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Тарифы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (800) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@b2bmarket.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>Москва, ул. Деловая, 1</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 B2B Маркетплейс. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;