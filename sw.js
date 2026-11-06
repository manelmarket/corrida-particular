// Corrida Particular: guarda o app no celular para abrir mesmo sem internet.
// A página é buscada na rede primeiro (assim as atualizações chegam na hora) e,
// sem conexão, sai da cópia guardada. Mapa, rotas e busca continuam precisando de internet.
const CACHE = 'corrida-085369e34a';
const SHELL = ['./', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('corrida-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // mapa, rotas, busca e fontes vão direto para a rede

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put('./', copy));
          }
          return res;
        })
        .catch(() => caches.match('./').then((hit) => hit || Response.error()))
    );
    return;
  }

  event.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
