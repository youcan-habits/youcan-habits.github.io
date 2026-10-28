const CACHE="youcan-standalone-28f303a984c7", SCOPE="/", URLS=["/aer-breath-icon.png","/analytics-config.json","/app-icon.png","/apple-touch-icon.png","/assets/index-BYkO5BPL-c6a70fb562.js","/assets/index-Csfoh9vP-c6a70fb562.css","/favicon.png","/icon-192.png","/icon-512.png","/index.html","/site.webmanifest"];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS))); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('youcan-standalone-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
 const url = new URL(event.request.url);
 if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE)) return;
 if (event.request.mode === 'navigate') {
  event.respondWith(fetch(event.request).catch(() => caches.match(SCOPE + 'index.html', { ignoreVary: true }))); return;
 }
 if (URLS.includes(url.pathname)) event.respondWith(caches.match(event.request, { ignoreVary: true }).then(hit => hit || fetch(event.request)));
});
