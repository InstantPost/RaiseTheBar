import { id } from "../selectors";

export function OpenModal(html) {
  id("modal").classList += " is-active";
  id("modal-content").innerHTML = html;
}

id("modal-close").addEventListener("click", CloseModal);
id("modal-background").addEventListener("click", CloseModal);
export function CloseModal() {
  id("modal-content").innerHTML = "";
  id("modal").classList.remove("is-active");
}
