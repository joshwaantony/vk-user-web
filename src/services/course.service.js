



import api from "@/api/axios";

const SORT_BY = {
  LATEST: "LATEST",
  OLDEST: "OLDEST",
  POPULAR: "POPULAR",
  PRICE_ASC: "PRICE_ASC",
  PRICE_DESC: "PRICE_DESC",
};

/* ----------------------------------
   GET COURSES (FILTER + SEARCH)
---------------------------------- */
export const getCourses = async (params = {}) => {
  const query = new URLSearchParams({
    q: params.q ?? "",
    categoryId: params.categoryId ?? "",
    level: params.level ?? "",
    minPrice: String(params.minPrice ?? 0),
    maxPrice: String(params.maxPrice ?? 10000),
    sortBy: params.sortBy || SORT_BY.POPULAR,
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 9),
  });

  const res = await api.get(`/courses?${query.toString()}`);
  return res.data?.data?.courses || [];
};

/* ----------------------------------
   GET ALL COURSES
---------------------------------- */
export const getAllCourses = async () => {
  return getCourses({
    sortBy: SORT_BY.POPULAR,
    page: 1,
    limit: 9,
  });
};

/* ----------------------------------
   GET POPULAR COURSES
---------------------------------- */
export const getPopularCourses = async (limit = 6) => {
  return getCourses({
    sortBy: SORT_BY.POPULAR,
    page: 1,
    limit,
  });
};

/* ----------------------------------
   GET COURSE BY ID
---------------------------------- */
export const getCourseById = async (courseId) => {
  const res = await api.get(`/courses/${courseId}`);
  return res.data.data; // full course object
};
