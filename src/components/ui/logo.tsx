interface LogoProps {
  isCollapsed?: boolean;
}

const Logo = ({ isCollapsed = false }: LogoProps) => {
  if (isCollapsed) {
    return (
      <a href="/" className="flex items-center justify-center group">
        <img 
          src="https://cdn.poehali.dev/files/47ce7a0d-d1f6-4559-a5a7-93e3193062da.png" 
          alt="Business Market" 
          className="h-10 w-auto object-contain"
        />
      </a>
    );
  }

  return (
    <a href="/" className="flex items-center justify-center px-2">
      <img 
        src="https://cdn.poehali.dev/files/47ce7a0d-d1f6-4559-a5a7-93e3193062da.png" 
        alt="Business Market" 
        className="h-12 w-auto object-contain"
      />
    </a>
  );
};

export default Logo;