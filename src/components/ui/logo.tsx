interface LogoProps {
  isCollapsed?: boolean;
}

const Logo = ({ isCollapsed = false }: LogoProps) => {
  if (isCollapsed) {
    return (
      <a href="/" className="flex items-center justify-center group">
        <div className="w-14 h-14 bg-white rounded-2xl shadow-2xl border-4 border-emerald-800 ring-4 ring-emerald-700/30 group-hover:ring-emerald-600/50 transition-all duration-300 group-hover:scale-105 flex items-center justify-center p-1">
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
    <a href="/" className="flex items-center justify-center">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-2xl border-4 border-emerald-800 ring-4 ring-emerald-700/30 flex items-center justify-center p-2">
        <img 
          src="https://cdn.poehali.dev/files/4d20b7de-6689-423f-acb3-f8d75e6d3142.png" 
          alt="BM Business Market Logo" 
          className="w-full h-full object-contain rounded-xl"
        />
      </div>
    </a>
  );
};

export default Logo;