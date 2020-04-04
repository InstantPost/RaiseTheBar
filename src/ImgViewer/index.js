import { id } from "../selectors";
import { OpenModal } from "../Modal";
export function ViewImg(element) {
  if (element.getAttribute("extension")) {
    let a = document.createElement("a");
    a.style.display = "none";
    a.href = element.getAttribute("data-src");
    a.download =
      element.getAttribute("id") + "." + element.getAttribute("exctension");
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
  } else {
    OpenModal(`<img class="" src=${element.getAttribute("src")}>`);
  }
}
