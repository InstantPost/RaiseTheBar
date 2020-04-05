import { AddObj } from "../AddObj";
export function LoadManufacturers() {
  fetch(process.env.BACKEND_URI + "manufacturer/")
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error("There was some problem");
      }
    })
    .then((objs) => {
      let i = 0,
        obj;
      let num_objs = objs.length;
      objs.reverse();
      for (; i < num_objs; i++) {
        obj = objs[i];
        AddObj(obj, "manufacturers_data", "manufacturer");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
