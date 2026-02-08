const CACHE_NAME = 'prhay-v1';

const APP_ASSETS = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/i18n.js',
    '/js/notifications.js',
    '/js/session.js',
    '/js/icons.js',
    '/js/components/NavBar.jsx',
    '/js/views/HomeView.jsx',
    '/js/views/SessionView.jsx',
    '/js/views/CompleteView.jsx',
    '/js/views/ManageView.jsx',
    '/js/views/StatsView.jsx',
    '/js/views/SettingsView.jsx',
    '/js/App.jsx',
    '/manifest.json',
    '/icons/icon.svg',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

// Install: pre-cache all app assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

// Fetch: same-origin = cache-first, cross-origin = stale-while-revalidate
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    if (url.origin === self.location.origin) {
        // App assets: serve from cache, fall back to network
        event.respondWith(
            caches.match(event.request)
                .then(cached => cached || fetch(event.request))
        );
    } else {
        // CDN assets (React, Babel, Tailwind, Lucide): cache on first fetch,
        // serve from cache offline, refresh in background when online
        event.respondWith(
            caches.open(CACHE_NAME).then(cache =>
                cache.match(event.request).then(cached => {
                    const networkFetch = fetch(event.request)
                        .then(response => {
                            if (response.ok) {
                                cache.put(event.request, response.clone());
                            }
                            return response;
                        })
                        .catch(() => cached);

                    return cached || networkFetch;
                })
            )
        );
    }
});
