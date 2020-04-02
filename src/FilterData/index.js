import { OpenModal } from "../Modal";
import FilterDataTemplate from "./index.html";
import { id } from "../selectors";
import { urlify } from "../utils/urlify";
export function filter(element) {
  const endpoint = element.getAttribute("data");
  const FilterBy = element.getAttribute("data-filter-by");
  const FilterValue = element.innerText;
  console.log(
    `${process.env.BACKEND_URI}${endpoint}/?filter_by=${FilterBy}&filter_val=${FilterValue}`
  );
  fetch(
    `${process.env.BACKEND_URI}${endpoint}/?filter_by=${FilterBy}&filter_val=${FilterValue}`
  )
    .then(res => {
      if (res.status == 200) {
        return res.json();
      } else {
        alert("Error fetching results");
        throw new Error("..");
      }
    })
    .then(objs => {
      OpenModal(FilterDataTemplate);
      id(
        "filter-title"
      ).innerHTML = `Filtered results by ${FilterBy} for ${FilterValue}`;
      let i = 0,
        obj;
      const num_objs = objs.length;
      for (; i < num_objs; i++) {
        obj = objs[i];
        let row = document.createElement("tr");
        row.innerHTML += `
        <td>${obj.data.name}</td>
        <td>${obj.data.email}</td>
        <td>${obj.data.phone}</td>
        <td>${obj.data.city}</td>
        <td>${obj.data.city_pin}</td>
        <td><div class="obj_description">${
          "description" in obj.data ? urlify(obj.data.description) : ""
        }</div></td>
        <td><div class="obj_img_container"></div></td>
        `;
        const imgs = obj.data.images;
        if ("images" in obj.data) {
          const imgs = obj.data.images;
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
        id("filtered_data").appendChild(row);
      }
    })
    .catch(err => {
      console.log(err);
    });
}
