export function SendOTP(phone) {
  return fetch(process.env.BACKEND_URI + "auth/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: phone,
    }),
  });
}
export function VerifyOTP(phone, otp) {
  return fetch(process.env.BACKEND_URI + "auth/verify/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: phone,
      otp: otp,
    }),
  });
}
