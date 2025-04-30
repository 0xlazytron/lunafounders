import axiosInstance from "./AxiosInstance";

const RewardService = {
  getUserRewards: async (wallet) => {
    try {
      const response = await axiosInstance.get(`/rewards/user/${wallet}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  claimReward: async (rewardId) => {
    try {
      const response = await axiosInstance.post("/rewards/claim", {
        rewardId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default RewardService;
