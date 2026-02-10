// import api from "@/api/axios";

// export const getPopularCourses = async (limit = 6) => {
//   const res = await api.get(`/courses/popular?limit=${limit}`);
//   return res.data.data.courses;
// };



import api from "@/api/axios";

/* ----------------------------------
   GET POPULAR COURSES
---------------------------------- */
export const getPopularCourses = async (limit = 6) => {
  const res = await api.get(`/courses/popular?limit=${limit}`);
  return res.data.data.courses;
};

/* ----------------------------------
   GET COURSE BY ID
---------------------------------- */
export const getCourseById = async (courseId) => {
  const res = await api.get(`/courses/${courseId}`);
  return res.data.data; // 👈 full course object
};
