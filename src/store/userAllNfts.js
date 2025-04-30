import { create } from "zustand";
import axiosInstance from "../services/AxiosInstance";

const useUserAllNftsStore = create((set) => ({
  allNfts: [],

  // fetch all NFTs
  fetchAllNfts: async () => {
    try {
      const response = await axiosInstance.get("/all-nfts");
      set({ allNfts: response.data });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useUserAllNftsStore;
