import { OpenModal } from "../Modal";
import FilterDataTemplate from "./index.html";
import { id } from "../selectors";
import { AddObj } from "../AddObj";
export function filter(element) {
  if (element.classList.contains("obj_data_private")) return;
  const endpoint = element.getAttribute("data");
  const FilterBy = element.getAttribute("data-filter-by");
  const FilterValue = element.innerText;
  console.log(FilterBy, FilterValue);
  fetch(`${process.env.BACKEND_URI}${endpoint}/`)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        alert("Error fetching results");
        throw new Error("..");
      }
    })
    .then((objs) => {
      objs.reverse();
      OpenModal(FilterDataTemplate);
      objs = objs.filter((elem) => {
        return elem.data[FilterBy] == FilterValue;
      });
      let FilterTitle = "";
      if (endpoint == "doctor") {
        FilterTitle += "Requirements by Doctor";
      } else if (endpoint == "printer") {
        FilterTitle += "Manufacturer";
      } else if (endpoint == "commodity") {
        FilterTitle += "Commodity requirements ";
      } else if (endpoint == "volunteer") {
        FilterTitle += "Volunteers ";
      }
      if (FilterBy == "city" || FilterBy == "city_pin") {
        FilterTitle += " in ";
      } else {
        FilterTitle += " by ";
      }
      FilterTitle += FilterValue;
      id("filter-title").innerHTML = FilterTitle;
      let i = 0,
        obj;
      const num_objs = objs.length;
      for (; i < num_objs; i++) {
        AddObj(objs[i], "filtered_data");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
