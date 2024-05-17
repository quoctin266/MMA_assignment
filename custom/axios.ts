import axios from "axios";

const backendUrl = "https://6497076483d4c69925a3560d.mockapi.io/";

const instance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data ? response.data : response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response?.data ? error.response.data : error;
  }
);

export default instance;
