import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";
import Logo from "@/components/ui/logo";

interface NavItem {
  href: string;
  icon: string;
  label: string;
  badge?: string;
  badgeColor?: string;
  isPremium?: boolean;
}

const navItems: NavItem[] = [
  { href: "/", icon: "Home", label: "Главная" },
  { href: "/place-request", icon: "Send", label: "Разместить заявку", badge: "Заявка", badgeColor: "bg-primary/10 text-primary border border-primary/20 font-semibold" },
  { href: "/suppliers", icon: "Users", label: "Поставщики" },
  { href: "/news", icon: "Newspaper", label: "Новости", badge: "Новое", badgeColor: "bg-green-100 text-green-600" },
  { href: "/pricing", icon: "Crown", label: "Тарифы", badge: "Premium", badgeColor: "bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-800 border border-orange-300 font-semibold", isPremium: true },
  { href: "/settings", icon: "Settings", label: "Настройки" },
];

const productsItems: NavItem[] = [
  { href: "/catalog", icon: "List", label: "Все товары", badge: "2.5k", badgeColor: "bg-emerald-100 text-emerald-700" },
  { href: "/catalog/categories", icon: "FolderOpen", label: "Категории" },
];

const moreItems: NavItem[] = [
  { href: "/contacts", icon: "Phone", label: "Контакты" },
  { href: "/help", icon: "HelpCircle", label: "Помощь" },
  { href: "/about", icon: "Info", label: "О компании" },
];

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isActive: (path: string) => boolean;
}

const MobileMenu = ({ open, onOpenChange, isActive }: MobileMenuProps) => {
  const isMoreActive = moreItems.some((item) => isActive(item.href));
  const isProductsActive = productsItems.some((item) => isActive(item.href));
  const [isMoreOpen, setIsMoreOpen] = useState(isMoreActive);
  const [isProductsOpen, setIsProductsOpen] = useState(isProductsActive);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0 flex flex-col">
        <div className="py-4 px-4 border-b">
          <Logo />
        </div>
        <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
          <a
            href="/"
            onClick={() => onOpenChange(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive('/') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon name="Home" size={18} />
            <span className="flex-1">Главная</span>
          </a>

          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isProductsActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon name="List" size={18} />
            <span className="flex-1 text-left">Товары</span>
            <span className="text-[11px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap bg-emerald-100 text-emerald-700">2.5k</span>
            <Icon name={isProductsOpen ? "ChevronUp" : "ChevronDown"} size={16} />
          </button>

          {isProductsOpen && (
            <div className="pl-4 space-y-1">
              {productsItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href) ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          )}

          {navItems.filter((item) => item.href !== '/').map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.isPremium
                  ? 'bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-100 border border-orange-200 text-orange-800'
                  : isActive(item.href)
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </a>
          ))}

          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isMoreActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon name="MoreHorizontal" size={18} />
            <span className="flex-1 text-left">Ещё</span>
            <Icon name={isMoreOpen ? "ChevronUp" : "ChevronDown"} size={16} />
          </button>

          {isMoreOpen && (
            <div className="pl-4 space-y-1">
              {moreItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href) ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
