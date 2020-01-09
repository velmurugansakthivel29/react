export function genericRequest(URL, options) {
  return fetch(URL, options)
    .then((response) => {
      if (response.status === 200) {
        return response.statusText;
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
