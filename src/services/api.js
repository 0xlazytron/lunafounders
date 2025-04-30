import axios from "axios";

// const API_URL = "https://api.lunafounder.io/api";;
const API_URL = "https://api.lunafounder.io/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const wallet = localStorage.getItem("wallet");
    if (wallet) {
      config.headers.wallet = wallet;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("wallet");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
