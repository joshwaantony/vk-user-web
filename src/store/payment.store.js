import { create } from "zustand";
import { createOrder } from "@/services/payment.service";

export const usePaymentStore = create((set) => ({
  loading: false,
  order: null,
  error: null,

  createCourseOrder: async (courseId, token) => {
    try {
      set({ loading: true, error: null });

      const data = await createOrder(courseId, token);

      set({
        order: data,
        loading: false,
      });

      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Something went wrong",
        loading: false,
      });

      throw error;
    }
  },
}));