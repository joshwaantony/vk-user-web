import { getMyEnrollments } from "@/services/enrollment.api";
import { create } from "zustand";

const useEnrollmentStore = create((set) => ({
  enrollments: [],
  loading: false,
  error: null,

  fetchEnrollments: async () => {
    try {
      set({ loading: true, error: null });

      const res = await getMyEnrollments();

      set({
        enrollments: res?.data || [],
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
        loading: false,
      });
    }
  },
}));

export default useEnrollmentStore;