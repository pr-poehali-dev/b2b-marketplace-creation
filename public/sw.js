const CACHE_NAME = 'b2b-market-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/catalog',
  '/suppliers',
  '/manifest.json'
];

// Установка: кэшируем основные страницы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

// Активация: удаляем старые кэши
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: Network First для API, Cache First для статики
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Пропускаем не-GET запросы и запросы к внешним API
  if (event.request.method !== 'GET') return;
  if (url.pathname.startsWith('/api') || url.hostname.includes('functions.poehali.dev')) return;
  if (url.hostname.includes('mc.yandex.ru') || url.hostname.includes('metrika')) return;

  // Для навигационных запросов — Network First
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match('/') || caches.match('/index.html'))
    );
    return;
  }

  // Для статических ресурсов — Cache First
  if (
    url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|woff2|woff|ttf|ico)$/)
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Остальное — Network First с fallback на кэш
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
