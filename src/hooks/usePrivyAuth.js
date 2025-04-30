import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const usePrivyAuth = () => {
  const { user, login, logout } = usePrivy();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://api.lunafounder.io/api";
  if (!API_URL) {
    console.error("REACT_APP_API_URL is not defined in environment variables");
  }

  useEffect(() => {
    const verifyPrivyUser = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        setError(null);

        const privyToken = await user.getAuthToken();
        console.log("Privy Token:", privyToken);

        const response = await axios.post(`${API_URL}/auth/verify-privy`, {
          token: privyToken,
        });

        console.log("Backend Response:", response.data);

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;

          setUser({
            ...response.data.user,
            isAuthenticated: true,
            isPrivyUser: true,
          });

          navigate("/");
        }
      } catch (err) {
        console.error("Privy verification error:", err);
        setError(err.response?.data?.error || "Authentication failed");
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyPrivyUser();
  }, [user, setUser, logout, API_URL, navigate]);

  return {
    isLoading,
    error,
    isAuthenticated: !!user,
    user: user || null,
  };
};
