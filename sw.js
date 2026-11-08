/* eGuard · service worker (Rev 0.5)
   - index.html: red primero, copia local si no hay señal (la consola sigue cifrada en la copia).
   - librerías, estilos, íconos y modelo 3D versionado: copia local primero, se actualiza en segundo plano.
   - todo lo que no sea GET (correo, futuras APIs) pasa directo a la red. */
const VERSION = "a58c4f23a561";
const CACHE = "eguard-" + VERSION;
const CORE = ["./", "./index.html", "./mobile.css", "./manifest.webmanifest", "./favicon.ico", "./apple-touch-icon.png",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png",
  "./vendor/xlsx.full.min.js", "./vendor/jspdf.umd.min.js"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith("eguard-") && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

async function networkFirst(req) {
  const c = await caches.open(CACHE);
  try {
    const r = await fetch(req, { cache: "no-store" });
    if (r.ok) c.put("./index.html", r.clone());
    return r;
  } catch (e) {
    return (await c.match("./index.html")) || (await c.match("./")) || Response.error();
  }
}

async function cacheFirst(req, ev) {
  const c = await caches.open(CACHE);
  const hit = await c.match(req);
  const net = fetch(req).then((r) => { if (r && (r.ok || r.type === "opaque")) c.put(req, r.clone()); return r; }).catch(() => null);
  if (hit) { ev.waitUntil(net); return hit; }
  return (await net) || Response.error();
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (req.mode === "navigate") { e.respondWith(networkFirst(req)); return; }
  const same = url.origin === self.location.origin;
  const fonts = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (same || fonts) e.respondWith(cacheFirst(req, e));
});
