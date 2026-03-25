



import { create } from "zustand";
import {
  getCourses,
  getPopularCourses,
  getCourseById,
  getAllCourses,
} from "@/services/course.service";

const useCourseStore = create((set, get) => ({
  /* =====================
     STATE
  ===================== */
  courses: [],
  popularCoursesTotal: 0,
  course: null,
  filters: {
    q: "",
    categoryId: "",
    level: "",
    minPrice: 0,
    maxPrice: 10000,
    sortBy: "POPULAR",
    page: 1,
    limit: 9,
  },
  loading: false,
  error: null,

  /* =====================
     ACTIONS
  ===================== */

  // 🔎 FILTER + SEARCH COURSES
  fetchCourses: async (params = {}) => {
    try {
      set((state) => ({
        loading: true,
        error: null,
        filters: {
          ...state.filters,
          ...params,
        },
      }));

      const nextFilters = {
        ...get().filters,
        ...params,
      };
      const courses = await getCourses(nextFilters);

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

      const { courses, total } = await getPopularCourses(limit);

      set({
        courses,
        popularCoursesTotal: total,
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

  // 🔄 REFRESH COURSE STATE (unlock/progress sync without page loader)
  refreshCourseById: async (courseId) => {
    if (!courseId) return null;

    try {
      const course = await getCourseById(courseId);
      set({ course, error: null });
      return course;
    } catch (err) {
      set({
        error:
          err?.response?.data?.message ||
          "Failed to refresh course",
      });
      return null;
    }
  },

  // 🧹 CLEAR SINGLE COURSE
  clearCourse: () => set({ course: null }),
}));

export default useCourseStore;
