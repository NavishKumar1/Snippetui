const CACHE_NAME = 'snippetui-cache-v1';

// Precached assets - core files that should be cached immediately
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/site.webmanifest'
];

// 1. Install event: Precache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SnippetUI Service Worker] Pre-caching core assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// 2. Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SnippetUI Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch event: Stale-While-Revalidate strategy for optimal offline capabilities
self.addEventListener('fetch', (event) => {
  // Only handle local GET requests and third-party CDNs/fonts
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isLocalRequest = requestUrl.origin === location.origin;
  const isCdnRequest = requestUrl.hostname === 'fonts.googleapis.com' ||
                       requestUrl.hostname === 'fonts.gstatic.com' ||
                       requestUrl.hostname === 'www.googletagmanager.com' ||
                       requestUrl.hostname === 'googletagmanager.com' ||
                       requestUrl.hostname === 'images.unsplash.com' ||
                       requestUrl.hostname === 'unsplash.com' ||
                       requestUrl.hostname.endsWith('.unsplash.com') ||
                       requestUrl.hostname.endsWith('.gstatic.com');

  if (!isLocalRequest && !isCdnRequest) {
    return; // Pass through straight to network
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache immediately, then fetch in background to update cache
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, networkResponse);
                });
              }
            })
            .catch(() => {
              // Ignore network errors during background sync
            });
          return cachedResponse;
        }

        // Cache miss: fetch from network, cache response, and return
        return fetch(event.request)
          .then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && networkResponse.type !== 'cors') {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch((error) => {
            // Fallback for HTML pages when offline and cache miss
            if (event.request.headers.get('accept')?.includes('text/html')) {
              return caches.match('/index.html');
            }
            throw error;
          });
      })
  );
});
