import { OpenModal, CloseModal } from "../Modal";
import LoginTemplate from "./login.html";
import { id } from "../selectors";
import LoginWithoutPhoneTemplate from "./login_no_phone.html";
import { GenericPOST } from "../network";
import verifyOTPTemplate from "./verify_otp.html";
function verifyAuth(phone) {
  return new Promise((resolve, reject) => {
    OpenModal(verifyOTPTemplate);
    id("login").addEventListener("submit", (event) => {
      event.preventDefault();
      document.querySelector("button").classList += " is-loading";
      GenericPOST(process.env.BACKEND_URI + "auth/verify/", {
        phone: phone,
        otp: document.querySelector("input").value,
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          } else if (res.status == 404) {
            alert("OTP is wrong");
            throw "error";
          } else {
            alert("Some internal error occured");
            throw "error";
          }
        })
        .then((data) => {
          resolve(data.token);
          document.querySelector("button").classList = "button is-success";
          document.querySelector(
            "button"
          ).innerHTML = `<span class="icon is-small">
              <i class="fas fa-check"></i>
           </span>
          <span>Verified</span>`;
        })
        .catch((err) => {
          console.log(err);
          document.querySelector("button").classList = "button is-primary";
          document.querySelector("button").innerHTML = `Verify`;
        });
    });
  });
}
function SendOTP(phone, callback = null) {
  return GenericPOST(process.env.BACKEND_URI + "auth/", { phone: phone })
    .then((res) => {
      if (res.status != 200) {
        alert("Failed to send OTP");
        CloseModal();
        throw "error";
      }
    })
    .then(() => verifyAuth(phone))
    .then((token) => {
      console.log(callback);
      if (callback) callback.func(callback.args);
    })
    .catch((err) => console.log(err));
}
export function Authenticate(phone, callback = null) {
  if (isAuthenticated()) {
    if (callback) callback.func(callback.args);
  } else {
    if (phone) {
      OpenModal(LoginTemplate);
      document.querySelector("#modal .mobile").innerHTML = phone;
      id("login").addEventListener("submit", (event) => {
        event.preventDefault();
        document.querySelector("button").classList += " is-loading";
        SendOTP(phone, callback);
      });
    } else {
      OpenModal(LoginWithoutPhoneTemplate);
      id("login").addEventListener("submit", (event) => {
        event.preventDefault();
        document.querySelector("button").classList += " is-loading";
        const phone = document.querySelector("#modal .mobile").value;
        SendOTP(phone, callback);
      });
    }
  }
}
function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (token) return true;
  else return false;
}
export function logout() {}
