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
}

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  onToggleFavorite: (product: Product, event: React.MouseEvent<HTMLButtonElement>) => void;
  onSendInquiry: (product: Product) => void;
}

const ProductCard = ({
  product,
  viewMode,
  isFavorite,
  onToggleFavorite,
  onSendInquiry
}: ProductCardProps) => {
  return (
    <Card 
      className={`group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 ${
        viewMode === 'list' ? 'flex flex-row h-48' : ''
      }`}
      data-product-card
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

        {/* Кнопка избранного */}
        <Button 
          variant="secondary"
          size="icon"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm"
          onClick={(e) => onToggleFavorite(product, e)}
        >
          <Icon 
            name="Heart"
            size={14} 
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}
          />
        </Button>
      </div>
      
      <CardContent className={`p-5 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
        <div className="space-y-3">
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

          {/* Кнопки действий */}
          <div className="flex gap-2 pt-2">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => onSendInquiry(product)}
              disabled={!product.inStock}
            >
              <Icon name="Mail" size={16} className="mr-2" />
              Отправить заявку
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={() => onSendInquiry(product)}
              className="border-gray-200 hover:border-blue-300"
            >
              <Icon name="MessageCircle" size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;