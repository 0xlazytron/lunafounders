import { create } from "zustand";
import axiosInstance from "../services/AxiosInstance";

const useProfileStore = create((set, get) => ({
  userData: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    country: "",
    postalCode: "",
    city: "",
    productName: "",
    aboutMe: "",
  },
  passData: {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  },

  // fetch profile and store it
  fetchUser: async () => {
    try {
      const response = await axiosInstance.get("/me/profile");
      set({ userData: response.data });
    } catch (err) {
      console.error(err);
    }
  },

  // update profile in backend and state
  updateUser: async () => {
    try {
      const response = await axiosInstance.put("/me/profile", get().userData);
      const updated = response.data;
      set({ userData: updated });
      return updated;
    } catch (err) {
      console.error(err);
    }
  },

  // change password in backend
  changePassword: async () => {
    const { oldPassword, newPassword } = get().passData;
    try {
      const response = await axiosInstance.put("/me/password", { oldPassword, newPassword });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  // setters for form fields
  setUserData: (patch) => set((state) => ({ userData: { ...state.userData, ...patch } })),
  setPassData: (patch) => set((state) => ({ passData: { ...state.passData, ...patch } })),
}));

export default useProfileStore;
