const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-16 h-16 bg-teal-800 flex flex-col items-center justify-center rounded-lg">
          <div className="text-white font-bold text-2xl leading-none tracking-wider">
            BM
          </div>
          <div className="text-white text-[6px] font-medium tracking-[0.15em] mt-0.5">
            BUSINESS MARKET
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 leading-tight">BM</span>
        <span className="text-sm text-gray-600 uppercase tracking-wide font-medium">BUSINESS MARKET</span>
      </div>
    </div>
  );
};

export default Logo;