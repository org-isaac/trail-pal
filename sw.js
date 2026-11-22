/* Trail Pal service worker: caches the app shell for offline use. */
// Increment this when changing the app shell or its icons. This version also
// removes the previous cache, which may contain the old placeholder artwork.
const CACHE_NAME = 'trail-pal';
const APP_SHELL = [
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './favicon.ico',
  './favicon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const appBase = self.registration.scope;
    await cache.addAll(APP_SHELL.map((path) => new URL(path, appBase).href));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter((name) => name.startsWith('trail-pal-') && name !== CACHE_NAME)
        .map((name) => caches.delete(name))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  // Only handle same-origin GET requests. Leave external requests untouched.
  if (request.method !== 'GET' || requestUrl.origin !== self.location.origin) {
    return;
  }

  // Try the network first so published updates are picked up promptly.
  // If offline, use the cached response; navigation falls back to index.html.
  event.respondWith((async () => {
    try {
      const response = await fetch(request);

      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }

      return response;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }

      if (request.mode === 'navigate') {
        const indexUrl = new URL('./index.html', self.registration.scope);
        const cachedIndex = await caches.match(indexUrl.href);
        if (cachedIndex) {
          return cachedIndex;
        }
      }

      return new Response('Trail Pal is unavailable offline. Open the app while connected to the internet first.', {
        status: 503,
        statusText: 'Offline',
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
  })());
});
