import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { useAuth } from "../context/AuthContext";

const PrivyLogin = () => {
  const { login, authenticated, user: privyUser } = usePrivy();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    if (authenticated && privyUser) {
      try {
        const privyToken = await privyUser.getAuthToken();
        console.log("Privy Token:", privyToken);

        const response = await fetch(
          `https://api.lunafounder.io/api/auth/verify-privy`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: privyToken }),
          }
        );

        const data = await response.json();
        console.log("Backend Response:", data);

        if (data.token) {
          localStorage.setItem("token", data.token);

          setUser({
            ...data.user,
            isAuthenticated: true,
            isPrivyUser: true,
          });

          navigate("/");
        }
      } catch (error) {
        console.error("Privy verification error:", error);
      }
    }
  }, [authenticated, privyUser, setUser, navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <button
      onClick={login}
      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Continue with Privy
    </button>
  );
};

export default PrivyLogin;
