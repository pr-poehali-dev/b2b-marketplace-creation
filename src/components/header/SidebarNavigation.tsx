import Icon from "@/components/ui/icon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface NavItem {
  href: string;
  icon: string;
  label: string;
  badge?: string;
  badgeColor?: string;
  isPremium?: boolean;
}

interface SidebarNavigationProps {
  isActive: (path: string) => boolean;
}

const navItems: NavItem[] = [
  { href: "/place-request", icon: "Send", label: "Разместить заявку", badge: "Заявка", badgeColor: "bg-primary/10 text-primary border border-primary/20 font-semibold" },
  { href: "/suppliers", icon: "Users", label: "Поставщики" },
  { href: "/news", icon: "Newspaper", label: "Новости", badge: "Новое", badgeColor: "bg-green-100 text-green-600" },
  { href: "/pricing", icon: "Crown", label: "Тарифы", badge: "Premium", badgeColor: "bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-800 border border-orange-300 font-semibold", isPremium: true },
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

const SidebarNavigation = ({ isActive }: SidebarNavigationProps) => {
  const isMoreActive = moreItems.some((item) => isActive(item.href));
  // "/" теперь редиректит на "/catalog" — считаем пункт "Товары" активным и на главном пути тоже
  const isProductsActive = productsItems.some((item) => isActive(item.href)) || isActive('/');

  return (
    <nav className="bg-white w-full">
      <div className="flex items-center justify-between gap-1 py-1.5 w-full flex-wrap">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`group flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isProductsActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <Icon name="List" size={15} />
              <span>Товары</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap bg-emerald-100 text-emerald-700">2.5k</span>
              <Icon name="ChevronDown" size={13} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            {productsItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild className="cursor-pointer">
                <a href={item.href} className="flex items-center gap-2">
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`group flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              item.isPremium
                ? 'bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-100 border border-orange-200 text-orange-800 hover:from-yellow-200 hover:to-orange-200'
                : isActive(item.href)
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <Icon name={item.icon} size={15} />
            <span>{item.label}</span>
            {item.badge && (
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap ${item.badgeColor}`}>
                {item.badge}
              </span>
            )}
          </a>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`group flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isMoreActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <Icon name="MoreHorizontal" size={15} />
              <span>Ещё</span>
              <Icon name="ChevronDown" size={13} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            {moreItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild className="cursor-pointer">
                <a href={item.href} className="flex items-center gap-2">
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default SidebarNavigation;