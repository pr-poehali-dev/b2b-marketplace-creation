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
    { href: "/catalog/categories", icon: "FolderOpen", label: "Категории" },
    { href: "/inventory", icon: "Warehouse", label: "Склад и остатки" },
    { href: "/returns", icon: "RotateCcw", label: "Возвраты" }
  ];

  const suppliersItems = [
    { href: "/suppliers", icon: "Users", label: "Все поставщики" },
    { href: "/purchases", icon: "ShoppingCart", label: "Закупки" },
    { href: "/contracts", icon: "FileText", label: "Договоры" }
  ];

  return (
    <nav 
      className={`fixed left-0 top-0 bottom-0 bg-white border-r-2 border-gray-300 shadow-xl z-[9999] flex flex-col transition-all duration-300 ${
        isMenuExpanded ? 'w-56' : 'w-16'
      }`}
      style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}
      onMouseEnter={() => !isMobile && !isPinned && setIsHovered(true)}
      onMouseLeave={() => !isMobile && !isPinned && setIsHovered(false)}
    >
      <div className="py-4 px-6 border-b flex items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-50 relative">
        <Logo isCollapsed={!isMenuExpanded} />
        {isMenuExpanded && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPinned(!isPinned)}
            className={`absolute right-2 p-1.5 rounded-md transition-colors ${
              isPinned 
                ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title={isPinned ? 'Открепить меню' : 'Закрепить меню'}
          >
            <Icon 
              name={isPinned ? "PinOff" : "Pin"} 
              size={16}
              className={isPinned ? "rotate-45" : ""}
            />
          </Button>
        )}
      </div>
      
      <div className="px-3 py-3 flex-1 overflow-y-auto">
        <div className="space-y-1">
          {/* Главная */}
          <NavigationSection
            title="Главная"
            icon="Home"
            isExpanded={false}
            isActive={isActive('/')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="home"
            items={[{ href: "/", icon: "Home", label: "Главная" }]}
            checkIsActive={isActive}
          />

          {/* Заказы и продажи */}
          <NavigationSection
            title="Заказы и продажи"
            icon="ShoppingBag"
            isExpanded={openSection === 'orders'}
            isActive={isActive('/orders')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="orders"
            badge="24"
            badgeColor="bg-red-100 text-red-600"
            items={ordersItems}
            isCollapsible={true}
            onToggle={() => toggleSection('orders')}
            checkIsActive={isActive}
          />

          {/* Товары и каталог */}
          <NavigationSection
            title="Товары и каталог"
            icon="Grid3x3"
            isExpanded={openSection === 'catalog'}
            isActive={isActive('/catalog')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="catalog"
            badge="2.5k"
            badgeColor="bg-blue-100 text-blue-600"
            items={catalogItems}
            isCollapsible={true}
            onToggle={() => toggleSection('catalog')}
            checkIsActive={isActive}
          />

          {/* Поставщики */}
          <NavigationSection
            title="Поставщики"
            icon="Users"
            isExpanded={openSection === 'suppliers'}
            isActive={isActive('/suppliers')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="suppliers"
            items={suppliersItems}
            isCollapsible={true}
            onToggle={() => toggleSection('suppliers')}
            checkIsActive={isActive}
          />

          {/* Новости */}
          <NavigationSection
            title="Новости"
            icon="Newspaper"
            isExpanded={false}
            isActive={isActive('/news')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="news"
            badge="Новое"
            badgeColor="bg-green-100 text-green-600"
            items={[{ href: "/news", icon: "Newspaper", label: "Новости" }]}
            checkIsActive={isActive}
          />

          {/* Настройки */}
          <NavigationSection
            title="Настройки"
            icon="Settings"
            isExpanded={false}
            isActive={isActive('/settings')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="settings"
            items={[{ href: "/settings", icon: "Settings", label: "Настройки" }]}
            checkIsActive={isActive}
          />

          {/* О компании */}
          <NavigationSection
            title="О компании"
            icon="Info"
            isExpanded={false}
            isActive={isActive('/about')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="about"
            items={[{ href: "/about", icon: "Info", label: "О компании" }]}
            checkIsActive={isActive}
          />

          {/* Тарифы */}
          <NavigationSection
            title="Тарифы"
            icon="CreditCard"
            isExpanded={false}
            isActive={isActive('/pricing')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="pricing"
            items={[{ href: "/pricing", icon: "CreditCard", label: "Тарифы" }]}
            checkIsActive={isActive}
          />

          {/* Помощь */}
          <NavigationSection
            title="Помощь"
            icon="HelpCircle"
            isExpanded={false}
            isActive={isActive('/help')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="help"
            items={[{ href: "/help", icon: "HelpCircle", label: "Помощь" }]}
            checkIsActive={isActive}
          />

          {/* Контакты */}
          <NavigationSection
            title="Контакты"
            icon="Phone"
            isExpanded={false}
            isActive={isActive('/contacts')}
            isMenuExpanded={isMenuExpanded}
            openSection={openSection}
            sectionKey="contacts"
            items={[{ href: "/contacts", icon: "Phone", label: "Контакты" }]}
            checkIsActive={isActive}
          />
        </div>
      </div>
    </nav>
  );
};

export default SidebarNavigation;