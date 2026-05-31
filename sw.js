var CACHE = 'xiaoyuan-v3';
var URLS = [
  '/xiaoshiyanshi/',
  '/xiaoshiyanshi/index.html',
  '/xiaoshiyanshi/default_data.json',
  '/xiaoshiyanshi/manifest.json'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(URLS);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(res) {
        return caches.open(CACHE).then(function(cache) {
          cache.put(e.request, res.clone());
          return res;
        });
      });
    })
  );
});
