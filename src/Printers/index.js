import { AddObj } from "../AddObj";
export function LoadPrinters() {
  fetch(process.env.BACKEND_URI + "printer/")
    .then(res => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error("There was some problem");
      }
    })
    .then(objs => {
      let i = 0,
        obj;
      let num_objs = objs.length;
      objs.reverse();
      for (; i < num_objs; i++) {
        obj = objs[i];
        AddObj(obj, "printers_data", "printer");
      }
    })
    .catch(error => {
      console.log(error);
    });
}
