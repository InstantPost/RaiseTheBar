import { Authenticate } from "../Auth";
import { id, $ } from "../selectors";
import { ParseJWT } from "../utils";
import EditTemplate from "./edit_card.html";
import { OpenModal, OpenSpinner, CloseSpinner, CloseModal } from "../Modal";
function PUTRequest(data, entity) {
  return fetch(`${process.env.BACKEND_URI}${entity}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: data
  });
}
function edit(ID) {
  OpenSpinner();
  const entity = id(ID).getAttribute("data-entity");
  const token = localStorage.getItem("token");
  const TokenData = ParseJWT(token);
  fetch(`${process.env.BACKEND_URI}${entity}/?id=${ID}`, {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(e => {
      if (e.status == 401) {
        CloseSpinner();
        alert("You are not Authorized to do that");

        throw "error";
      }
      return e.json();
    })
    .then(json => {
      CloseSpinner();
      OpenModal(EditTemplate);
      id("name").value = json.data.name;
      id("phone").value = json.data.phone;
      id("email").value = json.data.email;
      id("description").value = json.data.description;
      let form = new FormData();
      let data = {
        id: json.id
      };
      $("#modal #delete")[0].addEventListener("click", e => {
        data.status = 50;
        form.append("data", JSON.stringify(data));
        e.target.classList += " is-loading";
        PUTRequest(form, entity)
          .then(res => {
            if (res.status == 200) {
              e.target.innerHTML = "Deleted";
              e.target.classList = "button is-success is-small";
              setTimeout(CloseModal, 1000);
              $(`[id="${json.id}"]`)[0].remove();
            } else {
              alert("There was some error deleting");
              throw "Error";
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
      $("#modal #complete")[0].addEventListener("click", e => {
        data.status = 20;
        console.log(data, entity);
        form.append("data", JSON.stringify(data));
        e.target.classList += " is-loading";
        PUTRequest(form, entity)
          .then(res => {
            if (res.status == 200) {
              e.target.innerHTML = "Saved";
              e.target.classList = "button is-success is-small";
              setTimeout(CloseModal, 1000);
              $(`[id="${json.id}"]`)[0].remove();
            } else {
              alert("There was some error deleting");
              throw "Error";
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
      if (TokenData.role == 20) {
        $("#modal .input").forEach(el => (el.disabled = true));
        let button = document.createElement("button");
        button.innerText = "Ban";
        button.classList = "button is-warning is-small";
        button.setAttribute("type", "button");
        button.addEventListener("click", () => {
          button.classList += " is-loading";
          data.status = 40;
          form.append("data", JSON.stringify(data));
          PUTRequest(form, entity)
            .then(res => {
              if (res.status == 200) {
                button.innerHTML = "Saved";
                button.classList = "button is-success is-small";
                setTimeout(CloseModal, 1000);
                $(`[id="${json.id}"]`)[0].remove();
              } else {
                alert("There was some error deleting");
                throw "Error";
              }
            })
            .catch(err => {
              console.log(err);
            });
        });
        $("#modal .submit")[0].style.display = "none";
        $("#modal .edit-action-container")[0].appendChild(button);
      }
      $("#modal form")[0].addEventListener("submit", e => {
        console.log(e);
        e.preventDefault();
        data.description = id("description").value;
        form.append("data", JSON.stringify(data));
        const num_images = id("images").files.length;
        if (num_images + json.data.images.length > 10) {
          alert(`Only 10 Images are allowed ${num_images} are already present`);
          return;
        }
        if (num_images) {
          for (let i = 0; i < num_images; i++) {
            form.append("files[]", id("images").files[i]);
          }
        }
        $("#modal #submit")[0].classList += " is-loading";
        PUTRequest(form, entity)
          .then(e => {
            if (e.status == 200) {
              return e.json();
            }
            if (e.status == 401) {
              alert("You are not authorized to do that");
              throw "Error";
            } else {
              alert("Some internal server error please try later");
              throw "Error";
            }
          })
          .then(() => {
            $(`[id='${json.id}'] .obj-details-desc`)[0].innerHTML = id(
              "description"
            ).value;
            $("#modal #submit")[0].classList = "button is-success";
            $("#modal #submit")[0].innerHTML = "Saved";
            setTimeout(() => {
              CloseModal();
            }, 1000);
          })
          .catch(err => console.log(err));
      });
      console.log(json);
    })
    .catch(err => {
      CloseSpinner();
      console.log(err);
    });
}
export function EditCard(element) {
  const AuthPhone = element.getAttribute("data-auth");
  Authenticate(AuthPhone, {
    func: edit,
    args: element.getAttribute("data-id")
  });
}
