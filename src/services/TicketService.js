import axiosInstance from "./AxiosInstance";

const TicketService = {
  createTicket: async (wallet, type, amount) => {
    try {
      const response = await axiosInstance.post("/tickets", {
        wallet,
        type,
        amount,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserTickets: async (wallet) => {
    try {
      const response = await axiosInstance.get(`/tickets/user/${wallet}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default TicketService;
