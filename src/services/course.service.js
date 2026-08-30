



import api from "@/api/axios";

const SORT_BY = {
  LATEST: "LATEST",
  OLDEST: "OLDEST",
  POPULAR: "POPULAR",
  PRICE_ASC: "PRICE_ASC",
  PRICE_DESC: "PRICE_DESC",
};

const normalizeList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.languages)) return payload.languages;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const getLanguageId = (language) =>
  String(
    language?.id ??
      language?._id ??
      language?.languageId ??
      language?.code ??
      ""
  );

const isActiveLanguage = (language) => {
  if (language == null || typeof language !== "object") return true;

  if (Object.prototype.hasOwnProperty.call(language, "active")) {
    return !!language.active;
  }

  if (Object.prototype.hasOwnProperty.call(language, "isActive")) {
    return !!language.isActive;
  }

  if (typeof language.status === "string") {
    return language.status.toUpperCase() === "ACTIVE";
  }

  return true;
};

const normalizeLanguages = (payload) =>
  normalizeList(payload)
    .filter(isActiveLanguage)
    .map((language) => ({
      ...language,
      id: getLanguageId(language),
      label:
        language?.name ??
        language?.title ??
        language?.label ??
        language?.code ??
        "Unnamed language",
    }))
    .filter((language) => language.id);

export const getActiveLanguages = async () => {
  const res = await api.get("/languages");
  const data = res?.data?.data ?? res?.data ?? {};

  return normalizeLanguages(data);
};

/* ----------------------------------
   GET COURSES (FILTER + SEARCH)
---------------------------------- */
export const getCourses = async (params = {}) => {
  const languageId = String(params.languageId || "").trim();

  if (!languageId) {
    throw new Error("languageId is required to load courses");
  }

  const sortBy = params.sortBy || SORT_BY.POPULAR;
  const isPopular = sortBy === SORT_BY.POPULAR;

  if (isPopular) {
    const query = new URLSearchParams({
      languageId,
      page: String(params.page ?? 1),
      limit: String(params.limit ?? 9),
    });
    const res = await api.get(`/courses/popular?${query.toString()}`);
    return {
      courses: res.data?.data?.courses || [],
      pagination: res.data?.data?.pagination || {
        page: 1,
        limit: 9,
        totalItems: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  } else {
    const queryParams = {
      languageId,
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
    return {
      courses: res.data?.data?.courses || [],
      pagination: res.data?.data?.pagination || {
        page: 1,
        limit: 9,
        totalItems: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
};

/* ----------------------------------
   GET ALL COURSES
---------------------------------- */
export const getAllCourses = async (languageId) => {
  const res = await getCourses({
    languageId,
    sortBy: SORT_BY.POPULAR,
    page: 1,
    limit: 9,
  });
  return res.courses;
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
