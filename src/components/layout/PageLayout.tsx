import { useLayout } from '@/contexts/LayoutContext';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  const { sidebarWidth } = useLayout();

  return (
    <div
      className={`transition-all duration-300 min-h-screen ${className}`}
      style={{ marginLeft: sidebarWidth }}
    >
      {children}
    </div>
  );
};

export default PageLayout;
