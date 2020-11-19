self.addEventListener('message', event => {
    this.clients.matchAll()
        .then(clients => {
            clients.forEach(client => client.postMessage('Enchanté, je suis le service worker'));
        });
});

self.addEventListener('fetch', event => {
    console.log('PWA!!!!');
});

self.addEventListener('install', event => {
    event.waitUntil(Promise.resolve('Install phase succeed'));
});


if (navigator.onLine) {
    console.log("online");
} else {
    console.log("offline");
}

window.addEventListener("onLine", function (e) {
    console.log("change online");
});

window.addEventListener("offline", function (e) {
    console.log("change offline");
});



self.addEventListener('install', function(event) {
    event.waitUntil(caches.open('nom_du_cache')
        .then(cache => {
            return cache.addAll(
                ['/index.html','/style.css', 'script.js']
            );
        })
    );
});


self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.open('nom_du_cache')
        .then(cache => cache.match(e.request))
        .then(function (response) {
            return response || fetch(e.request);
        })
    )
});




