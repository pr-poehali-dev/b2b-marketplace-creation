import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const BP_MOBILE = 768; // < 768px → мобильный (горизонтальное меню прячется за бургер)

interface LayoutContextValue {
  isMobile: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < BP_MOBILE;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <LayoutContext.Provider value={{ isMobile, isMenuOpen, setIsMenuOpen }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error('useLayout must be used inside LayoutProvider');
  return ctx;
};
