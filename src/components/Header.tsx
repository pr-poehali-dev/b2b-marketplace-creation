import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserProfile from './header/UserProfile';
import SidebarNavigation from './header/SidebarNavigation';
import Icon from '@/components/ui/icon';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPinned, setIsPinned] = useState(() => {
    const saved = localStorage.getItem('sidebar-pinned');
    return saved === 'true';
  });

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Определяем активный пункт меню
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Управление разделами
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Управление закреплением меню
  const handlePinToggle = (pinned: boolean) => {
    setIsPinned(pinned);
    localStorage.setItem('sidebar-pinned', pinned.toString());
  };

  // Определяем, должно ли меню быть развернутым
  const isMenuExpanded = isMobile || isHovered || isPinned;

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-40">
      <div className={`transition-all duration-300 overflow-hidden ${
        isMenuExpanded ? 'ml-56' : 'ml-16'
      }`}>
        <div className="container mx-auto px-4 py-4 max-w-none">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity cursor-pointer">
              <span className="text-base sm:text-lg font-bold text-gray-900">Business Market</span>
              <span className="hidden sm:inline text-sm text-gray-600 ml-2">платформа для бизнеса</span>
            </Link>
            
            {/* Поиск товаров */}
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Search" size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
                    }
                  }}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
            
            <UserProfile 
              isLoggedIn={isLoggedIn} 
              setIsLoggedIn={setIsLoggedIn} 
            />
          </div>
        </div>
      </div>
      
      <SidebarNavigation
        isMenuExpanded={isMenuExpanded}
        isMobile={isMobile}
        openSection={openSection}
        toggleSection={toggleSection}
        isActive={isActive}
        setIsHovered={setIsHovered}
        isPinned={isPinned}
        setIsPinned={handlePinToggle}
      />
    </header>
  );
};

export default Header;