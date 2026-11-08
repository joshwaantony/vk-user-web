import api from "@/api/axios";

export const SORT_BY = {
  LATEST: "LATEST",
  OLDEST: "OLDEST",
  POPULAR: "POPULAR",
  PRICE_ASC: "PRICE_ASC",
  PRICE_DESC: "PRICE_DESC",
};

const VALID_SORT_VALUES = new Set(Object.values(SORT_BY));

const EMPTY_PAGINATION = {
  page: 1,
  limit: 9,
  totalItems: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

const normalizeList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.languages)) return payload.languages;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

// Only a real language id (UUID) is accepted. Never fall back to code/name.
const getLanguageId = (language) => {
  const id = language?.id ?? language?._id ?? language?.languageId;
  return typeof id === "string" ? id.trim() : id != null ? String(id) : "";
};

const isActiveLanguage = (language) => {
  if (language == null || typeof language !== "object") return false;

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
    .map((language, index) => ({
      ...language,
      id: getLanguageId(language),
      label:
        language?.name ??
        language?.title ??
        language?.label ??
        language?.code ??
        "Unnamed language",
      _index: index,
    }))
    .filter((language) => language.id)
    // Respect the admin-configured language order when the API provides it.
    .sort(
      (a, b) =>
        (a.sortOrder ?? a._index) - (b.sortOrder ?? b._index) ||
        a._index - b._index
    )
    .map(({ _index, ...language }) => language);

export const getActiveLanguages = async () => {
  const res = await api.get("/languages");
  const data = res?.data?.data ?? res?.data ?? {};

  return normalizeLanguages(data);
};

const hasValue = (value) =>
  value !== undefined && value !== null && String(value).trim() !== "";

/* ----------------------------------
   POPULAR COURSES FOR THE CATALOG (selected language)
   GET /courses/popular?languageId=<uuid>&page=1&limit=<n>
   The endpoint returns the curated list in one response: it ignores
   `page` and `q` and sends no pagination. So:
   - no Load More (hasNextPage: false),
   - search is applied to titles here (filter only, order untouched).
---------------------------------- */
const POPULAR_CATALOG_LIMIT = 50;

const getPopularCatalogCourses = async (params, config = {}) => {
  // No paging on this endpoint, so fetch the whole curated list at once.
  const limit = Math.max(Number(params.limit ?? 9), POPULAR_CATALOG_LIMIT);
  const query = new URLSearchParams({
    languageId: params.languageId,
    page: "1",
    limit: String(limit),
  });

  const res = await api.get(`/courses/popular?${query.toString()}`, config);
  const data = res.data?.data ?? {};
  let courses = Array.isArray(data.courses) ? data.courses : [];

  const term = String(params.q ?? "").trim().toLowerCase();
  if (term) {
    courses = courses.filter((course) =>
      String(course?.title ?? "").toLowerCase().includes(term)
    );
  }

  return {
    courses,
    pagination: {
      ...EMPTY_PAGINATION,
      limit,
      totalItems: courses.length,
    },
  };
};

/* ----------------------------------
   GET COURSES (LANGUAGE + FILTER + SEARCH + SORT)
   - languageId (UUID) is required.
   - sortBy omitted  -> backend returns the admin-configured order
     for that language. The response order is never re-sorted here.
   - Only explicitly provided filters are sent.
---------------------------------- */
export const getCourses = async (params = {}, config = {}) => {
  const languageId = String(params.languageId || "").trim();

  if (!languageId) {
    throw new Error("languageId is required to load courses");
  }

  // "Popular" = admin-curated popular list for this language.
  if (params.sortBy === SORT_BY.POPULAR) {
    return getPopularCatalogCourses({ ...params, languageId }, config);
  }

  const query = new URLSearchParams({ languageId });

  if (hasValue(params.q)) query.set("q", String(params.q).trim());
  if (hasValue(params.categoryId)) query.set("categoryId", String(params.categoryId));
  if (hasValue(params.level)) query.set("level", String(params.level));
  if (hasValue(params.minPrice)) query.set("minPrice", String(params.minPrice));
  if (hasValue(params.maxPrice)) query.set("maxPrice", String(params.maxPrice));
  if (VALID_SORT_VALUES.has(params.sortBy)) query.set("sortBy", params.sortBy);

  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 9));

  const res = await api.get(`/courses?${query.toString()}`, config);
  const data = res.data?.data ?? {};

  return {
    courses: Array.isArray(data.courses) ? data.courses : [],
    pagination: data.pagination || {
      ...EMPTY_PAGINATION,
      limit: Number(params.limit ?? 9),
    },
  };
};

/* ----------------------------------
   GET POPULAR COURSES (homepage "Most Popular")
   Admin-curated popular list: GET /courses/popular?page=1&limit=<n>
---------------------------------- */
export const getPopularCourses = async (limit = 6) => {
  const query = new URLSearchParams({
    page: "1",
    limit: String(limit),
  });

  const res = await api.get(`/courses/popular?${query.toString()}`);
  const data = res.data?.data ?? {};

  return {
    courses: Array.isArray(data.courses) ? data.courses : [],
    total:
      data.pagination?.totalItems ??
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
