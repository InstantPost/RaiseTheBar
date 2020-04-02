import { AddObj } from "../AddObj";
export function LoadCommodities() {
  fetch(process.env.BACKEND_URI + "commodity/")
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
        AddObj(objs[i], "commodities_data", "commodity");
      }
    })
    .catch(error => {
      console.log(error);
    });
}
