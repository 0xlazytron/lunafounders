import { create } from "zustand";
import axiosInstance from "../services/AxiosInstance";

const useUserTreeStore = create((set) => ({
  tree: [],

  // fetch user referral tree
  fetchTree: async () => {
    try {
      const response = await axiosInstance.get("/me/tree");
      set({ tree: response.data });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useUserTreeStore;
