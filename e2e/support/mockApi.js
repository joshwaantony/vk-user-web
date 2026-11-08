// Stubbed backend for browser tests. Matches the real API response shapes
// (GET /languages, /courses, /courses/popular) and records every request.

export const LANG = {
  EN: "8d24c946-937c-46ee-8b21-40fbf5013caf",
  ML: "ab149bdd-2012-4d3c-ac37-bb7c998c20c1",
  TA: "f5bf3ca0-138b-4521-b44a-193fcb7946bb",
};

export const IMG_OK = "https://res.cloudinary.com/e2e/image/upload/ok.png";
export const IMG_BROKEN = "https://res.cloudinary.com/e2e/image/upload/broken.png";

// 1x1 PNG
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64"
);

const course = (id, title, extra = {}) => ({
  id,
  title,
  price: 999,
  duration: 3600,
  totalStudents: 0,
  createdAt: "2026-01-01T00:00:00.000Z",
  thumbnail: IMG_OK,
  faculty: [{ name: "CA Test Faculty", qualification: "FCA" }],
  isEnrolled: false,
  ...extra,
});

// English: 11 courses in a deliberate admin order (not alphabetical,
// not by date, not by price) so pagination and ordering are observable.
const englishCourses = [
  course("en-01", "Zeta Taxation", { price: 15000, createdAt: "2026-03-01T00:00:00.000Z", totalStudents: 5 }),
  course("en-02", "Alpha Auditing", { price: 300, createdAt: "2026-01-10T00:00:00.000Z", totalStudents: 50, thumbnail: null }),
  course("en-03", "Mid Banking", { price: 4500, createdAt: "2026-05-01T00:00:00.000Z", totalStudents: 20, thumbnail: IMG_BROKEN }),
  ...Array.from({ length: 8 }, (_, i) =>
    course(`en-${String(i + 4).padStart(2, "0")}`, `English Extra ${i + 4}`, {
      price: 1000 + i,
      createdAt: `2026-02-0${(i % 8) + 1}T00:00:00.000Z`,
    })
  ),
];

const malayalamCourses = [
  course("ml-01", "GST Malayalam", { price: 500, createdAt: "2026-04-01T00:00:00.000Z", totalStudents: 9 }),
  course("ml-02", "Accounts Malayalam", { price: 700, createdAt: "2026-06-01T00:00:00.000Z", totalStudents: 3 }),
];

export const DATA = {
  languages: [
    // Deliberately returned out of sortOrder.
    { id: LANG.ML, code: "MALAYALAM", name: "malayalam", isActive: true, sortOrder: 2 },
    { id: LANG.EN, code: "ENGLISH", name: "english", isActive: true, sortOrder: 0 },
    { id: LANG.TA, code: "TAMIL", name: "Tamil", isActive: true, sortOrder: 1 },
    { id: "inactive-hindi", code: "HINDI", name: "Hindi", isActive: false, sortOrder: 3 },
  ],
  courses: {
    [LANG.EN]: englishCourses,
    [LANG.ML]: malayalamCourses,
    [LANG.TA]: [],
  },
  // Admin-curated popular lists (per language) and the homepage list.
  popular: {
    [LANG.EN]: [englishCourses[2], englishCourses[0]],
    [LANG.ML]: [],
    [LANG.TA]: [],
  },
  homepagePopular: [malayalamCourses[0], englishCourses[0], englishCourses[1]],
};

export const ALL_TITLES = [...englishCourses, ...malayalamCourses].map((c) => c.title);

const SORTERS = {
  LATEST: (a, b) => b.createdAt.localeCompare(a.createdAt),
  OLDEST: (a, b) => a.createdAt.localeCompare(b.createdAt),
  PRICE_ASC: (a, b) => a.price - b.price,
  PRICE_DESC: (a, b) => b.price - a.price,
  POPULAR: (a, b) => b.totalStudents - a.totalStudents,
};

export const sortedTitles = (languageId, sortBy) =>
  [...DATA.courses[languageId]].sort(SORTERS[sortBy]).map((c) => c.title);

/**
 * Install the stub on a page.
 * options.delay      { [languageId]: ms }  delay /courses responses
 * options.fail       Set of keys to fail with 500: "languages", "courses", "popular", "homepagePopular"
 *                    (mutable – delete a key to let a Retry succeed)
 */
export async function mockApi(page, options = {}) {
  const requests = [];
  const delay = options.delay || {};
  const fail = options.fail || new Set();

  await page.route(/res\.cloudinary\.com\/e2e\//, (route) =>
    route.request().url().includes("broken")
      ? route.fulfill({ status: 404, body: "" })
      : route.fulfill({ status: 200, contentType: "image/png", body: PNG })
  );

  await page.route(/\/api\/v1\//, async (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname.replace(/^.*\/api\/v1/, "");
    requests.push({ path, params: Object.fromEntries(url.searchParams), url: path + url.search });

    const json = (body, status = 200) =>
      route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
    const serverError = () => json({ success: false, message: "Internal error xyz" }, 500);

    if (path === "/languages") {
      if (fail.has("languages")) return serverError();
      return json({ success: true, data: { languages: DATA.languages } });
    }

    if (path === "/courses/popular") {
      const languageId = url.searchParams.get("languageId");
      const limit = Number(url.searchParams.get("limit") || 6);
      if (!languageId) {
        if (fail.has("homepagePopular")) return serverError();
        return json({ success: true, data: { courses: DATA.homepagePopular.slice(0, limit) } });
      }
      if (fail.has("popular")) return serverError();
      // Real endpoint ignores page and q and sends no pagination.
      return json({ success: true, data: { courses: (DATA.popular[languageId] || []).slice(0, limit) } });
    }

    if (path === "/courses") {
      const languageId = url.searchParams.get("languageId");
      if (fail.has("courses")) return serverError();
      if (!DATA.courses[languageId]) return json({ success: false, message: "Invalid languageId" }, 400);
      if (delay[languageId]) await new Promise((r) => setTimeout(r, delay[languageId]));

      let list = [...DATA.courses[languageId]];
      const q = url.searchParams.get("q");
      if (q) list = list.filter((c) => c.title.toLowerCase().includes(q.toLowerCase()));
      const sortBy = url.searchParams.get("sortBy");
      if (sortBy && SORTERS[sortBy]) list.sort(SORTERS[sortBy]);

      const page_ = Number(url.searchParams.get("page") || 1);
      const limit = Number(url.searchParams.get("limit") || 9);
      const totalItems = list.length;
      const totalPages = Math.max(1, Math.ceil(totalItems / limit));
      return json({
        success: true,
        data: {
          courses: list.slice((page_ - 1) * limit, page_ * limit),
          pagination: {
            page: page_,
            limit,
            totalItems,
            totalPages,
            hasNextPage: page_ < totalPages,
            hasPreviousPage: page_ > 1,
          },
        },
      });
    }

    if (path === "/promos/active") return json({ success: true, data: [] });
    if (path === "/auth/refresh") return json({ success: false, message: "No session" }, 401);

    return json({ success: false, message: "Not found" }, 404);
  });

  return {
    requests,
    fail,
    coursesRequests: () => requests.filter((r) => r.path === "/courses" || r.path === "/courses/popular"),
  };
}

/** Course card titles currently rendered, in DOM order. */
export async function cardTitles(page) {
  const texts = await page.locator("h3").allInnerTexts();
  return texts.map((t) => t.trim()).filter((t) => ALL_TITLES.includes(t));
}
