import { id } from "../selectors";
import { OpenModal, CloseModal } from "../Model";
import { GenericPost } from "../network";
import FormHTML from "./index.html";
export function volunteer() {
  OpenModal(FormHTML);
  id("volunteer_container").addEventListener("submit", event => {
    event.preventDefault();
    const email = id("volunteer_email").value;
    const phone = id("volunteer_phone").value;
    const type = id("volunteer_type").value;
    console.log(email, phone, type);
    if (id("volunteer_container").classList.contains("submitted")) return;
    id("volunteer_container").classList.add("submitted");
    id("volunteer_submit").classList += " is-loading";
    GenericPost(process.env.BACKEND_URI + "volunteer", {
      email: email,
      phone: phone,
      type: type
    }).then(response => {
      if (response.status == 200) {
        id("volunteer_submit").classList = "button is-success";
        id("volunteer_submit").innerHTML = `<span class="icon is-small">
            <i class="fas fa-check"></i>
         </span>
        <span>Saved</span>`;
      }
    });
    id("volunteer_cancel").addEventListener("click", CloseModal);
  });
}
