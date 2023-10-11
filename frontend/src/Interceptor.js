import axios from "axios";

axios.interceptors.request.use(function (config) {
  // Get the token from local storage and set it in the request headers
  const token = localStorage.getItem("token");
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // Any status code that lies within the range of 2xx will trigger this function
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that fall outside the range of 2xx will trigger this function
  // Do something with response error
  return Promise.reject(error);
});

export default axios;