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
    new RegExp("https://use.fontawesome.com/releases/v5.7.0/css/all.css"),
    new workbox.strategies.CacheFirst({
      networkTimeoutSeconds: 3,
      cacheName: "libraries_cache",
    })
  );
  workbox.routing.registerRoute(
    new RegExp("https://www.google.com/recaptcha/api.js"),
    new workbox.strategies.CacheFirst({
      networkTimeoutSeconds: 3,
      cacheName: "libraries_cache",
    })
  );
  workbox.routing.registerRoute(
    new RegExp(".+/covid_img_store/.+"),
    new workbox.strategies.CacheFirst({
      cacheName: "uploaded_image_cache",
    })
  );
  workbox.routing.registerRoute(
    new RegExp(".+/volunteer/"),
    new workbox.strategies.NetworkFirst({
      networkTimeoutSeconds: 3,
      cacheName: "volunteer_cache",
    })
  );
  workbox.routing.registerRoute(
    new RegExp(".+/doctor/"),
    new workbox.strategies.NetworkFirst({
      networkTimeoutSeconds: 3,
      cacheName: "doctor_cache",
    })
  );
  workbox.routing.registerRoute(
    new RegExp(".+/commodity/"),
    new workbox.strategies.NetworkFirst({
      networkTimeoutSeconds: 3,
      cacheName: "commodity_cache",
    })
  );
  workbox.routing.registerRoute(
    new RegExp(".+/volunteer/"),
    new workbox.strategies.NetworkFirst({
      networkTimeoutSeconds: 3,
      cacheName: "volunteer_cache",
    })
  );
  workbox.routing.registerRoute(
    new RegExp(".+/printer/"),
    new workbox.strategies.NetworkFirst({
      networkTimeoutSeconds: 3,
      cacheName: "printer_cache",
    })
  );
  workbox.routing.registerRoute(
    new RegExp(".+/manufacturer/"),
    new workbox.strategies.NetworkFirst({
      networkTimeoutSeconds: 3,
      cacheName: "manufacturer_cache",
    })
  );
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
