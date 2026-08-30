



import { create } from "zustand";
import {
  getActiveLanguages,
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
  languages: [],
  selectedLanguageId: "",
  languagesLoading: false,
  languagesError: null,
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
  pagination: {
    page: 1,
    limit: 9,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  loading: false,
  loadingMore: false,
  error: null,

  /* =====================
     ACTIONS
  ===================== */

  fetchActiveLanguages: async () => {
    try {
      if (get().languagesLoading) return;

      set({ languagesLoading: true, languagesError: null });

      const languages = await getActiveLanguages();
      const currentSelectedLanguageId = get().selectedLanguageId;
      const hasCurrentLanguage = languages.some(
        (language) => language.id === currentSelectedLanguageId
      );
      const selectedLanguageId =
        hasCurrentLanguage
          ? currentSelectedLanguageId
          : languages[0]?.id || "";

      set({
        languages,
        selectedLanguageId,
        languagesLoading: false,
        languagesError: null,
      });
    } catch (err) {
      set({
        languagesLoading: false,
        languagesError:
          err?.response?.data?.message ||
          "Failed to load languages",
      });
    }
  },

  setSelectedLanguageId: (languageId) => {
    const cleanLanguageId = String(languageId || "").trim();

    set((state) => ({
      selectedLanguageId: cleanLanguageId,
      filters: {
        ...state.filters,
        page: 1,
      },
      pagination: {
        ...state.pagination,
        page: 1,
      },
      error: null,
    }));
  },

  // 🔎 FILTER + SEARCH COURSES
  fetchCourses: async (params = {}) => {
    try {
      const nextLanguageId = String(
        params.languageId || get().selectedLanguageId || ""
      ).trim();

      if (!nextLanguageId) {
        set({
          courses: [],
          pagination: {
            ...get().pagination,
            page: 1,
            totalItems: 0,
            totalPages: 1,
            hasNextPage: false,
            hasPreviousPage: false,
          },
          loading: false,
          error: null,
        });
        return;
      }

      set((state) => ({
        loading: true,
        error: null,
        selectedLanguageId: nextLanguageId,
        filters: {
          ...state.filters,
          ...params,
          languageId: nextLanguageId,
          page: params.page ?? 1,
        },
      }));

      const nextFilters = {
        ...get().filters,
        ...params,
        languageId: nextLanguageId,
      };
      const { courses, pagination } = await getCourses(nextFilters);

      set({
        courses,
        pagination,
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

  // 🔄 LOAD MORE COURSES (for Infinite Scroll)
  loadMoreCourses: async () => {
    const { pagination, filters, loadingMore, loading } = get();

    // Don't load if already loading, or if there's no next page
    if (loading || loadingMore || !pagination.hasNextPage) return;

    try {
      set({ loadingMore: true });

      const nextPage = pagination.page + 1;
      const nextFilters = {
        ...filters,
        page: nextPage,
      };

      const { courses: newCourses, pagination: newPagination } = await getCourses(nextFilters);

      set((state) => ({
        courses: [...state.courses, ...newCourses],
        pagination: newPagination,
        filters: {
          ...state.filters,
          page: nextPage,
        },
        loadingMore: false,
      }));
    } catch (err) {
      set({
        error:
          err?.response?.data?.message ||
          "Failed to load more courses",
        loadingMore: false,
      });
    }
  },

  // 📚 ALL COURSES (from /courses)
  fetchAllCourses: async () => {
    try {
      set({ loading: true, error: null });

      const courses = await getAllCourses(get().selectedLanguageId);

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
