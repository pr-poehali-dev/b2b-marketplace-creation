import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';

interface SupplierRegisterProps {
  onClose: () => void;
}

export default function SupplierRegister({ onClose }: SupplierRegisterProps) {
  const { sendCode, verifyCode, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    businessType: '',
    description: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [smsNotConfigured, setSmsNotConfigured] = useState(false);
  const [code, setCode] = useState('');
  const totalSteps = 3;

  const busy = isLoading || localLoading;

  const handleSendCode = async () => {
    setError('');
    if (!formData.phone.trim()) {
      setError('Введите номер телефона');
      return;
    }
    setLocalLoading(true);
    const result = await sendCode(formData.phone);
    setLocalLoading(false);

    if (result.success) {
      setCodeSent(true);
      setSmsNotConfigured(result.smsSent === false);
    } else {
      setError(result.error || 'Не удалось отправить код');
    }
  };

  const handleVerify = async () => {
    setError('');
    if (code.length !== 4) {
      setError('Введите 4-значный код');
      return;
    }
    const firstName = formData.contactPerson.split(' ')[0] || formData.contactPerson;
    const lastName = formData.contactPerson.split(' ').slice(1).join(' ') || '';

    const result = await verifyCode(formData.phone, code, {
      user_type: 'supplier',
      first_name: firstName,
      last_name: lastName,
      email: formData.email,
      company_name: formData.companyName,
    });

    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Неверный код');
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setError('');
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setError('');
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Закрыть */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <Icon name="X" size={24} />
        </button>

        {/* Прогресс */}
        <div className="p-6 border-b border-gray-100">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Регистрация поставщика
            </h2>
            <span className="text-sm text-gray-500">
              Шаг {currentStep} из {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6">
          {/* Шаг 1: Основная информация */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Building2" size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Информация о компании
                </h3>
                <p className="text-gray-600 text-sm">
                  Расскажите о вашей компании
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название компании *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="ООО Лучшие товары"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Контактное лицо *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Иван Петров"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-gray-400">(необязательно)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="info@company.ru"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Сайт компании
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://www.company.ru"
                />
              </div>
            </div>
          )}

          {/* Шаг 2: Специализация */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Package" size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Специализация
                </h3>
                <p className="text-gray-600 text-sm">
                  Укажите тип вашего бизнеса и описание
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип бизнеса *
                </label>
                <select
                  required
                  value={formData.businessType}
                  onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Выберите тип бизнеса</option>
                  <option value="manufacturer">Производитель</option>
                  <option value="distributor">Дистрибьютор</option>
                  <option value="wholesaler">Оптовик</option>
                  <option value="retailer">Розничная торговля</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание деятельности *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Опишите, какие товары или услуги вы предлагаете..."
                />
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <Icon name="Info" size={20} className="text-emerald-700 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-emerald-800">
                    <p className="font-medium mb-1">Рекомендации:</p>
                    <ul className="space-y-1 text-emerald-700">
                      <li>• Укажите основные категории товаров</li>
                      <li>• Опишите ваши конкурентные преимущества</li>
                      <li>• Укажите регионы работы</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Шаг 3: Подтверждение телефона */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Smartphone" size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Подтверждение телефона
                </h3>
                <p className="text-gray-600 text-sm">
                  Мы отправим SMS-код на номер {formData.phone || '—'}
                </p>
              </div>

              {/* Бонус для новых поставщиков */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 mb-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Icon name="Gift" size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Специальное предложение для новых поставщиков!
                    </h4>
                    <p className="text-gray-700 mb-3">
                      <strong className="text-green-600">3 месяца бесплатно</strong> — полный доступ ко всем функциям платформы без оплаты!
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex items-center">
                        <Icon name="Check" size={16} className="text-green-500 mr-2" />
                        Размещение неограниченного количества товаров
                      </li>
                      <li className="flex items-center">
                        <Icon name="Check" size={16} className="text-green-500 mr-2" />
                        Продвижение в поиске и каталогах
                      </li>
                      <li className="flex items-center">
                        <Icon name="Check" size={16} className="text-green-500 mr-2" />
                        Аналитика продаж и статистика просмотров
                      </li>
                      <li className="flex items-center">
                        <Icon name="Check" size={16} className="text-green-500 mr-2" />
                        Приоритетная поддержка клиентов
                      </li>
                    </ul>
                    <div className="mt-3 text-xs text-gray-500">
                      * После окончания пробного периода автоматически активируется базовый тариф
                    </div>
                  </div>
                </div>
              </div>

              {!codeSent ? (
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={busy}
                  className="w-full px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {busy ? 'Отправка...' : 'Получить код'}
                </button>
              ) : (
                <div className="space-y-4">
                  {smsNotConfigured && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm flex items-start">
                      <Icon name="AlertTriangle" size={18} className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>SMS-сервис не настроен. Запросите код у администратора.</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Код из SMS *
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl tracking-[0.5em]"
                      placeholder="0000"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={busy}
                    className="text-sm text-green-600 hover:underline font-medium disabled:opacity-50"
                  >
                    Отправить код повторно
                  </button>
                </div>
              )}

              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="mt-1 mr-3"
                  id="terms"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Я принимаю условия{' '}
                  <Link to="/terms" className="text-green-600 hover:underline">
                    Публичной оферты
                  </Link>{' '}
                  и даю согласие на обработку персональных данных в соответствии с{' '}
                  <Link to="/privacy" className="text-green-600 hover:underline">
                    Политикой конфиденциальности
                  </Link>
                </label>
              </div>
            </div>
          )}

          {/* Навигация */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
            <div className="flex space-x-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Назад
                </button>
              )}
            </div>

            <div className="flex space-x-4">
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Далее
                </button>
              ) : codeSent ? (
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={busy || code.length !== 4}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {busy ? 'Проверка...' : 'Создать аккаунт'}
                </button>
              ) : null}
            </div>
          </div>

          {/* Альтернатива */}
          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Уже есть аккаунт?{' '}
              <button
                type="button"
                onClick={() => {/* Открыть форму входа */}}
                className="text-green-600 hover:underline font-medium"
              >
                Войти
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
