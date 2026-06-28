import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  phone: string;
  user_type: 'buyer' | 'supplier';
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
}

interface VerifyExtra {
  user_type?: 'buyer' | 'supplier';
  first_name?: string;
  last_name?: string;
  email?: string;
  company_name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  sendCode: (phone: string) => Promise<{ success: boolean; error?: string; smsSent?: boolean }>;
  verifyCode: (
    phone: string,
    code: string,
    extra?: VerifyExtra
  ) => Promise<{ success: boolean; error?: string; isNew?: boolean }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

const API_URL = 'https://functions.poehali.dev/332b71c2-c14c-4685-bbdd-28f869037f7b';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }

    setIsLoading(false);
  }, []);

  const sendCode = async (
    phone: string
  ): Promise<{ success: boolean; error?: string; smsSent?: boolean }> => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_code', phone }),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, error: data.error || 'Не удалось отправить код' };
      }
      return { success: true, smsSent: data.sms_sent };
    } catch (error) {
      return { success: false, error: 'Ошибка подключения к серверу' };
    }
  };

  const verifyCode = async (
    phone: string,
    code: string,
    extra?: VerifyExtra
  ): Promise<{ success: boolean; error?: string; isNew?: boolean }> => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', phone, code, ...extra }),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, error: data.error || 'Неверный код' };
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));

      return { success: true, isNew: data.is_new };
    } catch (error) {
      return { success: false, error: 'Ошибка подключения к серверу' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Auth-Token': savedToken },
        body: JSON.stringify({ action: 'logout' }),
      }).catch(() => {});
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  const isAuthenticated = !!user && !!token;

  const value = {
    user,
    token,
    isLoading,
    sendCode,
    verifyCode,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
