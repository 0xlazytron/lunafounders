import { create } from "zustand";

const useUIStore = create((set) => ({
  theme: "light",
  sidebarOpen: true,
  notifications: [],
  loading: false,
  modal: null,

  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
  setModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
}));

export default useUIStore;
