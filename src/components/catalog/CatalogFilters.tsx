import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

interface CatalogFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  categories: string[];
  resetFilters: () => void;
  totalProducts: number;
  filteredProducts: number;
}

const CatalogFilters = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  verifiedOnly,
  setVerifiedOnly,
  inStockOnly,
  setInStockOnly,
  priceRange,
  setPriceRange,
  categories,
  resetFilters,
  totalProducts,
  filteredProducts
}: CatalogFiltersProps) => {
  return (
    <Card className="sticky top-4 shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center text-gray-800">
            <Icon name="Filter" size={20} className="mr-2 text-blue-600" />
            Фильтры
          </span>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-gray-600 hover:text-blue-600">
            <Icon name="RotateCcw" size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Поиск */}
        <div>
          <label className="text-sm font-semibold mb-3 block text-gray-700">Поиск товаров</label>
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Название, категория..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Категория */}
        <div>
          <label className="text-sm font-semibold mb-3 block text-gray-700">Категория</label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="border-gray-200 focus:border-blue-500">
              <SelectValue placeholder="Все категории" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ценовой диапазон */}
        <div>
          <label className="text-sm font-semibold mb-3 block text-gray-700">
            Цена: {priceRange[0].toLocaleString('ru-RU')} - {priceRange[1].toLocaleString('ru-RU')} ₽
          </label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100000}
            min={0}
            step={500}
            className="w-full"
          />
        </div>

        {/* Чекбоксы */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="verified"
              checked={verifiedOnly}
              onCheckedChange={setVerifiedOnly}
            />
            <label htmlFor="verified" className="text-sm font-medium text-gray-700 cursor-pointer">
              Только верифицированные поставщики
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox
              id="inStock"
              checked={inStockOnly}
              onCheckedChange={setInStockOnly}
            />
            <label htmlFor="inStock" className="text-sm font-medium text-gray-700 cursor-pointer">
              Только товары в наличии
            </label>
          </div>
        </div>

        {/* Статистика */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Статистика каталога</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Всего товаров:</span>
              <span className="font-medium">{totalProducts}</span>
            </div>
            <div className="flex justify-between">
              <span>Найдено:</span>
              <span className="font-medium text-blue-600">{filteredProducts}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CatalogFilters;