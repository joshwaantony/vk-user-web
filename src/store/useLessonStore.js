import { create } from "zustand";
import { watchLesson } from "@/services/lesson.service";

const useLessonStore = create((set) => ({
  lesson: null,
  loading: false,
  error: null,

  // 🎥 Fetch Lesson
  fetchLesson: async (lessonId) => {
    try {
      set({ loading: true, error: null });

      const response = await watchLesson(lessonId);

      if (response.success) {
        set({ lesson: response.data, loading: false });
      } else {
        set({ error: response.message, loading: false });
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },
}));

export default useLessonStore;