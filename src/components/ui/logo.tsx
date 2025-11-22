interface LogoProps {
  isCollapsed?: boolean;
}

const Logo = ({ isCollapsed = false }: LogoProps) => {
  if (isCollapsed) {
    return (
      <a href="/" className="flex items-center justify-center group">
        <img 
          src="https://cdn.poehali.dev/files/d390678f-9197-41fb-be63-1a4fd3b285dc.png" 
          alt="Business Market" 
          className="h-8 w-auto object-contain"
        />
      </a>
    );
  }

  return (
    <a href="/" className="flex items-center justify-center">
      <img 
        src="https://cdn.poehali.dev/files/d390678f-9197-41fb-be63-1a4fd3b285dc.png" 
        alt="Business Market" 
        className="h-14 w-auto object-contain"
      />
    </a>
  );
};

export default Logo;