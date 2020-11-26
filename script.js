let div_disconnected = document.getElementById("disconnected");

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


    if (navigator.onLine) {
        console.log("online");
        div_disconnected.classList.add("d-none");
    } else {
        console.log("offline");
        div_disconnected.classList.remove("d-none");
    }

    window.addEventListener("online", function (e) {
        console.log("change online");
        div_disconnected.classList.add("d-none");
    });

    window.addEventListener("offline", function (e) {
        console.log("change offline");
        div_disconnected.classList.remove("d-none");
    });
});


//console.log("onLine : " + navigator.onLine);



/*if ('cache' in window) {
    caches.open('nom_du_cache')
        .then((cache) => {
            cache.addAll(['/','/style.css', 'script.js']);
        }).catch((err) => {
            console.log(err)
        });
}*/


