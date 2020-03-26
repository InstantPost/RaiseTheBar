import { id } from "../selectors";

export function OpenModal() {
  id("modal").classList += " is-active";
}

id("modal-close").addEventListener("click", () => {
  id("modal").classList.remove("is-active");
});
id("modal-background").addEventListener("click", () => {
  id("modal").classList.remove("is-active");
});
export function CloseModal() {}
