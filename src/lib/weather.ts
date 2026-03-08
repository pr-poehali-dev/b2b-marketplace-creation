import type { WeatherData } from './storage';

const OWM_KEY = 'bd5e378503939ddaee76f12ad7a97608';

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData | null> {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OWM_KEY}&units=metric&lang=ru`
    );
    if (!res.ok) return null;
    const d = await res.json();
    return {
      temp: Math.round(d.main.temp),
      city: d.name,
      icon: d.weather[0].icon,
      humidity: d.main.humidity,
      description: d.weather[0].description,
      fetchedAt: Date.now(),
    };
  } catch {
    return null;
  }
}

export async function fetchWeatherByCity(city: string): Promise<WeatherData | null> {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OWM_KEY}&units=metric&lang=ru`
    );
    if (!res.ok) return null;
    const d = await res.json();
    return {
      temp: Math.round(d.main.temp),
      city: d.name,
      icon: d.weather[0].icon,
      humidity: d.main.humidity,
      description: d.weather[0].description,
      fetchedAt: Date.now(),
    };
  } catch {
    return null;
  }
}

export function requestGeolocation(): Promise<{ lat: number; lon: number } | null> {
  return new Promise(resolve => {
    if (!navigator.geolocation) { resolve(null); return; }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => resolve(null),
      { timeout: 8000 }
    );
  });
}

export function getWeatherIcon(icon: string): string {
  const map: Record<string, string> = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '⛅',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
  };
  return map[icon] || '🌡️';
}

export function getWashRecommendation(weather: WeatherData): string {
  const { temp, description, humidity } = weather;
  const desc = description.toLowerCase();
  if (desc.includes('дождь') || desc.includes('ливень') || desc.includes('гроза')) {
    return 'Сегодня идёт дождь — мойку лучше отложить.';
  }
  if (temp < 0) {
    return 'Температура ниже нуля — мойку не рекомендуется проводить.';
  }
  if (temp < 5) {
    return 'Слишком холодно для детейлинга на улице. Только в тёплом гараже.';
  }
  if (humidity > 85) {
    return 'Высокая влажность — воск и полироль плохо схватятся. Отложите нанесение защиты.';
  }
  if (temp > 30) {
    return 'Жарко! Мойте в тени — химия быстро засыхает на горячем ЛКП.';
  }
  if (temp >= 10 && temp <= 25 && humidity < 70) {
    return 'Идеальные условия для мойки и нанесения защитных покрытий! 🎯';
  }
  return 'Условия приемлемые для мойки. Не забудьте про сушку!';
}
