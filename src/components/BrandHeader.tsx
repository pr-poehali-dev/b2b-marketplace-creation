const BrandHeader = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 py-8 px-6">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto text-center">
        {/* Main title with gradient text */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">
            Business Market
          </span>
        </h1>
        
        {/* Subtitle with glow effect */}
        <div className="mb-6">
          <p className="text-lg md:text-xl lg:text-2xl text-emerald-100 font-medium tracking-wide">
            Платформа для бизнеса
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-300 mx-auto mt-4 rounded-full shadow-lg shadow-emerald-400/50"></div>
        </div>
        
        {/* Corporate platform badge */}
        <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-xl">
          <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
          <span className="text-lg md:text-xl text-white font-semibold tracking-wide">
            Корпоративная платформа
          </span>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-12 left-12 w-4 h-4 bg-emerald-400 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-24 right-16 w-3 h-3 bg-teal-300 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-16 left-20 w-5 h-5 bg-white/30 rounded-full animate-bounce delay-1500"></div>
      </div>
    </div>
  );
};

export default BrandHeader;