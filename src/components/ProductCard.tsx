import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  supplier: string;
  category: string;
  rating: number;
  inStock: boolean;
  onChatClick: (productId: string) => void;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  supplier, 
  category, 
  rating, 
  inStock,
  onChatClick 
}: ProductCardProps) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="p-3">
        <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-3 pt-0">
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          
          <h3 className="font-semibold text-sm line-clamp-2">
            {name}
          </h3>
          
          <div className="flex items-center gap-1">
            <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
            <span className="text-xs text-gray-600">{rating}</span>
          </div>
          
          <div className="text-xs text-gray-500">
            Поставщик: {supplier}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg text-teal-800">
              {price.toLocaleString()} ₽
            </span>
            <Badge variant={inStock ? "default" : "destructive"} className="text-xs">
              {inStock ? "В наличии" : "Под заказ"}
            </Badge>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 pt-0 flex gap-2">
        <Button size="sm" className="flex-1">
          <Icon name="ShoppingCart" size={14} className="mr-1" />
          В корзину
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => onChatClick(id)}
          className="flex-1"
        >
          <Icon name="MessageCircle" size={14} className="mr-1" />
          Чат
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;