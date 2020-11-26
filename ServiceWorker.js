const cacheName = "Gallerie";

const files = [
    "/",
    "style.css",
    "https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@700&display=swap",
    "script.js",
    "manifest.webmanifest",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
    "https://code.jquery.com/jquery-3.5.1.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js",
    "https://kit.fontawesome.com/6acba9f91f.js",
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

