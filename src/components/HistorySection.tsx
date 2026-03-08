import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { storage, type WashRecord, type Chemical, formatDate, formatTime, formatDuration } from '@/lib/storage';
import { sendTelegram } from '@/lib/telegram';
import { buildWashReport, buildLowChemAlert } from '@/lib/telegram';

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} type="button" onClick={() => onChange?.(s)} style={{ background: 'none', border: 'none', cursor: onChange ? 'pointer' : 'default', padding: 2 }}>
          <Icon name="Star" size={onChange ? 22 : 14} style={{ color: s <= value ? 'var(--gold)' : 'rgba(255,255,255,0.15)', fill: s <= value ? 'var(--gold)' : 'transparent', transition: 'all 0.15s' }} />
        </button>
      ))}
    </div>
  );
}

export default function HistorySection({ onChemicalsChange }: { onChemicalsChange?: () => void }) {
  const [washes, setWashes] = useState<WashRecord[]>(() => storage.getWashes());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [viewPhoto, setViewPhoto] = useState<string | null>(null);

  const [draft, setDraft] = useState<Partial<WashRecord>>({});
  const [selectedChems, setSelectedChems] = useState<string[]>([]);
  const [showChemPicker, setShowChemPicker] = useState(false);
  const [chemicals] = useState<Chemical[]>(() => storage.getChemicals());
  const [allChemicals, setAllChemicals] = useState<Chemical[]>(() => storage.getChemicals());

  const beforeRef = useRef<HTMLInputElement>(null);
  const afterRef = useRef<HTMLInputElement>(null);

  const [photosBefore, setPhotosBefore] = useState<string[]>([]);
  const [photosAfter, setPhotosAfter] = useState<string[]>([]);
  const [stages, setStages] = useState(() => storage.DEFAULT_STAGES.map(s => ({ ...s })));
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [duration, setDuration] = useState(0);
  const [saving, setSaving] = useState(false);

  const loadPhotos = (files: FileList | null, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        if (ev.target?.result) setter(prev => [...prev, ev.target!.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const openNew = () => {
    const freshChems = storage.getChemicals();
    setAllChemicals(freshChems);
    setDraft({});
    setSelectedChems([]);
    setPhotosBefore([]);
    setPhotosAfter([]);
    setStages(storage.DEFAULT_STAGES.map(s => ({ ...s })));
    setRating(5);
    setComment('');
    setDuration(0);
    setShowModal(true);
  };

  const toggleStage = (i: number) => {
    setStages(prev => prev.map((s, idx) => idx === i ? { ...s, done: !s.done } : s));
  };

  const toggleChem = (id: string) => {
    setSelectedChems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const saveWash = async () => {
    setSaving(true);
    const now = new Date().toISOString();
    const record: WashRecord = {
      id: Date.now().toString(),
      date: now,
      startTime: now,
      duration,
      rating,
      comment,
      photosBefore,
      photosAfter,
      usedChemicals: selectedChems,
      stages,
    };

    const updatedWashes = [record, ...washes];
    setWashes(updatedWashes);
    storage.saveWashes(updatedWashes);

    // Deduct chemicals
    const freshChems = storage.getChemicals();
    const lowAlerts: { name: string; remains: number; volume: number }[] = [];
    const updatedChems = freshChems.map(c => {
      if (selectedChems.includes(c.id)) {
        const newRemains = Math.max(0, c.remains - c.perWash);
        if ((newRemains / c.volume) * 100 < 20) lowAlerts.push({ name: c.name, remains: newRemains, volume: c.volume });
        return { ...c, remains: newRemains };
      }
      return c;
    });
    storage.saveChemicals(updatedChems);
    onChemicalsChange?.();

    // Telegram
    const settings = storage.getSettings();
    if (settings.telegram.token && settings.notifs.washReminder) {
      const usedNames = allChemicals.filter(c => selectedChems.includes(c.id)).map(c => c.name);
      const msg = buildWashReport({
        date: formatDate(now),
        time: formatTime(now),
        duration: formatDuration(duration),
        chemicals: usedNames,
        lowChemicals: lowAlerts,
        rating,
      });
      await sendTelegram(settings.telegram.token, settings.telegram.chatId, msg);
      for (const la of lowAlerts) {
        if (settings.notifs.chemLow) {
          await sendTelegram(settings.telegram.token, settings.telegram.chatId, buildLowChemAlert(la.name, la.remains, la.volume));
        }
      }
    }

    setSaving(false);
    setShowModal(false);
    setExpanded(record.id);
  };

  const deleteWash = (id: string) => {
    if (!confirm('Удалить запись о мойке?')) return;
    const updated = washes.filter(w => w.id !== id);
    setWashes(updated);
    storage.saveWashes(updated);
  };

  return (
    <div className="animate-fade-in">
      <input ref={beforeRef} type="file" accept="image/*" multiple className="hidden" onChange={e => { loadPhotos(e.target.files, setPhotosBefore); e.target.value = ''; }} />
      <input ref={afterRef} type="file" accept="image/*" multiple className="hidden" onChange={e => { loadPhotos(e.target.files, setPhotosAfter); e.target.value = ''; }} />

      <div className="flex items-center justify-between mb-4">
        <div className="section-title">История моек</div>
        <button className="btn-gold" style={{ minHeight: 40, padding: '0 16px', fontSize: '0.8rem' }} onClick={openNew}>
          <Icon name="Plus" size={14} />Новая мойка
        </button>
      </div>

      {washes.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-tertiary)' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🚿</div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>История пуста</div>
          <div className="text-sm">Нажмите «Новая мойка» после завершения</div>
        </div>
      )}

      <div className="space-y-3">
        {washes.map(wash => (
          <div key={wash.id} className="card-base overflow-hidden">
            <div className="p-5 cursor-pointer flex items-center justify-between" onClick={() => setExpanded(expanded === wash.id ? null : wash.id)}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <Icon name="Droplets" size={20} style={{ color: 'var(--gold)' }} />
                </div>
                <div>
                  <div className="font-semibold text-white">{formatDate(wash.date)}</div>
                  <div className="label-text mt-0.5">{formatTime(wash.date)} · {formatDuration(wash.duration)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StarRating value={wash.rating} />
                <Icon name={expanded === wash.id ? 'ChevronUp' : 'ChevronDown'} size={16} style={{ color: 'var(--text-tertiary)' }} />
              </div>
            </div>

            {expanded === wash.id && (
              <div className="px-5 pb-5 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                {wash.comment && (
                  <div className="pt-4 mb-5">
                    <div className="label-text mb-2">Комментарий</div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{wash.comment}</div>
                  </div>
                )}

                {(wash.photosBefore.length > 0 || wash.photosAfter.length > 0) && (
                  <div className="mb-5">
                    <div className="label-text mb-3">Фото До / После</div>
                    <div className="grid grid-cols-2 gap-3">
                      {(['before', 'after'] as const).map(type => {
                        const photos = type === 'before' ? wash.photosBefore : wash.photosAfter;
                        if (!photos.length) return null;
                        return (
                          <div key={type}>
                            <div className="text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>{type === 'before' ? 'До' : 'После'}</div>
                            <div className="grid grid-cols-3 gap-1.5">
                              {photos.map((p, i) => (
                                <div key={i} className="photo-thumb" style={{ cursor: 'pointer' }} onClick={() => setViewPhoto(p)}>
                                  <img src={p} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {wash.usedChemicals.length > 0 && (
                  <div className="mb-5">
                    <div className="label-text mb-2">Использованная химия</div>
                    <div className="flex flex-wrap gap-2">
                      {wash.usedChemicals.map(id => {
                        const ch = storage.getChemicals().find(c => c.id === id);
                        return ch ? (
                          <span key={id} className="chip">
                            <span style={{ fontSize: '0.75rem' }}>{ch.emoji}</span>
                            {ch.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <div className="label-text mb-3">Этапы мойки</div>
                  <div className="space-y-2">
                    {wash.stages.map((s, i) => (
                      <div key={i} className="flex items-center gap-3" style={{ padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
                        <div style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${s.done ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}`, background: s.done ? 'var(--gold-dim)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {s.done && <Icon name="Check" size={11} style={{ color: 'var(--gold)' }} />}
                        </div>
                        <span className="text-sm" style={{ color: s.done ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="btn-ghost" style={{ fontSize: '0.75rem', minHeight: 36, padding: '0 12px', color: 'var(--red-accent)', borderColor: 'rgba(192,57,43,0.2)' }} onClick={() => deleteWash(wash.id)}>
                  <Icon name="Trash2" size={13} style={{ color: 'var(--red-accent)' }} />Удалить запись
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {viewPhoto && (
        <div className="modal-backdrop" onClick={() => setViewPhoto(null)} style={{ alignItems: 'center', zIndex: 100 }}>
          <img src={viewPhoto} alt="" style={{ maxWidth: '92vw', maxHeight: '85vh', borderRadius: 16, objectFit: 'contain' }} onClick={e => e.stopPropagation()} />
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-sheet" style={{ maxHeight: '95dvh' }}>
            <div className="flex items-center justify-between mb-5">
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>Новая мойка</div>
              <button style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowModal(false)}>
                <Icon name="X" size={15} style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>

            {/* Duration */}
            <div className="mb-4">
              <div className="label-text mb-1.5">Длительность (минуты)</div>
              <input className="input-field" type="number" min="0" placeholder="90" value={duration > 0 ? Math.round(duration / 60) : ''} onChange={e => setDuration((Number(e.target.value) || 0) * 60)} />
            </div>

            {/* Rating */}
            <div className="mb-4">
              <div className="label-text mb-2">Оценка качества</div>
              <StarRating value={rating} onChange={setRating} />
            </div>

            {/* Comment */}
            <div className="mb-4">
              <div className="label-text mb-1.5">Комментарий</div>
              <textarea className="input-field" style={{ minHeight: 80, padding: '12px 16px', resize: 'none' }} placeholder="Заметки о мойке..." value={comment} onChange={e => setComment(e.target.value)} />
            </div>

            {/* Chemicals */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="label-text">Использованная химия</div>
                <button className="btn-ghost" style={{ minHeight: 30, padding: '0 10px', fontSize: '0.7rem' }} onClick={() => setShowChemPicker(!showChemPicker)}>
                  <Icon name="FlaskConical" size={12} />Выбрать
                </button>
              </div>
              {showChemPicker && (
                <div className="space-y-2 mb-3 p-3 rounded-2xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  {allChemicals.length === 0 && <div className="text-xs" style={{ color: 'var(--text-tertiary)', padding: '8px 0' }}>Склад пуст</div>}
                  {allChemicals.map(c => (
                    <div key={c.id} className="flex items-center gap-3 cursor-pointer" style={{ padding: '8px 10px', borderRadius: 12, background: selectedChems.includes(c.id) ? 'var(--gold-dim)' : 'transparent', border: `1px solid ${selectedChems.includes(c.id) ? 'var(--gold-border)' : 'transparent'}`, transition: 'all 0.15s' }} onClick={() => toggleChem(c.id)}>
                      <div style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${selectedChems.includes(c.id) ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}`, background: selectedChems.includes(c.id) ? 'var(--gold-dim)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {selectedChems.includes(c.id) && <Icon name="Check" size={11} style={{ color: 'var(--gold)' }} />}
                      </div>
                      <span style={{ fontSize: '1rem' }}>{c.emoji}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{c.name}</div>
                        <div className="label-text">Расход: {c.perWash} мл · Остаток: {c.remains} мл</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {selectedChems.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {allChemicals.filter(c => selectedChems.includes(c.id)).map(c => (
                    <span key={c.id} className="chip">{c.emoji} {c.name}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Stages */}
            <div className="mb-4">
              <div className="label-text mb-2">Этапы мойки</div>
              <div className="space-y-2">
                {stages.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 cursor-pointer" style={{ padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 12, border: `1px solid ${s.done ? 'rgba(212,175,55,0.2)' : 'var(--border-subtle)'}`, transition: 'all 0.15s' }} onClick={() => toggleStage(i)}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${s.done ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}`, background: s.done ? 'var(--gold-dim)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {s.done && <Icon name="Check" size={11} style={{ color: 'var(--gold)' }} />}
                    </div>
                    <span className="text-sm" style={{ color: s.done ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photos */}
            <div className="mb-5">
              <div className="label-text mb-2">Фото До / После</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <button className="btn-ghost w-full" style={{ justifyContent: 'center', marginBottom: 8 }} onClick={() => beforeRef.current?.click()}>
                    <Icon name="Camera" size={14} />До
                  </button>
                  {photosBefore.length > 0 && (
                    <div className="grid grid-cols-3 gap-1">
                      {photosBefore.map((p, i) => (
                        <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 8, overflow: 'hidden' }}>
                          <img src={p} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button onClick={() => setPhotosBefore(prev => prev.filter((_, j) => j !== i))} style={{ position: 'absolute', top: 2, right: 2, width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="X" size={10} style={{ color: '#fff' }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <button className="btn-ghost w-full" style={{ justifyContent: 'center', marginBottom: 8 }} onClick={() => afterRef.current?.click()}>
                    <Icon name="Camera" size={14} />После
                  </button>
                  {photosAfter.length > 0 && (
                    <div className="grid grid-cols-3 gap-1">
                      {photosAfter.map((p, i) => (
                        <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 8, overflow: 'hidden' }}>
                          <img src={p} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button onClick={() => setPhotosAfter(prev => prev.filter((_, j) => j !== i))} style={{ position: 'absolute', top: 2, right: 2, width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="X" size={10} style={{ color: '#fff' }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowModal(false)}>Отмена</button>
              <button className="btn-gold" style={{ flex: 2, justifyContent: 'center' }} onClick={saveWash} disabled={saving}>
                <Icon name={saving ? 'Loader' : 'Save'} size={15} />{saving ? 'Сохраняем...' : 'Сохранить мойку'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showChemPicker && <div style={{ display: 'none' }} />}
    </div>
  );
}
