import React from 'react';
import RegistrationForm from '@/components/RegistrationForm';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Кнопка возврата */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться на главную
          </Button>
        </div>

        {/* Форма регистрации */}
        <RegistrationForm />

        {/* Дополнительная информация */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Уже есть аккаунт?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Войти
            </button>
          </p>
          
          <div className="text-xs text-gray-500">
            <p>Регистрируясь, вы соглашаетесь с нашими</p>
            <p>
              <a href="#" className="text-blue-600 hover:text-blue-700">Условиями использования</a>
              {' '}и{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700">Политикой конфиденциальности</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;