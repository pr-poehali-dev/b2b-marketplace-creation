import Icon from "@/components/ui/icon";

interface NavigationItem {
  href: string;
  icon: string;
  label: string;
}

interface NavigationSectionProps {
  title: string;
  icon: string;
  isExpanded: boolean;
  isActive: boolean;
  isMenuExpanded: boolean;
  openSection: string | null;
  sectionKey: string;
  badge?: string;
  badgeColor?: string;
  items?: NavigationItem[];
  isCollapsible?: boolean;
  isPremium?: boolean;
  onToggle?: () => void;
  checkIsActive: (path: string) => boolean;
}

const NavigationSection = ({ 
  title, 
  icon, 
  isExpanded, 
  isActive, 
  isMenuExpanded, 
  openSection,
  sectionKey,
  badge,
  badgeColor = "bg-blue-100 text-blue-600",
  items = [],
  isCollapsible = false,
  isPremium = false,
  onToggle,
  checkIsActive
}: NavigationSectionProps) => {
  
  const renderButton = () => (
    <button 
      onClick={onToggle}
      className={`group w-full flex items-center ${isMenuExpanded ? 'px-4 py-3' : 'p-3 justify-center'} rounded-xl transition-all duration-300 ease-out transform hover:scale-[1.02] ${
        isPremium 
          ? 'bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-2 border-orange-200/50 text-orange-800 hover:from-yellow-100 hover:to-orange-100 hover:border-orange-300 shadow-lg hover:shadow-xl backdrop-blur-sm'
          : isActive || openSection === sectionKey
          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700' 
          : 'text-slate-700 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 hover:text-blue-600 hover:shadow-md'
      }`}
    >
      {isMenuExpanded ? (
        <>
          <div className="w-7 flex justify-center">
            <Icon 
              name={icon} 
              size={18} 
              className={`font-medium transition-transform duration-300 ${
                isActive || openSection === sectionKey ? 'scale-110' : 'group-hover:scale-110'
              }`} 
            />
          </div>
          <span className="ml-3 flex-1 font-semibold mr-2 leading-tight text-sm tracking-wide">{title}</span>
        </>
      ) : (
        <Icon 
          name={icon} 
          size={18} 
          className={`font-medium transition-transform duration-300 ${
            isActive || openSection === sectionKey ? 'scale-110' : 'group-hover:scale-110'
          }`} 
        />
      )}
      {isMenuExpanded && isCollapsible && (
        <div className="flex items-center space-x-3 ml-2">
          {badge && (
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${badgeColor}`}>
              {badge}
            </span>
          )}
          <Icon 
            name={openSection === sectionKey ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
            className="transition-transform duration-300"
          />
        </div>
      )}
      {isMenuExpanded && !isCollapsible && badge && (
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ml-2 transition-all duration-300 ${badgeColor}`}>
          {badge}
        </span>
      )}
    </button>
  );

  const renderLink = () => (
    <a 
      href={items[0]?.href || "#"}
      className={`group flex items-center ${isMenuExpanded ? 'px-4 py-3' : 'p-3 justify-center'} rounded-xl transition-all duration-300 ease-out transform hover:scale-[1.02] ${
        isPremium 
          ? 'bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-2 border-orange-200/50 text-orange-800 hover:from-yellow-100 hover:to-orange-100 hover:border-orange-300 shadow-lg hover:shadow-xl backdrop-blur-sm'
          : isActive
          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700' 
          : 'text-slate-700 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 hover:text-blue-600 hover:shadow-md'
      }`}
    >
      {isMenuExpanded ? (
        <>
          <div className="w-7 flex justify-center">
            <Icon 
              name={icon} 
              size={18} 
              className={`font-medium transition-transform duration-300 ${
                isActive ? 'scale-110' : 'group-hover:scale-110'
              }`} 
            />
          </div>
          <span className="ml-3 font-semibold leading-tight text-sm tracking-wide">{title}</span>
        </>
      ) : (
        <Icon 
          name={icon} 
          size={18} 
          className={`font-medium transition-transform duration-300 ${
            isActive ? 'scale-110' : 'group-hover:scale-110'
          }`} 
        />
      )}
      {isMenuExpanded && badge && (
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ml-auto transition-all duration-300 ${badgeColor}`}>
          {badge}
        </span>
      )}
    </a>
  );

  return (
    <div className="relative">
      <div className="space-y-1">
        {isCollapsible ? renderButton() : renderLink()}
        
        {isCollapsible && openSection === sectionKey && isMenuExpanded && (
          <div className="space-y-1 ml-8 mt-2">
            {items.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className={`group flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-300 ease-out transform hover:scale-[1.02] ${
                  checkIsActive(item.href) 
                    ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200 shadow-sm' 
                    : 'text-slate-600 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 hover:text-blue-600 hover:shadow-sm'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={15} 
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                {isMenuExpanded && (
                  <span className="text-sm font-medium leading-tight tracking-wide">
                    {item.label}
                  </span>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationSection;