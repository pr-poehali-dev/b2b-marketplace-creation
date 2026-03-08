import { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import { storage, type Chemical, type WeatherData } from '@/lib/storage';
import { fetchWeatherByCoords, fetchWeatherByCity, requestGeolocation, getWeatherIcon, getWashRecommendation } from '@/lib/weather';
import { sendTelegram } from '@/lib/telegram';
import { buildWeatherReport } from '@/lib/telegram';

function getBarColor(pct: number) {
  if (pct > 50) return 'var(--gold)';
  if (pct > 20) return 'var(--yellow-mid)';
  return 'var(--red-accent)';
}

function fmt(s: number) {
  const h = Math.floor(s / 3600).toString().padStart(2, '0');
  const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${h}:${m}:${sec}`;
}

export default function HomeSection({ onTabChange }: { onTabChange?: (tab: string) => void }) {
  const [chemicals, setChemicals] = useState<Chemical[]>(() => storage.getChemicals());
  const [weather, setWeather] = useState<WeatherData | null>(() => storage.getWeather());
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [lapTime, setLapTime] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const settings = storage.getSettings();

  const loadWeather = useCallback(async () => {
    setWeatherLoading(true);
    let data: WeatherData | null = null;
    const s = storage.getSettings();
    if (s.lat && s.lon) {
      data = await fetchWeatherByCoords(s.lat, s.lon);
    } else {
      data = await fetchWeatherByCity(s.city || 'Москва');
    }
    if (data) {
      setWeather(data);
      storage.saveWeather(data);
    }
    setWeatherLoading(false);
  }, []);

  useEffect(() => {
    const s = storage.getSettings();
    // Request geo on first load
    if (!s.locationGranted) {
      requestGeolocation().then(async coords => {
        if (coords) {
          const updated = { ...s, locationGranted: true, lat: coords.lat, lon: coords.lon };
          storage.saveSettings(updated);
          const wd = await fetchWeatherByCoords(coords.lat, coords.lon);
          if (wd) { setWeather(wd); storage.saveWeather(wd); updated.city = wd.city; storage.saveSettings(updated); }
        } else {
          loadWeather();
        }
      });
    } else {
      loadWeather();
    }

    // Morning notification check
    const now = new Date();
    if (now.getHours() === 10 && s.telegram.token && s.notifs.washReminder) {
      const lastNotif = localStorage.getItem('dp_morning_notif');
      const today = now.toDateString();
      if (lastNotif !== today) {
        const wd = storage.getWeather();
        if (wd) {
          const rec = getWashRecommendation(wd);
          sendTelegram(s.telegram.token, s.telegram.chatId, buildWeatherReport(wd.temp, wd.city, wd.description, rec));
          localStorage.setItem('dp_morning_notif', today);
        }
      }
    }
  }, [loadWeather]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setTime(t => t + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const handleStart = () => setRunning(true);
  const handleStop = () => { setRunning(false); setLapTime(time); };
  const handleReset = () => { setRunning(false); setTime(0); setLapTime(null); };

  const recommendation = weather ? getWashRecommendation(weather) : 'Загружаем погоду...';

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Weather + Auto */}
      <div className="card-base p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)', fontSize: '1.8rem' }}>
              {weatherLoading ? '⏳' : weather ? getWeatherIcon(weather.icon) : '🌡️'}
            </div>
            <div>
              {weather ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <span style={{ fontSize: '2rem', fontWeight: 800, color: 'white', fontFamily: 'Montserrat, sans-serif', lineHeight: 1 }}>{weather.temp}°</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{weather.city}</span>
                  </div>
                  <div className="label-text mt-1 capitalize">{weather.description} · {weather.humidity}% вл.</div>
                </>
              ) : (
                <div>
                  <div className="font-semibold text-white">Нет данных</div>
                  <button onClick={loadWeather} className="label-text" style={{ color: 'var(--gold)', cursor: 'pointer', background: 'none', border: 'none', padding: 0, fontSize: '0.75rem' }}>Обновить</button>
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-white">{settings.car.brand} {settings.car.model}</div>
            <div className="label-text mt-0.5">{settings.car.year} · {settings.car.color}</div>
            <button onClick={loadWeather} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 4 }}>
              <Icon name="RefreshCw" size={13} style={{ color: 'var(--text-tertiary)' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Stopwatch */}
      <div className="card-base p-6 text-center">
        <div className="label-text mb-3">Секундомер мойки</div>
        <div className="stopwatch-display mb-2">{fmt(time)}</div>
        {lapTime !== null && !running && (
          <div className="label-text mb-4" style={{ color: 'var(--gold)' }}>Последний результат: {fmt(lapTime)}</div>
        )}
        {lapTime === null && <div style={{ height: 24 }} />}
        <div className="flex gap-3 justify-center flex-wrap">
          {!running ? (
            <button className="btn-gold animate-pulse-gold" style={{ minWidth: 120 }} onClick={handleStart}>
              <Icon name="Play" size={16} />Старт
            </button>
          ) : (
            <button className="btn-gold" style={{ minWidth: 120 }} onClick={handleStop}>
              <Icon name="Pause" size={16} />Пауза
            </button>
          )}
          <button className="btn-danger" style={{ minWidth: 120 }} onClick={handleReset}>
            <Icon name="Square" size={16} />Сброс
          </button>
        </div>
      </div>

      {/* Recommendation */}
      <div className="card-base p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)' }}>
          <Icon name="Lightbulb" size={18} style={{ color: 'var(--gold)' }} />
        </div>
        <div>
          <div className="label-text mb-1">Рекомендация дня</div>
          <div className="text-sm text-white font-medium" style={{ lineHeight: 1.55 }}>{recommendation}</div>
        </div>
      </div>

      {/* Chemical balance */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="section-title">Баланс химии</div>
          <button onClick={() => onTabChange?.('chemistry')} style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>Все →</button>
        </div>
        {chemicals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            Склад пуст. <span style={{ color: 'var(--gold)', cursor: 'pointer' }} onClick={() => onTabChange?.('chemistry')}>Добавить химию →</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {chemicals.slice(0, 4).map(c => {
              const pct = Math.round((c.remains / c.volume) * 100);
              const barColor = getBarColor(pct);
              return (
                <div key={c.id} className="card-base p-4">
                  <div className="text-xs font-semibold text-white truncate mb-1">{c.name}</div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="label-text">{c.remains} мл</span>
                    <span style={{ color: barColor, fontSize: '0.75rem', fontWeight: 700 }}>{pct}%</span>
                  </div>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
