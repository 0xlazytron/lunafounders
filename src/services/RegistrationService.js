import axiosInstance from "./AxiosInstance";

const RegistrationService = {
  checkExistence: async (wallet) => {
    try {
      const response = await axiosInstance.get(`/users/${wallet}`);
      return response.data !== null;
    } catch (error) {
      if (error.response?.status === 404) {
        return false;
      }
      throw error;
    }
  },

  registerUser: async ({ wallet, name, by = "" }) => {
    try {
      const response = await axiosInstance.post("/users", {
        wallet,
        name,
        by,
        code: generateReferralCode(), // We'll implement this function
        sales: 0,
        worth: 0,
        mintInfo: {},
        claimedTickets: [],
        claimedNFTs: [],
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUser: async (wallet) => {
    try {
      const response = await axiosInstance.get(`/users/${wallet}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

function generateReferralCode(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const random = crypto.getRandomValues(new Uint8Array(16));
  const timestamp = Date.now().toString();
  const timestampBytes = new TextEncoder().encode(timestamp);
  const combined = new Uint8Array(random.length + timestampBytes.length);
  combined.set(random);
  combined.set(timestampBytes, random.length);
  const hashBuffer = crypto.subtle.digest("SHA-256", combined);
  const hashBytes = new Uint8Array(hashBuffer);
  return Array.from(hashBytes)
    .slice(0, length)
    .map((byte) => chars[byte % chars.length])
    .join("");
}

export default RegistrationService;
