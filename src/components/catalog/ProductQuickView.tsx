import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { Product } from "./ProductCard";
import { useCart } from "@/contexts/CartContext";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSendInquiry: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  isFavorite: boolean;
  onAddToCompare: (product: Product) => void;
  isInCompare: boolean;
}

const ProductQuickView = ({
  product,
  isOpen,
  onClose,
  onSendInquiry,
  onToggleFavorite,
  isFavorite,
  onAddToCompare,
  isInCompare
}: ProductQuickViewProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id.toString(),
        title: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        company: product.seller
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Изображение товара */}
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
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
              <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center rounded-lg">
                <Badge variant="secondary" className="text-sm">
                  Нет в наличии
                </Badge>
              </div>
            )}
          </div>

          {/* Информация о товаре */}
          <div className="space-y-4">
            {/* Продавец */}
            <div className="flex items-center gap-2">
              <Icon name="Store" size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600 flex-1">{product.seller}</span>
              {product.verified && (
                <Badge variant="outline" className="text-xs h-5 border-green-200 text-green-700">
                  <Icon name="CheckCircle" size={10} className="mr-1" />
                  Верифицирован
                </Badge>
              )}
            </div>

            {/* Рейтинг */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-500">({product.reviews} отзывов)</span>
            </div>

            {/* Описание */}
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">Описание</h4>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Цена */}
            <Card className="border-blue-100 bg-blue-50/50">
              <CardContent className="p-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-blue-600">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                  <span className="text-gray-500">{product.unit}</span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through">
                      {product.oldPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  )}
                </div>
                {product.discount && (
                  <div className="text-sm text-green-600 font-medium">
                    Экономия: {((product.oldPrice! - product.price) * quantity).toLocaleString('ru-RU')} ₽
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Информация о заказе */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Icon name="Package" size={16} className="text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Мин. заказ</div>
                  <div className="text-sm font-medium">{product.minOrder}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Truck" size={16} className="text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">В наличии</div>
                  <div className="text-sm font-medium">{product.available}</div>
                </div>
              </div>
            </div>

            {/* Количество */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Количество:</span>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Icon name="Minus" size={14} />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Icon name="Plus" size={14} />
                </Button>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => onSendInquiry(product)}
                  disabled={!product.inStock}
                >
                  <Icon name="Mail" size={16} className="mr-2" />
                  Отправить заявку
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <Icon name="ShoppingCart" size={16} className="mr-2" />
                  В корзину
                </Button>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => onToggleFavorite(product)}
                >
                  <Icon 
                    name="Heart" 
                    size={16} 
                    className={`mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                  />
                  {isFavorite ? "В избранном" : "В избранное"}
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => onAddToCompare(product)}
                >
                  <Icon 
                    name="BarChart" 
                    size={16} 
                    className={`mr-2 ${isInCompare ? "text-blue-600" : ""}`}
                  />
                  {isInCompare ? "В сравнении" : "Сравнить"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;