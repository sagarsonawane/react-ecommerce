import axios from "axios";
import { toast } from "react-toastify";

//create an axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5231/api",
  timeout: 5000
});

//request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(!error.response) 
    {
        toast.error("Network Error");
        return new Promise(() => {});
    }
    if (error.response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    } 
    else if(error.response.status >= 500)
    {
        toast.error("Server Error. Try again later");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;