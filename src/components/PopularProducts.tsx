import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Product } from "@/components/catalog/ProductCard";
import { mapBackendProduct, BackendProduct } from "@/utils/mapBackendProduct";
import { getTopProducts } from "@/utils/productClicks";

const PRODUCTS_URL = 'https://functions.poehali.dev/65a30f37-03fa-4e12-ad16-d14f83cd61b4';

interface PopularProductsProps {
  limit?: number;
  className?: string;
}

export default function PopularProducts({ limit = 8, className = "" }: PopularProductsProps) {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);

  const loadProducts = (catIdx: number, source: Product[], cats: string[]) => {
    if (source.length === 0) return;
    const topClicks = getTopProducts(limit);
    if (topClicks.length >= 3) {
      const real = topClicks
        .map(c => source.find(p => p.id === c.id))
        .filter(Boolean) as Product[];
      const rest = source.filter(p => !real.find(r => r.id === p.id));
      setDisplayProducts([...real, ...rest].slice(0, limit));
      setActiveCategory("По активности");
    } else if (cats.length > 0) {
      const category = cats[catIdx % cats.length];
      const categoryProducts = source.filter(p => p.category === category);
      const rest = source.filter(p => p.category !== category);
      setDisplayProducts([...categoryProducts, ...rest].slice(0, limit));
      setActiveCategory(category);
    } else {
      setDisplayProducts(source.slice(0, limit));
    }
    setLastUpdated(Date.now());
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${PRODUCTS_URL}?limit=50`);
        const data = await res.json();
        const list: BackendProduct[] = data.products || [];
        const mapped = list.map(mapBackendProduct);
        const cats = [...new Set(mapped.map(p => p.category))];
        setAllProducts(mapped);
        setCategories(cats);
        loadProducts(0, mapped, cats);
      } catch {
        setAllProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;

    const interval = setInterval(() => {
      if (hoveredRef.current) return;
      const topClicks = getTopProducts(1);
      if (topClicks.length >= 3) {
        loadProducts(categoryIndex, allProducts, categories);
        return;
      }
      if (categories.length === 0) return;
      setAnimating(true);
      setTimeout(() => {
        const nextIdx = (categoryIndex + 1) % categories.length;
        setCategoryIndex(nextIdx);
        loadProducts(nextIdx, allProducts, categories);
        setAnimating(false);
      }, 300);
    }, 5000);

    const handleUpdate = () => loadProducts(categoryIndex, allProducts, categories);
    window.addEventListener('product-clicks-updated', handleUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('product-clicks-updated', handleUpdate);
    };
  }, [categoryIndex, limit, allProducts, categories]);

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
              {categories.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === categoryIndex % categories.length ? 'bg-primary scale-125' : 'bg-gray-300'}`}
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
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border-2 overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : displayProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Пока нет товаров для показа</p>
        ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}
          onMouseEnter={() => { setHovered(true); hoveredRef.current = true; }}
          onMouseLeave={() => { setHovered(false); hoveredRef.current = false; }}
        >
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="group border-2 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-200 cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs px-2 py-1">
                  {product.category}
                </Badge>
                {product.discount && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{product.discount}%
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-base text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-sm text-gray-500 truncate">{product.seller}</span>
                  {product.verified && <Icon name="CheckCircle" size={14} className="text-primary shrink-0" />}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</span>
                    <span className="text-xs text-gray-500">{product.unit}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium">
                    <span>Смотреть</span>
                    <Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </CardContent>
    </Card>
  );
}