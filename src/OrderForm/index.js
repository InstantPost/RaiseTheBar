import { id } from "../selectors";
import { OpenModal, CloseModal } from "../Model";
import { GenericPost } from "../network";
import FormHTML from "./index.html";
export function order() {
  OpenModal(FormHTML);
  id("order_container").addEventListener("submit", event => {
    event.preventDefault();
    if (id("order_container").classList.contains("submitted")) return;
    id("order_container").classList.add("submitted");
    id("order_submit").classList += " is-loading";
    GenericPost(process.env.BACKEND_URI + "order", {
      name: id("name").value,
      email: id("email").value,
      phone: id("phone").value,
      quantity: id("order_quantity").value,
      city: id("city").value,
      city_pin: id("city_pin").value,
      public_data: {
        name: id("name_pref").checked,
        email: id("email_pref").checked,
        phone: id("phone_pref").checked,
        city: id("city_pref").checked,
        city_pin: id("city_pin_pref").checked
      }
    }).then(response => {
      if (response.status == 200) {
        id("order_submit").classList = "button is-success";
        id("order_submit").innerHTML = `<span class="icon is-small">
            <i class="fas fa-check"></i>
         </span>
        <span>Saved</span>`;
      }
    });
  });
  id("order_cancel").addEventListener("click", CloseModal);
}