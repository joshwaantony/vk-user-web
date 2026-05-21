



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
  const sortBy = params.sortBy || SORT_BY.POPULAR;
  const isPopular = sortBy === SORT_BY.POPULAR;

  if (isPopular) {
    const query = new URLSearchParams({
      page: String(params.page ?? 1),
      limit: String(params.limit ?? 9),
    });
    const res = await api.get(`/courses/popular?${query.toString()}`);
    return res.data?.data?.courses || [];
  } else {
    const queryParams = {
      q: params.q ?? "",
      categoryId: params.categoryId ?? "",
      level: params.level ?? "",
      minPrice: String(params.minPrice ?? 0),
      maxPrice: String(params.maxPrice ?? 10000),
      sortBy: sortBy,
      page: String(params.page ?? 1),
      limit: String(params.limit ?? 9),
    };
    const query = new URLSearchParams(queryParams);
    const res = await api.get(`/courses?${query.toString()}`);
    return res.data?.data?.courses || [];
  }
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
  const query = new URLSearchParams({
    page: "1",
    limit: String(limit),
  });

  const res = await api.get(`/courses/popular?${query.toString()}`);
  const data = res.data?.data ?? {};

  return {
    courses: data.courses || [],
    total:
      data.total ??
      data.totalCourses ??
      data.count ??
      data.totalCount ??
      0,
  };
};

/* ----------------------------------
   GET COURSE BY ID
---------------------------------- */
export const getCourseById = async (courseId) => {
  const res = await api.get(`/courses/${courseId}`);
  return res.data.data; // full course object
};
