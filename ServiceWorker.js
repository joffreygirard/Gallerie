const cacheName = "Gallerie";

const files = [
    "/",
    "style.css",
    "https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@700&display=swap",
    "script.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
];


self.addEventListener("install", e => {
    caches.open(cacheName).then(cache => {
        cache.addAll(files);
    });
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(
                keyList.map(function (key) {
                    if (key !== cacheName) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", e => {
    console.log(e.request.url);
});

self.addEventListener("fetch", event => {
    const url = event.request.url;

    if (url.indexOf("https://clever-roentgen-a7b6ea.netlify.app/GalleryRepo/images.json") === 0) {
        event.respondWith(
            fetch(event.request).then(response => {
                if (response.status === 200) {
                    console.info("Formatting data");
                    return response.json().then(json => {

                        json.forEach(function (image) {
                            caches.open(cacheName).then(cache => {
                                cache.addAll([
                                    image.src
                                ]);
                            });
                        });

                        const formattedResponse = json.map(j => ({
                            src: j.src,
                            alt: j.alt,
                            title: j.title
                        }));

                        return new Response(JSON.stringify(formattedResponse));
                    });

                } else {
                    console.error(
                        "Service Worker",
                        "Error when fetching",
                        event.request.url
                    );

                    return response;
                }
            })
        );

    } else {
        event.respondWith(
            caches
                .open(cacheName)
                .then(cache => cache.match(event.request))
                .then(response => response || fetch(event.request))
        );
    }
});



/*self.addEventListener('message', event => {
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
});*/


