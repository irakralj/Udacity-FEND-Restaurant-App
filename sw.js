var staticCacheName = 'review-cache-v1';
// installation of service worker
self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open('review-cache-v1').then(function (cache) {
			return cache.addAll([
				'/',
        'index.html',
				'restaurant.html'
				'css/styles.css',
        'js/dbhelper.js',
				'js/main.js',
				'js/restaurant_info.js',
				'img/1.jpg',
				'img/2.jpg',
				'img/3.jpg',
				'img/4.jpg',
				'img/5.jpg',
				'img/6.jpg',
				'img/7.jpg',
				'img/8.jpg',
				'img/9.jpg',
				'img/10.jpg',
			]);
		})
	);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // repository clone
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check for valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // repository clone
            var responseToCache = response.clone();

            caches.open(staticCacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
