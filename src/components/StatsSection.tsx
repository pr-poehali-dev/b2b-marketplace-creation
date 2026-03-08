import { useState, useMemo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import Icon from '@/components/ui/icon';
import { storage, type WashRecord, type Chemical, formatDuration } from '@/lib/storage';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const PERIODS = ['Месяц', '3 месяца', 'Год', 'Всё время'];

const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1C1C1E', titleColor: '#fff', bodyColor: 'rgba(235,235,245,0.6)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1, cornerRadius: 8 } },
  scales: { x: { ticks: { color: 'rgba(235,235,245,0.4)', font: { size: 11 } }, grid: { display: false }, border: { display: false } }, y: { ticks: { color: 'rgba(235,235,245,0.4)', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.04)' }, border: { display: false } } },
};

function getPeriodFilter(period: string): (iso: string) => boolean {
  const now = Date.now();
  if (period === 'Месяц') return iso => now - new Date(iso).getTime() < 30 * 86400000;
  if (period === '3 месяца') return iso => now - new Date(iso).getTime() < 90 * 86400000;
  if (period === 'Год') return iso => now - new Date(iso).getTime() < 365 * 86400000;
  return () => true;
}

export default function StatsSection() {
  const [period, setPeriod] = useState('3 месяца');
  const [washes] = useState<WashRecord[]>(() => storage.getWashes());
  const [chemicals] = useState<Chemical[]>(() => storage.getChemicals());

  const filtered = useMemo(() => {
    const f = getPeriodFilter(period);
    return washes.filter(w => f(w.date));
  }, [washes, period]);

  const totalTime = filtered.reduce((s, w) => s + w.duration, 0);
  const avgRating = filtered.length ? (filtered.reduce((s, w) => s + w.rating, 0) / filtered.length).toFixed(1) : '—';

  // Bar chart: washes per month
  const monthLabels = useMemo(() => {
    const months: Record<string, number> = {};
    filtered.forEach(w => {
      const d = new Date(w.date);
      const key = d.toLocaleDateString('ru-RU', { month: 'short', year: '2-digit' });
      months[key] = (months[key] || 0) + 1;
    });
    return { labels: Object.keys(months), data: Object.values(months) };
  }, [filtered]);

  // Line chart: rating over time
  const ratingLine = useMemo(() => {
    const sorted = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return {
      labels: sorted.map(w => new Date(w.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })),
      data: sorted.map(w => w.rating),
    };
  }, [filtered]);

  // Chemical usage from history
  const chemUsage = useMemo(() => {
    const usage: Record<string, number> = {};
    filtered.forEach(w => {
      w.usedChemicals.forEach(id => {
        const ch = chemicals.find(c => c.id === id);
        if (ch) usage[ch.name] = (usage[ch.name] || 0) + ch.perWash;
      });
    });
    return Object.entries(usage).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [filtered, chemicals]);

  const maxUsage = chemUsage[0]?.[1] || 1;

  const barData = {
    labels: monthLabels.labels.length ? monthLabels.labels : ['Нет данных'],
    datasets: [{ data: monthLabels.data.length ? monthLabels.data : [0], backgroundColor: 'rgba(212,175,55,0.7)', hoverBackgroundColor: '#D4AF37', borderRadius: 8, borderSkipped: false }],
  };

  const lineData = {
    labels: ratingLine.labels.length ? ratingLine.labels : ['—'],
    datasets: [{ data: ratingLine.data.length ? ratingLine.data : [0], borderColor: '#D4AF37', backgroundColor: 'rgba(212,175,55,0.1)', borderWidth: 2, pointBackgroundColor: '#D4AF37', pointRadius: 4, fill: true, tension: 0.3 }],
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="section-title">Статистика</div>
      </div>

      {/* Period filter */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {PERIODS.map(p => (
          <button key={p} onClick={() => setPeriod(p)} style={{ padding: '8px 18px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, border: 'none', cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s', background: period === p ? 'var(--gold)' : 'var(--bg-elevated)', color: period === p ? '#0A0A0C' : 'var(--text-secondary)' }}>
            {p}
          </button>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: 'Моек всего', value: filtered.length.toString(), sub: `за ${period.toLowerCase()}`, icon: 'Droplets', color: 'var(--gold)' },
          { label: 'Среднее качество', value: filtered.length ? `${avgRating}★` : '—', sub: 'из 5.0', icon: 'Star', color: '#F0C040' },
          { label: 'Общее время', value: filtered.length ? formatDuration(totalTime) : '—', sub: filtered.length ? formatDuration(Math.round(totalTime / filtered.length)) + ' / мойка' : '', icon: 'Clock', color: '#60A5FA' },
          { label: 'Видов химии', value: String(chemUsage.length), sub: 'использовалось', icon: 'FlaskConical', color: '#A78BFA' },
        ].map(m => (
          <div key={m.label} className="metric-card">
            <div className="flex items-center justify-between mb-3">
              <div className="label-text">{m.label}</div>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: `${m.color}20`, border: `1px solid ${m.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={m.icon as Parameters<typeof Icon>[0]['name']} size={14} style={{ color: m.color }} />
              </div>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: m.color, fontFamily: 'Montserrat, sans-serif' }}>{m.value}</div>
            <div className="label-text mt-1">{m.sub}</div>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-tertiary)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>📊</div>
          <div>Нет данных за выбранный период</div>
        </div>
      ) : (
        <>
          {/* Bar chart */}
          {monthLabels.data.length > 0 && (
            <div className="card-base p-5 mb-4">
              <div className="label-text mb-4">Мойки по месяцам</div>
              <div style={{ height: 160 }}>
                <Bar data={barData} options={CHART_OPTS as Parameters<typeof Bar>[0]['options']} />
              </div>
            </div>
          )}

          {/* Line chart rating */}
          {ratingLine.data.length > 1 && (
            <div className="card-base p-5 mb-4">
              <div className="label-text mb-4">Качество мойки (оценки)</div>
              <div style={{ height: 140 }}>
                <Line data={lineData} options={{ ...CHART_OPTS, scales: { ...CHART_OPTS.scales, y: { ...CHART_OPTS.scales.y, min: 1, max: 5 } } } as Parameters<typeof Line>[0]['options']} />
              </div>
            </div>
          )}
        </>
      )}

      {/* Chemical usage */}
      {chemUsage.length > 0 && (
        <div className="card-base p-5">
          <div className="label-text mb-4">Расход химии (мл)</div>
          <div className="space-y-3">
            {chemUsage.map(([name, ml]) => (
              <div key={name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-white truncate">{name}</span>
                  <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0, marginLeft: 8 }}>{ml} мл</span>
                </div>
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: `${(ml / maxUsage) * 100}%`, background: 'var(--gold)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
