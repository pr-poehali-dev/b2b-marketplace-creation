interface LogoProps {
  isCollapsed?: boolean;
}

const Logo = ({ isCollapsed = false }: LogoProps) => {
  if (isCollapsed) {
    return (
      <a href="/" className="flex items-center justify-center group">
        <div className="relative bg-gradient-to-br from-teal-100 to-emerald-100 p-2 rounded-2xl shadow-2xl border-4 border-teal-500 ring-4 ring-teal-200/60 group-hover:ring-teal-300 transition-all duration-300 group-hover:scale-105">
          <img 
            src="https://cdn.poehali.dev/files/5cbc8996-f3ed-4a2a-b204-1487ae3d6e70.png" 
            alt="Business Market Logo" 
            className="w-12 h-12 rounded-lg object-contain bg-white p-1.5 shadow-lg border-2 border-white"
          />
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
          className="w-24 h-24 rounded-2xl object-contain bg-white p-3 shadow-2xl border-4 border-teal-400 ring-8 ring-teal-100/80"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 leading-tight">Business Market</span>
      </div>
    </a>
  );
};

export default Logo;