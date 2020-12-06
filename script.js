let div_disconnected = document.getElementById("disconnected");
let fetchData;
let favoris = [];

document.addEventListener("DOMContentLoaded", function () {

    if (navigator.onLine) {
        console.log("online");
        div_disconnected.classList.add("d-none");

        getFavoris();

        fetchData = fetch("https://clever-roentgen-a7b6ea.netlify.app/GalleryRepo/images.json")
            .then((response) => response.json())
            .then((data) => localforage.setItem("data", data))
            .catch((err) => console.log(err));

    } else {
        console.log("offline");
        div_disconnected.classList.remove("d-none");
        fetchData = localforage.getItem("data");
        favoris = localforage.getItem("favoris");
        console.log(favoris);
    }

    fetchData.then((json) => displayImages(json));

    window.addEventListener("online", function (e) {
        console.log("change online");
        div_disconnected.classList.add("d-none");
    });

    window.addEventListener("offline", function (e) {
        console.log("change offline");
        div_disconnected.classList.remove("d-none");
    });
});


function displayImages(images) {
    let div_main = document.getElementById("main");

    let container = document.createElement("div");
    container.classList.add("container", "mt-5", "mb-3");

    let row = document.createElement("div");
    row.classList.add("row");

    images.forEach(function (image, i) {
        let div_image = document.createElement("div");
        div_image.classList.add("col-sm-6", "col-md-4", "col-lg-3", "p-2");

        let img = document.createElement("img");
        img.src = image.src;
        img.alt = image.alt;
        img.title = image.title;
        img.classList.add("w-100", "on_hover_clickable");

        let div_fav = document.createElement("div");
        div_fav.classList.add("p-1");

        let span_fav = document.createElement("span");
        span_fav.classList.add("fav_icon");

        let icon_fav = document.createElement("i");
        icon_fav.id = "icon_fav_" + i;

        if (isFavoris(icon_fav.id)) {
            icon_fav.classList.add("fas", "fa-heart");
        } else {
            icon_fav.classList.add("far", "fa-heart");
        }

        icon_fav.addEventListener("click", function () {
            addFavoris(this);
        });

        span_fav.appendChild(icon_fav)
        div_fav.appendChild(span_fav);
        div_image.appendChild(img);
        div_image.appendChild(div_fav);
        row.appendChild(div_image);
    });

    container.appendChild(row);
    div_main.appendChild(container);
}

function addFavoris(image) {
    let photoId = image.id;

    let added = false;
    if (image.getAttribute("class") === "far fa-heart") {
        image.setAttribute("class", "fas fa-heart");
        added = true;
    } else if (image.getAttribute("class") === "fas fa-heart") {
        image.setAttribute("class", "far fa-heart");
        added = false;
    }

    if (added) {
        fetch("http://localhost:3000/favoris/add", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({photoId}),
        }).then(res => {
            return res.json();
        }).then(data => {
            favoris = data;
            sendNotif("Image ajoutée aux favoris");
        })
    } else {
        fetch("http://localhost:3000/favoris/del", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({photoId}),
        }).then(res => {
            return res.json();
        }).then(data => {
            favoris = data;
            sendNotif("Image retirée des favoris");
        })
    }

    getFavoris();
}

function isFavoris(id) {
    return favoris.include(id);
}

function getFavoris() {
    fetch("http://localhost:3000/favoris", {
        method: 'GET'
    }).then(res => {
        return res.json();
    }).then(data => {
        favoris = data;
        localforage.setItem("favoris", favoris);
        return favoris;
    });
}

function sendNotif(message) {
    if ("Notification" in window) {
        if (Notification.permission === "granted") {
            const notification = new Notification(message);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission(permission => {
                if (permission === "granted") {
                    const notification = new Notification(message);
                }
            });
        }
    }
}



