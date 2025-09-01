import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserProfile from './header/UserProfile';
import SidebarNavigation from './header/SidebarNavigation';

const Header = () => {
  const location = useLocation();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
            <div className="flex items-center">
              <span className="text-base sm:text-lg font-bold text-gray-900">Business Market</span>
              <span className="hidden sm:inline text-sm text-gray-600 ml-2">платформа для бизнеса</span>
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