const cacheName = "v1";

const cacheAssets = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js'
];
// Call install event

self.addEventListener('install', (e) => {
    console.log('Service Worker : Installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log("service worker: caching file");
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    )
});

// Call activate event
self.addEventListener('activate', (e) => {
    console.log('Service Worker : Activate');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('service worker : clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
})

// Call Fetch event
self.addEventListener('fetch', (e) => {
    console.log("service worker fetching");
    e.respondWith(
        fetch(e.request)
            .catch(err => caches.match(e.request))
    )
})