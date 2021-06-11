const CACHE_NAME = "static resources"
const resourcesToPrecache = [
    "/",
    "/index.html",
    "/script.js",
    "/styles.css",
    "/icons/manifest-icon-192.png"
]

self.addEventListener("install", event => {
    event.waitUntil(async () => {
        const cache = await caches.open(CACHE_NAME)
        await cache.addAll(resourcesToPrecache)
    })
})

self.addEventListener("fetch", async event => {
    const cachedResponse = await event.respondWith(caches.match(event.request))
    return cachedResponse || fetch(event.request)
})