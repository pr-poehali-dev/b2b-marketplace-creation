import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Product } from "./ProductCard";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSendInquiry: (product: Product) => void;
  onToggleFavorite: (product: Product, event: React.MouseEvent<HTMLButtonElement>) => void;
  isFavorite: boolean;
}

const QuickViewModal = ({
  product,
  isOpen,
  onClose,
  onSendInquiry,
  onToggleFavorite,
  isFavorite,
}: QuickViewModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-left">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Изображение товара */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <Badge variant="secondary">
                  {product.category}
                </Badge>
                {product.discount && (
                  <Badge variant="destructive">
                    -{product.discount}%
                  </Badge>
                )}
              </div>
              {!product.inStock && (
                <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">Нет в наличии</span>
                </div>
              )}
            </div>
          </div>

          {/* Информация о товаре */}
          <div className="space-y-4">
            {/* Рейтинг */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Icon 
                    key={i}
                    name="Star" 
                    size={16} 
                    className={`${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="font-medium ml-2">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews} отзывов)</span>
            </div>

            {/* Продавец */}
            <div className="flex items-center gap-3">
              <Icon name="Store" size={16} className="text-gray-400" />
              <span className="text-gray-700">{product.seller}</span>
              {product.verified && (
                <Badge variant="outline" className="border-green-200 text-green-700">
                  <Icon name="CheckCircle" size={12} className="mr-1" />
                  Верифицирован
                </Badge>
              )}
            </div>

            {/* Цена */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-2xl font-bold text-blue-600">
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
                <p className="text-green-600 font-medium text-sm">
                  Экономия: {(product.oldPrice! - product.price).toLocaleString('ru-RU')} ₽
                </p>
              )}
            </div>

            {/* Описание */}
            <div>
              <h4 className="font-medium mb-2">Описание</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {product.detailedDescription || product.description}
              </p>
            </div>

            {/* Условия заказа */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Package" size={16} className="text-gray-400" />
                <div>
                  <div className="text-gray-500">Мин. заказ</div>
                  <div className="font-medium">{product.minOrder}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Truck" size={16} className="text-gray-400" />
                <div>
                  <div className="text-gray-500">В наличии</div>
                  <div className="font-medium">{product.available}</div>
                </div>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                onClick={() => onSendInquiry(product)}
                disabled={!product.inStock}
              >
                <Icon name="Mail" size={16} className="mr-2" />
                Отправить заявку
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={(e) => onToggleFavorite(product, e)}
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
                  onClick={onClose}
                >
                  <Icon name="X" size={16} className="mr-2" />
                  Закрыть
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;