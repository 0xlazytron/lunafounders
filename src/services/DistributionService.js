import axiosInstance from "./AxiosInstance";

const DistributionService = {
  calculateDistribution: async (amount, wallet, type) => {
    try {
      const response = await axiosInstance.post("/distribution/calculate", {
        amount,
        wallet,
        type,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  executeDistribution: async (amount, wallet, type, distribution) => {
    try {
      const response = await axiosInstance.post("/distribution/execute", {
        amount,
        wallet,
        type,
        distribution,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default DistributionService;
