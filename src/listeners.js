import { id, cls } from "./selectors";
import { order } from "./OrderForm";
import { volunteer } from "./VolunteerForm";
id("order_init").addEventListener("click", order);
id("volunteer_init").addEventListener("click", volunteer);
document.querySelector("body").addEventListener("click", event => {
  const target = event.target;
  if (target.classList.contains("navbar-item")) {
    const tab = target.getAttribute("data-href");
    Array.from(cls("tab")).forEach(el => {
      el.classList.remove("active");
    });
    document.querySelector(tab).classList += " active";
    document.querySelector(".burger").click();
  }
});
