import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const PRODUCTS_URL = 'https://functions.poehali.dev/65a30f37-03fa-4e12-ad16-d14f83cd61b4';

interface Product {
  id: number;
  name: string;
  category_name?: string;
  price: number;
  currency: string;
  views_count: number;
  favorites_count: number;
  requests_count: number;
  status: 'draft' | 'active' | 'inactive' | 'archived';
}

const SupplierProductsTable = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!isAuthenticated || !token) { setLoading(false); return; }
    setLoading(true);
    try {
      const res = await fetch(`${PRODUCTS_URL}?mine=1&limit=50`, {
        headers: { 'X-Auth-Token': token },
      });
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [isAuthenticated, token]);

  const handleDelete = async (id: number, name: string) => {
    if (!token) return;
    if (!window.confirm(`Удалить товар «${name}»? Действие необратимо.`)) return;
    try {
      const res = await fetch(`${PRODUCTS_URL}?action=delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Auth-Token': token },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast({ title: data.error || 'Не удалось удалить товар', variant: 'destructive' });
        return;
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast({ title: 'Товар удалён' });
    } catch {
      toast({ title: 'Ошибка подключения к серверу', variant: 'destructive' });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12 text-gray-500">
        Войдите в аккаунт, чтобы увидеть свои товары.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-400">
        <Icon name="Loader2" size={28} className="mx-auto animate-spin mb-2" />
        Загружаем товары...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Package" size={44} className="mx-auto text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">Товаров пока нет</h3>
        <p className="text-gray-600 mb-4">Добавьте первый товар, чтобы он появился в каталоге.</p>
        <Button onClick={() => navigate('/supplier/products/new')}>
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить товар
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Товар</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Icon name="Eye" size={16} />
                  Просмотры
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Icon name="Heart" size={16} />
                  Избранное
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Icon name="MessageSquare" size={16} />
                  Запросы
                </div>
              </TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category_name || '—'}</TableCell>
                <TableCell>{product.price.toLocaleString()} {product.currency}</TableCell>
                <TableCell className="text-center">{product.views_count}</TableCell>
                <TableCell className="text-center">{product.favorites_count}</TableCell>
                <TableCell className="text-center">{product.requests_count}</TableCell>
                <TableCell>
                  {product.status === 'active' ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Активен
                    </Badge>
                  ) : product.status === 'draft' ? (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      Черновик
                    </Badge>
                  ) : product.status === 'archived' ? (
                    <Badge variant="secondary">Архив</Badge>
                  ) : (
                    <Badge variant="secondary">Неактивен</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/product/${product.id}`)}>
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/supplier/products/${product.id}/edit`)}>
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(product.id, product.name)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SupplierProductsTable;
