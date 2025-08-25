interface LogoProps {
  isCollapsed?: boolean;
}

const Logo = ({ isCollapsed = false }: LogoProps) => {
  if (isCollapsed) {
    return (
      <a href="/" className="flex items-center justify-center">
        <img 
          src="https://cdn.poehali.dev/files/5cbc8996-f3ed-4a2a-b204-1487ae3d6e70.png" 
          alt="Business Market Logo" 
          className="w-8 h-8 rounded object-contain"
        />
      </a>
    );
  }

  return (
    <a href="/" className="flex items-center space-x-3">
      <div className="relative">
        <img 
          src="https://cdn.poehali.dev/files/5cbc8996-f3ed-4a2a-b204-1487ae3d6e70.png" 
          alt="Business Market Logo" 
          className="w-12 h-12 rounded-lg object-contain bg-white p-1 shadow-sm border border-gray-200"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 leading-tight">Business Market</span>
      </div>
    </a>
  );
};

export default Logo;