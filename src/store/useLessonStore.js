import { create } from "zustand";
import { watchLesson } from "@/services/lesson.service";

const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const normalizeLessonPayload = (response) => {
  const payload = response?.data;

  const directLesson = isObject(payload?.lesson)
    ? payload.lesson
    : null;
  const nestedLesson = isObject(payload?.data?.lesson)
    ? payload.data.lesson
    : null;
  const fallbackLesson = isObject(payload?.data)
    ? payload.data
    : isObject(payload)
      ? payload
      : null;

  const lesson = directLesson || nestedLesson || fallbackLesson;
  if (!lesson) return null;

  const normalized = { ...lesson };
  const mergedCourse =
    normalized.course ||
    payload?.course ||
    payload?.data?.course ||
    null;

  if (mergedCourse) {
    normalized.course = mergedCourse;
  }

  if (!normalized.courseId) {
    normalized.courseId =
      payload?.courseId ||
      payload?.data?.courseId ||
      (typeof mergedCourse === "object"
        ? mergedCourse?.id || mergedCourse?._id
        : mergedCourse) ||
      null;
  }

  if (
    !normalized.sections &&
    Array.isArray(payload?.sections)
  ) {
    normalized.sections = payload.sections;
  }

  const hasMinimumLessonData = Boolean(
    normalized?.id ||
      normalized?._id ||
      normalized?.lessonId ||
      normalized?.title ||
      normalized?.playbackUrl ||
      normalized?.courseId ||
      normalized?.course ||
      (Array.isArray(normalized?.sections) &&
        normalized.sections.length > 0)
  );

  return hasMinimumLessonData ? normalized : null;
};

const useLessonStore = create((set) => ({
  lesson: null,
  loading: false,
  error: null,

  // 🎥 Fetch Lesson
  fetchLesson: async (lessonId) => {
    try {
      set({ loading: true, error: null });

      const response = await watchLesson(lessonId);
      const normalizedLesson =
        normalizeLessonPayload(response);

      if (response.success && normalizedLesson) {
        set({ lesson: normalizedLesson, loading: false });
      } else {
        set({
          lesson: null,
          error:
            response?.message ||
            "Invalid lesson data received",
          loading: false,
        });
      }
    } catch (err) {
      set({
        lesson: null,
        error: err.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },
}));

export default useLessonStore;
