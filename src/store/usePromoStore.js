




import { create } from "zustand";
import {
  fetchActivePromos,
  watchPromoAPI,
} from "@/services/promo.api";

const usePromoStore = create((set, get) => ({
  promos: [],
  activeIndex: 0,
  loading: false,
  error: null,
  videoUrl: null,
  videoLoading: false,

  /* ================= FETCH PROMOS ================= */
  getPromos: async () => {
    set({ loading: true, error: null });

    try {
      const data = await fetchActivePromos();

      set({
        promos: data,
        loading: false,
      });
    } catch (err) {
      set({
        error:
          err?.response?.data?.message || "Failed to load promos",
        loading: false,
      });
    }
  },

  /* ================= WATCH PROMO VIDEO ================= */
  watchPromo: async (promoId) => {
    set({ videoLoading: true, error: null });

    try {
      const data = await watchPromoAPI(promoId);

      set({
        videoUrl: data.playbackUrl,
        videoLoading: false,
      });

      return data.playbackUrl;
    } catch (err) {
      set({
        error:
          err?.response?.data?.message ||
          "Failed to load video",
        videoLoading: false,
      });

      return null;
    }
  },

  /* ================= CLEAR VIDEO ================= */
  clearVideo: () => set({ videoUrl: null }),

  /* ================= SLIDER CONTROLS ================= */
  nextPromo: () =>
    set((state) => ({
      activeIndex:
        state.promos.length === 0
          ? 0
          : (state.activeIndex + 1) %
            state.promos.length,
    })),

  prevPromo: () =>
    set((state) => ({
      activeIndex:
        state.promos.length === 0
          ? 0
          : (state.activeIndex - 1 + state.promos.length) %
            state.promos.length,
    })),
}));

export default usePromoStore;