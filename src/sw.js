importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

if (workbox) {
  console.log(workbox.stategies, workbox);
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { skipWaiting, clientsClaim } from "workbox-core";
const env = "dev";
let API;
if (env == "dev") {
  API = "http://localhost:2000/";
} else {
  API = "https://instantpost.org/covid/api/";
}
skipWaiting();
clientsClaim();
registerRoute(
  new RegExp(".+/volunteer/.+"),
  new StaleWhileRevalidate({
    cacheName: "static-resources"
  })
);
precacheAndRoute(self.__WB_MANIFEST);
registerRoute(
  /\.(?:png|gif|jpg|svg)$/,
  new CacheFirst({
    cacheName: "images-cache"
  })
);
registerRoute(
  /\.(?:js|css)$/,
  new StaleWhileRevalidate({
    cacheName: "static-resources"
  })
);
registerRoute(/.*(?:googleapis|gstatic)\.com.*$/, new StaleWhileRevalidate());
registerRoute(
  new RegExp(API + "volunteer/.+"),
  new StaleWhileRevalidate({
    cacheName: "volunteer"
  })
);
registerRoute(
  new RegExp(API + "doctor/.+"),
  new StaleWhileRevalidate({
    cacheName: "doctor"
  })
);
registerRoute(
  new RegExp(".+/printer/.+"),
  new StaleWhileRevalidate({
    cacheName: "printer"
  })
);
registerRoute(
  new RegExp(API + "commodity/.+"),
  new StaleWhileRevalidate({
    cacheName: "commodity"
  })
);
