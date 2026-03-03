


import { create } from "zustand";
import {
  createOrderAPI,
  verifyClientAPI,
  verifyOrderAPI,
} from "@/services/payment.service";

const getErrorMessage = (error, fallback = "Something went wrong") =>
  error?.message || fallback;

export const usePaymentStore = create((set) => ({
  loading: false,
  error: null,

  // ✅ CREATE ORDER
  createOrder: async (
    courseId,
    token,
    idempotencyKey,
    couponCode
  ) => {
    try {
      set({ loading: true, error: null });

      const order = await createOrderAPI(
        courseId,
        token,
        idempotencyKey,
        couponCode
      );

      set({ loading: false });
      return order;

    } catch (error) {
      set({
        loading: false,
        error: getErrorMessage(error, "Order failed"),
      });
      throw error;
    }
  },

  // ✅ VERIFY CLIENT
  verifyClient: async (payload, token, idempotencyKey) => {
    try {
      return await verifyClientAPI(payload, token, idempotencyKey);
    } catch (error) {
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
