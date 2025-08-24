const Logo = () => {
  return (
    <a href="/" className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-12 h-12 bg-teal-800 flex flex-col items-center justify-center rounded-lg">
          <div className="text-white font-bold text-lg leading-none tracking-wider">
            BM
          </div>
          <div className="text-white text-[5px] font-medium tracking-[0.15em] mt-0.5">
            BUSINESS MARKET
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 leading-tight">Business Market</span>
        <span className="text-xs text-gray-600 uppercase tracking-wide font-medium">B2B Platform</span>
      </div>
    </a>
  );
};

export default Logo;