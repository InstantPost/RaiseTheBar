require("./main.scss");
import * as nav from "./nav";
import * as img from "./img";
import * as listener from "./listeners";
import { GenericPost } from "./network";
import { LoadVolunteers } from "./Volunteers";
import { LoadCommodities } from "./Commodities";
import { LoadPrinters } from "./Printers";
import { LoadDoctors } from "./Doctors";
import { uuid } from "./utils/uuid";
window.onload = e => {
  LoadVolunteers();
  LoadCommodities();
  LoadPrinters();
  // LoadDoctors();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        let sid = localStorage.getItem("sid");
        if (!sid) {
          sid = uuid();
          localStorage.setItem("sid", sid);
        }
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        GenericPost(process.env.BACKEND_URI + "location", {
          longitude: longitude,
          latitude: latitude,
          sid: sid
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
