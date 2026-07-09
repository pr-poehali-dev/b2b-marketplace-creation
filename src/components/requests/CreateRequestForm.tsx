import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { categoriesData } from '@/data/categoriesData';
import { matchSuppliers, MatchedSupplier } from '@/utils/matchSuppliers';

const PLACE_REQUEST_URL = 'https://functions.poehali.dev/6b4d1a93-652c-4797-b909-9292cda5ab0f';

interface Props {
  onCreated?: () => void;
}

const CreateRequestForm = ({ onCreated }: Props) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentCount, setSentCount] = useState(0);

  const [form, setForm] = useState({
    title: '', category: '', description: '', quantity: '', unit: 'шт',
    budget: '', region: '', deadline: '', contact_name: '', contact_phone: '',
    contact_email: '', company_name: '',
  });

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        contact_name: f.contact_name || [user.first_name, user.last_name].filter(Boolean).join(' '),
        contact_phone: f.contact_phone || user.phone || '',
        contact_email: f.contact_email || user.email || '',
        company_name: f.company_name || user.company_name || '',
      }));
    }
  }, [user]);

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const matched: MatchedSupplier[] = useMemo(() => {
    if (!form.category || !form.title) return [];
    return matchSuppliers({
      category: form.category, title: form.title,
      description: form.description, region: form.region,
    });
  }, [form.category, form.title, form.description, form.region]);

  const goToMatch = () => {
    if (!form.title.trim()) return toast({ title: 'Укажите, что вы ищете', variant: 'destructive' });
    if (!form.category) return toast({ title: 'Выберите категорию', variant: 'destructive' });
    if (!form.description.trim()) return toast({ title: 'Опишите вашу заявку', variant: 'destructive' });
    if (!form.contact_name.trim() || !form.contact_phone.trim())
      return toast({ title: 'Укажите контактное имя и телефон', variant: 'destructive' });
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(PLACE_REQUEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create', user_id: user?.id, ...form,
          suppliers: matched.map((s) => ({ id: s.id, name: s.name, email: s.email, reason: s.reason })),
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        toast({ title: data.error || 'Не удалось отправить заявку', variant: 'destructive' });
        return;
      }
      setSentCount(data.matched_suppliers ?? matched.length);
      setStep(3);
      window.scrollTo(0, 0);
      onCreated?.();
    } catch {
      toast({ title: 'Ошибка подключения к серверу', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: '', category: '', description: '', quantity: '', unit: 'шт',
      budget: '', region: '', deadline: '', contact_name: '', contact_phone: '',
      contact_email: '', company_name: '',
    });
    setStep(1);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {/* Шаги */}
      <div className="flex items-center gap-2 mb-8">
        {[{ n: 1, label: 'Заявка' }, { n: 2, label: 'Поставщики' }, { n: 3, label: 'Готово' }].map((s, i) => (
          <div key={s.n} className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${step >= s.n ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step > s.n ? <Icon name="Check" size={16} /> : s.n}
            </div>
            <span className={`text-sm ${step >= s.n ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{s.label}</span>
            {i < 2 && <div className="w-8 h-px bg-gray-300 mx-1" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon name="Package" size={20} className="text-primary" />Что вам нужно?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Что ищете *</label>
                <Input placeholder="Например: Труба стальная профильная 40х40" value={form.title} onChange={(e) => set('title', e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Категория *</label>
                <Select value={form.category} onValueChange={(v) => set('category', v)}>
                  <SelectTrigger><SelectValue placeholder="Выберите категорию" /></SelectTrigger>
                  <SelectContent className="max-h-72">
                    {categoriesData.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Описание заявки *</label>
                <Textarea placeholder="Опишите нестандартные требования: марка, размеры, ГОСТ, условия поставки" rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Количество</label>
                  <Input placeholder="100" value={form.quantity} onChange={(e) => set('quantity', e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Единица</label>
                  <Select value={form.unit} onValueChange={(v) => set('unit', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['шт', 'кг', 'т', 'м', 'м²', 'м³', 'л', 'упак', 'компл'].map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Бюджет</label>
                  <Input placeholder="до 500 000 ₽" value={form.budget} onChange={(e) => set('budget', e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Регион поставки</label>
                  <Input placeholder="Москва и МО" value={form.region} onChange={(e) => set('region', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Срок поставки</label>
                <Input placeholder="Например: до 15 сентября / срочно" value={form.deadline} onChange={(e) => set('deadline', e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon name="User" size={20} className="text-primary" />Контакты для поставщиков
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Контактное лицо *</label>
                  <Input placeholder="Иван Иванов" value={form.contact_name} onChange={(e) => set('contact_name', e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Телефон *</label>
                  <Input placeholder="+7 (900) 000-00-00" value={form.contact_phone} onChange={(e) => set('contact_phone', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <Input placeholder="you@company.ru" value={form.contact_email} onChange={(e) => set('contact_email', e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Компания</label>
                  <Input placeholder="ООО «Ромашка»" value={form.company_name} onChange={(e) => set('company_name', e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between bg-white border rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="Users" size={18} className="text-primary" />
              {matched.length > 0
                ? <span>Подходящих поставщиков найдено: <b className="text-gray-900">{matched.length}</b></span>
                : <span>Заполните заявку — покажем, кому она уйдёт</span>}
            </div>
            <Button onClick={goToMatch} size="lg">Далее<Icon name="ArrowRight" size={18} className="ml-2" /></Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon name="Target" size={20} className="text-primary" />Заявка уйдёт этим поставщикам
              </CardTitle>
            </CardHeader>
            <CardContent>
              {matched.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="SearchX" size={40} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-1">Пока не нашли подходящих поставщиков по этой категории.</p>
                  <p className="text-sm text-gray-500">Заявку всё равно можно отправить — она попадёт на биржу заявок.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {matched.map((s) => (
                    <div key={s.id} className="flex items-center justify-between p-3 border rounded-lg hover:border-primary/40 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Building2" size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{s.name}</p>
                          <p className="text-xs text-gray-500">{s.category} • {s.region}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs whitespace-nowrap ml-2">{s.reason}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          <div className="flex items-center justify-between gap-4">
            <Button variant="outline" onClick={() => setStep(1)}><Icon name="ArrowLeft" size={18} className="mr-2" />Назад</Button>
            <Button onClick={handleSubmit} size="lg" disabled={isSubmitting}>
              {isSubmitting
                ? <><Icon name="Loader2" size={18} className="mr-2 animate-spin" />Отправка...</>
                : <><Icon name="Send" size={18} className="mr-2" />Отправить заявку {matched.length > 0 ? `(${matched.length})` : ''}</>}
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle2" size={36} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Заявка отправлена!</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {sentCount > 0
                ? <>Ваша заявка «{form.title}» ушла <b>{sentCount}</b> поставщикам и опубликована на бирже. Они свяжутся с вами напрямую.</>
                : <>Ваша заявка «{form.title}» опубликована на бирже заявок. Поставщики смогут откликнуться на неё.</>}
            </p>
            <Button onClick={resetForm} size="lg"><Icon name="Plus" size={18} className="mr-2" />Разместить ещё одну заявку</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreateRequestForm;
