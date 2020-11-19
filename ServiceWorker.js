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

