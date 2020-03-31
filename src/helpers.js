import { id } from "./selectors";
export function GetPrivacyPrefs() {
  return {
    email: id("email_pref").checked,
    phone: id("phone_pref").checked
  };
}
