import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <>
      {/* Registration CTA */}
      <section id="buyers" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold">
              Повысьте эффективность закупок
            </h2>
            <p className="text-lg opacity-90">
              Интегрируйтесь с Business Market для оптимизации всех закупочных процессов. 
              Консалтинг включен.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base">
                <Icon name="Building" size={18} className="mr-2" />
                Стать клиентом
              </Button>
              <Button size="lg" variant="outline" className="text-base border-white text-white hover:bg-white hover:text-primary">
                <Icon name="Store" size={18} className="mr-2" />
                Поставлять товары
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <Icon name="Shield" size={24} className="mx-auto mb-2 opacity-80" />
                <div className="font-semibold">Комплаенс</div>
                <div className="text-sm opacity-80">Полное соответствие</div>
              </div>
              <div className="text-center">
                <Icon name="Clock" size={24} className="mx-auto mb-2 opacity-80" />
                <div className="font-semibold">Автоматизация</div>
                <div className="text-sm opacity-80">Оптимизация процессов</div>
              </div>
              <div className="text-center">
                <Icon name="DollarSign" size={24} className="mx-auto mb-2 opacity-80" />
                <div className="font-semibold">ROI</div>
                <div className="text-sm opacity-80">Минимизация затрат</div>
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
                <span className="text-xl font-bold">Business Market</span>
              </div>
              <p className="text-gray-400 text-sm">
                Корпоративная платформа для бизнес-закупок и продаж между компаниями.
              </p>
              <div className="text-sm text-gray-500 space-y-1 pt-2">
                <div>ИНН 151208831603</div>
                <div>
                  <a href="mailto:isma1evlo1@gmail.com" className="hover:text-white transition-colors">isma1evlo1@gmail.com</a>
                </div>
                <div>
                  <a href="tel:+79690611110" className="hover:text-white transition-colors">+7 969 061-11-10</a>
                </div>
              </div>
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
            

          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 space-y-4">
            <div className="text-xs text-gray-600 leading-relaxed">
              ИП Евлоев Исмаил Алаудинович · ИНН 151208831603 · ОГРНИП 322150000028427 · Тел.: <a href="tel:+79690611110" className="hover:text-gray-400 transition-colors">+7 969 061-11-10</a> · Email: <a href="mailto:info@bmmarket.ru" className="hover:text-gray-400 transition-colors">info@bmmarket.ru</a>. Использование сайта означает принятие условий <a href="/terms" className="hover:text-gray-400 transition-colors underline">Публичной оферты</a> и <a href="/privacy" className="hover:text-gray-400 transition-colors underline">Политики конфиденциальности</a>.
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
              <p>© 2026 Business Market. Все права защищены.</p>
              <div className="flex gap-4">
                <a href="/terms" className="hover:text-white transition-colors">Публичная оферта</a>
                <a href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;