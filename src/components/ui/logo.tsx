const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-12 h-12 bg-primary flex items-center justify-center rounded">
          <div className="text-white font-bold text-xl tracking-wider">
            <span className="block text-center leading-none">DM</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 leading-tight">DM</span>
        <span className="text-sm text-gray-600 uppercase tracking-wide font-medium">BUSINESS MARKET</span>
      </div>
    </div>
  );
};

export default Logo;