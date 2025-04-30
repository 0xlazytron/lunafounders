import axiosInstance from "./AxiosInstance";

const NFTService = {
  mintNFT: async (wallet, collectionId) => {
    try {
      const response = await axiosInstance.post("/nfts/mint", {
        wallet,
        collectionId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCollections: async () => {
    try {
      const response = await axiosInstance.get("/nfts/collections");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default NFTService;
