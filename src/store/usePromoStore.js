import { create } from "zustand";
import { fetchActivePromos } from "@/services/promo.api";

const usePromoStore = create((set) => ({
  promos: [],
  activeIndex: 0,
  loading: false,
  error: null,

  getPromos: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchActivePromos();
      set({ promos: data, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || "Failed to load promos",
        loading: false,
      });
    }
  },

  nextPromo: () =>
    set((state) => ({
      activeIndex:
        state.promos.length === 0
          ? 0
          : (state.activeIndex + 1) % state.promos.length,
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
