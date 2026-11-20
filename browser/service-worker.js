const CACHE_NAME = "tesla-browser-v1";
const APP_SHELL = [
    "./",
    "./index.html",
    "./manifest.json",
    "../css/estilos.css",
    "../js/app.js",
    "../img/hero.jpg",
    "../img/model-s.jpg",
    "../img/model-3.jpg",
    "../img/model-x.jpg",
    "../img/model-y.jpg",
    "../img/cybertruck.jpg",
    "../img/galeria1.jpg",
    "../img/galeria2.jpg",
    "../img/galeria3.jpg",
    "../img/galeria4.jpg",
    "../img/galeria5.jpg",
    "../img/galeria6.jpg",
    "../img/icons/icon-192.png",
    "../img/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                const copy = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                return response;
            })
            .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
    );
});
