import { id, cls } from "./selectors";
import { order } from "./OrderForm";
import { volunteer } from "./VolunteerForm";
import { commodities } from "./CommoditiesForm";
import { CloseModal } from "./Modal";
import { ViewImg } from "./ImgViewer";
id("order_init").addEventListener("click", order);
id("volunteer_init").addEventListener("click", volunteer);
id("commodities_init").addEventListener("click", commodities);
id("remove_vol_prompt").addEventListener("click", e => {
  id("vol_prompt").remove();
});
document.querySelector("body").addEventListener("click", event => {
  const target = event.target;
  if (target.classList.contains("form_cancel")) {
    CloseModal();
  }
  if (target.classList.contains("obj_img")) {
    ViewImg(
      target.getAttribute("data-obj"),
      target.getAttribute("data-img-id")
    );
  }
  if (target.classList.contains("navbar-item")) {
    const tab = target.getAttribute("data-href");
    if (!tab) return;
    Array.from(cls("tab")).forEach(el => {
      el.classList.remove("active");
    });
    document.querySelector(tab).classList += " active";
    document.querySelector(".burger").click();
  }
});
