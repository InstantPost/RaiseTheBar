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
    .then(volunteers => {
      let i = 0,
        volunteer;
      let num_volunteers = volunteers.length;
      for (; i < num_volunteers; i++) {
        volunteer = volunteers[i];
        console.log(volunteers[i]);
        let row = document.createElement("tr");
        row.innerHTML += `
        <td>${volunteer.data.name}</td>
        <td>${volunteer.data.email}</td>
        <td>${volunteer.data.phone}</td>
        <td>${volunteer.data.city}</td>
        `;
        id("volunteers_data").appendChild(row);
      }
    })
    .catch(error => {
      console.log(error);
    });
}
