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


/*self.addEventListener('activate', function(event){
    event.waitUntil(…);
});*/

if (navigator.online) {
    console.log("Vous êtes en ligne !");
}

if (navigator.offline) {
    console.log("Vous êtes hors ligne !");
}

if (navigator.connection) {
    if (navigator.connection.type === "wifi") {
        console.log("Connecté en Wifi");
    } else {
        console.log('API non supporté par le navigateur');
    }
}

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




