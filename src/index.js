require("./main.scss");
import * as nav from "./nav";
import * as img from "./img";
import * as listener from "./listeners";
import { id } from "./selectors";
import { LoadVolunteers } from "./Volunteers";
import { LoadCommodities } from "./Commodities";
import { LoadPrinters } from "./Printers";
import { LoadDoctors } from "./Doctors";
import { LoadRequirements } from "./Requirements";
import { LoadManufacturers } from "./Manufacturers";
import { uuid } from "./utils/uuid";
import { ExpandView } from "./ExpandView";
import { ActVol } from "./ActVol";
import { Graph } from "./Graph";
import { isAuthenticated } from "./Auth";
window.onload = e => {
  LoadVolunteers();
  LoadCommodities();
  LoadPrinters();
  LoadDoctors();
  LoadRequirements();
  LoadManufacturers();
  ExpandView();
  ActVol();
  Graph();
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
        fetch(process.env.BACKEND_URI + "location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            longitude: longitude,
            latitude: latitude,
            sid: sid
          })
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  if (isAuthenticated()) {
    console.log("In");
    id("logout_btn").style.display = "block ";
    id("login_btn").style.display = "none";
  }
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(`/raisethebar/sw.js?${Math.random()}`)
      .then(registration => {
        console.log("SW registered: ", registration);
      })
      .catch(registrationError => {
        console.log(registrationError);
      });
  }
};
