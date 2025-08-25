interface LogoProps {
  isCollapsed?: boolean;
}

const Logo = ({ isCollapsed = false }: LogoProps) => {
  if (isCollapsed) {
    return (
      <a href="/" className="flex items-center justify-center group">
        <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-2xl border-4 border-white ring-4 ring-teal-200 group-hover:ring-teal-300 transition-all duration-300 group-hover:scale-105 flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-teal-600">B</span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a href="/" className="flex items-center space-x-3">
      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-2xl border-4 border-white ring-4 ring-teal-200 flex items-center justify-center">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-3xl font-bold text-teal-600">B</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 leading-tight">Business Market</span>
      </div>
    </a>
  );
};

export default Logo;