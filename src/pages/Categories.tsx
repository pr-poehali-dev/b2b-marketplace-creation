import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Категории товаров с детальной информацией
  const categories = [
    {
      id: 1,
      name: "Металлопрокат",
      description: "Трубы, листы, профили, арматура",
      icon: "Wrench",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      productCount: 1250,
      color: "from-gray-500 to-gray-700",
      href: "/catalog?category=Металлопрокат"
    },
    {
      id: 2,
      name: "Стройматериалы",
      description: "Цемент, кирпич, блоки, смеси",
      icon: "Home",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      productCount: 2100,
      color: "from-orange-500 to-red-600",
      href: "/catalog?category=Стройматериалы"
    },
    {
      id: 3,
      name: "Электроника",
      description: "Платы, компоненты, датчики",
      icon: "Cpu",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      productCount: 890,
      color: "from-blue-500 to-indigo-600",
      href: "/catalog?category=Электроника"
    },
    {
      id: 4,
      name: "Кровельные материалы",
      description: "Профнастил, металлочерепица, мембраны",
      icon: "Triangle",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      productCount: 670,
      color: "from-green-500 to-emerald-600",
      href: "/catalog?category=Кровельные материалы"
    },
    {
      id: 5,
      name: "Упаковочные материалы",
      description: "Коробки, пленка, скотч, этикетки",
      icon: "Package",
      image: "/img/43a9e543-590b-44fb-b286-827f5d9b1ef7.jpg",
      productCount: 1540,
      color: "from-purple-500 to-violet-600",
      href: "/catalog?category=Упаковочные материалы"
    },
    {
      id: 6,
      name: "Электротехника",
      description: "Кабели, провода, щитовое оборудование",
      icon: "Zap",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      productCount: 980,
      color: "from-yellow-500 to-orange-500",
      href: "/catalog?category=Электротехника"
    },
    {
      id: 7,
      name: "Канцелярские товары",
      description: "Бумага, ручки, папки, принтеры",
      icon: "FileText",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      productCount: 750,
      color: "from-pink-500 to-rose-600",
      href: "/catalog?category=Канцелярские товары"
    },
    {
      id: 8,
      name: "Крепёжные изделия",
      description: "Болты, гайки, шайбы, саморезы",
      icon: "Settings",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      productCount: 1200,
      color: "from-teal-500 to-cyan-600",
      href: "/catalog?category=Крепёжные изделия"
    },
    {
      id: 9,
      name: "Светотехника",
      description: "LED-ленты, светильники, лампы",
      icon: "Lightbulb",
      image: "/img/43a9e543-590b-44fb-b286-827f5d9b1ef7.jpg",
      productCount: 420,
      color: "from-amber-500 to-yellow-600",
      href: "/catalog?category=Светотехника"
    },
    {
      id: 10,
      name: "Отделочные материалы",
      description: "Плитка, обои, ламинат, краски",
      icon: "Palette",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      productCount: 1350,
      color: "from-lime-500 to-green-600",
      href: "/catalog?category=Отделочные материалы"
    },
    {
      id: 11,
      name: "Полимерные материалы",
      description: "Пленка, трубы, листы, профили",
      icon: "Layers",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      productCount: 580,
      color: "from-indigo-500 to-purple-600",
      href: "/catalog?category=Полимерные материалы"
    },
    {
      id: 12,
      name: "Измерительные приборы",
      description: "Штангенциркули, рулетки, уровни",
      icon: "Ruler",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      productCount: 290,
      color: "from-slate-500 to-gray-600",
      href: "/catalog?category=Измерительные приборы"
    },
    {
      id: 13,
      name: "Сантехника",
      description: "Трубы, фитинги, смесители, унитазы",
      icon: "Droplets",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      productCount: 1680,
      color: "from-blue-400 to-cyan-500",
      href: "/catalog?category=Сантехника"
    },
    {
      id: 14,
      name: "Отопление и вентиляция",
      description: "Радиаторы, котлы, вентиляторы",
      icon: "Thermometer",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      productCount: 920,
      color: "from-red-500 to-orange-600",
      href: "/catalog?category=Отопление и вентиляция"
    },
    {
      id: 15,
      name: "Автокомплектующие",
      description: "Запчасти, масла, аккумуляторы, шины",
      icon: "Car",
      image: "/img/43a9e543-590b-44fb-b286-827f5d9b1ef7.jpg",
      productCount: 3200,
      color: "from-gray-600 to-slate-700",
      href: "/catalog?category=Автокомплектующие"
    },
    {
      id: 16,
      name: "Мебель и интерьер",
      description: "Столы, стулья, шкафы, декор",
      icon: "Sofa",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      productCount: 1450,
      color: "from-brown-500 to-amber-600",
      href: "/catalog?category=Мебель и интерьер"
    },
    {
      id: 17,
      name: "Спецодежда и СИЗ",
      description: "Каски, перчатки, респираторы, костюмы",
      icon: "ShieldCheck",
      image: "/img/43a9e543-590b-44fb-b286-827f5d9b1ef7.jpg",
      productCount: 890,
      color: "from-emerald-500 to-teal-600",
      href: "/catalog?category=Спецодежда и СИЗ"
    },
    {
      id: 18,
      name: "Садовая техника",
      description: "Газонокосилки, триммеры, культиваторы",
      icon: "TreePine",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      productCount: 650,
      color: "from-green-600 to-lime-700",
      href: "/catalog?category=Садовая техника"
    },
    {
      id: 19,
      name: "Химия и моющие средства",
      description: "Растворители, клеи, чистящие средства",
      icon: "FlaskConical",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      productCount: 740,
      color: "from-violet-500 to-purple-600",
      href: "/catalog?category=Химия и моющие средства"
    },
    {
      id: 20,
      name: "Пищевая продукция",
      description: "Продукты питания, напитки, снеки",
      icon: "Apple",
      image: "/img/43a9e543-590b-44fb-b286-827f5d9b1ef7.jpg",
      productCount: 2300,
      color: "from-red-400 to-pink-500",
      href: "/catalog?category=Пищевая продукция"
    },
    {
      id: 21,
      name: "Текстиль и ткани",
      description: "Ткани, пряжа, фурнитура, нитки",
      icon: "Shirt",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      productCount: 1100,
      color: "from-rose-500 to-pink-600",
      href: "/catalog?category=Текстиль и ткани"
    },
    {
      id: 22,
      name: "Медицинское оборудование",
      description: "Инструменты, расходники, мебель",
      icon: "Stethoscope",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      productCount: 560,
      color: "from-blue-600 to-indigo-700",
      href: "/catalog?category=Медицинское оборудование"
    },
    {
      id: 23,
      name: "Спортивные товары",
      description: "Тренажеры, мячи, одежда, обувь",
      icon: "Dumbbell",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      productCount: 1280,
      color: "from-orange-400 to-red-500",
      href: "/catalog?category=Спортивные товары"
    },
    {
      id: 24,
      name: "Бытовая техника",
      description: "Холодильники, стиральные машины, пылесосы",
      icon: "Refrigerator",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      productCount: 850,
      color: "from-slate-400 to-gray-600",
      href: "/catalog?category=Бытовая техника"
    },
    {
      id: 25,
      name: "Игрушки и товары для детей",
      description: "Развивающие игрушки, одежда, коляски",
      icon: "Baby",
      image: "/img/43a9e543-590b-44fb-b286-827f5d9b1ef7.jpg",
      productCount: 1920,
      color: "from-cyan-400 to-blue-500",
      href: "/catalog?category=Игрушки и товары для детей"
    },
    {
      id: 26,
      name: "Косметика и парфюмерия",
      description: "Крема, шампуни, духи, макияж",
      icon: "Sparkles",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      productCount: 1670,
      color: "from-pink-400 to-rose-500",
      href: "/catalog?category=Косметика и парфюмерия"
    },
    {
      id: 27,
      name: "Инструменты",
      description: "Дрели, отвертки, пилы, ключи",
      icon: "Hammer",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      productCount: 2150,
      color: "from-yellow-600 to-orange-700",
      href: "/catalog?category=Инструменты"
    },
    {
      id: 28,
      name: "Животные и зоотовары",
      description: "Корма, игрушки, аксессуары, клетки",
      icon: "Dog",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      productCount: 1340,
      color: "from-emerald-400 to-green-500",
      href: "/catalog?category=Животные и зоотовары"
    },
    {
      id: 29,
      name: "Книги и образование",
      description: "Учебники, художественная литература, канцтовары",
      icon: "BookOpen",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      productCount: 980,
      color: "from-indigo-400 to-blue-600",
      href: "/catalog?category=Книги и образование"
    },
    {
      id: 30,
      name: "Компьютеры и IT",
      description: "Ноутбуки, мониторы, клавиатуры, мыши",
      icon: "Monitor",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      productCount: 1450,
      color: "from-gray-500 to-slate-600",
      href: "/catalog?category=Компьютеры и IT"
    }
  ];

  // Фильтрация категорий по поиску
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Подсчет общих показателей
  const totalProducts = categories.reduce((sum, category) => sum + category.productCount, 0);
  const totalCategories = categories.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="ml-64">
        <div className="container mx-auto px-6 py-8">
          {/* Hero секция */}
          <div className="mb-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-3">Категории товаров</h1>
              <p className="text-xl text-indigo-100 mb-6">
                {totalCategories} категорий • {totalProducts.toLocaleString('ru-RU')} товаров
              </p>
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Grid3x3" size={16} className="text-indigo-200" />
                  <span>Удобная навигация</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Search" size={16} className="text-indigo-200" />
                  <span>Быстрый поиск</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={16} className="text-indigo-200" />
                  <span>Актуальный ассортимент</span>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-64 bg-gradient-to-l from-white/10 to-transparent"></div>
          </div>

          {/* Поиск и статистика */}
          <div className="mb-8 grid lg:grid-cols-4 gap-6">
            {/* Поиск */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Поиск категорий..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg border-gray-200 focus:border-indigo-500 shadow-sm"
                />
              </div>
            </div>

            {/* Статистика */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600">{totalCategories}</div>
                  <div className="text-sm text-gray-600">Категорий</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {totalProducts.toLocaleString('ru-RU')}
                  </div>
                  <div className="text-sm text-gray-600">Товаров</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Результаты поиска */}
          {searchQuery && (
            <div className="mb-6">
              <p className="text-gray-600">
                Найдено категорий: <span className="font-semibold text-indigo-600">{filteredCategories.length}</span>
              </p>
            </div>
          )}

          {/* Сетка категорий */}
          {filteredCategories.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <Card 
                  key={category.id}
                  className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                    
                    {/* Иконка категории */}
                    <div className="absolute top-4 left-4 p-3 bg-white/20 backdrop-blur-sm rounded-full">
                      <Icon name={category.icon} size={24} className="text-white" />
                    </div>

                    {/* Количество товаров */}
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800">
                      {category.productCount.toLocaleString('ru-RU')} товаров
                    </Badge>

                    {/* Название и описание */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-200 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-200 line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <Button 
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      onClick={() => window.location.href = category.href}
                    >
                      <Icon name="ArrowRight" size={16} className="mr-2" />
                      Перейти к товарам
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-16 shadow-lg border-0">
              <CardContent>
                <div className="max-w-md mx-auto">
                  <Icon name="SearchX" size={64} className="mx-auto text-gray-300 mb-6" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Категории не найдены</h3>
                  <p className="text-gray-600 mb-6">
                    По вашему запросу "{searchQuery}" категории не найдены. Попробуйте изменить поисковый запрос.
                  </p>
                  <Button 
                    onClick={() => setSearchQuery("")}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Icon name="RotateCcw" size={16} className="mr-2" />
                    Показать все категории
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Популярные категории (если нет поиска) */}
          {!searchQuery && (
            <div className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Популярные категории</h2>
                <p className="text-gray-600">Самые востребованные товарные группы</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {categories
                  .sort((a, b) => b.productCount - a.productCount)
                  .slice(0, 3)
                  .map((category) => (
                    <Card key={`popular-${category.id}`} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-full bg-gradient-to-r ${category.color}`}>
                            <Icon name={category.icon} size={20} className="text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                            <p className="text-sm text-gray-600">
                              {category.productCount.toLocaleString('ru-RU')} товаров
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{category.description}</p>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => window.location.href = category.href}
                        >
                          Просмотреть товары
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Categories;