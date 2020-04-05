importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

if (workbox) {
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
  console.log(workbox.stategies, workbox);
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.routing.registerRoute(
    new RegExp(".+/pincode/.+"),
    new workbox.strategies.CacheFirst({
      networkTimeoutSeconds: 3,
      cacheName: "pincode_cache",
    })
  );
  workbox.routing.registerRoute(
    new RegExp(".+/covid_img_store/.+"),
    new workbox.strategies.CacheFirst({
      cacheName: "uploaded_image_cache",
    })
  );
  workbox.routing.registerRoute(
    new RegExp(".+/(volunteer|doctor|printer|commodity)/"),
    new workbox.strategies.NetworkFirst({
      networkTimeoutSeconds: 3,
      cacheName: "network_cache",
    })
  );
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
