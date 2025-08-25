interface LogoProps {
  isCollapsed?: boolean;
}

const Logo = ({ isCollapsed = false }: LogoProps) => {
  if (isCollapsed) {
    return (
      <a href="/" className="flex items-center justify-center group">
        <div className="w-14 h-14 bg-white rounded-2xl shadow-2xl border-4 border-teal-200 ring-4 ring-teal-100 group-hover:ring-teal-300 transition-all duration-300 group-hover:scale-105 flex items-center justify-center p-1">
          <img 
            src="https://cdn.poehali.dev/files/4d20b7de-6689-423f-acb3-f8d75e6d3142.png" 
            alt="BM Business Market Logo" 
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
      </a>
    );
  }

  return (
    <a href="/" className="flex items-center space-x-4">
      <div className="w-20 h-20 bg-white rounded-2xl shadow-2xl border-4 border-teal-200 ring-4 ring-teal-100 flex items-center justify-center p-2">
        <img 
          src="https://cdn.poehali.dev/files/4d20b7de-6689-423f-acb3-f8d75e6d3142.png" 
          alt="BM Business Market Logo" 
          className="w-full h-full object-contain rounded-xl"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 leading-tight">Business Market</span>
      </div>
    </a>
  );
};

export default Logo;