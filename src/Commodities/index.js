import { id, cls } from "../selectors";
import { urlify } from "../utils/urlify";
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
      for (; i < num_objs; i++) {
        obj = objs[i];
        console.log(objs[i]);
        let row = document.createElement("tr");
        row.innerHTML += `
        <td>${obj.data.name}</td>
        <td><span data="commodity" data-filter-by="email" class="link filter_table_data">${
          obj.data.email
        }</span></td>
        <td><span data="commodity" data-filter-by="phone" class="link filter_table_data">${
          obj.data.phone
        }</span></td>
        <td><span data="commodity" data-filter-by="city" class="link filter_table_data">${
          obj.data.city
        }</span></td>
        <td><span data="commodity" data-filter-by="city_pin" class="link filter_table_data">${
          obj.data.city_pin
        }</span></td>
        <td><div class="obj_description">${urlify(
          obj.data.description
        )}</div></td>
        <td><div class="obj_img_container"></div></td>
        `;

        const imgs = obj.data.images;
        if (imgs.length) {
          let ImgsContainer = row.getElementsByClassName(
            "obj_img_container"
          )[0];
          const num_img = imgs.length;
          for (let i = 0; i < num_img; i++) {
            let div = document.createElement("div");
            let raw_img_html = `
              <div class="obj_img" data-obj=${obj.id} data-img-id=${
              imgs[i]
            } >${"image " + i}</div>
            `;
            div.innerHTML = raw_img_html;
            console.log(ImgsContainer);
            ImgsContainer.appendChild(div);
          }
        }
        id("commodities_data").appendChild(row);
      }
    })
    .catch(error => {
      console.log(error);
    });
}
