import { id } from "../selectors";
import { OpenModal, CloseModal } from "../Modal";
import { GenericPost } from "../network";
import FormHTML from "./index.html";
export function volunteer() {
  OpenModal(FormHTML);
  id("form_container").addEventListener("submit", event => {
    event.preventDefault();
    if (id("form_container").classList.contains("submitted")) return;
    id("form_container").classList.add("submitted");
    id("submit").classList += " is-loading";
    GenericPost(process.env.BACKEND_URI + "volunteer", {
      name: id("name").value,
      email: id("email").value,
      phone: id("phone").value,
      type: id("volunteer_type").value,
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
        id("submit").classList = "button is-success";
        id("submit").innerHTML = `<span class="icon is-small">
            <i class="fas fa-check"></i>
         </span>
        <span>Saved</span>`;
      }
    });
  });
}
