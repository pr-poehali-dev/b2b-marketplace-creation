import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { sendCode, verifyCode } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState('');

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);
    const result = await sendCode(phone);
    setLoading(false);
    if (!result.success) {
      setError(result.error || 'Не удалось отправить код');
      return;
    }
    if (result.smsSent === false) {
      setInfo('SMS-сервис ещё не настроен. Обратитесь к администратору.');
    }
    setStep('code');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await verifyCode(phone, code);
    setLoading(false);
    if (!result.success) {
      setError(result.error || 'Неверный код');
      return;
    }
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {step === 'phone' ? 'Вход и регистрация' : 'Подтверждение'}
        </h2>
        <p className="text-gray-600">
          {step === 'phone'
            ? 'Введите номер телефона — мы пришлём код в SMS'
            : `Код отправлен на номер ${phone}`}
        </p>
      </div>

      {step === 'phone' && (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div>
            <Label htmlFor="loginPhone" className="text-sm font-medium text-gray-700">
              Номер телефона
            </Label>
            <div className="mt-1 relative">
              <Input
                id="loginPhone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (999) 123-45-67"
                className="pl-10"
                required
              />
              <Icon name="Phone" size={18} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!phone.trim() || loading}
          >
            <Icon name={loading ? 'Loader2' : 'MessageSquare'} size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Отправка...' : 'Получить код'}
          </Button>
        </form>
      )}

      {step === 'code' && (
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <Label htmlFor="smsCode" className="text-sm font-medium text-gray-700">
              Код из SMS
            </Label>
            <Input
              id="smsCode"
              type="text"
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="1234"
              maxLength={4}
              className="mt-1 text-center text-lg tracking-widest"
              required
              autoFocus
            />
          </div>

          {info && <p className="text-sm text-amber-600">{info}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setStep('phone');
                setCode('');
                setError('');
              }}
              className="flex-1"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={code.length < 4 || loading}
            >
              {loading ? 'Проверка...' : 'Войти'}
            </Button>
          </div>

          <button
            type="button"
            onClick={handleSendCode}
            className="w-full text-sm text-primary hover:text-primary/80"
          >
            Отправить код повторно
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
