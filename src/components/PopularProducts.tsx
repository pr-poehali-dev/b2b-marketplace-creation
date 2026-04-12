import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { getTopProducts, ProductClickData } from "@/utils/productClicks";

interface PopularProductsProps {
  limit?: number;
  className?: string;
}

const ALL_FALLBACK: ProductClickData[] = [
  { id: 1, name: "Труба стальная 108x4 ГОСТ 8732", image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg", category: "Металлопрокат", seller: "ООО «Металл-Трейд»", verified: true, price: "45,600", unit: "за тонну", minOrder: "5 тонн", available: "120 тонн", clicks: 0, lastClickedAt: 0 },
  { id: 2, name: "Цемент ПЦ 400-Д20 навалом", image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg", category: "Стройматериалы", seller: "АО «СтройБаза Регион»", verified: true, price: "3,850", unit: "за тонну", minOrder: "20 тонн", available: "500+ тонн", clicks: 0, lastClickedAt: 0 },
  { id: 3, name: "Платы Arduino Uno R3 (партия)", image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg", category: "Электроника", seller: "ИП Электроника-Опт", verified: false, price: "890", unit: "за штуку", minOrder: "100 шт", available: "2,000 шт", clicks: 0, lastClickedAt: 0 },
  { id: 4, name: "Профнастил С8 оцинкованный", image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg", category: "Стройматериалы", seller: "ООО «Кровля-Проф»", verified: true, price: "485", unit: "за м²", minOrder: "200 м²", available: "5,000+ м²", clicks: 0, lastClickedAt: 0 },
  { id: 5, name: "Упаковка картонная 300x200x100", image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg", category: "Упаковка", seller: "ООО «Пак-Сервис»", verified: true, price: "18.50", unit: "за штуку", minOrder: "1,000 шт", available: "50,000+ шт", clicks: 0, lastClickedAt: 0 },
  { id: 6, name: "Кабель ВВГ 3x2.5 (бухта 100м)", image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg", category: "Электротехника", seller: "АО «КабельСнаб»", verified: true, price: "2,340", unit: "за бухту", minOrder: "10 бухт", available: "200+ бухт", clicks: 0, lastClickedAt: 0 },
  { id: 7, name: "Арматура А500С 12мм", image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg", category: "Металлопрокат", seller: "ООО «СпецМеталл»", verified: true, price: "62,000", unit: "за тонну", minOrder: "3 тонны", available: "80 тонн", clicks: 0, lastClickedAt: 0 },
  { id: 8, name: "Перчатки нитриловые (уп. 100шт)", image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg", category: "Средства защиты", seller: "ООО «МедСнаб»", verified: true, price: "850", unit: "за упаковку", minOrder: "50 уп", available: "10,000+ уп", clicks: 0, lastClickedAt: 0 },
  { id: 9, name: "Масло моторное 5W-40 (20л)", image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg", category: "Автохимия", seller: "АО «АвтоСнаб»", verified: true, price: "4,200", unit: "за канистру", minOrder: "10 канистр", available: "500+ канистр", clicks: 0, lastClickedAt: 0 },
  { id: 10, name: "Лист стальной 2мм 1250x2500", image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg", category: "Металлопрокат", seller: "ООО «Металл-Трейд»", verified: true, price: "8,900", unit: "за лист", minOrder: "10 листов", available: "300+ листов", clicks: 0, lastClickedAt: 0 },
  { id: 11, name: "Пакеты полиэтиленовые 60x90", image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg", category: "Упаковка", seller: "ООО «Пак-Сервис»", verified: true, price: "1,200", unit: "за 1000 шт", minOrder: "5,000 шт", available: "1,000,000+ шт", clicks: 0, lastClickedAt: 0 },
  { id: 12, name: "Газобетонный блок D500", image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg", category: "Стройматериалы", seller: "АО «СтройБаза Регион»", verified: true, price: "4,500", unit: "за м³", minOrder: "10 м³", available: "200+ м³", clicks: 0, lastClickedAt: 0 },
];

const CATEGORIES = [...new Set(ALL_FALLBACK.map(p => p.category))];

function getSlice(categoryIndex: number, limit: number): { products: ProductClickData[]; category: string } {
  const category = CATEGORIES[categoryIndex % CATEGORIES.length];
  const filtered = ALL_FALLBACK.filter(p => p.category === category);
  const rest = ALL_FALLBACK.filter(p => p.category !== category);
  const combined = [...filtered, ...rest].slice(0, limit);
  return { products: combined, category };
}

export default function PopularProducts({ limit = 8, className = "" }: PopularProductsProps) {
  const navigate = useNavigate();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [products, setProducts] = useState<ProductClickData[]>([]);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [animating, setAnimating] = useState(false);

  const loadProducts = (catIdx: number) => {
    const top = getTopProducts(limit);
    if (top.length >= 3) {
      setProducts(top);
      setActiveCategory("По активности");
    } else {
      const { products: sliced, category } = getSlice(catIdx, limit);
      setProducts(sliced);
      setActiveCategory(category);
    }
    setLastUpdated(Date.now());
  };

  useEffect(() => {
    loadProducts(categoryIndex);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const top = getTopProducts(1);
      if (top.length >= 3) {
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
          {products.map((product) => (
            <div key={product.id} className="group border rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => { localStorage.setItem('catalog_searchQuery', JSON.stringify(product.name)); navigate('/catalog'); }}>
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 left-2 bg-white/90 text-gray-700 text-xs">
                  {product.category}
                </Badge>
                {product.clicks > 0 && (
                  <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Icon name="MousePointerClick" size={10} />
                    {product.clicks}
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-xs text-gray-500 truncate">{product.seller}</span>
                  {product.verified && <Icon name="CheckCircle" size={12} className="text-primary shrink-0" />}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-bold text-primary">{product.price} ₽</span>
                  <span className="text-xs text-gray-500">{product.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}