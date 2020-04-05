import { id, cls } from "./selectors";
import { order } from "./OrderForm";
import { volunteer } from "./VolunteerForm";
import { commodities } from "./CommoditiesForm";
import { printers } from "./PrintersForm";
import { requirement } from "./RequirementsForm";
import { manufacturer } from "./ManufacturersForm";
import { doctor } from "./DoctorsForm";
import { CloseModal } from "./Modal";
import { ViewImg } from "./ImgViewer";
import { filter } from "./FilterData";
import { search } from "./SearchBar";
id("search_input").addEventListener("input", search);
id("order_init").addEventListener("click", order);
id("doctor_init").addEventListener("click", doctor);
id("volunteer_init").addEventListener("click", volunteer);
id("commodity_init").addEventListener("click", commodities);
id("printer_init").addEventListener("click", printers);
id("requirement_init").addEventListener("click", requirement);
id("manufacturer_init").addEventListener("click", manufacturer);
document.querySelector("body").addEventListener("wheel", (event) => {
  const target = event.target;
  if (target.classList.contains("obj_img")) {
    if (event.deltaX) {
      return;
    }
    if (event.deltaY > 0) target.parentNode.scrollLeft += 50;
    else target.parentNode.scrollLeft -= 50;
  }
});
document.querySelector("body").addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("filter_table_data")) {
    filter(target);
  }
  if (target.classList.contains("form_cancel")) {
    CloseModal();
  }
  if (target.classList.contains("obj_img")) {
    ViewImg(target);
  }
  if (target.classList.contains("navbar-item")) {
    const tab = target.getAttribute("data-href");
    if (!tab) return;
    if (tab == "home") id("search_input_container").style.display = "none";
    else id("search_input_container").style.display = "flex";
    Array.from(cls("navbar-item")).forEach((el) => {
      el.classList = "navbar-item is-white has-text-grey";
    });
    target.classList = "navbar-item is-white has-text-primary active-tab-link";
    Array.from(cls("tab")).forEach((el) => {
      el.classList.remove("active");
    });
    id("search_input").setAttribute("data-entity", tab);
    document.querySelector(`#${tab}`).classList += " active";
    document.querySelector(".burger").click();
  }
});
