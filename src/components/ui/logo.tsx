interface LogoProps {
  isCollapsed?: boolean;
}

const Logo = ({ isCollapsed = false }: LogoProps) => {
  if (isCollapsed) {
    return (
      <a href="/" className="flex items-center justify-center group">
        <img 
          src="https://cdn.poehali.dev/files/fa30cbfc-c3a7-4900-bdf2-8e9ee4f5c4c8.png" 
          alt="Business Market" 
          className="h-10 w-auto object-contain"
        />
      </a>
    );
  }

  return (
    <a href="/" className="flex items-center justify-center px-2">
      <img 
        src="https://cdn.poehali.dev/files/fa30cbfc-c3a7-4900-bdf2-8e9ee4f5c4c8.png" 
        alt="Business Market" 
        className="h-12 w-auto object-contain"
      />
    </a>
  );
};

export default Logo;