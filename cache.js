const VERSION = 'v1'
// 缓存
self.addEventListener('install', function(event) {
});
  
// 缓存更新
self.addEventListener('activate', function(event) {
});

// 捕获请求并返回缓存数据
self.addEventListener('fetch', function(event) {
    console.log('Handling fetch event for', event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
        if (response) {
            console.log('Found response in cache:', response);
            return response;
        }
        console.log('No response found in cache. About to fetch from network...');

        return fetch(event.request).then(function(response) {
            console.log('Response from network is:', response);
            
            caches.open(VERSION).then(function(cache) {
                return cache.add(event.request);
            })
            return response;
        }).catch(function(error) {
            console.error('Fetching failed:', error);

            throw error;
        });
        })
    );
});