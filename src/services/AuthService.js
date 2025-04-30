import axios from "axios";
import { API_URL } from "../config";

const TOKEN_KEY = "token";
const EXPIRATION_KEY = "expirationTime";

const formatError = (error) => {
  if (!error) {
    return "An unknown error occurred";
  }

  if (error.response && error.response.data) {
    const { error: errorMessage, message } = error.response.data;
    return errorMessage || message || "An error occurred";
  }

  if (error.request) {
    return "No response from server";
  }

  return error.message || "An error occurred";
};

const saveTokenInLocalStorage = (token, expirationTime) => {
  if (!token || !expirationTime) {
    throw new Error("Token and expiration time are required");
  }
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRATION_KEY, expirationTime);
};

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expirationTime = localStorage.getItem(EXPIRATION_KEY);

  if (!token || !expirationTime) {
    return null;
  }

  if (new Date(expirationTime) <= new Date()) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRATION_KEY);
    return null;
  }

  return token;
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRATION_KEY);
};

const runLogoutTimer = (expirationTime) => {
  if (!expirationTime) {
    throw new Error("Expiration time is required");
  }
  const remainingTime =
    new Date(expirationTime).getTime() - new Date().getTime();
  if (remainingTime <= 0) {
    removeTokenFromLocalStorage();
    window.location.href = "/login";
    return;
  }
  setTimeout(() => {
    removeTokenFromLocalStorage();
    window.location.href = "/login";
  }, remainingTime);
};

const checkAutoLogin = () => {
  const token = getTokenFromLocalStorage();
  if (token) {
    const expirationTime = localStorage.getItem(EXPIRATION_KEY);
    if (expirationTime) {
      runLogoutTimer(expirationTime);
    }
    return token;
  }
  return null;
};

const signUp = async (email, password, username, by = "") => {
  console.log("SignUp called with:", { email, password, username, by });

  if (!email || !password || !username) {
    throw new Error("Email, password and username are required");
  }
  try {
    const requestData = {
      username,
      email,
      password,
      by,
    };
    console.log("Sending request with data:", requestData);

    const response = await axios({
      method: "post",
      url: `${API_URL}/auth/register`,
      data: requestData,
      headers: {
        "Content-Type": "application/json",
        "X-Privy-App-Secret": process.env.REACT_APP_PRIVY_APP_SECRET,
      },
    });

    console.log("Response received:", response.data);

    if (response.data && response.data.created) {
      const tokenData = {
        token: response.data.token,
        expirationTime: new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ).toISOString(), // 24 hours
        user: response.data.data,
      };
      saveTokenInLocalStorage(tokenData.token, tokenData.expirationTime);
      return tokenData;
    } else if (response.data && response.data.exists) {
      throw new Error("User already exists");
    } else {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    console.error("SignUp error:", error);
    if (error.response) {
      throw new Error(error.response.data.error || formatError(error));
    }
    throw new Error(formatError(error));
  }
};

const login = async (email, password) => {
  console.log("Login called with:", { email, password });

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const response = await axios.post(
      `${API_URL}/auth/verify`,
      {
        email,
        password,
      },
      {
        headers: {
          "X-Privy-App-Secret": process.env.REACT_APP_PRIVY_APP_SECRET,
        },
      }
    );

    console.log("Login response:", response.data);

    if (response.data.token) {
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 24); // 24 hours from now
      saveTokenInLocalStorage(response.data.token, expirationTime);
      runLogoutTimer(expirationTime);
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(formatError(error));
  }
};

const logout = () => {
  removeTokenFromLocalStorage();
  window.location.href = "/login";
};

export {
  checkAutoLogin,
  signUp,
  saveTokenInLocalStorage,
  runLogoutTimer,
  formatError,
  login,
  logout,
  getTokenFromLocalStorage,
};

const authService = {
  checkAutoLogin,
  signUp,
  saveTokenInLocalStorage,
  runLogoutTimer,
  formatError,
  login,
  logout,
  getTokenFromLocalStorage,
};

export default authService;
