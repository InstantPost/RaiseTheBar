import Template from "./template.html";
import { id } from "./selectors";
import { urlify } from "./utils/urlify";
export function AddObj(obj, target, entity) {
  let row = document.createElement("div");
  row.classList = "data-row box";
  row.innerHTML = Template;
  const date = new Date(obj.created);
  row.getElementsByClassName("obj-details-table")[0].innerHTML += `
          <div>
                <b>Name : </b><span>${obj.data.name}</span>
            </div>
            <div>
                <b>Email : </b><span data=${entity} data-filter-by="email" class="link filter_table_data">${obj.data.email}</span>
            </div>
            <div>
                <b>Phone : </b><span data=${entity}  class="link filter_table_data" data-filter-by="phone">${obj.data.phone}</span>
            </div>
            <div>
                <b>City : </b><span data=${entity}  class="link filter_table_data" data-filter-by="city">${obj.data.city}</span>
            </div>
            <div>
                <b>Pincode : </b><span data=${entity}  class="link filter_table_data" data-filter-by="city_pin">${obj.data.city_pin}</span>
            </div>
        `;
  row.getElementsByClassName("obj-details-desc")[0].innerHTML += urlify(
    obj.data.description
  );
  row.getElementsByClassName(
    "obj-created-time"
  )[0].innerHTML = date.toISOString().substring(0, 10);
  const imgs = obj.data.images;
  let ImgsContainer = row.getElementsByClassName("obj-details-photos")[0];
  if (imgs.length) {
    const num_img = imgs.length;
    for (let i = 0; i < num_img; i++) {
      let div = document.createElement("div");
      let raw_img_html = `
              <img class="obj_img" src="${process.env.FILE_STORE}${obj.id}/${imgs[i]}"/>
             
            `;
      div.innerHTML = raw_img_html;
      console.log(ImgsContainer);
      ImgsContainer.appendChild(div);
    }
  } else {
    ImgsContainer.innerHTML = "No Images attached!";
  }
  id(target).prepend(row);
}
