import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';

const RegistrationForm = () => {
  const { sendCode, verifyCode, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [smsNotConfigured, setSmsNotConfigured] = useState(false);

  const busy = isLoading || localLoading;

  const handleSendCode = async () => {
    setError('');
    if (!phone.trim()) {
      setError('Введите номер телефона');
      return;
    }
    setLocalLoading(true);
    const result = await sendCode(phone);
    setLocalLoading(false);

    if (result.success) {
      setSmsNotConfigured(result.smsSent === false);
      setStep(2);
    } else {
      setError(result.error || 'Не удалось отправить код');
    }
  };

  const handleVerifyCode = async () => {
    setError('');
    if (code.length !== 4) {
      setError('Введите 4-значный код');
      return;
    }
    const firstName = fullName.trim().split(' ')[0] || fullName.trim();
    const lastName = fullName.trim().split(' ').slice(1).join(' ') || '';

    const result = await verifyCode(phone, code, {
      user_type: 'buyer',
      first_name: firstName,
      last_name: lastName,
      email,
      company_name: companyName,
    });

    if (result.success) {
      setStep(3);
    } else {
      setError(result.error || 'Неверный код');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Регистрация</h2>
        <p className="text-gray-600">Создайте аккаунт для доступа к платформе</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Шаг 1: Данные и номер телефона */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              ФИО <span className="text-red-500">*</span>
            </Label>
            <div className="mt-1 relative">
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Иванов Иван Иванович"
                className="pl-10"
              />
              <Icon name="User" size={18} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email <span className="text-gray-400">(необязательно)</span>
            </Label>
            <div className="mt-1 relative">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="pl-10"
              />
              <Icon name="Mail" size={18} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
              Компания <span className="text-gray-400">(необязательно)</span>
            </Label>
            <div className="mt-1 relative">
              <Input
                id="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="ООО Торговая компания"
                className="pl-10"
              />
              <Icon name="Building2" size={18} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Номер телефона <span className="text-red-500">*</span>
            </Label>
            <div className="mt-1 relative">
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (999) 123-45-67"
                className="pl-10"
              />
              <Icon name="Phone" size={18} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <Button 
            onClick={handleSendCode}
            className="w-full bg-emerald-700 hover:bg-emerald-800"
            disabled={busy || !phone.trim() || !fullName.trim()}
          >
            {busy ? 'Отправка...' : 'Отправить код'}
          </Button>
        </div>
      )}

      {/* Шаг 2: Ввод кода подтверждения */}
      {step === 2 && (
        <div className="space-y-4">
          {smsNotConfigured && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm flex items-start">
              <Icon name="AlertTriangle" size={18} className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>SMS-сервис не настроен. Запросите код у администратора.</span>
            </div>
          )}
          <div>
            <Label htmlFor="code" className="text-sm font-medium text-gray-700">
              Код подтверждения
            </Label>
            <p className="text-sm text-gray-500 mb-2">
              Код отправлен на номер {phone}
            </p>
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="0000"
              maxLength={4}
              className="text-center text-lg tracking-widest"
            />
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline"
              onClick={() => { setStep(1); setError(''); }}
              className="flex-1"
              disabled={busy}
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
            <Button 
              onClick={handleVerifyCode}
              className="flex-1 bg-emerald-700 hover:bg-emerald-800"
              disabled={busy || code.length !== 4}
            >
              {busy ? 'Проверка...' : 'Подтвердить'}
            </Button>
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

      {/* Шаг 3: Успех */}
      {step === 3 && (
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <Icon name="CheckCircle" size={32} className="text-emerald-700" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Регистрация завершена!
          </h3>
          <p className="text-gray-600">
            Добро пожаловать на платформу. Вы успешно вошли в аккаунт.
          </p>
        </div>
      )}

      {/* Индикатор шагов */}
      <div className="flex justify-center mt-6 space-x-2">
        {[1, 2, 3].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`w-3 h-3 rounded-full ${
              step >= stepNumber ? 'bg-emerald-700' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RegistrationForm;
