// import { getPopularCourses } from "@/services/course.service";
// import { create } from "zustand";

// const usePopularCourseStore = create((set) => ({
//   courses: [],
//   loading: false,
//   error: null,

//   fetchPopularCourses: async (limit = 6) => {
//     try {
//       set({ loading: true, error: null });

//       const courses = await getPopularCourses(limit);

//       set({
//         courses,
//         loading: false,
//       });
//     } catch (err) {
//       set({
//         error: err?.response?.data?.message || "Failed to load courses",
//         loading: false,
//       });
//     }
//   },
// }));

// export default usePopularCourseStore;




import { create } from "zustand";
import {
  getPopularCourses,
  getCourseById,
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

  // 🔥 Popular Courses
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
        error: err?.response?.data?.message || "Failed to load courses",
        loading: false,
      });
    }
  },

  // 🎯 Course by ID
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
        error: err?.response?.data?.message || "Failed to load course",
        loading: false,
      });
    }
  },

  // 🧹 Clear single course (optional but pro)
  clearCourse: () => set({ course: null }),
}));

export default useCourseStore;
