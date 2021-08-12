/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'pwa-task-manager';
const urlsToCache = [
  '/',
  '/completed',
];

// Install a service worker
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache)),
  );
});

// Cache and return requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }),
  );
});

// Update a service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['pwa-task-manager'];
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
        return null;
      }),
    )),
  );
});
