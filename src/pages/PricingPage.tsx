import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Стартовый",
      description: "Для начинающих предпринимателей",
      monthlyPrice: 10000,
      annualPrice: 120000,
      features: [
        "3 месяца бесплатно",
        "До 100 товаров в каталоге",
        "До 50 заказов в месяц",
        "Базовая аналитика",
        "Email поддержка",
        "Мобильное приложение",
        "Интеграция с 1С"
      ],
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "Профессиональный",
      description: "Для растущего бизнеса",
      monthlyPrice: 15000,
      annualPrice: 180000,
      features: [
        "3 месяца бесплатно",
        "До 1000 товаров в каталоге",
        "Неограниченное количество заказов",
        "Расширенная аналитика",
        "Приоритетная поддержка",
        "Мобильное приложение",
        "Интеграция с 1С",
        "CRM система",
        "Автоматизация процессов",
        "API доступ"
      ],
      popular: true,
      color: "border-primary ring-2 ring-primary/20"
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="ml-56 transition-all duration-300">
        <div className="container mx-auto px-4 py-8">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Выберите подходящий тариф
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Гибкие тарифные планы для бизнеса любого размера
            </p>
            
            {/* Переключатель месяц/год */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Ежемесячно
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Ежегодно
              </span>
              {isAnnual && (
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  +1 месяц бесплатно
                </Badge>
              )}
            </div>
          </div>

          {/* Тарифные планы */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.color} ${plan.popular ? 'scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white px-4 py-1">
                      Популярный
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-gray-600">{plan.description}</p>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        {formatPrice(isAnnual ? Math.floor(plan.annualPrice / 12) : plan.monthlyPrice)}
                      </span>
                      <span className="text-gray-600 ml-2">₽/мес</span>
                    </div>
                    {isAnnual && (
                      <p className="text-sm text-gray-500 mt-1">
                        {formatPrice(plan.annualPrice)} ₽ в год <span className="text-emerald-600 font-semibold">(13 месяцев)</span>
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Icon name="Check" size={16} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    Выбрать план
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Дополнительная информация */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Часто задаваемые вопросы
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Можно ли изменить тариф?</h3>
                  <p className="text-gray-600 text-sm">
                    Да, вы можете повысить или понизить тариф в любое время. 
                    Изменения вступят в силу в следующем расчетном периоде.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Есть ли пробный период?</h3>
                  <p className="text-gray-600 text-sm">
                    Да, новые поставщики получают 3 месяца бесплатного использования 
                    со всеми функциями выбранного тарифа.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Какие способы оплаты доступны?</h3>
                  <p className="text-gray-600 text-sm">
                    Мы принимаем банковские карты, переводы, электронные кошельки 
                    и безналичную оплату для юридических лиц.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Нужна ли техническая поддержка?</h3>
                  <p className="text-gray-600 text-sm">
                    Да, мы предоставляем техническую поддержку всем клиентам. 
                    Время ответа зависит от выбранного тарифного плана.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Призыв к действию */}
          <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Готовы начать?
            </h2>
            <p className="text-xl mb-6 text-white/80">
              Присоединяйтесь к тысячам успешных предпринимателей
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                className="bg-white text-primary hover:bg-gray-100"
              >
                Попробовать бесплатно
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default PricingPage;