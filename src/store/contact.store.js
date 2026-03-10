import { create } from "zustand";
import { submitContactMessage } from "@/services/contact.service";

export const useContactStore = create((set) => ({
  loading: false,
  success: false,
  error: null,

  submitContact: async (data) => {
    try {
      set({ loading: true, error: null, success: false });

      const res = await submitContactMessage(data);

      set({
        loading: false,
        success: true,
      });

      return res;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Something went wrong",
      });

      throw err;
    }
  },
}));