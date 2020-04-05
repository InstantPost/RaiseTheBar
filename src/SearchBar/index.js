import { id } from "../selectors";
export function search(event) {
  const element = event.target;
  //   element.classList += " is-loading";
  let i = 0,
    obj;
  const entity = element.getAttribute("data-entity");
  const value = element.value.toUpperCase();
  const Objs = document.querySelectorAll(`[data-entity="${entity}"].data-row`);
  const ObjsLen = Objs.length;
  for (; i < ObjsLen; i++) {
    obj = Objs[i];
    let obj_pin = obj.querySelector("[data-specific='pincode']").innerText;
    let obj_city = obj.querySelector("[data-specific='region']").innerText;
    if (
      obj_pin.indexOf(value) > -1 ||
      obj_city.toUpperCase().indexOf(value) > -1
    )
      obj.style.display = "";
    else obj.style.display = "none";
  }
  //   element.classList.remove("is-loading");
}
