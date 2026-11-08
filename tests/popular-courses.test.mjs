// Unit tests for popular-course fetching: the admin-defined order returned by
// GET /courses/popular must reach the screen unchanged.
// The HTTP layer is mocked through the shared axios instance's adapter.
import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";

const { default: api } = await import("@/api/axios");
const { getPopularCourses, getCourses, SORT_BY } = await import("@/services/course.service");
const { default: useCourseStore } = await import("@/store/CourseStore");

const EN = "8d24c946-937c-46ee-8b21-40fbf5013caf";
const ML = "ab149bdd-2012-4d3c-ac37-bb7c998c20c1";

// Deliberately NOT sorted by title, price, date or id: this is "admin order".
const course = (id, title, price, createdAt) => ({ id, title, price, createdAt, languageId: EN });
const GLOBAL_ORDER = [
  course("c-3", "Zeta Banking", 4999, "2026-01-01"),
  course("c-1", "Alpha Demo", 0, "2026-05-01"),
  course("c-2", "Mid Tax", 2999, "2026-03-01"),
];
const EN_ORDER = [
  course("e-2", "Tax Basics", 999, "2026-02-01"),
  course("e-9", "Advanced Tax Planning", 5999, "2026-06-01"),
  course("e-1", "Bank Reconciliation", 100, "2026-01-01"),
];
const ML_ORDER = [
  course("m-5", "GST Malayalam", 500, "2026-04-01"),
  course("m-2", "Accounts Malayalam", 700, "2026-06-01"),
];

let calls;
let respond; // (config) => { data, status?, delay? }

const ok = (courses) => ({ data: { success: true, message: "ok", data: { courses } } });

beforeEach(() => {
  calls = [];
  respond = () => ok([]);
  api.defaults.adapter = async (config) => {
    const url = new URL(config.url, "http://test");
    calls.push({ path: url.pathname, params: Object.fromEntries(url.searchParams) });
    const r = respond(config, url) || ok([]);
    if (r.delay) await new Promise((resolve) => setTimeout(resolve, r.delay));
    const status = r.status ?? 200;
    if (status >= 400) {
      const err = new Error(`Request failed with status code ${status}`);
      err.config = config;
      err.response = { status, data: r.data, headers: {}, config };
      throw err;
    }
    return { data: r.data, status, statusText: "OK", headers: {}, config, request: {} };
  };
  useCourseStore.setState({
    popularCourses: [],
    popularCoursesTotal: 0,
    popularLoading: false,
    popularError: null,
    courses: [],
    loading: false,
    error: null,
    hasLoaded: false,
  });
});

const ids = (list) => list.map((c) => c.id);

describe("homepage popular (global order)", () => {
  test("keeps the exact response order and sends no languageId", async () => {
    respond = () => ok(GLOBAL_ORDER);
    const { courses } = await getPopularCourses(6);

    assert.deepEqual(ids(courses), ["c-3", "c-1", "c-2"]);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].path, "/courses/popular");
    assert.deepEqual(calls[0].params, { page: "1", limit: "6" });
  });

  test("passes the limit to the backend and does not trim or reorder locally", async () => {
    respond = (_c, url) => ok(GLOBAL_ORDER.slice(0, Number(url.searchParams.get("limit"))));
    const { courses } = await getPopularCourses(2);
    assert.equal(calls[0].params.limit, "2");
    assert.deepEqual(ids(courses), ["c-3", "c-1"]);
  });

  test("store keeps the order and ignores a stale earlier response", async () => {
    respond = (_c, url) =>
      url.searchParams.get("limit") === "6"
        ? { ...ok(GLOBAL_ORDER.slice(0, 1)), delay: 60 } // slow, older request
        : ok(GLOBAL_ORDER);
    const { fetchPopularCourses } = useCourseStore.getState();
    const slow = fetchPopularCourses(6);
    const fast = fetchPopularCourses(9);
    await Promise.all([slow, fast]);

    assert.deepEqual(ids(useCourseStore.getState().popularCourses), ["c-3", "c-1", "c-2"]);
  });

  for (const [label, data] of [
    ["empty courses array", { success: true, data: { courses: [] } }],
    ["missing data", { success: true }],
    ["courses is not an array", { success: true, data: { courses: { a: 1 } } }],
    ["null body", null],
  ]) {
    test(`handles unexpected response: ${label}`, async () => {
      respond = () => ({ data });
      const { courses, total } = await getPopularCourses(6);
      assert.deepEqual(courses, []);
      assert.equal(total, 0);
    });
  }

  test("store exposes an error (for Retry) when the request fails", async () => {
    respond = () => ({ status: 500, data: { message: "boom" } });
    await useCourseStore.getState().fetchPopularCourses(6);
    const state = useCourseStore.getState();
    assert.deepEqual(state.popularCourses, []);
    assert.ok(state.popularError);
    assert.equal(state.popularLoading, false);
  });
});

describe("catalog Popular filter (per-language order)", () => {
  test("sends the languageId and keeps the language order exactly", async () => {
    respond = () => ok(EN_ORDER);
    const { courses, pagination } = await getCourses({ languageId: EN, sortBy: SORT_BY.POPULAR });

    assert.deepEqual(ids(courses), ["e-2", "e-9", "e-1"]);
    assert.equal(calls[0].path, "/courses/popular");
    assert.equal(calls[0].params.languageId, EN);
    assert.equal(calls[0].params.sortBy, undefined);
    assert.equal(pagination.hasNextPage, false);
    assert.equal(pagination.totalItems, 3);
  });

  test("search filters titles but keeps the original order", async () => {
    respond = () => ok(EN_ORDER);
    const { courses } = await getCourses({ languageId: EN, sortBy: SORT_BY.POPULAR, q: "TAX" });

    // "Tax Basics" stays before "Advanced Tax Planning" (backend order, not alphabetical).
    assert.deepEqual(ids(courses), ["e-2", "e-9"]);
    // Search is not sent to the popular endpoint (it ignores q).
    assert.equal(calls[0].params.q, undefined);
  });

  test("search with no match returns an empty list", async () => {
    respond = () => ok(EN_ORDER);
    const { courses, pagination } = await getCourses({ languageId: EN, sortBy: SORT_BY.POPULAR, q: "zzz" });
    assert.deepEqual(courses, []);
    assert.equal(pagination.totalItems, 0);
  });

  test("empty / unexpected responses give an empty list", async () => {
    for (const data of [{ success: true, data: { courses: [] } }, { success: true }, null]) {
      respond = () => ({ data });
      const { courses } = await getCourses({ languageId: ML, sortBy: SORT_BY.POPULAR });
      assert.deepEqual(courses, []);
    }
  });

  test("refuses to request without a languageId", async () => {
    await assert.rejects(() => getCourses({ sortBy: SORT_BY.POPULAR }));
    assert.equal(calls.length, 0);
  });

  test("a slow response for the previous language never overwrites the current one", async () => {
    respond = (_c, url) =>
      url.searchParams.get("languageId") === EN
        ? { ...ok(EN_ORDER), delay: 80 }
        : ok(ML_ORDER);

    const store = useCourseStore.getState();
    store.setSelectedLanguageId(EN);
    const slowEnglish = useCourseStore.getState().fetchCourses({ languageId: EN, sortBy: "POPULAR" });
    useCourseStore.getState().setSelectedLanguageId(ML);
    const malayalam = useCourseStore.getState().fetchCourses({ languageId: ML, sortBy: "POPULAR" });
    await Promise.all([slowEnglish, malayalam]);

    const state = useCourseStore.getState();
    assert.equal(state.selectedLanguageId, ML);
    assert.deepEqual(ids(state.courses), ["m-5", "m-2"]);
  });
});

describe("regular catalog is unchanged", () => {
  test("default listing still uses /courses without sortBy", async () => {
    respond = () => ({
      data: {
        success: true,
        data: { courses: EN_ORDER, pagination: { page: 1, limit: 9, totalItems: 3, totalPages: 1, hasNextPage: false, hasPreviousPage: false } },
      },
    });
    const { courses } = await getCourses({ languageId: EN });
    assert.equal(calls[0].path, "/courses");
    assert.deepEqual(calls[0].params, { languageId: EN, page: "1", limit: "9" });
    assert.deepEqual(ids(courses), ["e-2", "e-9", "e-1"]);
  });
});
