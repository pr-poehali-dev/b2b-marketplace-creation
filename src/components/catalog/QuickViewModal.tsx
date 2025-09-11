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
      <DialogContent className="max-w-2xl">
        <DialogHeader className="pb-3">
          <DialogTitle className="text-lg font-semibold text-left line-clamp-2">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-4">
          {/* Компактное изображение */}
          <div className="col-span-1">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <Badge variant="destructive" className="absolute top-2 left-2 text-xs">
                  -{product.discount}%
                </Badge>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">Нет в наличии</span>
                </div>
              )}
            </div>
          </div>

          {/* Основная информация */}
          <div className="col-span-2 space-y-3">
            {/* Цена - главное */}
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-blue-600">
                {product.price.toLocaleString('ru-RU')} ₽
              </span>
              <span className="text-sm text-gray-500">/{product.unit}</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  {product.oldPrice.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>

            {/* Краткая информация */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500">({product.reviews})</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Icon name="Store" size={14} className="text-gray-400" />
                <span className="text-gray-700 truncate">{product.seller}</span>
                {product.verified && (
                  <Icon name="CheckCircle" size={12} className="text-green-600 shrink-0" />
                )}
              </div>

              <div className="flex items-center gap-2">
                <Icon name="Package" size={14} className="text-gray-400" />
                <span className="text-gray-700">Мин. заказ: {product.minOrder}</span>
              </div>

              <div className="flex items-center gap-2">
                <Icon name="Truck" size={14} className="text-gray-400" />
                <span className="text-gray-700">В наличии: {product.available}</span>
              </div>
            </div>

            {/* Краткое описание */}
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Компактные кнопки действий */}
        <div className="flex gap-2 pt-3 border-t mt-4">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 h-9"
            onClick={() => {
              onSendInquiry(product);
              onClose();
            }}
            disabled={!product.inStock}
          >
            <Icon name="Mail" size={14} className="mr-1" />
            <span className="text-sm">Заявка</span>
          </Button>
          
          <Button 
            variant="outline"
            className="flex-1 py-2 h-9"
            onClick={(e) => {
              onToggleFavorite(product, e);
            }}
          >
            <Icon 
              name="Heart" 
              size={14} 
              className={`mr-1 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
            />
            <span className="text-sm">{isFavorite ? "Избранное" : "В избранное"}</span>
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="shrink-0 h-9 w-9"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;