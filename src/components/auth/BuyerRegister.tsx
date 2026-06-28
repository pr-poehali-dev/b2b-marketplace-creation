import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';

interface BuyerRegisterProps {
  onClose: () => void;
}

export default function BuyerRegister({ onClose }: BuyerRegisterProps) {
  const { sendCode, verifyCode, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    position: '',
    businessType: '',
    purchaseVolume: '',
    interests: [] as string[],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [smsNotConfigured, setSmsNotConfigured] = useState(false);
  const [code, setCode] = useState('');
  const totalSteps = 3;

  const busy = isLoading || localLoading;

  const interestOptions = [
    'Электроника',
    'Одежда и текстиль', 
    'Продукты питания',
    'Строительные материалы',
    'Автозапчасти',
    'Мебель',
    'Спортивные товары',
    'Косметика',
    'Канцелярские товары',
    'Промышленное оборудование'
  ];

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
    const result = await verifyCode(formData.phone, code, {
      user_type: 'buyer',
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      company_name: formData.companyName,
    });

    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Неверный код');
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Регистрация покупателя
            </h2>
            <span className="text-sm text-gray-500">
              Шаг {currentStep} из {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-emerald-700 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Шаг 1: Личная информация */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="User" size={32} className="text-emerald-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Личная информация
                </h3>
                <p className="text-gray-600 text-sm">
                  Расскажите о себе
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Иван"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Фамилия *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Петров"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="ivan.petrov@company.ru"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Компания
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="ООО Торговая компания"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Должность
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Менеджер по закупкам"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Шаг 2: Бизнес-информация */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Briefcase" size={32} className="text-emerald-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Бизнес-информация
                </h3>
                <p className="text-gray-600 text-sm">
                  Расскажите о вашем бизнесе
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип бизнеса *
                  </label>
                  <select
                    required
                    value={formData.businessType}
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Выберите тип</option>
                    <option value="retail">Розничная торговля</option>
                    <option value="wholesale">Оптовая торговля</option>
                    <option value="manufacturing">Производство</option>
                    <option value="horeca">HoReCa</option>
                    <option value="ecommerce">Интернет-торговля</option>
                    <option value="construction">Строительство</option>
                    <option value="services">Сфера услуг</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Объем закупок в месяц
                  </label>
                  <select
                    value={formData.purchaseVolume}
                    onChange={(e) => setFormData({...formData, purchaseVolume: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Выберите объем</option>
                    <option value="small">До 100 000 ₽</option>
                    <option value="medium">100 000 - 500 000 ₽</option>
                    <option value="large">500 000 - 1 000 000 ₽</option>
                    <option value="enterprise">Свыше 1 000 000 ₽</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Интересующие категории товаров
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interestOptions.map((interest) => (
                    <label
                      key={interest}
                      className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.interests.includes(interest)
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => toggleInterest(interest)}
                        className="hidden"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {interest}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Выберите категории, которые вас интересуют
                </p>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <Icon name="Info" size={20} className="text-emerald-700 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-emerald-800">
                    <p className="font-medium mb-1">Преимущества указания бизнес-информации:</p>
                    <ul className="space-y-1 text-emerald-700">
                      <li>• Персональные рекомендации поставщиков</li>
                      <li>• Специальные предложения и скидки</li>
                      <li>• Приоритетная поддержка менеджеров</li>
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
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Smartphone" size={32} className="text-emerald-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Подтверждение телефона
                </h3>
                <p className="text-gray-600 text-sm">
                  Мы отправим SMS-код на номер {formData.phone || '—'}
                </p>
              </div>

              {!codeSent ? (
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={busy}
                  className="w-full px-8 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-2xl tracking-[0.5em]"
                      placeholder="0000"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={busy}
                    className="text-sm text-emerald-700 hover:underline font-medium disabled:opacity-50"
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
                  <Link to="/terms" className="text-emerald-700 hover:underline">
                    Публичной оферты
                  </Link>{' '}
                  и даю согласие на обработку персональных данных в соответствии с{' '}
                  <Link to="/privacy" className="text-emerald-700 hover:underline">
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
                  className="px-8 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors font-medium"
                >
                  Далее
                </button>
              ) : codeSent ? (
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={busy || code.length !== 4}
                  className="px-8 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="text-emerald-700 hover:underline font-medium"
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
