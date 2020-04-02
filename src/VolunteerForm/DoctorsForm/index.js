import { id } from "../selectors";
import { OpenModal, CloseModal } from "../Modal";
import FormHTML from "./index.html";
import { AddObj } from "../AddObj";
export function doctor() {
  OpenModal(FormHTML);
  id("form_container").addEventListener("submit", event => {
    event.preventDefault();
    let data = {
      name: id("name").value,
      email: id("email").value,
      phone: id("phone").value,
      city: id("city").value,
      city_pin: id("city_pin").value,
      description: id("description").value,
      public_data: {
        name: id("name_pref").checked,
        email: id("email_pref").checked,
        phone: id("phone_pref").checked,
        city: id("city_pref").checked,
        city_pin: id("city_pin_pref").checked,
        description: id("desc_pref").checked
      }
    };
    let form = new FormData();
    form.append("data", JSON.stringify(data));
    const num_images = document.getElementById("images").files.length;
    console.log(num_images);
    if (num_images > 10) {
      alert("Only 10 Images are allowed");
      return;
    }
    if (num_images) {
      for (let i = 0; i < num_images; i++) {
        form.append("files[]", document.getElementById("images").files[i]);
      }
    }
    if (id("form_container").classList.contains("submitted")) return;
    id("form_container").classList.add("submitted");
    id("submit").classList += " is-loading";
    fetch(process.env.BACKEND_URI + "doctor/", {
      method: "post",
      body: form
    })
      .then(response => {
        if (response.status == 200) {
          id("submit").classList = "button is-success";
          id("submit").innerHTML = `<span class="icon is-small">
            <i class="fas fa-check"></i>
         </span>
        <span>Saved</span>`;
          setTimeout(CloseModal, 1500);
          return response.json();
        } else {
          alert("There was some problem please check after some time");
          throw "Error";
        }
      })
      .then(json => {
        console.log(json);
        AddObj(json.data, "doctors_data", "doctor");
      })
      .catch(err => {});
    /*GenericPost(process.env.BACKEND_URI + "volunteer", {
      name: id("name").value,
      email: id("email").value,
      phone: id("phone").value,
      type: id("volunteer_type").value,
      city: id("city").value,
      city_pin: id("city_pin").value,
      description: id("description").value,
      public_data: {
        name: id("name_pref").checked,
        email: id("email_pref").checked,
        phone: id("phone_pref").checked,
        city: id("city_pref").checked,
        city_pin: id("city_pin_pref").checked
      }
    }).then(response => {
      if (response.status == 200) {
        id("volunteer_submit").classList = "button is-success";
        id("volunteer_submit").innerHTML = `<span class="icon is-small">
            <i class="fas fa-check"></i>
         </span>
        <span>Saved</span>`;
      }
    });*/
  });
}
