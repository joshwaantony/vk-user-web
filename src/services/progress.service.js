import api from "@/api/axios";

/* ===============================
   UPDATE LESSON PROGRESS
================================= */
export const updateProgressAPI = async (lessonId, watchedSeconds) => {
  const response = await api.post(
    `/progress/${lessonId}`,
    { watchedSeconds }
  );

  return response.data;
};

/* ===============================
   GET LESSON PROGRESS
================================= */
export const getLessonProgressAPI = async (lessonId) => {
  const response = await api.get(`/progress/${lessonId}`);
  return response.data;
};

/* ===============================
   GET COURSE PROGRESS
================================= */
export const getCourseProgressAPI = async (courseId) => {
  const response = await api.get(`/progress/course/${courseId}`);
  return response.data;
};