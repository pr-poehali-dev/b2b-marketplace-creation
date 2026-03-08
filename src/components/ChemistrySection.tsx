import { useState, useRef, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import { storage, type Chemical } from '@/lib/storage';
import { buildLowChemAlert, sendTelegram } from '@/lib/telegram';

function getBarColor(pct: number) {
  if (pct > 50) return 'var(--gold)';
  if (pct > 20) return 'var(--yellow-mid)';
  return 'var(--red-accent)';
}

const EMOJIS = ['🧴', '🫧', '⚙️', '✨', '🔧', '🪟', '💧', '🧽', '🪣', '🫙'];

export default function ChemistrySection({ onChemicalsChange }: { onChemicalsChange?: () => void }) {
  const [items, setItems] = useState<Chemical[]>(() => storage.getChemicals());
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Chemical | null>(null);
  const [newChem, setNewChem] = useState({ name: '', purpose: '', volume: '500', perWash: '30', emoji: '🧴', photo: null as string | null });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [viewPhoto, setViewPhoto] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const persist = useCallback((data: Chemical[]) => {
    setItems(data);
    storage.saveChemicals(data);
    onChemicalsChange?.();
  }, [onChemicalsChange]);

  const updateRemains = (id: string, val: number) => {
    const updated = items.map(i => i.id === id ? { ...i, remains: val } : i);
    persist(updated);
    const item = updated.find(i => i.id === id)!;
    const pct = (item.remains / item.volume) * 100;
    if (pct < 20) {
      const settings = storage.getSettings();
      if (settings.notifs.chemLow && settings.telegram.token) {
        sendTelegram(settings.telegram.token, settings.telegram.chatId, buildLowChemAlert(item.name, item.remains, item.volume));
      }
    }
  };

  const toggleCart = (id: string) => persist(items.map(i => i.id === id ? { ...i, inCart: !i.inCart } : i));

  const deleteItem = (id: string) => {
    if (!confirm('Удалить эту химию навсегда?')) return;
    persist(items.filter(i => i.id !== id));
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const b64 = ev.target?.result as string;
      setPhotoPreview(b64);
      setNewChem(p => ({ ...p, photo: b64 }));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const openAdd = () => {
    setEditItem(null);
    setNewChem({ name: '', purpose: '', volume: '500', perWash: '30', emoji: '🧴', photo: null });
    setPhotoPreview(null);
    setShowModal(true);
  };

  const openEdit = (item: Chemical) => {
    setEditItem(item);
    setNewChem({ name: item.name, purpose: item.purpose, volume: String(item.volume), perWash: String(item.perWash), emoji: item.emoji, photo: item.photo });
    setPhotoPreview(item.photo);
    setShowModal(true);
  };

  const saveChem = () => {
    if (!newChem.name.trim()) return;
    if (editItem) {
      persist(items.map(i => i.id === editItem.id
        ? { ...i, name: newChem.name, purpose: newChem.purpose, volume: Number(newChem.volume) || 500, perWash: Number(newChem.perWash) || 30, emoji: newChem.emoji, photo: newChem.photo }
        : i));
    } else {
      const vol = Number(newChem.volume) || 500;
      const item: Chemical = { id: Date.now().toString(), name: newChem.name, purpose: newChem.purpose, volume: vol, perWash: Number(newChem.perWash) || 30, remains: vol, photo: newChem.photo, emoji: newChem.emoji, inCart: false, createdAt: new Date().toISOString() };
      persist([...items, item]);
    }
    setShowModal(false);
  };

  const cartCount = items.filter(i => i.inCart).length;

  return (
    <div className="animate-fade-in">
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoSelect} />

      <div className="flex items-center justify-between mb-4">
        <div className="section-title">Моя химия</div>
        <div className="flex items-center gap-2">
          {cartCount > 0 && (
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <button className="btn-ghost" style={{ minHeight: 40, padding: '0 14px', gap: 6 }}>
                <Icon name="ShoppingCart" size={15} />
                <span style={{ fontSize: '0.75rem' }}>Заказ</span>
              </button>
              <span style={{ position: 'absolute', top: -6, right: -6, background: 'var(--gold)', color: '#0A0A0C', borderRadius: '50%', width: 18, height: 18, fontSize: '0.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>
            </div>
          )}
          <button className="btn-gold" onClick={openAdd}>
            <Icon name="Plus" size={16} />
            Добавить
          </button>
        </div>
      </div>

      {items.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-tertiary)' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🧴</div>
          <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Склад пуст</div>
          <div className="text-sm">Добавьте первую химию — она сохранится навсегда</div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const pct = Math.round((item.remains / item.volume) * 100);
          const barColor = getBarColor(pct);
          return (
            <div key={item.id} className="card-base overflow-hidden">
              <div
                style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', cursor: item.photo ? 'zoom-in' : 'default' }}
                onClick={() => item.photo && setViewPhoto(item.photo)}
              >
                {item.photo
                  ? <img src={item.photo} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', background: 'var(--bg-elevated)' }}>{item.emoji}</div>
                }
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(28,28,30,0.95) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 8, left: 12, right: 12 }}>
                  <div style={{ height: 3, background: barColor, borderRadius: 2, width: `${pct}%`, transition: 'width 0.4s' }} />
                </div>
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <span style={{ background: pct > 50 ? 'rgba(212,175,55,0.85)' : pct > 20 ? 'rgba(240,192,64,0.85)' : 'rgba(192,57,43,0.85)', color: pct > 50 ? '#0A0A0C' : '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: 10, backdropFilter: 'blur(4px)' }}>{pct}%</span>
                </div>
              </div>

              <div className="p-4">
                <div className="font-semibold text-white text-sm mb-0.5 truncate">{item.name}</div>
                <div className="label-text mb-3 truncate">{item.purpose || '—'}</div>
                <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                  <span>Объём: <b style={{ color: 'var(--text-primary)' }}>{item.volume}</b> мл</span>
                  <span>Расход: <b style={{ color: 'var(--text-primary)' }}>{item.perWash}</b> мл</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="label-text">Остаток</span>
                  <span style={{ color: barColor, fontWeight: 700, fontSize: '0.82rem' }}>{item.remains} мл</span>
                </div>
                <input type="range" className="slider-custom mb-3" min={0} max={item.volume} value={item.remains} onChange={e => updateRemains(item.id, Number(e.target.value))} />
                <div className="flex gap-2">
                  <button className="btn-ghost" style={{ minHeight: 38, padding: '0 8px', flex: 1, justifyContent: 'center', fontSize: '0.7rem' }} onClick={() => openEdit(item)}>
                    <Icon name="Pencil" size={12} />Изменить
                  </button>
                  <button className={item.inCart ? 'btn-gold' : 'btn-ghost'} style={{ minHeight: 38, padding: '0 8px', flex: 1, justifyContent: 'center', fontSize: '0.7rem' }} onClick={() => toggleCart(item.id)}>
                    <Icon name={item.inCart ? 'Check' : 'ShoppingCart'} size={12} />{item.inCart ? 'В корзине' : 'В заказ'}
                  </button>
                  <button className="btn-ghost" style={{ minHeight: 38, width: 38, padding: 0, justifyContent: 'center', flexShrink: 0 }} onClick={() => deleteItem(item.id)}>
                    <Icon name="Trash2" size={13} style={{ color: 'var(--red-accent)' }} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {viewPhoto && (
        <div className="modal-backdrop" onClick={() => setViewPhoto(null)} style={{ alignItems: 'center', zIndex: 100 }}>
          <img src={viewPhoto} alt="" style={{ maxWidth: '92vw', maxHeight: '85vh', borderRadius: 16, objectFit: 'contain' }} onClick={e => e.stopPropagation()} />
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-sheet" style={{ maxHeight: '92dvh' }}>
            <div className="flex items-center justify-between mb-5">
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>{editItem ? 'Редактировать химию' : 'Новая химия'}</div>
              <button style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowModal(false)}>
                <Icon name="X" size={15} style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>
            <div className="mb-4">
              <div className="label-text mb-2">Фото баночки</div>
              <div onClick={() => fileRef.current?.click()} style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '3/2', cursor: 'pointer', position: 'relative', background: 'var(--bg-elevated)', border: '2px dashed var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                {photoPreview ? (
                  <>
                    <img src={photoPreview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6 }}>
                      <Icon name="RefreshCw" size={22} style={{ color: '#fff' }} />
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>Заменить фото</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Icon name="Camera" size={28} style={{ color: 'var(--text-tertiary)' }} />
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>Нажмите для выбора фото</span>
                  </>
                )}
              </div>
            </div>
            <div className="mb-4">
              <div className="label-text mb-2">Иконка (если нет фото)</div>
              <div className="flex gap-2 flex-wrap">
                {EMOJIS.map(e => (
                  <button key={e} onClick={() => setNewChem(p => ({ ...p, emoji: e }))} style={{ width: 40, height: 40, borderRadius: 10, fontSize: '1.1rem', background: newChem.emoji === e ? 'var(--gold-dim)' : 'var(--bg-elevated)', border: `1px solid ${newChem.emoji === e ? 'var(--gold-border)' : 'var(--border-subtle)'}`, cursor: 'pointer', transition: 'all 0.2s' }}>{e}</button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="label-text mb-1.5">Название *</div>
                <input className="input-field" placeholder="Шампунь pH-нейтральный" value={newChem.name} onChange={e => setNewChem(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <div className="label-text mb-1.5">Назначение</div>
                <input className="input-field" placeholder="Для чего используется" value={newChem.purpose} onChange={e => setNewChem(p => ({ ...p, purpose: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="label-text mb-1.5">Объём (мл)</div>
                  <input className="input-field" type="number" min="1" placeholder="500" value={newChem.volume} onChange={e => setNewChem(p => ({ ...p, volume: e.target.value }))} />
                </div>
                <div>
                  <div className="label-text mb-1.5">Расход/мойка (мл)</div>
                  <input className="input-field" type="number" min="1" placeholder="30" value={newChem.perWash} onChange={e => setNewChem(p => ({ ...p, perWash: e.target.value }))} />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowModal(false)}>Отмена</button>
              <button className="btn-gold" style={{ flex: 2, justifyContent: 'center' }} onClick={saveChem} disabled={!newChem.name.trim()}>
                <Icon name="Save" size={15} />{editItem ? 'Сохранить' : 'Добавить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
