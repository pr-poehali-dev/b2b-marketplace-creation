import { useState } from "react";
import ProductCard from "./ProductCard";
import SupplierChat from "./SupplierChat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const products = [
    {
      id: "1",
      name: "Стальные трубы оцинкованные 32мм",
      price: 150,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      supplier: "МеталлСтройИнвест",
      category: "Металлопрокат",
      rating: 4.8,
      inStock: true
    },
    {
      id: "2", 
      name: "Кирпич керамический лицевой красный",
      price: 12,
      image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=400&fit=crop",
      supplier: "КирпичСтрой",
      category: "Стройматериалы",
      rating: 4.6,
      inStock: true
    },
    {
      id: "3",
      name: "Цемент Portland CEM I 42.5 H",
      price: 320,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop",
      supplier: "БетонМикс",
      category: "Цемент",
      rating: 4.9,
      inStock: false
    },
    {
      id: "4",
      name: "Профнастил С20 оцинкованный",
      price: 480,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
      supplier: "КровляПлюс",
      category: "Кровля",
      rating: 4.7,
      inStock: true
    },
    {
      id: "5",
      name: "Арматура A500C диаметр 12мм",
      price: 42,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop",
      supplier: "АрматураСервис",
      category: "Металлопрокат", 
      rating: 4.5,
      inStock: true
    },
    {
      id: "6",
      name: "Утеплитель минеральная вата 100мм",
      price: 890,
      image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=400&h=400&fit=crop",
      supplier: "ТеплоДом",
      category: "Утеплители",
      rating: 4.4,
      inStock: true
    }
  ];

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleChatClick = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setChatOpen(true);
    }
  };

  return (
    <section id="catalog" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Каталог товаров</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Широкий ассортимент товаров с возможностью прямого общения с поставщиками
          </p>
        </div>

        {/* Фильтры */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все категории</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Icon name="Filter" size={16} className="mr-2" />
            Фильтры
          </Button>
        </div>

        {/* Сетка товаров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              onChatClick={handleChatClick}
            />
          ))}
        </div>

        {/* Чат с поставщиком */}
        {chatOpen && selectedProduct && (
          <SupplierChat
            product={selectedProduct}
            onClose={() => setChatOpen(false)}
          />
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;