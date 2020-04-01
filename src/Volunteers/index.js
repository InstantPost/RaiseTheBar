import { id, cls } from "../selectors";
export function LoadVolunteers() {
  fetch(process.env.BACKEND_URI + "volunteer")
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
        let row = document.createElement("tr");
        row.innerHTML += `
        <td>${obj.data.name}</td>
        <td>${obj.data.email}</td>
        <td>${obj.data.phone}</td>
        <td>${obj.data.city}</td>
        `;
        id("volunteers_data").appendChild(row);
      }
    })
    .catch(error => {
      console.log(error);
    });
}
