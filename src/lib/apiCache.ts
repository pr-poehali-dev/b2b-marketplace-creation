// Общий кэш для GET-запросов к backend-функциям.
// Цель: не дёргать сервер повторно за одними и теми же данными (товары, категории),
// пока они не устарели — это экономит лимит вызовов функций.

interface CacheEntry<T> {
  data: T;
  ts: number;
}

const STORAGE_PREFIX = 'api_cache_';

const memoryCache = new Map<string, CacheEntry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();

function readStorage<T>(key: string, ttlMs: number): T | null {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - parsed.ts > ttlMs) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // localStorage может быть недоступен/переполнен — не критично
  }
}

/**
 * Возвращает данные из кэша (память → localStorage), а если они устарели —
 * выполняет fetcher. Параллельные запросы с одинаковым key объединяются в один.
 */
export async function fetchWithCache<T>(key: string, ttlMs: number, fetcher: () => Promise<T>): Promise<T> {
  const mem = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (mem && Date.now() - mem.ts < ttlMs) {
    return mem.data;
  }

  const stored = readStorage<T>(key, ttlMs);
  if (stored !== null) {
    memoryCache.set(key, { data: stored, ts: Date.now() });
    return stored;
  }

  const existingInflight = inflight.get(key) as Promise<T> | undefined;
  if (existingInflight) {
    return existingInflight;
  }

  const promise = fetcher()
    .then((data) => {
      memoryCache.set(key, { data, ts: Date.now() });
      writeStorage(key, data);
      inflight.delete(key);
      return data;
    })
    .catch((err) => {
      inflight.delete(key);
      throw err;
    });

  inflight.set(key, promise);
  return promise;
}

/** Сбрасывает все закэшированные записи, ключ которых начинается с prefix. */
export function invalidateCache(prefix: string) {
  for (const key of Array.from(memoryCache.keys())) {
    if (key.startsWith(prefix)) memoryCache.delete(key);
  }
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX + prefix)) localStorage.removeItem(k);
    }
  } catch {
    // ignore
  }
}
