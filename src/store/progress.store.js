import { create } from "zustand";
import {
  updateProgressAPI,
  getLessonProgressAPI,
  getCourseProgressAPI,
} from "@/services/progress.service";
import toast from "react-hot-toast";

const normalizeResponse = (response) => {
  if (response?.success === false) {
    throw new Error(response.message || "Request failed");
  }

  if (response?.data?.success === false) {
    throw new Error(
      response.data.message || "Request failed"
    );
  }

  if (response?.data !== undefined) {
    return response.data;
  }

  if (response?.success && response?.data !== undefined) {
    return response.data;
  }

  return response || null;
};

const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message ||
  error?.message ||
  fallbackMessage;

export const useProgressStore = create((set) => ({
  lessonProgress: null,
  lessonProgressByLessonId: {},
  courseProgress: null,
  courseProgressCourseId: null,
  loading: false,
  updateLoading: false,
  error: null,
  activeLessonId: null,
  lessonProgressRequestId: 0,

  setActiveLesson: (lessonId) =>
    set((state) => ({
      activeLessonId: lessonId || null,
      lessonProgress:
        state.lessonProgressByLessonId[lessonId] || null,
    })),

  clearLessonProgress: () =>
    set({
      activeLessonId: null,
      lessonProgress: null,
      error: null,
    }),

  /* ===============================
     UPDATE PROGRESS (Silent)
  ================================= */
  updateProgress: async (
    lessonId,
    watchedSeconds,
    options = { silent: true }
  ) => {
    if (!lessonId || !Number.isFinite(watchedSeconds)) {
      return null;
    }

    const { silent = true } = options;
    const safeSeconds = Math.max(
      0,
      Math.floor(watchedSeconds)
    );

    try {
      if (!silent) {
        set({ updateLoading: true, error: null });
      }
      const res = await updateProgressAPI(
        lessonId,
        safeSeconds
      );
      const nextProgress =
        normalizeResponse(res) || {};

      set((state) => ({
        updateLoading: false,
        error: silent ? state.error : null,
        lessonProgress:
          state.activeLessonId === lessonId
            ? {
                ...state.lessonProgress,
                ...nextProgress,
                watchedSeconds: Math.max(
                  state.lessonProgress?.watchedSeconds || 0,
                  nextProgress?.watchedSeconds ??
                    safeSeconds
                ),
              }
            : state.lessonProgress,
        lessonProgressByLessonId: {
          ...state.lessonProgressByLessonId,
          [lessonId]: {
            ...(state.lessonProgressByLessonId[lessonId] ||
              {}),
            ...nextProgress,
            watchedSeconds: Math.max(
              state.lessonProgressByLessonId[lessonId]
                ?.watchedSeconds || 0,
              nextProgress?.watchedSeconds ?? safeSeconds
            ),
          },
        },
      }));

      return nextProgress;
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Failed to update lesson progress"
      );
      const isNetworkError =
        !error?.response &&
        (error?.message === "Network Error" ||
          error?.code === "ERR_NETWORK");
      if (error?.response?.status === 403) {
        toast.error(message);
      }

      if (!silent) {
        set({
          updateLoading: false,
          error: message,
        });
      } else {
        set({ updateLoading: false });
      }

      // Avoid noisy console spam for background autosave when network is temporarily unavailable.
      if (!silent || !isNetworkError) {
        console.error("Progress update failed:", error);
      }
      return null;
    }
  },

  /* ===============================
     GET LESSON PROGRESS
  ================================= */
  getLessonProgress: async (lessonId) => {
    if (!lessonId) return;

    const requestId = Date.now();
    set({
      loading: true,
      error: null,
      lessonProgressRequestId: requestId,
    });

    try {
      const res = await getLessonProgressAPI(lessonId);
      const progress = normalizeResponse(res);

      set((state) => {
        if (state.lessonProgressRequestId !== requestId) {
          return state;
        }

        return {
          lessonProgress:
            state.activeLessonId === lessonId
              ? progress
              : state.lessonProgress,
          lessonProgressByLessonId: {
            ...state.lessonProgressByLessonId,
            [lessonId]: progress,
          },
          loading: false,
          error: null,
        };
      });
    } catch (error) {
      set((state) => {
        if (state.lessonProgressRequestId !== requestId) {
          return state;
        }

        return {
          error: getErrorMessage(
            error,
            "Failed to fetch lesson progress"
          ),
          loading: false,
        };
      });
    }
  },

  /* ===============================
     GET COURSE PROGRESS
  ================================= */
  getCourseProgress: async (courseId) => {
    if (!courseId) return;

    try {
      set({ loading: true, error: null });

      const res = await getCourseProgressAPI(courseId);
      const progress = normalizeResponse(res);

      set({
        courseProgress: progress,
        courseProgressCourseId: String(courseId),
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: getErrorMessage(
          error,
          "Failed to fetch course progress"
        ),
        loading: false,
      });
    }
  },
}));
