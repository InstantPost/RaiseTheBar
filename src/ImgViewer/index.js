import { id } from "../selectors";
import { OpenModal } from "../Modal";
export function ViewImg(obj, img) {
  OpenModal(`<img class="" src=${process.env.FILE_STORE + obj + "/" + img}>`);
  fetch(process.env.FILE_STORE + `${obj}/${img}`).catch(e => {
    console.log(e);
  });
}
