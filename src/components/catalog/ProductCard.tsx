import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  seller: string;
  verified: boolean;
  price: number;
  oldPrice?: number;
  unit: string;
  minOrder: string;
  available: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
  description: string;
  detailedDescription?: string;
}

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  onToggleFavorite: (product: Product, event: React.MouseEvent<HTMLButtonElement>) => void;
  onSendInquiry: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onAddToCompare?: (product: Product) => void;
  isInCompare?: boolean;
  onProductClick?: (productId: number) => void;
}

const ProductCard = ({
  product,
  viewMode,
  isFavorite,
  onToggleFavorite,
  onSendInquiry,
  onQuickView,
  onAddToCompare,
  isInCompare = false,
  onProductClick
}: ProductCardProps) => {
  return (
    <Card 
      className={`group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 cursor-pointer ${
        viewMode === 'list' ? 'flex flex-row h-48' : 'h-full'
      }`}
      data-product-card
      onClick={() => onProductClick?.(product.id)}
    >
      <div className={`relative overflow-hidden ${
        viewMode === 'list' ? 'w-64 h-48' : 'aspect-video'
      }`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className="bg-white/95 text-gray-700 text-xs">
            {product.category}
          </Badge>
          {product.discount && (
            <Badge variant="destructive" className="text-xs">
              -{product.discount}%
            </Badge>
          )}
        </div>
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm">
              Нет в наличии
            </Badge>
          </div>
        )}

        {/* Кнопки действий */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button 
            variant="secondary"
            size="icon"
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm"
            onClick={(e) => onToggleFavorite(product, e)}
          >
            <Icon 
              name="Heart"
              size={14} 
              className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}
            />
          </Button>
          
          {onQuickView && (
            <Button 
              variant="secondary"
              size="icon"
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
            >
              <Icon name="Eye" size={14} className="text-gray-600" />
            </Button>
          )}
          
          {onAddToCompare && (
            <Button 
              variant="secondary"
              size="icon"
              className={`w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm ${
                isInCompare ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCompare(product);
              }}
            >
              <Icon 
                name="BarChart" 
                size={14} 
                className={isInCompare ? "text-blue-600" : "text-gray-600"}
              />
            </Button>
          )}
        </div>
      </div>
      
      <CardContent className={`p-5 flex-1 flex flex-col ${viewMode === 'list' ? 'justify-between' : ''}`}>
        <div className="space-y-3 flex-1">
          {/* Название товара */}
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Продавец */}
          <div className="flex items-center gap-2">
            <Icon name="Store" size={14} className="text-gray-400" />
            <span className="text-sm text-gray-600 flex-1">{product.seller}</span>
            {product.verified && (
              <Badge variant="outline" className="text-xs h-5 border-green-200 text-green-700">
                <Icon name="CheckCircle" size={10} className="mr-1" />
                Верифицирован
              </Badge>
            )}
          </div>

          {/* Рейтинг и отзывы */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({product.reviews} отзывов)</span>
          </div>

          {/* Описание (только в режиме списка) */}
          {viewMode === 'list' && (
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          )}

          <div className="border-t pt-3">
            {/* Цена */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-bold text-blue-600">
                {product.price.toLocaleString('ru-RU')} ₽
              </span>
              <span className="text-sm text-gray-500">{product.unit}</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {product.oldPrice.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>
            
            {/* Информация о заказе */}
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Icon name="Package" size={12} className="text-gray-400" />
                <span>Мин: {product.minOrder}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Truck" size={12} className="text-gray-400" />
                <span>{product.available}</span>
              </div>
            </div>
          </div>

        </div>
        
        {/* Кнопки действий - всегда внизу */}
        <div className="space-y-2 pt-2 mt-auto">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 text-sm h-9"
              onClick={() => onSendInquiry(product)}
              disabled={!product.inStock}
            >
              <div className="flex items-center justify-center gap-1.5 w-full min-w-0">
                <Icon name="Mail" size={14} className="shrink-0" />
                <span className="truncate">Отправить заявку</span>
              </div>
            </Button>
            
            {/* Дополнительные действия */}
            <div className="flex gap-2">
              {onQuickView && (
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => onQuickView(product)}
                >
                  <Icon name="Eye" size={14} className="mr-1" />
                  Быстрый просмотр
                </Button>
              )}
              {onAddToCompare && (
                <Button 
                  variant="outline"
                  onClick={() => onAddToCompare(product)}
                  className={`flex-1 ${
                    isInCompare ? 'border-blue-500 text-blue-600' : 'border-gray-200 text-gray-700'
                  } py-1.5 px-2 text-xs font-medium rounded flex items-center justify-center`}
                  title={isInCompare ? 'Убрать из сравнения' : 'Добавить к сравнению'}
                >
                  <Icon 
                    name="BarChart" 
                    size={14} 
                    className="shrink-0"
                  />
                </Button>
              )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;