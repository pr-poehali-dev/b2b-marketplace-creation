import Logo from "@/components/ui/logo";
import NavigationSection from "./NavigationSection";
import Icon from "@/components/ui/icon";
import { useLayout } from "@/contexts/LayoutContext";

interface SidebarNavigationProps {
  isMenuExpanded: boolean;
  isMobile: boolean;
  openSection: string | null;
  toggleSection: (section: string) => void;
  isActive: (path: string) => boolean;
  setIsHovered: (value: boolean) => void;
  isPinned: boolean;
  setIsPinned: (value: boolean) => void;
}

const SidebarNavigation = ({
  isMenuExpanded,
  isMobile,
  openSection,
  toggleSection,
  isActive,
  setIsHovered,
  isPinned,
  setIsPinned
}: SidebarNavigationProps) => {
  const { isSidebarOpen } = useLayout();

  const ordersItems = [
    { href: "/orders", icon: "List", label: "Все заказы" },
    { href: "/orders/pending", icon: "Clock", label: "В ожидании" },
    { href: "/orders/processing", icon: "Package", label: "В обработке" },
    { href: "/orders/completed", icon: "CheckCircle", label: "Выполненные" },
    { href: "/analytics", icon: "TrendingUp", label: "Аналитика продаж" }
  ];

  const catalogItems = [
    { href: "/catalog", icon: "List", label: "Все товары" },
    { href: "/catalog/categories", icon: "FolderOpen", label: "Категории" }
  ];

  const suppliersItems = [
    { href: "/suppliers", icon: "Users", label: "Поставщики" }
  ];

  // Мобильный (< 768px): drawer w-64, выезжает поверх контента
  // Планшет (768–1024px): фиксирован, всегда w-12, раскрывается hover'ом (не двигает контент)
  // Десктоп (> 1024px): фиксирован, w-12 / w-52 в зависимости от isMenuExpanded
  const navClass = isMobile
    ? `fixed left-0 top-0 bottom-0 w-64 z-[9999] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`
    : `fixed left-0 top-0 bottom-0 z-[9999] flex flex-col transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isMenuExpanded ? 'w-52' : 'w-12'
      }`;

  return (
    <nav
      className={navClass}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(248,250,252,0.97) 100%)',
        boxShadow: '2px 0 24px rgba(0,0,0,0.10)',
        borderRight: '1px solid rgba(229,231,235,0.5)',
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Заголовок */}
      <div className="py-3 px-3 border-b border-gray-200/30 flex items-center justify-between bg-gradient-to-r from-gray-50/80 to-white/60 backdrop-blur-sm">
        <div className="transition-transform duration-500 ease-out overflow-hidden">
          <Logo isCollapsed={!isMenuExpanded && !isMobile} />
        </div>
        {/* Кнопка pin только на десктопе */}
        {!isMobile && isMenuExpanded && (
          <button
            onClick={() => setIsPinned(!isPinned)}
            className="ml-2 p-1 rounded hover:bg-gray-100 transition-colors flex-shrink-0"
            title={isPinned ? "Свернуть меню" : "Закрепить меню"}
          >
            <Icon name={isPinned ? "PanelLeftClose" : "PanelLeftOpen"} size={16} className="text-gray-400" />
          </button>
        )}
      </div>

      {/* Основное меню */}
      <div className="px-2 py-2 flex-1 overflow-y-auto overflow-x-hidden">
        <div className={`space-y-1 transition-all duration-500 ${isMenuExpanded ? 'animate-fade-in-up' : 'opacity-70'}`}>
          <NavigationSection
            title="Главная"
            icon="Home"
            isExpanded={false}
            isActive={isActive('/')}
            isMenuExpanded={isMenuExpanded || isMobile}
            openSection={openSection}
            sectionKey="home"
            items={[{ href: "/", icon: "Home", label: "Главная" }]}
            checkIsActive={isActive}
          />
          <NavigationSection
            title="Товары"
            icon="Grid3x3"
            isExpanded={openSection === 'catalog'}
            isActive={isActive('/catalog')}
            isMenuExpanded={isMenuExpanded || isMobile}
            openSection={openSection}
            sectionKey="catalog"
            badge="2.5k"
            badgeColor="bg-emerald-100 text-emerald-700"
            items={catalogItems}
            isCollapsible={true}
            onToggle={() => toggleSection('catalog')}
            checkIsActive={isActive}
          />
          <NavigationSection
            title="Поставщики"
            icon="Users"
            isExpanded={false}
            isActive={isActive('/suppliers')}
            isMenuExpanded={isMenuExpanded || isMobile}
            openSection={openSection}
            sectionKey="suppliers"
            items={suppliersItems}
            checkIsActive={isActive}
          />
          <NavigationSection
            title="Новости"
            icon="Newspaper"
            isExpanded={false}
            isActive={isActive('/news')}
            isMenuExpanded={isMenuExpanded || isMobile}
            openSection={openSection}
            sectionKey="news"
            badge="Новое"
            badgeColor="bg-green-100 text-green-600"
            items={[{ href: "/news", icon: "Newspaper", label: "Новости" }]}
            checkIsActive={isActive}
          />
          <NavigationSection
            title="Тарифы"
            icon="Crown"
            isExpanded={false}
            isActive={isActive('/pricing')}
            isMenuExpanded={isMenuExpanded || isMobile}
            openSection={openSection}
            sectionKey="pricing"
            badge="Premium"
            badgeColor="bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-800 border border-orange-300 font-semibold"
            isPremium={true}
            items={[{ href: "/pricing", icon: "Crown", label: "Тарифы" }]}
            checkIsActive={isActive}
          />
          <NavigationSection
            title="Контакты"
            icon="Phone"
            isExpanded={false}
            isActive={isActive('/contacts')}
            isMenuExpanded={isMenuExpanded || isMobile}
            openSection={openSection}
            sectionKey="contacts"
            items={[{ href: "/contacts", icon: "Phone", label: "Контакты" }]}
            checkIsActive={isActive}
          />
          <NavigationSection
            title="Настройки"
            icon="Settings"
            isExpanded={false}
            isActive={isActive('/settings')}
            isMenuExpanded={isMenuExpanded || isMobile}
            openSection={openSection}
            sectionKey="settings"
            items={[{ href: "/settings", icon: "Settings", label: "Настройки" }]}
            checkIsActive={isActive}
          />
          <NavigationSection
            title="Помощь"
            icon="HelpCircle"
            isExpanded={false}
            isActive={isActive('/help')}
            isMenuExpanded={isMenuExpanded || isMobile}
            openSection={openSection}
            sectionKey="help"
            items={[{ href: "/help", icon: "HelpCircle", label: "Помощь" }]}
            checkIsActive={isActive}
          />
          <NavigationSection
            title="О компании"
            icon="Info"
            isExpanded={false}
            isActive={isActive('/about')}
            isMenuExpanded={isMenuExpanded || isMobile}
            openSection={openSection}
            sectionKey="about"
            items={[{ href: "/about", icon: "Info", label: "О компании" }]}
            checkIsActive={isActive}
          />
        </div>
      </div>
    </nav>
  );
};

export default SidebarNavigation;