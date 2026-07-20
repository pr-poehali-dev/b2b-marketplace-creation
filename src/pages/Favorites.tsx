import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import PageLayout from '@/components/layout/PageLayout';
import Icon from "@/components/ui/icon";
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '@/contexts/FavoritesContext';

const Favorites = () => {
  const navigate = useNavigate();
  const { items, removeFavorite, clearFavorites } = useFavorites();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <PageLayout>
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-8">
            <Card className="text-center py-12">
              <CardContent>
                <Icon name="Heart" size={64} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Избранное пусто
                </h2>
                <p className="text-gray-600 mb-6">
                  Добавляйте товары из каталога, нажимая на сердечко
                </p>
                <Button size="lg" onClick={() => navigate('/catalog')}>
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Перейти в каталог
                </Button>
              </CardContent>
            </Card>
          </div>
        </PageLayout>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PageLayout>
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Избранное
                </h1>
                <p className="text-lg text-gray-600">
                  {items.length} товаров
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={clearFavorites}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Очистить
                </Button>
                <Button variant="outline" onClick={() => navigate('/catalog')}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить еще товары
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden group cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                <div className="aspect-video relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(item.id);
                    }}
                  >
                    <Icon name="X" size={16} className="text-gray-700" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <Badge className="bg-white/95 text-gray-700 text-xs mb-2 border">
                    {item.category}
                  </Badge>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{item.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Icon name="Store" size={14} />
                    <span>{item.seller}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#0d5e3c]">
                      {item.price.toLocaleString('ru-RU')} ₽
                    </span>
                    <span className="text-sm text-gray-500">{item.unit}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Favorites;
