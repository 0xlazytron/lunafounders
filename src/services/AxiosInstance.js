import axios from "axios";
import { store } from "../store/store";

const axiosInstance = axios.create({
  baseURL: "https://api.lunafounder.io/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
