import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/AxiosInstance";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const API_URL = "https://api.lunafounder.io/api";;
  const API_URL = "https://api.lunafounder.io/api";
  if (!API_URL) {
    console.error("REACT_APP_API_URL is not defined in environment variables");
  }

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    const privToken = localStorage.getItem("privy:token");

    if (token || privToken) {
      try {
        const response = await axiosInstance.post("/auth/verify");
        setUser({
          ...response.data.user,
          isAuthenticated: true,
        });

        if (window.location.pathname === "/login") {
          navigate("/");
        }
      } catch (error) {
        console.error("Token verification error:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("privy:token");
        localStorage.removeItem("walletSet");
        setError("Session expired. Please login again.");
      }
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);

      await new Promise((resolve) => {
        setUser(
          {
            ...user,
            isAuthenticated: true,
          },
          resolve
        );
      });
      console.log("user", user);
      navigate("/");

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("privy:token");
    localStorage.removeItem("walletSet");
    setUser(null);
    setError(null);
    navigate("/login");
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    setUser,
    verifyToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
