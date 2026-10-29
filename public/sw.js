// MooKwai offline support.
// - Pages: network first, fall back to the cached app shell when offline.
// - Hashed build assets, icons, fonts: cache first (their URLs change when content does).
const CACHE = 'mookwai-v1'
const SCOPE = self.registration.scope
const SHELL = [SCOPE, `${SCOPE}manifest.webmanifest`, `${SCOPE}icons/icon-192.png`]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(SCOPE, copy))
          }
          return res
        })
        .catch(() => caches.match(SCOPE))
    )
    return
  }

  const cacheable = (url.href.startsWith(SCOPE) && /\/(assets|icons)\//.test(url.pathname))
    || url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com'
  if (!cacheable) return

  event.respondWith(
    caches.match(request).then((hit) => hit || fetch(request).then((res) => {
      if (res.ok || res.type === 'opaque') {
        const copy = res.clone()
        caches.open(CACHE).then((c) => c.put(request, copy))
      }
      return res
    }))
  )
})
