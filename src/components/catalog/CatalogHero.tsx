import Icon from "@/components/ui/icon";

const CatalogHero = () => {
  return (
    <div className="mb-4 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-2">Каталог товаров</h1>
        <p className="text-lg text-blue-100 mb-4">Более 10,000 товаров от проверенных поставщиков</p>
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={16} className="text-blue-200" />
            <span>Проверенные поставщики</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Truck" size={16} className="text-blue-200" />
            <span>Быстрая доставка</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Award" size={16} className="text-blue-200" />
            <span>Гарантия качества</span>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-64 bg-gradient-to-l from-white/10 to-transparent"></div>
    </div>
  );
};

export default CatalogHero;