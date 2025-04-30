import axiosInstance from "./AxiosInstance";

const ProfileService = {
  // fetch user profile
  getUser: async () => {
    try {
      const response = await axiosInstance.get("/me/profile");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // update user profile
  updateUser: async (userData) => {
    try {
      const response = await axiosInstance.put("/me/profile", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // send old and new password to backend
  changePassword: async ({ oldPassword, newPassword }) => {
    try {
      const response = await axiosInstance.put("/me/password", {
        oldPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ProfileService;
