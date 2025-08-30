import React from 'react';
import Header from '@/components/Header';
import RegistrationForm from '@/components/RegistrationForm';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="ml-56 transition-all duration-300">
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex items-center justify-center p-8">
          <div className="w-full max-w-lg">
            {/* Кнопка возврата */}
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900 hover:bg-white/50"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Вернуться на главную
              </Button>
            </div>

            {/* Заголовок страницы */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Присоединяйтесь к Business Market
              </h1>
              <p className="text-gray-600 text-lg">
                Платформа для эффективного ведения бизнеса
              </p>
            </div>

            {/* Форма регистрации */}
            <div className="bg-white rounded-2xl shadow-xl p-2">
              <RegistrationForm />
            </div>

            {/* Дополнительная информация */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Уже есть аккаунт?{' '}
                <button className="text-primary hover:text-primary/80 font-medium">
                  Войти
                </button>
              </p>
              
              <div className="text-xs text-gray-500">
                <p className="mb-1">Регистрируясь, вы соглашаetесь с нашими</p>
                <p>
                  <a href="/terms" className="text-primary hover:text-primary/80">Условиями использования</a>
                  {' '}и{' '}
                  <a href="/privacy" className="text-primary hover:text-primary/80">Политикой конфиденциальности</a>
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;