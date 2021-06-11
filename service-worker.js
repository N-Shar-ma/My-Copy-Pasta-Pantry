const CACHE_NAME = "static resources"
const resourcesToPrecache = [
    "/",
    "index.html",
    "script.js",
    "styles.css",
    "icons/manifest-icon-192.png"
]

self.addEventListener("install", event => {
    event.waitUntil(preCache())
})

self.addEventListener('fetch', async event => { //Cache First Strategy
    event.respondWith(caches.match(event.request)
    .then(cachedResponse => cachedResponse || fetch(event.request))
    )
})

async function preCache() {
    try {
        const cache = await caches.open(CACHE_NAME)
        console.log("opened cache")
        await cache.addAll(resourcesToPrecache)
        console.log("precaching done!")
    } catch (e) {
        console.error(e)
    }
}