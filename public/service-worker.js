const CACHE_NAME = 'dhipycare-cache-v1';

self.addEventListener('install', function (e) {
  console.log('✅ Service Worker Installed');
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/icon-512x512.png',
        '/homescreenicon.png',
        '/splashscreen.png'
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('🔄 Service Worker Activated');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
