import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { DemoProduct } from "@/data/categoryDemoProducts";

interface DemoProductCardProps {
  product: DemoProduct;
}

// ТЕСТОВАЯ карточка-заглушка товара для страницы категорий.
// Показывает фото (карусель), описание и статус "Нет в наличии".
const DemoProductCard = ({ product }: DemoProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative h-36 overflow-hidden bg-gray-100">
        <img
          src={images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 hover:bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handlePrevImage}
            >
              <Icon name="ChevronLeft" size={14} className="text-gray-700" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 hover:bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleNextImage}
            >
              <Icon name="ChevronRight" size={14} className="text-gray-700" />
            </Button>

            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-white w-3" : "bg-white/60 hover:bg-white/80"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Статус "Нет в наличии" — тестово для всех демо-карточек */}
        <div className="absolute inset-0 bg-gray-900/55 flex items-center justify-center">
          <Badge variant="secondary" className="text-xs font-medium">
            Нет в наличии
          </Badge>
        </div>
      </div>

      <CardContent className="p-3">
        <h4 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">{product.name}</h4>
        <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
      </CardContent>
    </Card>
  );
};

export default DemoProductCard;
