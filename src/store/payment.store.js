


import { create } from "zustand";
import {
  createOrderAPI,
  verifyOrderAPI,
} from "@/services/payment.service";

export const usePaymentStore = create((set) => ({
  loading: false,
  error: null,

  // ✅ CREATE ORDER
  createOrder: async (courseId, token) => {
    try {
      set({ loading: true, error: null });

      const order = await createOrderAPI(courseId, token);

      set({ loading: false });
      return order;

    } catch (error) {
      set({
        loading: false,
        error: error.message || "Order failed",
      });
      throw error;
    }
  },

  // ✅ VERIFY ORDER
  verifyOrder: async (orderId, token) => {
    try {
      return await verifyOrderAPI(orderId, token);
    } catch (error) {
      throw error;
    }
  },
}));