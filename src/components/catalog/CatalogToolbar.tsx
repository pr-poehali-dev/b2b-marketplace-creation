import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";

interface CatalogToolbarProps {
  filteredProductsCount: number;
  totalProducts: number;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const CatalogToolbar = ({
  filteredProductsCount,
  totalProducts,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery
}: CatalogToolbarProps) => {
  return (
    <div className="space-y-4">
      {/* Поиск товаров */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Поиск товаров, поставщиков, категорий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 text-base"
          />
        </div>
      </div>
      
      {/* Панель инструментов */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <p className="text-gray-700 font-medium">
            Показано <span className="text-blue-600 font-semibold">{filteredProductsCount}</span> из {totalProducts} товаров
          </p>
        </div>
      
      <div className="flex items-center gap-4">
        {/* Переключатель вида */}
        <div className="flex items-center border border-gray-200 rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="px-3"
          >
            <Icon name="Grid3x3" size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="px-3"
          >
            <Icon name="List" size={16} />
          </Button>
        </div>

        {/* Сортировка */}
        <div className="flex items-center gap-2">
          <Icon name="ArrowUpDown" size={16} className="text-gray-500" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">По названию</SelectItem>
              <SelectItem value="price_asc">Сначала дешевые</SelectItem>
              <SelectItem value="price_desc">Сначала дорогие</SelectItem>
              <SelectItem value="rating">По рейтингу</SelectItem>
              <SelectItem value="popular">По популярности</SelectItem>
              <SelectItem value="discount">По скидке</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CatalogToolbar;