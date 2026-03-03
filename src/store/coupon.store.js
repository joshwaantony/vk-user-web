import { create } from "zustand";
import { validateCouponApi } from "@/services/coupon.api";

export const useCouponStore = create((set) => ({
  loading: false,
  couponData: null,
  error: null,

  validateCoupon: async ({ code, courseId }) => {
    try {
      set({ loading: true, error: null });

      const res = await validateCouponApi({ code, courseId });

      if (!res?.success) {
        throw new Error(res?.message || "Invalid coupon");
      }

      set({
        couponData: res.data,
        loading: false,
      });

      return res;
    } catch (error) {
      set({
        error: error?.response?.data?.message || error.message,
        loading: false,
      });
      throw error;
    }
  },

  clearCoupon: () => {
    set({ couponData: null, error: null });
  },
}));