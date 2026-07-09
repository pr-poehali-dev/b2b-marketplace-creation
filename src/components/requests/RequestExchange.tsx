import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { categoriesData } from '@/data/categoriesData';
import { getRequestHeat } from '@/utils/requestHeat';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { BuyerRequest } from './RequestCard';
import RequestPost from './RequestPost';
import RespondModal from './RespondModal';

const PLACE_REQUEST_URL = 'https://functions.poehali.dev/6b4d1a93-652c-4797-b909-9292cda5ab0f';

const RequestExchange = ({ refreshKey }: { refreshKey: number }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [requests, setRequests] = useState<BuyerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<'hot' | 'new'>('hot');
  const [respondTo, setRespondTo] = useState<BuyerRequest | null>(null);

  const handleDelete = async (r: BuyerRequest) => {
    if (!window.confirm(`Удалить заявку «${r.title}»? Действие необратимо.`)) return;
    try {
      const res = await fetch(PLACE_REQUEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', request_id: r.id, user_id: user?.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast({ title: data.error || 'Не удалось удалить заявку', variant: 'destructive' });
        return;
      }
      setRequests((list) => list.filter((x) => x.id !== r.id));
      toast({ title: 'Заявка удалена' });
    } catch {
      toast({ title: 'Ошибка подключения к серверу', variant: 'destructive' });
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${PLACE_REQUEST_URL}?action=list`);
      const data = await res.json();
      if (data.success) setRequests(data.requests || []);
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [refreshKey]);

  const filtered = useMemo(() => {
    let list = requests.filter((r) => {
      const matchSearch = !search
        || r.title.toLowerCase().includes(search.toLowerCase())
        || r.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'all' || r.category === category;
      return matchSearch && matchCat;
    });
    list = [...list].sort((a, b) => {
      if (sort === 'new') {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      }
      return getRequestHeat(b).score - getRequestHeat(a).score;
    });
    return list;
  }, [requests, search, category, sort]);

  const hotCount = requests.filter((r) => getRequestHeat(r).level === 'hot').length;

  return (
    <div className="space-y-5">
      {/* Живая статистика биржи */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="LayoutList" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{requests.length}</p>
              <p className="text-xs text-gray-500">Всего заявок</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <Icon name="Flame" size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{hotCount}</p>
              <p className="text-xs text-gray-500">Горячих сейчас</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Icon name="MessageSquare" size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">
                {requests.reduce((s, r) => s + (r.responses_count || 0), 0)}
              </p>
              <p className="text-xs text-gray-500">Откликов дано</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Фильтры */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input className="pl-9" placeholder="Поиск по заявкам..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="sm:w-56"><SelectValue /></SelectTrigger>
          <SelectContent className="max-h-72">
            <SelectItem value="all">Все категории</SelectItem>
            {categoriesData.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => setSort(v as 'hot' | 'new')}>
          <SelectTrigger className="sm:w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="hot">Сначала горячие</SelectItem>
            <SelectItem value="new">Сначала новые</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Лента */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">
          <Icon name="Loader2" size={32} className="mx-auto animate-spin mb-2" />
          Загружаем заявки...
        </div>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <Icon name="Inbox" size={44} className="mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Заявок пока нет</h3>
            <p className="text-gray-600">Как только покупатели разместят заявки — они появятся здесь.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="max-w-2xl mx-auto">
          {/* Живой заголовок ленты */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              Лента заявок в эфире
            </div>
            <span className="text-xs text-gray-400">{filtered.length} в ленте</span>
          </div>

          <div className="space-y-4">
            {filtered.map((r) => (
              <RequestPost
                key={r.id}
                request={r}
                onRespond={setRespondTo}
                isAdmin={!!user?.is_admin}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {respondTo && (
        <RespondModal
          request={respondTo}
          onClose={() => setRespondTo(null)}
          onSuccess={load}
        />
      )}
    </div>
  );
};

export default RequestExchange;