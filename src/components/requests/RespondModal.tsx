import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const PLACE_REQUEST_URL = 'https://functions.poehali.dev/6b4d1a93-652c-4797-b909-9292cda5ab0f';

interface RespondModalProps {
  request: { id: number; title: string };
  onClose: () => void;
  onSuccess: () => void;
}

const RespondModal = ({ request, onClose, onSuccess }: RespondModalProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    supplier_name: '',
    supplier_phone: '',
    supplier_email: '',
    price: '',
    message: '',
  });

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        supplier_name: f.supplier_name || user.company_name || [user.first_name, user.last_name].filter(Boolean).join(' '),
        supplier_phone: f.supplier_phone || user.phone || '',
        supplier_email: f.supplier_email || user.email || '',
      }));
    }
  }, [user]);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.supplier_name.trim()) {
      toast({ title: 'Укажите название компании', variant: 'destructive' });
      return;
    }
    if (!form.message.trim()) {
      toast({ title: 'Напишите ваше предложение', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(PLACE_REQUEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'respond',
          request_id: request.id,
          supplier_user_id: user?.id,
          ...form,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast({ title: data.error || 'Не удалось отправить отклик', variant: 'destructive' });
        return;
      }
      toast({ title: 'Отклик отправлен!', description: 'Покупатель получил ваше предложение на почту.' });
      onSuccess();
      onClose();
    } catch {
      toast({ title: 'Ошибка подключения к серверу', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[10000]">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Откликнуться на заявку</h2>
            <p className="text-sm text-gray-500 line-clamp-1">{request.title}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Ваша компания *</label>
            <Input placeholder="ООО «Поставщик»" value={form.supplier_name} onChange={(e) => set('supplier_name', e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Ваше предложение по цене</label>
            <Input placeholder="Например: 320 ₽/шт, партия за 480 000 ₽" value={form.price} onChange={(e) => set('price', e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Сообщение покупателю *</label>
            <Textarea rows={4} placeholder="Опишите условия: наличие, сроки поставки, гарантии, скидки" value={form.message} onChange={(e) => set('message', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Телефон</label>
              <Input placeholder="+7 (900) 000-00-00" value={form.supplier_phone} onChange={(e) => set('supplier_phone', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input placeholder="you@company.ru" value={form.supplier_email} onChange={(e) => set('supplier_email', e.target.value)} />
            </div>
          </div>
        </div>
        <div className="p-5 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Отмена</Button>
          <Button onClick={submit} disabled={isSubmitting}>
            {isSubmitting ? (
              <><Icon name="Loader2" size={18} className="mr-2 animate-spin" />Отправка...</>
            ) : (
              <><Icon name="Send" size={18} className="mr-2" />Отправить отклик</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RespondModal;
