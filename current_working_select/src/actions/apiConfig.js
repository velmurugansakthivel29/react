import axios from 'axios';
const fetchClient = () => {
  const defaultOptions = {
      //baseURL: "https://www.useeshop.in/api",
      //baseURL: "http://localhost:4044/api",
      baseURL: "http://18.144.74.40:4044/api",
      headers: {
          'Content-Type': 'application/json'
      }
  }
  const HTTP = axios.create(defaultOptions)
  HTTP.interceptors.request.use(function (config) {
     const token = localStorage.getItem('tt');
     if (token)
      config.headers.authtoken =  token;
     return config;
   });
   HTTP.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
  return HTTP;
}
export const HTTP = fetchClient();
