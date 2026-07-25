interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className={`w-full min-h-screen ${className}`}>
      {children}
    </div>
  );
};

export default PageLayout;
