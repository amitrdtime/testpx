import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { fetchProfile, fetchProfilePhoto } from "../services/user-service";

const useUserStore = create(
  devtools((set) => ({
    profileImage: null,
    loading: false,
    error: null,
    userData: null,
    token: null,
    setToken: (token) => set({ token }),
    setUserData: (userData) => set({ userData }),
    setProfileImage: (profileImage) => set({ profileImage }),
    fetchProfileImage: async () => {
      const { token } = useUserStore.getState();
      if (!token) return;

      set({ loading: true, error: null });
      try {
        const data = await fetchProfilePhoto(token);
        set({ profileImage: data, loading: false });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },
    fetchUserData: async (uniqueId) => {
      const { token } = useUserStore.getState();
      if (!token) return;

      set({ loading: true, error: null });
      try {
        const response = await fetchProfile(token);
        set({ userData: response, loading: false });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },
  }))
);

export default useUserStore;
