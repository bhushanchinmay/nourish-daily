// Service Worker for Nourish Daily PWA
// Uses environment configuration for dynamic base paths

// Note: importScripts doesn't work with env.config.js due to CORS
// So we fallback to defaults if ENV is not available
const CACHE_NAME = 'nourish-daily-v1';
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

// Install event - cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});
