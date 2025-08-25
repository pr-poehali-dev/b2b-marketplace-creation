interface LogoProps {
  isCollapsed?: boolean;
}

const Logo = ({ isCollapsed = false }: LogoProps) => {
  if (isCollapsed) {
    return (
      <a href="/" className="flex items-center justify-center mb-6 group">
        <div className="relative">
          <img 
            src="https://cdn.poehali.dev/files/5cbc8996-f3ed-4a2a-b204-1487ae3d6e70.png" 
            alt="Business Market Logo" 
            className="w-20 h-20 rounded-xl object-contain bg-white p-3 shadow-2xl border-4 border-teal-300 group-hover:border-teal-500 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl ring-4 ring-teal-100/50"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-200/30 to-emerald-200/30 group-hover:from-teal-300/40 group-hover:to-emerald-300/40 transition-all duration-300"></div>
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