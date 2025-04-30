import api from "./api";

export const userService = {
  register: async (wallet, name, by = "") => {
    try {
      const response = await api.post("/users/register", { wallet, name, by });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getUser: async (wallet) => {
    try {
      const response = await api.get(`/users/${wallet}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getReferrals: async (wallet) => {
    try {
      const response = await api.get(`/users/${wallet}/referrals`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getDirectSales: async (wallet) => {
    try {
      const response = await api.get(`/users/${wallet}/sales`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateClaimedTickets: async (wallet, ticketId) => {
    try {
      const response = await api.put(`/users/${wallet}/tickets`, { ticketId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateClaimedNFTs: async (wallet, nftId) => {
    try {
      const response = await api.put(`/users/${wallet}/nfts`, { nftId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
