import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();
  
  const plans = [
    {
      name: 'Базовый',
      price: '2,990',
      period: 'мес',
      description: 'Для малого бизнеса',
      features: [
        'До 100 заказов в месяц',
        'Базовая аналитика',
        'Email поддержка',
        '10 поставщиков',
        'Стандартные отчёты'
      ],
      icon: 'Package',
      popular: false
    },
    {
      name: 'Профессиональный',
      price: '7,990',
      period: 'мес',
      description: 'Для растущего бизнеса',
      features: [
        'До 1000 заказов в месяц',
        'Расширенная аналитика',
        'Приоритетная поддержка',
        'Неограниченно поставщиков',
        'Автоматизация процессов',
        'Персональный менеджер'
      ],
      icon: 'TrendingUp',
      popular: true
    },
    {
      name: 'Корпоративный',
      price: '15,990',
      period: 'мес',
      description: 'Для крупного бизнеса',
      features: [
        'Неограниченное количество заказов',
        'Полная аналитика и BI',
        '24/7 поддержка',
        'API интеграции',
        'Индивидуальные настройки',
        'Выделенный сервер',
        'Обучение команды'
      ],
      icon: 'Building2',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
          >
            <Icon name="ArrowLeft" size={16} />
            <span>Назад в меню</span>
          </Button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Выберите подходящий тариф
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Масштабируйте свой бизнес с нашими гибкими тарифными планами
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl p-8 transition-transform hover:scale-105 ${
                plan.popular ? 'ring-2 ring-primary border-primary' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Популярный
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  plan.popular ? 'bg-primary/10' : 'bg-gray-100'
                }`}>
                  <Icon 
                    name={plan.icon as any} 
                    size={32} 
                    className={plan.popular ? 'text-primary' : 'text-gray-600'} 
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">₽/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Icon name="Check" size={16} className="text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
                size="lg"
              >
                Выбрать план
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Нужен индивидуальный план?
            </h2>
            <p className="text-gray-600 mb-6">
              Свяжитесь с нами для обсуждения корпоративных решений и специальных условий
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg">
                <Icon name="Phone" size={16} className="mr-2" />
                Связаться с менеджером
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Онлайн консультация
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;