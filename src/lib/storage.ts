export interface Chemical {
  id: string;
  name: string;
  purpose: string;
  volume: number;
  perWash: number;
  remains: number;
  photo: string | null;
  emoji: string;
  inCart: boolean;
  createdAt: string;
}

export interface WashStage {
  label: string;
  done: boolean;
}

export interface WashRecord {
  id: string;
  date: string;
  startTime: string;
  duration: number;
  rating: number;
  comment: string;
  photosBefore: string[];
  photosAfter: string[];
  usedChemicals: string[];
  stages: WashStage[];
}

export interface CarSettings {
  brand: string;
  model: string;
  year: string;
  color: string;
  photo: string | null;
}

export interface TelegramSettings {
  token: string;
  chatId: string;
}

export interface NotifSettings {
  washReminder: boolean;
  chemLow: boolean;
  weatherAlert: boolean;
  weeklyReport: boolean;
}

export interface AppSettings {
  car: CarSettings;
  telegram: TelegramSettings;
  notifs: NotifSettings;
  locationGranted: boolean;
  lat: number | null;
  lon: number | null;
  city: string;
}

export interface WeatherData {
  temp: number;
  city: string;
  icon: string;
  humidity: number;
  description: string;
  fetchedAt: number;
}

const KEYS = {
  chemicals: 'dp_chemicals',
  washes: 'dp_washes',
  settings: 'dp_settings',
  weather: 'dp_weather',
};

const DEFAULT_STAGES: WashStage[] = [
  { label: 'Нанесение активной пены', done: false },
  { label: 'Ополаскивание (предмойка)', done: false },
  { label: 'Очистка дисков', done: false },
  { label: 'Контактная мойка кузова', done: false },
  { label: 'Финальное ополаскивание', done: false },
  { label: 'Сушка кузова', done: false },
  { label: 'Нанесение защитного состава', done: false },
  { label: 'Очистка стёкол', done: false },
];

const DEFAULT_CHEMICALS: Chemical[] = [
  { id: 'c1', name: 'Шампунь pH-нейтральный', purpose: 'Основная мойка кузова', volume: 1000, perWash: 50, remains: 720, photo: null, emoji: '🧴', inCart: false, createdAt: new Date().toISOString() },
  { id: 'c2', name: 'Активная пена Koch', purpose: 'Предмойка, бесконтакт', volume: 500, perWash: 80, remains: 80, photo: null, emoji: '🫧', inCart: false, createdAt: new Date().toISOString() },
  { id: 'c3', name: 'Очиститель дисков', purpose: 'Колёса и суппорта', volume: 750, perWash: 30, remains: 120, photo: null, emoji: '⚙️', inCart: false, createdAt: new Date().toISOString() },
  { id: 'c4', name: "Воск-спрей Meguiar's", purpose: 'Финальная защита', volume: 400, perWash: 15, remains: 35, photo: null, emoji: '✨', inCart: false, createdAt: new Date().toISOString() },
];

const DEFAULT_SETTINGS: AppSettings = {
  car: { brand: 'BMW', model: 'M5 F90', year: '2020', color: 'Marina Bay Blue', photo: null },
  telegram: { token: '', chatId: '' },
  notifs: { washReminder: true, chemLow: true, weatherAlert: false, weeklyReport: true },
  locationGranted: false,
  lat: null,
  lon: null,
  city: 'Москва',
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export const storage = {
  getChemicals: (): Chemical[] => load(KEYS.chemicals, DEFAULT_CHEMICALS),
  saveChemicals: (data: Chemical[]) => save(KEYS.chemicals, data),
  getWashes: (): WashRecord[] => load(KEYS.washes, []),
  saveWashes: (data: WashRecord[]) => save(KEYS.washes, data),
  getSettings: (): AppSettings => {
    const saved = load<Partial<AppSettings>>(KEYS.settings, {});
    return { ...DEFAULT_SETTINGS, ...saved, car: { ...DEFAULT_SETTINGS.car, ...(saved.car || {}) }, telegram: { ...DEFAULT_SETTINGS.telegram, ...(saved.telegram || {}) }, notifs: { ...DEFAULT_SETTINGS.notifs, ...(saved.notifs || {}) } };
  },
  saveSettings: (data: AppSettings) => save(KEYS.settings, data),
  getWeather: (): WeatherData | null => load(KEYS.weather, null),
  saveWeather: (data: WeatherData) => save(KEYS.weather, data),
  exportAll: () => {
    return JSON.stringify({
      chemicals: load(KEYS.chemicals, []),
      washes: load(KEYS.washes, []),
      settings: load(KEYS.settings, {}),
    }, null, 2);
  },
  importAll: (json: string) => {
    const data = JSON.parse(json);
    if (data.chemicals) save(KEYS.chemicals, data.chemicals);
    if (data.washes) save(KEYS.washes, data.washes);
    if (data.settings) save(KEYS.settings, data.settings);
  },
  DEFAULT_STAGES,
};

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}ч ${m}мин`;
  if (m > 0) return `${m}мин ${s}с`;
  return `${s}с`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}
