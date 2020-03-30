export function GenericPost(url, data) {
  return fetch(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
}
