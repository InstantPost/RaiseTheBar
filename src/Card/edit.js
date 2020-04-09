import { Authenticate } from "../Auth";
import { id } from "../selectors";

function edit(selector) {
  const entity = id(selector).getAttribute("data-entity");
  console.log(entity);
}
export function EditCard(element) {
  const AuthPhone = element.getAttribute("data-auth");
  Authenticate(AuthPhone, {
    func: edit,
    args: element.getAttribute("data-id"),
  });
}
