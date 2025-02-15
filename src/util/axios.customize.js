import axios from "axios"

const instance= axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});
//instance.defaults.headers.common['Authorization']=AUTH_TOKEN;
instance.interceptors.request.use(function (config) {
  }, function (error) {
    return Promise.reject(error);
  });

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
export default instance; 