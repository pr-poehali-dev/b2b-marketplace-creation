import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "За 6 месяцев использования платформы мы сократили время на обработку заказов на 60% и увеличили прибыль на 35%. Невероятно удобный инструмент!",
      author: "Алексей Петров",
      position: "Генеральный директор",
      company: "ООО «СтройМаркет»",
      avatar: "АП",
      rating: 5
    },
    {
      text: "Автоматизация закупок позволила нам сфокусироваться на развитии бизнеса, а не на рутинных задачах. Рекомендуем всем нашим партнерам.",
      author: "Мария Сидорова",
      position: "Коммерческий директор",
      company: "ГК «ТехноПром»",
      avatar: "МС",
      rating: 5
    },
    {
      text: "Интеграция с нашей 1С прошла без проблем. Теперь все данные синхронизируются автоматически. Это сэкономило нам недели работы.",
      author: "Дмитрий Козлов",
      position: "IT-директор",
      company: "АО «МегаСнаб»",
      avatar: "ДК",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Что говорят наши клиенты
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Реальные отзывы от компаний, которые уже оптимизировали свой бизнес с нашей помощью
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-500 text-white font-medium">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Icon name="Users" size={16} className="text-green-600 mr-2" />
              <span className="font-semibold text-green-600">4.9/5</span> средняя оценка
            </div>
            <div className="flex items-center">
              <Icon name="MessageCircle" size={16} className="text-blue-600 mr-2" />
              <span className="font-semibold text-blue-600">1,200+</span> отзывов
            </div>
            <div className="flex items-center">
              <Icon name="TrendingUp" size={16} className="text-purple-600 mr-2" />
              <span className="font-semibold text-purple-600">98%</span> рекомендаций
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;