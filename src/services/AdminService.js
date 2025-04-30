import axiosInstance from "./AxiosInstance";

const AdminService = {
  getDashboardStats: async () => {
    try {
      const response = await axiosInstance.get("/admin/dashboard");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUsers: async (page = 1, limit = 10) => {
    try {
      const response = await axiosInstance.get("/admin/users", {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default AdminService;
