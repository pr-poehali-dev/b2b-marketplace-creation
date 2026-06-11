import { useLayout } from '@/contexts/LayoutContext';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  const { sidebarWidth } = useLayout();

  return (
    <div
      className={`transition-all duration-300 w-full min-h-screen ${className}`}
      style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }}
    >
      {children}
    </div>
  );
};

export default PageLayout;
