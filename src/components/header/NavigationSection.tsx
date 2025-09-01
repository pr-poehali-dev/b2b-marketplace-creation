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
  onToggle,
  checkIsActive
}: NavigationSectionProps) => {
  
  const renderButton = () => (
    <button 
      onClick={onToggle}
      className={`w-full flex items-center ${isMenuExpanded ? 'px-3 py-2.5' : 'p-2 justify-center'} rounded-lg transition-colors ${
        isActive || openSection === sectionKey
          ? 'bg-primary text-white' 
          : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
      }`}
    >
      {isMenuExpanded ? (
        <>
          <div className="w-6 flex justify-center">
            <Icon name={icon} size={16} className="font-medium" />
          </div>
          <span className="ml-3 flex-1 font-medium truncate">{title}</span>
        </>
      ) : (
        <Icon name={icon} size={16} className="font-medium" />
      )}
      {isMenuExpanded && isCollapsible && (
        <div className="flex items-center space-x-2">
          {badge && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${badgeColor}`}>{badge}</span>
          )}
          <Icon 
            name={openSection === sectionKey ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
          />
        </div>
      )}
      {isMenuExpanded && !isCollapsible && badge && (
        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${badgeColor}`}>{badge}</span>
      )}
    </button>
  );

  const renderLink = () => (
    <a 
      href={items[0]?.href || "#"}
      className={`flex items-center ${isMenuExpanded ? 'px-3 py-2.5' : 'p-2 justify-center'} rounded-lg transition-colors ${
        isActive
          ? 'bg-primary text-white' 
          : 'text-gray-800 hover:bg-primary/10 hover:text-primary'
      }`}
    >
      {isMenuExpanded ? (
        <>
          <div className="w-6 flex justify-center">
            <Icon name={icon} size={16} className="font-medium" />
          </div>
          <span className="ml-3 font-medium truncate">{title}</span>
        </>
      ) : (
        <Icon name={icon} size={16} className="font-medium" />
      )}
    </a>
  );

  return (
    <div>
      <div className="space-y-1">
        {isCollapsible ? renderButton() : renderLink()}
        
        {isCollapsible && openSection === sectionKey && isMenuExpanded && (
          <div className="space-y-0.5 ml-6">
            {items.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className={`flex items-center space-x-2.5 px-2 py-1.5 rounded-md transition-colors ${
                  checkIsActive(item.href) 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-primary'
                }`}
              >
                <Icon name={item.icon} size={14} />
                {isMenuExpanded && <span className="text-sm font-normal truncate">{item.label}</span>}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationSection;