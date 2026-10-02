const CACHE_NAME = 'snake-3d-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
];

// Install Service Worker dan simpan file ke Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Gunakan file dari Cache jika sedang offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, gunakan itu (offline mode)
        if (response) {
            return response;
        }
        // Jika tidak ada, ambil dari internet
        return fetch(event.request);
      })
  );
});
