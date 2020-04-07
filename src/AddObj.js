import Template from "./template.html";
import { id } from "./selectors";
import utils from "./utils";
import PdfIcon from "./assets/pdf_logo.png";
export function AddObj(obj, target, entity) {
  id(target).innerHTML += "";
  let row = document.createElement("div");
  row.id = obj.id;
  row.setAttribute("data-entity", entity);
  row.classList = "data-row box databox";
  row.innerHTML = Template;
  const date = new Date(obj.created);
  row.querySelector(".obj-category").innerHTML =
    "category" in obj.data ? obj.data.category : "";
  row.getElementsByClassName("obj-details-table")[0].innerHTML += `
            <div>
                <span class="filter_table_data obj_data_private">${
                  obj.data.name
                }</span>
            </div>
            
            <div>
                <span data=${entity} data-filter-by="email" class="link filter_table_data ${
    obj.data.public_data["email"] ? "" : "obj_data_private"
  }">${
    obj.data.public_data["email"] ? obj.data.email : "Email not disclosed"
  }</span>
            </div>
            <div>
                <span data=${entity}  class="link filter_table_data ${
    obj.data.public_data["phone"] ? "" : "obj_data_private"
  }"data-filter-by="phone">${
    obj.data.public_data["phone"] ? obj.data.phone : "Phone not disclosed"
  }</span>
            </div>
            <div>
                <span data-specific="region" data=${entity}  class="link filter_table_data ${
    obj.data.public_data["city"] ? "" : "obj_data_private"
  }" data-filter-by="city">${
    obj.data.public_data["city"] ? obj.data.city : "City not disclosed"
  }</span>
            </div>
            <div>
                <span data-specific="pincode" data=${entity} class="link filter_table_data  ${
    obj.data.public_data["city_pin"] ? "" : "obj_data_private"
  }" data-filter-by="city_pin">${
    obj.data.public_data["city_pin"]
      ? obj.data.city_pin
      : "Pincode not disclosed"
  }</span>
            </div>
        `;
  let desc = utils.urlify(obj.data.description);
  desc = utils.boldText(desc);
  row.getElementsByClassName("obj-details-desc")[0].innerHTML += desc;
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
      if (typeof imgs[i] == "object") {
        img.src = PdfIcon;
        img.setAttribute("extension", imgs[i].ext);
        img.setAttribute("id", imgs[i].id);
        img.setAttribute(
          "data-src",
          `${process.env.FILE_STORE}${obj.id}/${imgs[i].id}`
        );
        console.log(imgs[i]);
      } else {
        img.src = `${process.env.FILE_STORE}${obj.id}/${imgs[i]}`;
      }
      ImgsContainer.appendChild(img);
    }
  } else {
    ImgsContainer.innerHTML = "No Images attached!";
  }
  id(target).prepend(row);
}
