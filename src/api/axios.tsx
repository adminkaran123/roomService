import axios from "axios";
import { API_URL } from "../utils/constants/constants";
// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = "bearer " + token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
