import { id } from "../selectors";
import { OpenModal, CloseModal } from "../Model";
import { GenericPost } from "../network";
import FormHTML from "./index.html";
export function order() {
  OpenModal(FormHTML);
  id("order_container").addEventListener("submit", event => {
    event.preventDefault();
    const email = id("order_email").value;
    const phone = id("order_phone").value;
    const quantity = id("order_quantity").value;
    if (id("order_container").classList.contains("submitted")) return;
    id("order_container").classList.add("submitted");
    id("order_submit").classList += " is-loading";
    GenericPost(process.env.BACKEND_URI + "order", {
      email: email,
      phone: phone,
      quantity: quantity
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
