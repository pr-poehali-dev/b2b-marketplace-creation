import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Константы ширин — совпадают с Tailwind: w-12=48px, w-52=208px, w-64=256px
export const SIDEBAR = {
  MOBILE_WIDTH: 256,   // w-64 — ширина drawer на мобильном (поверх контента)
  COLLAPSED: 48,       // w-12 — свёрнутый на десктопе
  EXPANDED: 208,       // w-52 — развёрнутый на десктопе
};

// Брейкпоинты (совпадают с Tailwind)
const BP_MOBILE = 768;   // < 768px  → мобильный
const BP_TABLET = 1024;  // 768–1024px → планшет/небольшой ноут (сайдбар свёрнут по умолчанию)

interface LayoutContextValue {
  isMobile: boolean;
  isTablet: boolean;
  isSidebarOpen: boolean;
  isPinned: boolean;
  isHovered: boolean;
  isMenuExpanded: boolean;
  sidebarWidth: number;  // отступ контента (px)
  setIsSidebarOpen: (v: boolean) => void;
  setIsPinned: (v: boolean) => void;
  setIsHovered: (v: boolean) => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      const mobile = w < BP_MOBILE;
      const tablet = w >= BP_MOBILE && w < BP_TABLET;

      setIsMobile(mobile);
      setIsTablet(tablet);

      // На мобильном — скрываем drawer при изменении размера
      if (mobile) setIsSidebarOpen(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Логика раскрытия сайдбара:
  // - Мобильный: управляется drawer (isSidebarOpen)
  // - Планшет/малый ноут: всегда свёрнут, раскрывается только по hover
  // - Десктоп: hover или pin
  const isMenuExpanded = isMobile
    ? isSidebarOpen
    : isTablet
      ? isHovered          // на планшете только по hover, без pin
      : (isHovered || isPinned);

  // Отступ контента:
  // - Мобильный: 0 (drawer поверх, контент на всю ширину)
  // - Планшет: всегда COLLAPSED (48px) — сайдбар не раздвигает контент при hover
  // - Десктоп: COLLAPSED или EXPANDED в зависимости от состояния
  const sidebarWidth = isMobile
    ? 0
    : isTablet
      ? SIDEBAR.COLLAPSED
      : isMenuExpanded ? SIDEBAR.EXPANDED : SIDEBAR.COLLAPSED;

  return (
    <LayoutContext.Provider value={{
      isMobile,
      isTablet,
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
