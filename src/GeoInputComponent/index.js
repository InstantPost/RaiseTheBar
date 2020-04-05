import Template from "./index.html";
import { id } from "../selectors";
export function InitGeoInput(container_id) {
  let div = document.createElement("div");
  div.classList = "columns is-multiline is-mobile";
  div.innerHTML = Template;
  id(container_id).prepend(div);
  id("city_pin").addEventListener("input", (event) => {
    const value = event.target.value;
    if (value.length == 6) {
      fetch(process.env.PINCODE_API + value + "/")
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          } else {
            throw "There was something wrong, Please try after some time";
          }
        })
        .then((json) => {
          if (json.length) {
            let select = id("city");
            select.disabled = false;
            select.innerHTML = "";
            for (let i = 0; i < json.length; i++) {
              let option = document.createElement("option");
              let obj = json[i];
              let area = obj.data.office_name;
              area = area.split(" ");
              area.pop();
              area = area.join(" ");
              option.value = area;
              option.innerText = area;
              select.appendChild(option);
            }
          } else {
            throw "No such pincode record";
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
  });
}
