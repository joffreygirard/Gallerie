document.addEventListener("DOMContentLoaded", function () {
    fetch("https://clever-roentgen-a7b6ea.netlify.app/GalleryRepo/images.json")
        .then(function (response) {
            return response.json();

        }).then(function (res) {
            console.log(res);

            let images = res;

            let div_main = document.getElementById("main");

            let container = document.createElement("div");
            container.classList.add("container", "mt-5", "mb-3");

            let row = document.createElement("div");
            row.classList.add("row");

            images.forEach(function (image) {
                let div_image = document.createElement("div");
                div_image.classList.add("col-sm-6", "col-md-4", "col-lg-3", "p-2");

                let img = document.createElement("img");
                img.src = image.src;
                img.alt = image.alt;
                img.title = image.title;
                img.classList.add("w-100", "on_hover_clickable");

                div_image.appendChild(img);
                row.appendChild(div_image);
            });

            container.appendChild(row);
            div_main.appendChild(container);

        }).catch(function (err) {
            console.log(err);
        });
});



console.log(navigator.onLine ? 'online' : 'offline');

navigator.addEventListener("onLine", function (e) {
    console.log("status de connexion changé : " + navigator.onLine);
});

window.addEventListener("online", function (e) {
    console.log("Vous êtes connecté à internet");
});

window.addEventListener("offline", function (e) {
    console.log("Vous n'êtes pas connecté à internet");
});

if ('cache' in window) {
    caches.open('nom_du_cache')
        .then((cache) => {
            cache.addAll(['/','/style.css', 'script.js']);
        }).catch((err) => {
            console.log(err)
        });
}


