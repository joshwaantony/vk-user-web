import api from "@/api/axios";



// 🎥 Get Lesson Watch Data
export const watchLesson = async (lessonId) => {
  const res = await api.get(`/lessons/${lessonId}/watch`);
  return res.data;
};