import axios from "axios";
import { API_URL } from "../utils/constants/constants";
import { store } from "../redux/store";
import { signOut } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const getUser = () => {
  return store.getState()?.user?.user ? store.getState()?.user?.user : null;
};
// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    //@ts-ignore
    const token = getUser()?.token;

    config.headers["authorization"] = token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
