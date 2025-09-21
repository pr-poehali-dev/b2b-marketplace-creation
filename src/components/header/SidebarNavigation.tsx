import Logo from "@/components/ui/logo";
import NavigationSection from "./NavigationSection";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

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
    { href: "/suppliers", icon: "Users", label: "Все поставщики" },
    { href: "/purchases", icon: "ShoppingCart", label: "Закупки" },
    { href: "/contracts", icon: "FileText", label: "Договоры" }
  ];

  return (
    <nav 
      className={`fixed left-0 top-0 bottom-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-r border-slate-200/60 shadow-2xl backdrop-blur-sm z-[9999] flex flex-col transition-all duration-500 ease-out ${
        isMenuExpanded ? 'w-72' : 'w-16'
      }`}
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
        borderImage: 'linear-gradient(180deg, rgba(148, 163, 184, 0.1), rgba(148, 163, 184, 0.3)) 1'
      }}
      onMouseEnter={() => !isMobile && !isPinned && setIsHovered(true)}
      onMouseLeave={() => !isMobile && !isPinned && setIsHovered(false)}
    >
      {/* Заголовок с градиентом */}
      <div className="py-6 px-6 border-b border-slate-200/50 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 to-cyan-100/20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
        
        <Logo isCollapsed={!isMenuExpanded} />
        {isMenuExpanded && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPinned(!isPinned)}
            className={`absolute right-3 p-2 rounded-xl transition-all duration-300 backdrop-blur-sm ${
              isPinned 
                ? 'bg-blue-100/80 text-blue-600 hover:bg-blue-200/80 shadow-md' 
                : 'text-slate-500 hover:bg-white/60 hover:text-blue-600'
            }`}
            title={isPinned ? 'Открепить меню' : 'Закрепить меню'}
          >
            <Icon 
              name={isPinned ? "PinOff" : "Pin"} 
              size={16}
              className={`transition-transform duration-300 ${isPinned ? "rotate-45" : ""}`}
            />
          </Button>
        )}
      </div>
      
      {/* Основное меню */}
      <div className="px-4 py-4 flex-1 overflow-y-auto">
        <div className="space-y-2">
          {/* Главная */}
          <NavigationSection
            title="🏠 Главная"
            icon="Home"
            isExpanded={false}
            isActive={isActive('/')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="home"
            items={[{ href: "/", icon: "Home", label: "Главная страница" }]}
            checkIsActive={isActive}
          />

          {/* Товары */}
          <NavigationSection
            title="📦 Товары"
            icon="Grid3x3"
            isExpanded={openSection === 'catalog'}
            isActive={isActive('/catalog')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="catalog"
            badge="2.5k"
            badgeColor="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200 font-semibold shadow-sm"
            items={catalogItems}
            isCollapsible={true}
            onToggle={() => toggleSection('catalog')}
            checkIsActive={isActive}
          />

          {/* Заказы */}
          <NavigationSection
            title="🛍️ Заказы"
            icon="ShoppingBag"
            isExpanded={openSection === 'orders'}
            isActive={isActive('/orders')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="orders"
            badge="24"
            badgeColor="bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200 font-semibold shadow-sm animate-pulse"
            items={ordersItems}
            isCollapsible={true}
            onToggle={() => toggleSection('orders')}
            checkIsActive={isActive}
          />

          {/* Поставщики */}
          <NavigationSection
            title="👥 Поставщики"
            icon="Users"
            isExpanded={openSection === 'suppliers'}
            isActive={isActive('/suppliers')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="suppliers"
            badge="Pro"
            badgeColor="bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 border border-purple-200 font-semibold shadow-sm"
            items={suppliersItems}
            isCollapsible={true}
            onToggle={() => toggleSection('suppliers')}
            checkIsActive={isActive}
          />

          {/* Разделитель */}
          <div className="my-6 mx-3">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          </div>

          {/* Новости */}
          <NavigationSection
            title="📰 Новости"
            icon="Newspaper"
            isExpanded={false}
            isActive={isActive('/news')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="news"
            badge="Новое"
            badgeColor="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200 font-semibold shadow-sm"
            items={[{ href: "/news", icon: "Newspaper", label: "Последние новости" }]}
            checkIsActive={isActive}
          />

          {/* Настройки */}
          <NavigationSection
            title="⚙️ Настройки"
            icon="Settings"
            isExpanded={false}
            isActive={isActive('/settings')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="settings"
            items={[{ href: "/settings", icon: "Settings", label: "Системные настройки" }]}
            checkIsActive={isActive}
          />

          {/* О компании */}
          <NavigationSection
            title="ℹ️ О компании"
            icon="Info"
            isExpanded={false}
            isActive={isActive('/about')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="about"
            items={[{ href: "/about", icon: "Info", label: "Информация о нас" }]}
            checkIsActive={isActive}
          />

          {/* Разделитель */}
          <div className="my-6 mx-3">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          </div>

          {/* Тарифы - премиум */}
          <NavigationSection
            title="👑 Тарифы"
            icon="Crown"
            isExpanded={false}
            isActive={isActive('/pricing')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="pricing"
            badge="Premium"
            badgeColor="bg-gradient-to-r from-yellow-200 via-amber-200 to-orange-200 text-orange-800 border border-orange-300 font-bold shadow-lg"
            isPremium={true}
            items={[{ href: "/pricing", icon: "Crown", label: "Планы и цены" }]}
            checkIsActive={isActive}
          />

          {/* Помощь */}
          <NavigationSection
            title="❓ Помощь"
            icon="HelpCircle"
            isExpanded={false}
            isActive={isActive('/help')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="help"
            items={[{ href: "/help", icon: "HelpCircle", label: "Служба поддержки" }]}
            checkIsActive={isActive}
          />

          {/* Контакты */}
          <NavigationSection
            title="📞 Контакты"
            icon="Phone"
            isExpanded={false}
            isActive={isActive('/contacts')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="contacts"
            items={[{ href: "/contacts", icon: "Phone", label: "Связаться с нами" }]}
            checkIsActive={isActive}
          />
        </div>

        {/* Нижний декоративный элемент */}
        {isMenuExpanded && (
          <div className="mt-8 mb-4 mx-3 p-4 bg-gradient-to-br from-slate-100/50 to-slate-200/30 rounded-2xl border border-slate-200/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-sm font-medium text-slate-700">Готовы к новым возможностям?</div>
              <div className="text-xs text-slate-500 mt-1">Исследуйте все функции платформы</div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SidebarNavigation;