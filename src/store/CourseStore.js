import { create } from "zustand";
import {
  getActiveLanguages,
  getCourses,
  getPopularCourses,
  getCourseById,
} from "@/services/course.service";

const DEFAULT_LIMIT = 9;

// Default filters: no sortBy (admin-configured order) and no price range.
const DEFAULT_FILTERS = {
  q: "",
  categoryId: "",
  level: "",
  minPrice: "",
  maxPrice: "",
  sortBy: "",
  page: 1,
  limit: DEFAULT_LIMIT,
};

const EMPTY_PAGINATION = {
  page: 1,
  limit: DEFAULT_LIMIT,
  totalItems: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

const getErrorMessage = (err, fallback) =>
  err?.response?.data?.message || fallback;

// Every catalog query (new language, search, sort) bumps this generation.
// Responses from an older generation are discarded so they can never
// overwrite the currently selected language's courses.
let catalogGeneration = 0;
let popularRequestId = 0;

const useCourseStore = create((set, get) => ({
  /* =====================
     STATE
  ===================== */
  courses: [],
  course: null,
  languages: [],
  selectedLanguageId: "",
  languagesLoading: false,
  languagesLoaded: false,
  languagesError: null,
  filters: { ...DEFAULT_FILTERS },
  pagination: { ...EMPTY_PAGINATION },
  loading: false,
  loadingMore: false,
  hasLoaded: false,
  error: null,

  // Homepage "Most Popular" – kept separate from the catalog list.
  popularCourses: [],
  popularCoursesTotal: 0,
  popularLoading: false,
  popularError: null,

  /* =====================
     ACTIONS
  ===================== */

  fetchActiveLanguages: async () => {
    if (get().languagesLoading) return;

    try {
      set({ languagesLoading: true, languagesError: null });

      // `languages` is already sorted by the admin-configured sortOrder.
      const languages = await getActiveLanguages();
      const currentId = get().selectedLanguageId;
      const isAvailable =
        !!currentId && languages.some((language) => language.id === currentId);

      // A page refresh resets the store, so it always starts from the first
      // language by sortOrder. In-app navigation keeps the student's pick.
      const selectedLanguageId = isAvailable ? currentId : languages[0]?.id || "";

      set({
        languages,
        selectedLanguageId,
        languagesLoading: false,
        languagesLoaded: true,
        languagesError: null,
      });
    } catch (err) {
      set({
        languagesLoading: false,
        languagesLoaded: true,
        languagesError: getErrorMessage(err, "Failed to load languages"),
      });
    }
  },

  // Switching language: clear the old list immediately, reset sort to the
  // admin-configured default, keep the search text.
  setSelectedLanguageId: (languageId) => {
    const cleanLanguageId = String(languageId || "").trim();
    if (cleanLanguageId === get().selectedLanguageId) return;

    catalogGeneration += 1;

    set((state) => ({
      selectedLanguageId: cleanLanguageId,
      courses: [],
      pagination: { ...EMPTY_PAGINATION, limit: state.filters.limit },
      filters: {
        ...state.filters,
        sortBy: "",
        page: 1,
      },
      loading: !!cleanLanguageId,
      loadingMore: false,
      hasLoaded: false,
      error: null,
    }));
  },

  // "" = Default (admin-configured order). Fetching is driven by the caller.
  setSortBy: (sortBy) => {
    const nextSortBy = sortBy || "";
    if (nextSortBy === (get().filters.sortBy || "")) return;

    set((state) => ({
      filters: { ...state.filters, sortBy: nextSortBy, page: 1 },
      // The catalog refetches for the new sort right away; show the loader
      // instead of the previous result's empty message in between.
      loading: !!state.selectedLanguageId,
    }));
  },

  // 🔎 FILTER + SEARCH + SORT COURSES
  fetchCourses: async (params = {}) => {
    const languageId = String(
      params.languageId || get().selectedLanguageId || ""
    ).trim();

    catalogGeneration += 1;
    const generation = catalogGeneration;

    if (!languageId) {
      set({
        courses: [],
        pagination: { ...EMPTY_PAGINATION },
        loading: false,
        loadingMore: false,
        hasLoaded: false,
        error: null,
      });
      return;
    }

    const { languageId: _ignored, ...filterParams } = params;
    const nextFilters = {
      ...get().filters,
      ...filterParams,
      page: 1,
    };

    set({
      loading: true,
      loadingMore: false,
      error: null,
      selectedLanguageId: languageId,
      filters: nextFilters,
    });

    try {
      const { courses, pagination } = await getCourses({
        ...nextFilters,
        languageId,
      });

      if (generation !== catalogGeneration) return;

      // Keep the exact order returned by the API.
      set({
        courses,
        pagination,
        loading: false,
        hasLoaded: true,
      });
    } catch (err) {
      if (generation !== catalogGeneration) return;

      set({
        courses: [],
        error: getErrorMessage(err, "Failed to load courses"),
        loading: false,
        hasLoaded: true,
      });
    }
  },

  // 🔄 LOAD MORE COURSES (same language + same filters only)
  loadMoreCourses: async () => {
    const {
      pagination,
      filters,
      loadingMore,
      loading,
      selectedLanguageId,
    } = get();

    if (loading || loadingMore || !pagination.hasNextPage || !selectedLanguageId) {
      return;
    }

    const generation = catalogGeneration;
    const nextPage = (Number(pagination.page) || 1) + 1;

    try {
      set({ loadingMore: true });

      const { courses: newCourses, pagination: newPagination } = await getCourses({
        ...filters,
        languageId: selectedLanguageId,
        page: nextPage,
      });

      // Language, search or sort changed while loading – drop this page.
      if (generation !== catalogGeneration) return;

      set((state) => {
        const seen = new Set(state.courses.map((course) => course.id));
        return {
          courses: [
            ...state.courses,
            ...newCourses.filter((course) => !seen.has(course.id)),
          ],
          pagination: newPagination,
          filters: { ...state.filters, page: nextPage },
          loadingMore: false,
        };
      });
    } catch (err) {
      if (generation !== catalogGeneration) return;

      set({
        error: getErrorMessage(err, "Failed to load more courses"),
        loadingMore: false,
      });
    }
  },

  // 🔥 POPULAR COURSES (homepage, GET /courses/popular)
  fetchPopularCourses: async (limit = 6) => {
    popularRequestId += 1;
    const requestId = popularRequestId;

    try {
      set({ popularLoading: true, popularError: null });

      const { courses, total } = await getPopularCourses(limit);

      if (requestId !== popularRequestId) return;

      set({
        popularCourses: courses,
        popularCoursesTotal: total,
        popularLoading: false,
      });
    } catch (err) {
      if (requestId !== popularRequestId) return;

      set({
        popularCourses: [],
        popularCoursesTotal: 0,
        popularError: getErrorMessage(err, "Failed to load courses"),
        popularLoading: false,
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
        error: getErrorMessage(err, "Failed to load course"),
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
        error: getErrorMessage(err, "Failed to refresh course"),
      });
      return null;
    }
  },

  // 🧹 CLEAR SINGLE COURSE
  clearCourse: () => set({ course: null }),
}));

export default useCourseStore;
