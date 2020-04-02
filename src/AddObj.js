import Template from "./template.html";
import { id } from "./selectors";
import { urlify } from "./utils/urlify";
export function AddObj(obj, target, entity) {
  id(target).innerHTML += "";
  let row = document.createElement("div");
  row.classList = "data-row box";
  row.innerHTML = Template;
  const date = new Date(obj.created);
  row.getElementsByClassName("obj-details-table")[0].innerHTML += `
          <div>
                <span >${obj.data.name}</span>
            </div>
            <div>
                <span data=${entity} data-filter-by="email" class="link filter_table_data">${obj.data.email}</span>
            </div>
            <div>
                <span data=${entity}  class="link filter_table_data" data-filter-by="phone">${obj.data.phone}</span>
            </div>
            <div>
                <span data=${entity}  class="link filter_table_data" data-filter-by="city">${obj.data.city}</span>
            </div>
            <div>
                <span data=${entity}  class="link filter_table_data" data-filter-by="city_pin">${obj.data.city_pin}</span>
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
      let img = document.createElement("img");
      img.classList = "obj_img";
      img.src = `${process.env.FILE_STORE}${obj.id}/${imgs[i]}`;
      ImgsContainer.appendChild(img);
    }
  } else {
    ImgsContainer.innerHTML = "No Images attached!";
  }
  id(target).prepend(row);
}
