import React, { createContext, useContext, useState, useEffect } from "react";
import { userService } from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    if (wallet) {
      loadUser(wallet);
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async (wallet) => {
    try {
      setLoading(true);
      const userData = await userService.getUser(wallet);
      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (wallet, name, by = "") => {
    try {
      setLoading(true);
      const response = await userService.register(wallet, name, by);
      if (response.created) {
        localStorage.setItem("wallet", wallet);
        await loadUser(wallet);
      }
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getReferrals = async () => {
    if (!user?.wallet) return null;
    try {
      return await userService.getReferrals(user.wallet);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getDirectSales = async () => {
    if (!user?.wallet) return null;
    try {
      return await userService.getDirectSales(user.wallet);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateClaimedTickets = async (ticketId) => {
    if (!user?.wallet) return null;
    try {
      const response = await userService.updateClaimedTickets(
        user.wallet,
        ticketId
      );
      setUser(response);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateClaimedNFTs = async (nftId) => {
    if (!user?.wallet) return null;
    try {
      const response = await userService.updateClaimedNFTs(user.wallet, nftId);
      setUser(response);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("walletSet");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        getReferrals,
        getDirectSales,
        updateClaimedTickets,
        updateClaimedNFTs,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
