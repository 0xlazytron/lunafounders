import { create } from "zustand";
import axiosInstance from "../services/AxiosInstance";

const useAdminRewardsStore = create((set, get) => ({
  rewards: [],
  formData: { name: "", emoji: "", amount: "", imageUrl: "" },
  selectedRewardId: null,

  fetchRewards: async () => {
    try {
      const res = await axiosInstance.get("/admin/rewards");
      set({ rewards: res.data });
    } catch (err) {
      console.error(err);
    }
  },

  createReward: async () => {
    try {
      const data = get().formData;
      const res = await axiosInstance.post("/admin/rewards", data);
      set(state => ({
        rewards: [...state.rewards, res.data],
        formData: { name: "", emoji: "", amount: "", imageUrl: "" }
      }));
    } catch (err) {
      console.error(err);
    }
  },

  updateReward: async id => {
    try {
      const data = get().formData;
      const res = await axiosInstance.put(`/admin/rewards/${id}`, data);
      set(state => ({
        rewards: state.rewards.map(r =>
          r.id === id ? res.data : r
        )
      }));
    } catch (err) {
      console.error(err);
    }
  },

  deleteReward: async id => {
    try {
      await axiosInstance.delete(`/admin/rewards/${id}`);
      set(state => ({
        rewards: state.rewards.filter(r => r.id !== id),
        selectedRewardId: null
      }));
    } catch (err) {
      console.error(err);
    }
  },

  setFormData: patch =>
    set(state => ({ formData: { ...state.formData, ...patch } })),

  setSelectedReward: id => {
    const reward = get().rewards.find(r => r.id === id);
    if (reward) {
      set({
        selectedRewardId: id,
        formData: {
          name: reward.name,
          emoji: reward.emoji,
          amount: reward.amount,
          imageUrl: reward.imageUrl
        }
      });
    }
  }
}));

export default useAdminRewardsStore;
