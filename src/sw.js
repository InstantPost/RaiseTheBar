importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);
import { precacheAndRoute } from "workbox-precaching";
if (workbox) {
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
  precacheAndRoute(self.__WB_MANIFEST);
  const queue = new workbox.backgroundSync.Queue("bootstrap-failed", {
    onSync: async ({ queue }) => {
      console.log(queue);
      let entry;
      while ((entry = await queue.shiftRequest())) {
        try {
          let clone = entry.request.clone();
          let response = await fetch(clone);
          console.log(response.status);
          if (!response.ok) {
            console.log(response);
            console.log("Retrying");
            throw new Error();
          }
        } catch (e) {
          await queue.unshiftRequest(entry);
          console.log(
            "pushing back ",
            entry.request.url,
            " due to network failure"
          );
          throw {
            name: "NetworkError",
            message: "Retrying"
          };
        }
      }
    }
  });
  self.addEventListener("fetch", event => {
    const method = event.request.method;
    const url = event.request.url;
    // if (method == "GET") return;
    const promiseChain = fetch(event.request.clone())
      .then(res => {
        console.log(res.status.toString()[0] == "5");
        if (res.status.toString()[0] == "5") throw new Error("Error");
        return res;
      })
      .catch(err => {
        console.log(err);
        if (method === "POST") {
          console.log(
            "%cRequest failed and pushed to the background sync queue!",
            "color: green"
          );
          queue.pushRequest({ request: event.request });
          return new Error("Failed");
        }
        return new Error("Failed");
      })
      .catch(e => console.log(e));
    console.log(url);
    if (url != base_url + "file/")
      event.waitUntil(event.respondWith(promiseChain));
  });
}
