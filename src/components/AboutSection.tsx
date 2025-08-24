import Icon from '@/components/ui/icon';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              О компании BM Business Market
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Лидер в области корпоративных B2B закупок в России. 
              С 2018 года помогаем компаниям оптимизировать процессы снабжения.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Левая колонка - История и миссия */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Icon name="Target" size={28} className="text-blue-600" />
                  Наша миссия
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Создать экосистему, где каждая компания может эффективно управлять 
                  закупками, находить надежных поставщиков и развивать бизнес. 
                  Мы объединяем традиционный опыт с современными технологиями.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Icon name="Clock" size={28} className="text-green-600" />
                  История развития
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-semibold text-blue-600 bg-blue-50 rounded px-2 py-1">
                      2018
                    </div>
                    <p className="text-gray-600">Основание компании и запуск MVP платформы</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-semibold text-blue-600 bg-blue-50 rounded px-2 py-1">
                      2020
                    </div>
                    <p className="text-gray-600">Достигли отметки 500+ активных поставщиков</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-semibold text-blue-600 bg-blue-50 rounded px-2 py-1">
                      2022
                    </div>
                    <p className="text-gray-600">Запуск ИИ-аналитики и автоматизации процессов</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-sm font-semibold text-blue-600 bg-blue-50 rounded px-2 py-1">
                      2024
                    </div>
                    <p className="text-gray-600">Более 2500 поставщиков и 15000+ товарных позиций</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка - Преимущества и команда */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Icon name="Award" size={28} className="text-yellow-600" />
                  Наши достижения
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
                    <div className="text-sm text-gray-600">Довольных клиентов</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="text-2xl font-bold text-green-600 mb-1">24/7</div>
                    <div className="text-sm text-gray-600">Поддержка</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="text-2xl font-bold text-purple-600 mb-1">2500+</div>
                    <div className="text-sm text-gray-600">Поставщиков</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="text-2xl font-bold text-orange-600 mb-1">15К+</div>
                    <div className="text-sm text-gray-600">Товаров</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Icon name="Users" size={28} className="text-purple-600" />
                  Почему выбирают нас
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="Shield" size={20} className="text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Безопасность</h4>
                      <p className="text-sm text-gray-600">Все поставщики проходят верификацию</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Zap" size={20} className="text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Скорость</h4>
                      <p className="text-sm text-gray-600">Автоматизация процессов закупок</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="BarChart3" size={20} className="text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Аналитика</h4>
                      <p className="text-sm text-gray-600">Детальная отчетность и прогнозы</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Heart" size={20} className="text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Поддержка</h4>
                      <p className="text-sm text-gray-600">Персональный менеджер для каждого клиента</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Команда и контакты */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 border">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Готовы начать сотрудничество?
              </h3>
              <p className="text-gray-600 mb-6">
                Свяжитесь с нашей командой экспертов для персональной консультации
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Icon name="Phone" size={20} />
                  Позвонить сейчас
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Icon name="Mail" size={20} />
                  Написать письмо
                </button>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Icon name="MessageCircle" size={20} />
                  Telegram
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;