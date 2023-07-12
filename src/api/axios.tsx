import axios from "axios";
import { API_URL } from "../utils/constants/constants";
import { store } from "../redux/store";
import { ErrorHandler } from "../utils/helpers";

export const getToken = () => {
  console.log("store.getState()", store.getState());
  return store.getState()?.user?.user?.token
    ? store.getState()?.user?.user?.token
    : null;
};
// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = getToken();
    console.log("token", token);
    config.headers["authorization"] = token;
    return config;
  },
  (error) => {
    ErrorHandler(error);
    Promise.reject(error);
  }
);

export default axiosInstance;
