import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [inn, setInn] = useState('');

  const handleSendCode = () => {
    setStep(2);
  };

  const handleVerifyCode = () => {
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Регистрация:', { phone, fullName, email, inn });
    alert('Регистрация завершена! (демо-версия)');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Регистрация</h2>
        <p className="text-gray-600">Создайте аккаунт для доступа к платформе</p>
      </div>

      {/* Шаг 1: Ввод номера телефона */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Номер телефона
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
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!phone.trim()}
          >
            Отправить код
          </Button>
        </div>
      )}

      {/* Шаг 2: Ввод кода подтверждения */}
      {step === 2 && (
        <div className="space-y-4">
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
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="1234"
              maxLength={4}
              className="text-center text-lg tracking-widest"
            />
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
            <Button 
              onClick={handleVerifyCode}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={code.length !== 4}
            >
              Подтвердить
            </Button>
          </div>
        </div>
      )}

      {/* Шаг 3: Заполнение данных */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4">
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
                required
              />
              <Icon name="User" size={18} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </Label>
            <div className="mt-1 relative">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="pl-10"
                required
              />
              <Icon name="Mail" size={18} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <Label htmlFor="inn" className="text-sm font-medium text-gray-700">
              ИНН <span className="text-gray-400">(необязательно)</span>
            </Label>
            <div className="mt-1 relative">
              <Input
                id="inn"
                type="text"
                value={inn}
                onChange={(e) => setInn(e.target.value)}
                placeholder="1234567890"
                className="pl-10"
                maxLength={12}
              />
              <Icon name="FileText" size={18} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <Button 
              type="button"
              variant="outline"
              onClick={() => setStep(2)}
              className="flex-1"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!fullName.trim() || !email.trim()}
            >
              <Icon name="CheckCircle" size={16} className="mr-2" />
              Зарегистрироваться
            </Button>
          </div>
        </form>
      )}

      {/* Индикатор шагов */}
      <div className="flex justify-center mt-6 space-x-2">
        {[1, 2, 3].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`w-3 h-3 rounded-full ${
              step >= stepNumber ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RegistrationForm;