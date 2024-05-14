var CACHE_VERSION = 'myapp-v1';
var CACHE_FILES = [
    '/CIS128Homework4/',
    '/CIS128Homework4/index.html',
    '/CIS128Homework4/images/lightblue.jpg',
    '/CIS128Homework4/images/lightgold.jpg',
    '/CIS128Homework4/scripts/app.js',
    '/CIS128Homework4/scripts/scripts.js',
    '/CIS128Homework4/css/styles.css'
];

self.addEventListener('install', event => {
    console.log('SW installed');
    event.waitUntil(
        caches
        .open(CACHE_VERSION)
        .then(cache => {
            console.log('SW caching files');
            cache.addAll(CACHE_FILES)
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    console.log('SW activated');
    event.waitUntil(
        caches.keys().then(keyNames => {
            return Promise.all(
                keyNames.map(key => {
                    if(key !== CACHE_VERSION) {
                        console.log('SW clearing old caches');
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('SW fetching');
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
