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
  discountOnly: boolean;
  setDiscountOnly: (value: boolean) => void;
  fastDelivery: boolean;
  setFastDelivery: (value: boolean) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  ratingFilter: number;
  setRatingFilter: (value: number) => void;
  minOrderFilter: string;
  setMinOrderFilter: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
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
  discountOnly,
  setDiscountOnly,
  fastDelivery,
  setFastDelivery,
  priceRange,
  setPriceRange,
  ratingFilter,
  setRatingFilter,
  minOrderFilter,
  setMinOrderFilter,
  locationFilter,
  setLocationFilter,
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
            Цена: {priceRange[0].toLocaleString('ru-RU')} - {priceRange[1] >= 10000000 ? '10М+' : priceRange[1].toLocaleString('ru-RU')} ₽
          </label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={10000000}
            min={0}
            step={10000}
            className="w-full"
          />
        </div>

        {/* Рейтинг */}
        <div>
          <label className="text-sm font-semibold mb-3 block text-gray-700">Минимальный рейтинг</label>
          <Select value={ratingFilter.toString()} onValueChange={(value) => setRatingFilter(Number(value))}>
            <SelectTrigger className="border-gray-200 focus:border-blue-500">
              <SelectValue placeholder="Любой рейтинг" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Любой рейтинг</SelectItem>
              <SelectItem value="4">⭐ 4.0 и выше</SelectItem>
              <SelectItem value="4.5">⭐ 4.5 и выше</SelectItem>
              <SelectItem value="4.8">⭐ 4.8 и выше</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Минимальный заказ */}
        <div>
          <label className="text-sm font-semibold mb-3 block text-gray-700">Минимальный заказ</label>
          <Select value={minOrderFilter} onValueChange={setMinOrderFilter}>
            <SelectTrigger className="border-gray-200 focus:border-blue-500">
              <SelectValue placeholder="Любой объем" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Любой объем</SelectItem>
              <SelectItem value="1">1 штука</SelectItem>
              <SelectItem value="small">До 10 штук</SelectItem>
              <SelectItem value="medium">10-100 штук</SelectItem>
              <SelectItem value="large">100+ штук</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Локация поставщика */}
        <div>
          <label className="text-sm font-semibold mb-3 block text-gray-700">Регион поставщика</label>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="border-gray-200 focus:border-blue-500">
              <SelectValue placeholder="Все регионы" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все регионы</SelectItem>
              <SelectItem value="moscow">Москва и МО</SelectItem>
              <SelectItem value="spb">Санкт-Петербург</SelectItem>
              <SelectItem value="ekb">Екатеринбург</SelectItem>
              <SelectItem value="nsk">Новосибирск</SelectItem>
              <SelectItem value="kzn">Казань</SelectItem>
              <SelectItem value="nng">Нижний Новгород</SelectItem>
              <SelectItem value="other">Другие регионы</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Чекбоксы */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="verified"
              checked={verifiedOnly}
              onCheckedChange={setVerifiedOnly}
            />
            <label htmlFor="verified" className="text-sm font-medium text-gray-700 cursor-pointer flex items-center">
              <Icon name="ShieldCheck" size={16} className="mr-1 text-green-600" />
              Верифицированные поставщики
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox
              id="inStock"
              checked={inStockOnly}
              onCheckedChange={setInStockOnly}
            />
            <label htmlFor="inStock" className="text-sm font-medium text-gray-700 cursor-pointer flex items-center">
              <Icon name="Package" size={16} className="mr-1 text-blue-600" />
              Товары в наличии
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="discount"
              checked={discountOnly}
              onCheckedChange={setDiscountOnly}
            />
            <label htmlFor="discount" className="text-sm font-medium text-gray-700 cursor-pointer flex items-center">
              <Icon name="Percent" size={16} className="mr-1 text-red-600" />
              Товары со скидкой
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="fastDelivery"
              checked={fastDelivery}
              onCheckedChange={setFastDelivery}
            />
            <label htmlFor="fastDelivery" className="text-sm font-medium text-gray-700 cursor-pointer flex items-center">
              <Icon name="Zap" size={16} className="mr-1 text-orange-600" />
              Быстрая доставка
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