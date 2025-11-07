// Service Worker básico para cachear archivos offline
const CACHE_NAME = 'portal-riego-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/app.js',
    '/js/auth.js',
    '/js/data.js',
    '/js/pedidos.js',
    '/js/lib/jspdf.min.js'
    // Agrega más archivos si es necesario, como iconos
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});