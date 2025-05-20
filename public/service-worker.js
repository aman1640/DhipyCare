const CACHE_NAME = 'dhipycare-cache-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/home.html',
  '/healthform.html',
  '/index_login.html',
  '/accountdump.html',
  '/otp.html',
  '/info.html',
  '/404.html',
  '/manifest.json',
  '/js/script.js',
  '/css/styles.css',
  '/assets/img/homescreenicon.png',
  '/assets/img/splashscreen.png',
  '/assets/img/5020796.jpg',
  '/assets/img/8465661.jpg',
  '/assets/img/415.jpg',
  '/assets/img/india_flag.jpg',
  '/assets/img/logimage1.png',
  '/assets/img/logimage2.png',
  '/assets/img/logimage3.png',
  '/assets/icons/google_icon.png'
];

self.addEventListener('install', function (e) {
  console.log('✅ Service Worker Installed');
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(STATIC_ASSETS);
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
      // Cache-first for static assets
      if (response) {
        return response;
      }
      return fetch(event.request).then(function (networkResponse) {
        // Optionally cache new requests here if needed
        return networkResponse;
      });
    })
  );
});
