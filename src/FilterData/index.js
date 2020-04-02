import { OpenModal } from "../Modal";
import FilterDataTemplate from "./index.html";
import { id } from "../selectors";
import { AddObj } from "../AddObj";
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
        AddObj(objs[i], "filtered_data");
      }
    })
    .catch(err => {
      console.log(err);
    });
}
