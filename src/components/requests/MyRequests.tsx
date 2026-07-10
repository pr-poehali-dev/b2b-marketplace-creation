import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { timeAgo } from '@/utils/requestHeat';
import { BuyerRequest } from './RequestCard';

const PLACE_REQUEST_URL = 'https://functions.poehali.dev/6b4d1a93-652c-4797-b909-9292cda5ab0f';
const AUTO_REFRESH_MS = 25000;

interface Response {
  id: number;
  supplier_name: string;
  supplier_phone?: string;
  supplier_email?: string;
  price?: string;
  message: string;
  created_at: string | null;
}

const MyRequests = ({ refreshKey }: { refreshKey: number }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<BuyerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<number | null>(null);
  const [responses, setResponses] = useState<Record<number, Response[]>>({});
  const [loadingResp, setLoadingResp] = useState(false);
  const [newResponseIds, setNewResponseIds] = useState<Set<number>>(new Set());
  const countsRef = useRef<Record<number, number>>({});
  const openIdRef = useRef<number | null>(null);
  const initialLoadDone = useRef(false);

  useEffect(() => { openIdRef.current = openId; }, [openId]);

  const fetchResponses = useCallback(async (id: number) => {
    try {
      const res = await fetch(`${PLACE_REQUEST_URL}?action=responses&request_id=${id}`);
      const data = await res.json();
      if (data.success) setResponses((p) => ({ ...p, [id]: data.responses || [] }));
    } catch { /* ignore */ }
  }, []);

  const load = useCallback(async (silent = false) => {
    if (!user) { setLoading(false); return; }
    if (!silent) setLoading(true);
    try {
      const res = await fetch(`${PLACE_REQUEST_URL}?action=list&mine=1&user_id=${user.id}`);
      const data = await res.json();
      if (data.success) {
        const fresh: BuyerRequest[] = data.requests || [];

        if (initialLoadDone.current) {
          const grown: BuyerRequest[] = [];
          fresh.forEach((r) => {
            const prevCount = countsRef.current[r.id];
            if (prevCount !== undefined && (r.responses_count || 0) > prevCount) {
              grown.push(r);
            }
          });
          if (grown.length > 0) {
            setNewResponseIds((prev) => new Set([...prev, ...grown.map((r) => r.id)]));
            grown.forEach((r) => {
              toast({ title: 'Новый отклик!', description: `Поставщик откликнулся на заявку «${r.title}»` });
              if (openIdRef.current === r.id) fetchResponses(r.id);
            });
            setTimeout(() => {
              setNewResponseIds((prev) => {
                const next = new Set(prev);
                grown.forEach((r) => next.delete(r.id));
                return next;
              });
            }, 8000);
          }
        }

        fresh.forEach((r) => { countsRef.current[r.id] = r.responses_count || 0; });
        initialLoadDone.current = true;
        setRequests(fresh);
      }
    } catch { if (!silent) setRequests([]); }
    finally { if (!silent) setLoading(false); }
  }, [user, toast, fetchResponses]);

  useEffect(() => { initialLoadDone.current = false; load(); }, [user, refreshKey]);

  useEffect(() => {
    const timer = setInterval(() => load(true), AUTO_REFRESH_MS);
    return () => clearInterval(timer);
  }, [load]);

  const toggle = async (id: number) => {
    if (openId === id) { setOpenId(null); return; }
    setOpenId(id);
    setNewResponseIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (!responses[id]) {
      setLoadingResp(true);
      await fetchResponses(id);
      setLoadingResp(false);
    }
  };

  if (!user) {
    return (
      <Card className="text-center py-16">
        <CardContent>
          <Icon name="LogIn" size={44} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Войдите в аккаунт</h3>
          <p className="text-gray-600">Чтобы видеть свои заявки и отклики поставщиков, нужно войти.</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-400">
        <Icon name="Loader2" size={32} className="mx-auto animate-spin mb-2" />
        Загружаем ваши заявки...
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <Card className="text-center py-16">
        <CardContent>
          <Icon name="FileText" size={44} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">У вас пока нет заявок</h3>
          <p className="text-gray-600">Разместите первую заявку — и поставщики начнут откликаться.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((r) => {
        const isOpen = openId === r.id;
        const list = responses[r.id] || [];
        const isNew = newResponseIds.has(r.id);
        return (
          <Card key={r.id} className={`overflow-hidden relative ${isNew ? 'ring-2 ring-emerald-400' : ''}`}>
            {isNew && (
              <span className="absolute -top-2 left-4 z-10 bg-emerald-500 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow animate-fade-in-up">
                Новый отклик
              </span>
            )}
            <button onClick={() => toggle(r.id)} className="w-full text-left p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge variant="secondary" className="text-xs">{r.category}</Badge>
                    <span className="text-xs text-gray-400">{timeAgo(r.created_at)}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 truncate">{r.title}</h3>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-primary font-semibold">
                      <Icon name="MessageSquare" size={16} />
                      {r.responses_count}
                    </div>
                    <p className="text-xs text-gray-400">откликов</p>
                  </div>
                  <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={20} className="text-gray-400" />
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="border-t bg-gray-50 p-5">
                {loadingResp && !responses[r.id] ? (
                  <div className="text-center py-4 text-gray-400 text-sm">
                    <Icon name="Loader2" size={20} className="mx-auto animate-spin mb-1" />
                    Загружаем отклики...
                  </div>
                ) : list.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Откликов пока нет. Заявка отправлена {r.matched_suppliers} поставщикам — ждём предложений.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {list.map((resp) => (
                      <div key={resp.id} className="bg-white border rounded-lg p-4">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon name="Building2" size={16} className="text-primary" />
                            </div>
                            <span className="font-medium text-gray-900 truncate">{resp.supplier_name}</span>
                          </div>
                          {resp.price && (
                            <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                              {resp.price}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{resp.message}</p>
                        <div className="flex flex-wrap gap-2">
                          {resp.supplier_phone && (
                            <a href={`tel:${resp.supplier_phone}`}>
                              <Button size="sm" variant="outline">
                                <Icon name="Phone" size={14} className="mr-1.5" />{resp.supplier_phone}
                              </Button>
                            </a>
                          )}
                          {resp.supplier_email && (
                            <a href={`mailto:${resp.supplier_email}`}>
                              <Button size="sm" variant="outline">
                                <Icon name="Mail" size={14} className="mr-1.5" />Написать
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default MyRequests;