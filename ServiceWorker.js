const cacheName = "Monoverse_Game-Remi_Stair-1.1.61";
const contentToCache = [
    "Build/Remi_Infinity_TestBuild.loader.js",
    "Build/Remi_Infinity_TestBuild.framework.js",
    "Build/Remi_Infinity_TestBuild.data",
    "Build/Remi_Infinity_TestBuild.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching all: app shell and content : ${cacheName}`);
      await cache.addAll(contentToCache);
      console.log('[Service Worker] All content cached');
    })());
});

self.addEventListener('activate', function (e) {
    console.log('[Service Worker] Activate');
    e.waitUntil(
        (async function () {
            const keys = await caches.keys();
            return Promise.all(
                keys.map(async (key) => {
                    if (key !== cacheName) {
                        console.log(`[Service Worker] Deleting old cache: ${key}`);
                        return caches.delete(key);
                    }
                })
            ).then(() => {
                console.log('[Service Worker] Old caches deleted, new cache ready');
                return self.clients.claim(); // 현재 페이지에서 활성화된 서비스 워커가 즉시 제어하도록 함
            });
        })()
    );
});

self.addEventListener('fetch', function (e) {
    if (e.request.method === 'POST') {
        // `POST` 요청은 캐시하지 않고 직접 처리
        e.respondWith(fetch(e.request));
        return;
    }

    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
