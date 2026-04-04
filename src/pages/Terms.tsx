import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="ml-56 transition-all duration-300">
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 py-12 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-gray-900 hover:bg-white/50"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Публичная оферта
              </h1>
              <p className="text-gray-500 mb-8">на оказание услуг по предоставлению доступа к платформе Business Market</p>

              <div className="prose prose-gray max-w-none">

                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Стороны договора</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Индивидуальный предприниматель <strong>Евлоев Исмаил Алаудинович</strong> (далее — «Исполнитель»), 
                  действующий на основании государственной регистрации:<br />
                  ИНН: 151208831603<br />
                  ОГРНИП: 322150000028427<br />
                  — с одной стороны, и любое физическое или юридическое лицо, принявшее условия настоящей оферты 
                  (далее — «Пользователь»), — с другой стороны, вместе именуемые «Стороны».
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Предмет договора</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Исполнитель предоставляет Пользователю доступ к B2B платформе Business Market — 
                  информационному сервису для управления закупками, каталогом товаров, поставщиками и заказами. 
                  Конкретный объём услуг определяется выбранным тарифным планом.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Акцепт оферты</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Акцептом настоящей оферты является совершение Пользователем любого из следующих действий: 
                  регистрация на платформе, оплата услуг, начало использования сервиса. Акцепт означает полное 
                  и безоговорочное принятие всех условий настоящего договора без каких-либо изъятий и оговорок.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Права и обязанности сторон</h2>
                <div className="text-gray-700 mb-6 leading-relaxed">
                  <p className="mb-3"><strong>Исполнитель обязуется:</strong></p>
                  <ul className="list-disc ml-6 mb-4">
                    <li>Обеспечивать бесперебойный доступ к платформе в соответствии с тарифом</li>
                    <li>Оказывать техническую поддержку пользователям</li>
                    <li>Защищать персональные данные в соответствии с законодательством РФ</li>
                    <li>Уведомлять об изменениях условий не менее чем за 30 дней</li>
                  </ul>

                  <p className="mb-3"><strong>Пользователь обязуется:</strong></p>
                  <ul className="list-disc ml-6">
                    <li>Предоставлять достоверные сведения при регистрации</li>
                    <li>Своевременно и в полном объёме оплачивать услуги</li>
                    <li>Не передавать доступ к аккаунту третьим лицам</li>
                    <li>Не использовать платформу в противоправных целях</li>
                    <li>Соблюдать применимое законодательство Российской Федерации</li>
                  </ul>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Стоимость и порядок оплаты</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Стоимость услуг определяется действующим тарифным планом, размещённым на сайте платформы. 
                  Оплата производится в рублях Российской Федерации путём безналичного перевода. 
                  Оказанные и оплаченные услуги возврату не подлежат, за исключением случаев, 
                  прямо предусмотренных законодательством РФ о защите прав потребителей.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Ответственность сторон</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Исполнитель несёт ответственность за доступность и работоспособность платформы. 
                  Исполнитель не несёт ответственности за убытки, возникшие вследствие ненадлежащего 
                  использования платформы Пользователем, действий третьих лиц или обстоятельств 
                  непреодолимой силы (форс-мажор). Совокупная ответственность Исполнителя перед 
                  Пользователем ограничена суммой, фактически уплаченной за услуги за последние 3 месяца.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Срок действия и расторжение</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Договор заключается на неопределённый срок с момента акцепта. Пользователь вправе 
                  отказаться от услуг в любое время, направив уведомление на электронную почту Исполнителя. 
                  Исполнитель вправе расторгнуть договор при нарушении Пользователем условий оферты 
                  с уведомлением за 3 (три) рабочих дня.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Персональные данные</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Принимая настоящую оферту, Пользователь даёт согласие на обработку своих персональных 
                  данных в соответствии с Федеральным законом № 152-ФЗ «О персональных данных». 
                  Порядок обработки данных описан в Политике конфиденциальности, размещённой на платформе.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Применимое право и споры</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Договор регулируется законодательством Российской Федерации. 
                  Все споры решаются путём переговоров, а при недостижении соглашения — 
                  в суде по месту нахождения Исполнителя в соответствии с процессуальным законодательством РФ.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Реквизиты Исполнителя</h2>
                <div className="text-gray-700 mb-8 leading-relaxed bg-gray-50 rounded-xl p-6">
                  <p className="mb-1"><strong>ИП Евлоев Исмаил Алаудинович</strong></p>
                  <p className="mb-1">ИНН: 151208831603</p>
                  <p className="mb-1">ОГРНИП: 322150000028427</p>
                  <p className="mb-1">Email: info@bmmarket.ru</p>
                </div>

                <div className="text-sm text-gray-500 pt-6 border-t">
                  <p>Последнее обновление: 4 апреля 2026 г.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
