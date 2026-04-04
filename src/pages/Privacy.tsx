import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
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
                Политика конфиденциальности
              </h1>
              <p className="text-gray-500 mb-8">и обработки персональных данных</p>

              <div className="prose prose-gray max-w-none">

                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Оператор персональных данных</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Оператором персональных данных является ИП <strong>Евлоев Исмаил Алаудинович</strong> 
                  (ИНН: 151208831603, ОГРНИП: 322150000028427), далее — «Оператор». 
                  Настоящая Политика разработана в соответствии с требованиями Федерального закона 
                  от 27.07.2006 № 152-ФЗ «О персональных данных».
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Какие данные мы собираем</h2>
                <div className="text-gray-700 mb-6 leading-relaxed">
                  <p className="mb-3">При регистрации и использовании платформы Business Market мы можем обрабатывать:</p>
                  <ul className="list-disc ml-6 mb-4">
                    <li>ФИО, должность и контактные данные (телефон, email)</li>
                    <li>Реквизиты компании (наименование, ИНН, юридический адрес)</li>
                    <li>Информацию о товарах, услугах и условиях поставки</li>
                    <li>Данные о заказах и транзакциях</li>
                    <li>Техническую информацию (IP-адрес, браузер, тип устройства)</li>
                    <li>Данные об использовании сервиса (лог действий, статистика)</li>
                  </ul>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Цели обработки данных</h2>
                <div className="text-gray-700 mb-6 leading-relaxed">
                  <p className="mb-3">Персональные данные обрабатываются в следующих целях:</p>
                  <ul className="list-disc ml-6 mb-4">
                    <li>Исполнение договора об оказании услуг (публичной оферты)</li>
                    <li>Идентификация пользователей и управление доступом</li>
                    <li>Обработка заказов и проведение расчётов</li>
                    <li>Направление уведомлений и информационных сообщений</li>
                    <li>Улучшение качества сервиса и технической поддержки</li>
                    <li>Исполнение требований законодательства РФ</li>
                  </ul>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Правовое основание обработки</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Обработка персональных данных осуществляется на основании: согласия субъекта 
                  персональных данных; исполнения договора, стороной которого является субъект; 
                  требований законодательства Российской Федерации.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Передача данных третьим лицам</h2>
                <div className="text-gray-700 mb-6 leading-relaxed">
                  <p className="mb-3">Оператор вправе передавать персональные данные третьим лицам только в случаях:</p>
                  <ul className="list-disc ml-6 mb-4">
                    <li>Наличия явного согласия субъекта персональных данных</li>
                    <li>Передачи подрядчикам и партнёрам для исполнения договора</li>
                    <li>Исполнения требований уполномоченных государственных органов</li>
                  </ul>
                  <p>Все третьи лица, получающие доступ к данным, обязаны соблюдать режим конфиденциальности.</p>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Защита персональных данных</h2>
                <div className="text-gray-700 mb-6 leading-relaxed">
                  <p className="mb-3">Для обеспечения безопасности данных применяются:</p>
                  <ul className="list-disc ml-6 mb-4">
                    <li>Шифрование данных при передаче (HTTPS/TLS)</li>
                    <li>Ограниченный доступ к персональным данным</li>
                    <li>Регулярные проверки и аудит безопасности</li>
                    <li>Резервное копирование данных</li>
                  </ul>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Права субъекта персональных данных</h2>
                <div className="text-gray-700 mb-6 leading-relaxed">
                  <p className="mb-3">В соответствии с законодательством РФ вы вправе:</p>
                  <ul className="list-disc ml-6 mb-4">
                    <li>Получать информацию об обработке ваших персональных данных</li>
                    <li>Требовать уточнения, блокирования или уничтожения данных</li>
                    <li>Отозвать согласие на обработку персональных данных</li>
                    <li>Обжаловать действия Оператора в Роскомнадзоре</li>
                  </ul>
                  <p>Для реализации прав направьте обращение на электронную почту: info@bmmarket.ru</p>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Cookies и аналитика</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Платформа использует файлы cookies для корректной работы сервиса, авторизации 
                  и анализа пользовательских сценариев. Продолжая использование платформы, 
                  вы соглашаетесь с использованием cookies. Управление файлами cookies доступно 
                  через настройки браузера.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Срок хранения данных</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Персональные данные хранятся в течение срока действия договора с Пользователем 
                  и в течение 3 (трёх) лет после его прекращения, если иное не предусмотрено 
                  законодательством РФ. По истечении срока данные уничтожаются или обезличиваются.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Изменения политики</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Оператор оставляет за собой право вносить изменения в настоящую Политику. 
                  Актуальная версия всегда размещена на платформе. Существенные изменения 
                  доводятся до сведения пользователей по электронной почте.
                </p>

                <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Контакты оператора</h2>
                <div className="text-gray-700 mb-8 leading-relaxed bg-gray-50 rounded-xl p-6">
                  <p className="mb-1"><strong>ИП Евлоев Исмаил Алаудинович</strong></p>
                  <p className="mb-1">ИНН: 151208831603</p>
                  <p className="mb-1">ОГРНИП: 322150000028427</p>
                  <p className="mb-1">Телефон: +7 969 061-11-10</p>
                  <p className="mb-1">Email: bmbusinessmarket@yandex.ru</p>
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

export default Privacy;