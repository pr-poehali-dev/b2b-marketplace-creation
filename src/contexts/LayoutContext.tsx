import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LayoutContextValue {
  isMobile: boolean;
  isSidebarOpen: boolean;
  isPinned: boolean;
  isHovered: boolean;
  isMenuExpanded: boolean;
  sidebarWidth: number;
  setIsSidebarOpen: (v: boolean) => void;
  setIsPinned: (v: boolean) => void;
  setIsHovered: (v: boolean) => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const isMenuExpanded = isMobile ? isSidebarOpen : (isHovered || isPinned);

  // На мобильном отступ = 0 (сайдбар поверх контента)
  // На десктопе: collapsed = 48px, expanded = 208px
  const sidebarWidth = isMobile ? 0 : isMenuExpanded ? 208 : 48;

  return (
    <LayoutContext.Provider value={{
      isMobile,
      isSidebarOpen,
      isPinned,
      isHovered,
      isMenuExpanded,
      sidebarWidth,
      setIsSidebarOpen,
      setIsPinned,
      setIsHovered,
    }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error('useLayout must be used inside LayoutProvider');
  return ctx;
};
