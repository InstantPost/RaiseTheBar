import { id, cls } from "./selectors";
import { order } from "./OrderForm";
import { volunteer } from "./VolunteerForm";
import { commodities } from "./CommoditiesForm";
import { printers } from "./PrintersForm";
import { doctor } from "./DoctorsForm";
import { CloseModal } from "./Modal";
import { ViewImg } from "./ImgViewer";
import { filter } from "./FilterData";
id("order_init").addEventListener("click", order);
id("doctor_init").addEventListener("click", doctor);
id("volunteer_init").addEventListener("click", volunteer);
id("commodity_init").addEventListener("click", commodities);
id("printer_init").addEventListener("click", printers);
id("remove_vol_prompt").addEventListener("click", e => {
  id("vol_prompt").remove();
});
document.querySelector("body").addEventListener("wheel", event => {
  const target = event.target;
  if (target.classList.contains("obj_img")) {
    if (event.deltaX) {
      return;
    }
    if (event.deltaY > 0) target.parentNode.scrollLeft += 50;
    else target.parentNode.scrollLeft -= 50;
  }
});
document.querySelector("body").addEventListener("click", event => {
  const target = event.target;
  if (target.classList.contains("filter_table_data")) {
    filter(target);
  }
  if (target.classList.contains("form_cancel")) {
    CloseModal();
  }
  if (target.classList.contains("obj_img")) {
    ViewImg(target.getAttribute("src"));
  }
  if (target.classList.contains("navbar-item")) {
    const tab = target.getAttribute("data-href");
    if (!tab) return;
    Array.from(cls("navbar-item")).forEach(el => {
      el.classList = "navbar-item is-white has-text-grey";
    });
    target.classList = "navbar-item is-white has-text-primary";
    Array.from(cls("tab")).forEach(el => {
      el.classList.remove("active");
    });
    document.querySelector(tab).classList += " active";
    document.querySelector(".burger").click();
  }
});
