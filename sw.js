// Service Worker for Nourish Daily Web App
// Auto-updates with version-based cache busting

// CONFIG NOTE: These values are hardcoded because service workers
// run in a separate context and cannot import from config.js.
// Keep in sync with: package.json version, env.config.js basePath
const CACHE_VERSION = 'v1.4.4';
const CACHE_NAME = `nourish-daily-${CACHE_VERSION}`;
const BASE_PATH = '/nourish-daily/';

const urlsToCache = [
    BASE_PATH,
    `${BASE_PATH}index.html`,
    `${BASE_PATH}style.css`,
    `${BASE_PATH}script.js`,
    `${BASE_PATH}data.js`,
    `${BASE_PATH}config.js`,
    `${BASE_PATH}env.config.js`,
    `${BASE_PATH}manifest.json`
];

// Install event - cache files and force immediate activation
self.addEventListener('install', event => {
    console.log(`[SW] Installing ${CACHE_VERSION}...`);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Caching files...');
                return cache.addAll(urlsToCache);
            })
    );
    // Skip waiting - activate immediately
    self.skipWaiting();
});

// Fetch event - network first for HTML, cache first for assets
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // For HTML requests, try network first
    if (event.request.mode === 'navigate' || url.pathname.endsWith('.html')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Update cache with fresh copy
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // For other assets, cache first
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) return response;
                return fetch(event.request);
            })
    );
});

// Activate event - clean up ALL old caches
self.addEventListener('activate', event => {
    console.log(`[SW] Activating ${CACHE_VERSION}...`);
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Delete any cache that isn't the current version
                    if (cacheName !== CACHE_NAME) {
                        console.log(`[SW] Deleting old cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Take control of all open tabs immediately
    self.clients.claim();
});
