import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";
import { Product } from "@/components/catalog/ProductCard";
import { productsData } from "@/data/productsData";
import { useCart } from "@/contexts/CartContext";
import ProductInquiryModal from "@/components/ProductInquiryModal";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      const foundProduct = productsData.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Находим похожие товары из той же категории
        const related = productsData
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        navigate('/catalog');
      }
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="mx-auto text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Загрузка товара...</p>
        </div>
      </div>
    );
  }

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

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSendInquiry = () => {
    setIsInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryModalOpen(false);
  };

  // Создаем массив изображений (для демонстрации - используем одно и то же изображение)
  const productImages = Array(4).fill(product.image);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="ml-64">
        <div className="container mx-auto px-6 py-8">
          {/* Хлебные крошки */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <button 
              onClick={() => navigate('/catalog')}
              className="hover:text-blue-600 transition-colors"
            >
              Каталог
            </button>
            <Icon name="ChevronRight" size={14} />
            <span className="text-blue-600">{product.category}</span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-gray-900 font-medium truncate max-w-xs">
              {product.name}
            </span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Галерея изображений */}
            <div className="space-y-4">
              {/* Основное изображение */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-lg">
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Badges на основном изображении */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-white/95 text-gray-700">
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
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      Нет в наличии
                    </Badge>
                  </div>
                )}
              </div>

              {/* Миниатюры */}
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-blue-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Информация о товаре */}
            <div className="space-y-6">
              {/* Заголовок */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h1>
                
                {/* Рейтинг и отзывы */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
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
              </div>

              <Separator />

              {/* Цена */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-blue-600">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                  <span className="text-gray-500 text-lg">{product.unit}</span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-xl">
                      {product.oldPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  )}
                </div>
                {product.discount && (
                  <p className="text-green-600 font-medium">
                    Экономия: {((product.oldPrice! - product.price) * quantity).toLocaleString('ru-RU')} ₽
                  </p>
                )}
              </div>

              {/* Описание */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Описание товара</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.detailedDescription || product.description}
                </p>
              </div>

              {/* Характеристики заказа */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Условия заказа</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Package" size={20} className="text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Мин. заказ</div>
                        <div className="font-medium">{product.minOrder}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Truck" size={20} className="text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">В наличии</div>
                        <div className="font-medium">{product.available}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Количество и действия */}
              <div className="space-y-4">
                {/* Выбор количества */}
                <div className="flex items-center gap-4">
                  <span className="font-medium">Количество:</span>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <span className="w-16 text-center font-medium text-lg">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Button 
                      size="lg"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-lg py-6"
                      onClick={handleSendInquiry}
                      disabled={!product.inStock}
                    >
                      <Icon name="Mail" size={20} className="mr-2" />
                      Отправить заявку
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="flex-1 text-lg py-6 border-2"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                    >
                      <Icon name="ShoppingCart" size={20} className="mr-2" />
                      В корзину
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={handleToggleFavorite}
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
                      onClick={() => navigate('/catalog')}
                    >
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Вернуться к каталогу
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Похожие товары */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Похожие товары</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card 
                    key={relatedProduct.id} 
                    className="group cursor-pointer hover:shadow-xl transition-all duration-300"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-2 left-2 bg-white/95 text-gray-700 text-xs">
                        {relatedProduct.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                        <span className="text-sm">{relatedProduct.rating}</span>
                        <span className="text-xs text-gray-500">({relatedProduct.reviews})</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-blue-600">
                          {relatedProduct.price.toLocaleString('ru-RU')} ₽
                        </span>
                        <span className="text-xs text-gray-500">{relatedProduct.unit}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>

      <ProductInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={handleCloseInquiry}
        product={product}
      />
    </div>
  );
};

export default ProductDetail;