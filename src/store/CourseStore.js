



import { create } from "zustand";
import {
  getPopularCourses,
  getCourseById,
  getAllCourses, // 👈 ADD THIS
} from "@/services/course.service";

const useCourseStore = create((set) => ({
  /* =====================
     STATE
  ===================== */
  courses: [],
  course: null,
  loading: false,
  error: null,

  /* =====================
     ACTIONS
  ===================== */

  // 📚 ALL COURSES (from /courses)
  fetchAllCourses: async () => {
    try {
      set({ loading: true, error: null });

      const courses = await getAllCourses();

      set({
        courses,
        loading: false,
      });
    } catch (err) {
      set({
        error:
          err?.response?.data?.message ||
          "Failed to load courses",
        loading: false,
      });
    }
  },

  // 🔥 POPULAR COURSES
  fetchPopularCourses: async (limit = 6) => {
    try {
      set({ loading: true, error: null });

      const courses = await getPopularCourses(limit);

      set({
        courses,
        loading: false,
      });
    } catch (err) {
      set({
        error:
          err?.response?.data?.message ||
          "Failed to load courses",
        loading: false,
      });
    }
  },

  // 🎯 COURSE BY ID
  fetchCourseById: async (courseId) => {
    try {
      set({ loading: true, error: null });

      const course = await getCourseById(courseId);

      set({
        course,
        loading: false,
      });
    } catch (err) {
      set({
        error:
          err?.response?.data?.message ||
          "Failed to load course",
        loading: false,
      });
    }
  },

  // 🧹 CLEAR SINGLE COURSE
  clearCourse: () => set({ course: null }),
}));

export default useCourseStore;
