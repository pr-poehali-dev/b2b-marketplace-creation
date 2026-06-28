import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

type Mode = 'login' | 'resetPhone' | 'resetCode';

const LoginForm = () => {
  const { login, sendCode, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('login');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setError('');
    setInfo('');
    setCode('');
    setNewPassword('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(phone, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error || 'Неверный телефон или пароль');
      return;
    }
    navigate('/');
  };

  const handleSendResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);
    const result = await sendCode(phone, 'reset');
    setLoading(false);
    if (!result.success) {
      setError(result.error || 'Не удалось отправить код');
      return;
    }
    if (result.smsSent === false) {
      setInfo('SMS-сервис ещё не настроен. Обратитесь к администратору.');
    }
    setMode('resetCode');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await resetPassword(phone, code, newPassword);
    setLoading(false);
    if (!result.success) {
      setError(result.error || 'Не удалось сменить пароль');
      return;
    }
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {mode === 'login' && 'Вход в аккаунт'}
          {mode === 'resetPhone' && 'Восстановление пароля'}
          {mode === 'resetCode' && 'Новый пароль'}
        </h2>
        <p className="text-gray-600">
          {mode === 'login' && 'Войдите по номеру телефона и паролю'}
          {mode === 'resetPhone' && 'Введите номер — пришлём код в SMS'}
          {mode === 'resetCode' && `Код отправлен на ${phone}`}
        </p>
      </div>

      {mode === 'login' && (
        <form onSubmit={handleLogin} className="space-y-4">
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

          <div>
            <Label htmlFor="loginPassword" className="text-sm font-medium text-gray-700">
              Пароль
            </Label>
            <div className="mt-1 relative">
              <Input
                id="loginPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                className="pl-10"
                required
              />
              <Icon name="Lock" size={18} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => {
                resetState();
                setMode('resetPhone');
              }}
              className="text-sm text-primary hover:text-primary/80"
            >
              Забыли пароль?
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!phone.trim() || !password.trim() || loading}
          >
            <Icon name={loading ? 'Loader2' : 'LogIn'} size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Вход...' : 'Войти'}
          </Button>
        </form>
      )}

      {mode === 'resetPhone' && (
        <form onSubmit={handleSendResetCode} className="space-y-4">
          <div>
            <Label htmlFor="resetPhone" className="text-sm font-medium text-gray-700">
              Номер телефона
            </Label>
            <div className="mt-1 relative">
              <Input
                id="resetPhone"
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

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetState();
                setMode('login');
              }}
              className="flex-1"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={!phone.trim() || loading}
            >
              {loading ? 'Отправка...' : 'Отправить код'}
            </Button>
          </div>
        </form>
      )}

      {mode === 'resetCode' && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <Label htmlFor="resetCode" className="text-sm font-medium text-gray-700">
              Код из SMS
            </Label>
            <Input
              id="resetCode"
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

          <div>
            <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
              Новый пароль
            </Label>
            <div className="mt-1 relative">
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Минимум 6 символов"
                className="pl-10"
                required
              />
              <Icon name="Lock" size={18} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {info && <p className="text-sm text-amber-600">{info}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetState();
                setMode('resetPhone');
              }}
              className="flex-1"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={code.length < 4 || newPassword.length < 6 || loading}
            >
              {loading ? 'Сохранение...' : 'Сменить пароль'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
