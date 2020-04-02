import { id } from "../selectors";
import { OpenModal } from "../Modal";
export function ViewImg(src) {
  OpenModal(`<img class="" src=${src}>`);
}
