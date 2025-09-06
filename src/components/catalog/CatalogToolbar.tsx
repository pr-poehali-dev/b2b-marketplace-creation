import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";

interface CatalogToolbarProps {
  filteredProductsCount: number;
  totalProducts: number;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const CatalogToolbar = ({
  filteredProductsCount,
  totalProducts,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy
}: CatalogToolbarProps) => {
  return (
    <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
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