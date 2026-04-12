import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { productsData } from "@/data/productsData";
import { getTopProducts } from "@/utils/productClicks";

interface PopularProductsProps {
  limit?: number;
  className?: string;
}

const CATEGORIES = [...new Set(productsData.map(p => p.category))];

export default function PopularProducts({ limit = 8, className = "" }: PopularProductsProps) {
  const navigate = useNavigate();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [displayProducts, setDisplayProducts] = useState(productsData.slice(0, limit));
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [animating, setAnimating] = useState(false);

  const loadProducts = (catIdx: number) => {
    const topClicks = getTopProducts(limit);
    if (topClicks.length >= 3) {
      // Ищем реальные товары по id из кликнутых
      const real = topClicks
        .map(c => productsData.find(p => p.id === c.id))
        .filter(Boolean) as typeof productsData;
      const rest = productsData.filter(p => !real.find(r => r.id === p.id));
      setDisplayProducts([...real, ...rest].slice(0, limit));
      setActiveCategory("По активности");
    } else {
      const category = CATEGORIES[catIdx % CATEGORIES.length];
      const categoryProducts = productsData.filter(p => p.category === category);
      const rest = productsData.filter(p => p.category !== category);
      setDisplayProducts([...categoryProducts, ...rest].slice(0, limit));
      setActiveCategory(category);
    }
    setLastUpdated(Date.now());
  };

  useEffect(() => {
    loadProducts(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const topClicks = getTopProducts(1);
      if (topClicks.length >= 3) {
        loadProducts(categoryIndex);
        return;
      }
      setAnimating(true);
      setTimeout(() => {
        const nextIdx = (categoryIndex + 1) % CATEGORIES.length;
        setCategoryIndex(nextIdx);
        loadProducts(nextIdx);
        setAnimating(false);
      }, 300);
    }, 5000);

    const handleUpdate = () => loadProducts(categoryIndex);
    window.addEventListener('product-clicks-updated', handleUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('product-clicks-updated', handleUpdate);
    };
  }, [categoryIndex, limit]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            Популярные товары
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs font-normal">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block mr-1 animate-pulse" />
              {activeCategory}
            </Badge>
            <div className="flex gap-1">
              {CATEGORIES.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === categoryIndex % CATEGORIES.length ? 'bg-primary scale-125' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-normal">
              {new Date(lastUpdated).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="group border rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 left-2 bg-white/90 text-gray-700 text-xs">
                  {product.category}
                </Badge>
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    -{product.discount}%
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-xs text-gray-500 truncate">{product.seller}</span>
                  {product.verified && <Icon name="CheckCircle" size={12} className="text-primary shrink-0" />}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</span>
                    <span className="text-xs text-gray-500">{product.unit}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium">
                    <span>Смотреть</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
