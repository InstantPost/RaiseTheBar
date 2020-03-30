require("./main.scss");
import * as nav from "./nav";
import * as img from "./img";
import * as listener from "./listeners";
import { GenericPost } from "./network";
window.onload = e => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        GenericPost(process.env.BACKEND_URI + "location", {
          longitude: longitude,
          latitude: latitude
        });
      },
      error => {
        console.log(error);
      }
    );
  }
};
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(registration => {
      console.log("SW registered: ", registration);
    })
    .catch(registrationError => {
      console.log(registrationError);
    });
}
