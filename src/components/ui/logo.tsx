interface LogoProps {
  isCollapsed?: boolean;
}

const Logo = ({ isCollapsed = false }: LogoProps) => {
  if (isCollapsed) {
    return (
      <a href="/" className="flex items-center justify-center mb-4 group">
        <div className="relative">
          <img 
            src="https://cdn.poehali.dev/files/5cbc8996-f3ed-4a2a-b204-1487ae3d6e70.png" 
            alt="Business Market Logo" 
            className="w-14 h-14 rounded-lg object-contain bg-white p-2 shadow-lg border-2 border-teal-200 group-hover:border-teal-400 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-teal-100/20 to-emerald-100/20 group-hover:from-teal-200/30 group-hover:to-emerald-200/30 transition-all duration-300"></div>
        </div>
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