import { id } from "./selectors";
export function VerifyCaptch(response) {
  id("captcha").setAttribute("response", response);
  id("submit").disabled = false;
}
