interface LogoProps {
  isCollapsed?: boolean;
}

const Logo = ({ isCollapsed = false }: LogoProps) => {
  if (isCollapsed) {
    return (
      <a href="/" className="flex items-center justify-center group">
        <div className="w-10 h-10 flex items-center justify-center">
          <img 
            src="https://cdn.poehali.dev/files/d390678f-9197-41fb-be63-1a4fd3b285dc.png" 
            alt="Business Market" 
            className="w-full h-full object-contain"
          />
        </div>
      </a>
    );
  }

  return (
    <a href="/" className="flex items-center justify-center">
      <img 
        src="https://cdn.poehali.dev/files/d390678f-9197-41fb-be63-1a4fd3b285dc.png" 
        alt="Business Market" 
        className="h-10 object-contain"
      />
    </a>
  );
};

export default Logo;