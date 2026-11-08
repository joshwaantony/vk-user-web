import { test, expect } from "@playwright/test";
import { mockApi, cardTitles, sortedTitles, DATA, LANG } from "./support/mockApi";

const languageButton = (page) => page.locator('button[aria-haspopup="listbox"]').nth(0);
const sortButton = (page) => page.locator('button[aria-haspopup="listbox"]').nth(1);

async function chooseLanguage(page, label) {
  await languageButton(page).click();
  await page.getByRole("listbox", { name: "Language select" }).getByRole("option", { name: label, exact: true }).click();
}

async function chooseSort(page, label) {
  await sortButton(page).click();
  await page.getByRole("listbox", { name: "Sort courses" }).getByRole("option", { name: label, exact: true }).click();
}

const adminOrder = (languageId, count = 9) =>
  DATA.courses[languageId].slice(0, count).map((c) => c.title);

test.describe("Language selection", () => {
  test("lists active languages in sortOrder and selects the first one on load", async ({ page }) => {
    await mockApi(page);
    await page.goto("/course");

    await expect(languageButton(page)).toHaveText("english");
    await languageButton(page).click();
    await expect(
      page.getByRole("listbox", { name: "Language select" }).getByRole("option")
    ).toHaveText(["english", "Tamil", "malayalam"]);
  });

  test("refresh goes back to the first language by sortOrder", async ({ page }) => {
    await mockApi(page);
    await page.goto("/course");
    await chooseLanguage(page, "malayalam");
    await expect(languageButton(page)).toHaveText("malayalam");

    await page.reload();
    await expect(languageButton(page)).toHaveText("english");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));
  });

  test("switching language loads that language with its UUID and resets sort to Default", async ({ page }) => {
    const api = await mockApi(page);
    await page.goto("/course");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));

    await chooseSort(page, "Latest");
    await expect(sortButton(page)).toHaveText("Latest");

    await chooseLanguage(page, "malayalam");
    await expect(sortButton(page)).toHaveText("Default");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.ML));

    const last = api.coursesRequests().at(-1);
    expect(last.params.languageId).toBe(LANG.ML);
    expect(last.params.sortBy).toBeUndefined();
  });

  test("a slow response for the previous language never replaces the new one", async ({ page }) => {
    await mockApi(page, { delay: { [LANG.EN]: 2500 } });
    await page.goto("/course");
    await expect(languageButton(page)).toHaveText("english");

    await chooseLanguage(page, "malayalam");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.ML));

    await page.waitForTimeout(3000); // let the delayed English response arrive
    expect(await cardTitles(page)).toEqual(adminOrder(LANG.ML));
  });
});

test.describe("Ordering and sorting", () => {
  test("default request has no sortBy/price params and keeps the admin order", async ({ page }) => {
    const api = await mockApi(page);
    await page.goto("/course");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));

    const first = api.coursesRequests()[0];
    expect(first.path).toBe("/courses");
    expect(first.params).toEqual({ languageId: LANG.EN, page: "1", limit: "9" });

    // Course above ₹10,000 is listed.
    await expect(page.getByText("₹15000")).toBeVisible();
  });

  for (const [label, sortBy] of [
    ["Latest", "LATEST"],
    ["Oldest", "OLDEST"],
    ["Price: Low to High", "PRICE_ASC"],
    ["Price: High to Low", "PRICE_DESC"],
  ]) {
    test(`sort "${label}" sends sortBy=${sortBy} with the language id`, async ({ page }) => {
      const api = await mockApi(page);
      await page.goto("/course");
      await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));

      await chooseSort(page, label);
      await expect.poll(() => cardTitles(page)).toEqual(sortedTitles(LANG.EN, sortBy).slice(0, 9));

      const last = api.coursesRequests().at(-1);
      expect(last.path).toBe("/courses");
      expect(last.params.sortBy).toBe(sortBy);
      expect(last.params.languageId).toBe(LANG.EN);
    });
  }

  test("Popular uses /courses/popular for the language; All Courses resets to Default", async ({ page }) => {
    const api = await mockApi(page);
    await page.goto("/course");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));

    await page.getByRole("button", { name: "Popular Courses" }).click();
    await expect(sortButton(page)).toHaveText("Popular");
    await expect.poll(() => cardTitles(page)).toEqual(DATA.popular[LANG.EN].map((c) => c.title));
    const popularReq = api.coursesRequests().at(-1);
    expect(popularReq.path).toBe("/courses/popular");
    expect(popularReq.params.languageId).toBe(LANG.EN);
    await expect(page.getByRole("button", { name: "Load More Courses" })).toHaveCount(0);

    await page.getByRole("button", { name: "All Courses" }).click();
    await expect(sortButton(page)).toHaveText("Default");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));
    expect(api.coursesRequests().at(-1).params.sortBy).toBeUndefined();
  });

  test("one request per change (no duplicate fetches)", async ({ page }) => {
    const api = await mockApi(page);
    await page.goto("/course");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));
    await page.waitForTimeout(500);
    const before = api.coursesRequests().length;

    await page.getByRole("button", { name: "Popular Courses" }).click();
    await expect.poll(() => cardTitles(page)).toEqual(DATA.popular[LANG.EN].map((c) => c.title));
    await page.waitForTimeout(800);
    expect(api.coursesRequests().length - before).toBe(1);
  });

  test("Load More fetches page 2 of the same language and sort", async ({ page }) => {
    const api = await mockApi(page);
    await page.goto("/course");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));

    await page.getByRole("button", { name: "Load More Courses" }).click();
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN, 11));

    const page2 = api.coursesRequests().find((r) => r.params.page === "2");
    expect(page2.params.languageId).toBe(LANG.EN);
    expect(page2.params.sortBy).toBeUndefined();
  });
});

test.describe("Search", () => {
  test("search sends q, clear button restores the full list", async ({ page }) => {
    const api = await mockApi(page);
    await page.goto("/course");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));

    const search = page.getByLabel("Search courses");
    await search.fill("alpha");
    await expect.poll(() => cardTitles(page)).toEqual(["Alpha Auditing"]);
    expect(api.coursesRequests().at(-1).params.q).toBe("alpha");

    await page.getByRole("button", { name: "Clear search" }).click();
    await expect(search).toHaveValue("");
    await expect(search).toBeFocused();
    await expect(page.getByRole("button", { name: "Clear search" })).toHaveCount(0);
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));
    expect(api.coursesRequests().at(-1).params.q).toBeUndefined();
  });

  test("Escape clears the search", async ({ page }) => {
    await mockApi(page);
    await page.goto("/course");
    const search = page.getByLabel("Search courses");
    await search.fill("alpha");
    await expect.poll(() => cardTitles(page)).toEqual(["Alpha Auditing"]);
    await search.press("Escape");
    await expect(search).toHaveValue("");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));
  });
});

test.describe("Empty, error and loading states", () => {
  test("no search results", async ({ page }) => {
    await mockApi(page);
    await page.goto("/course");
    await page.getByLabel("Search courses").fill("zzzz");
    await expect(page.getByText("No courses found matching your search.")).toBeVisible();
  });

  test("language with no courses", async ({ page }) => {
    await mockApi(page);
    await page.goto("/course");
    await chooseLanguage(page, "Tamil");
    await expect(page.getByText("No courses available in Tamil yet.")).toBeVisible();
  });

  test("popular with zero results", async ({ page }) => {
    await mockApi(page);
    await page.goto("/course");
    await chooseLanguage(page, "malayalam");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.ML));
    await page.getByRole("button", { name: "Popular Courses" }).click();
    await expect(page.getByText("No popular courses available for malayalam yet.")).toBeVisible();
  });

  test("course API error shows a friendly message and Retry recovers", async ({ page }) => {
    const api = await mockApi(page, { fail: new Set(["courses"]) });
    await page.goto("/course");
    await expect(page.getByText("We couldn't load courses right now.", { exact: false })).toBeVisible();
    await expect(page.getByText("Internal error xyz")).toHaveCount(0);

    api.fail.delete("courses");
    await page.getByRole("button", { name: "Retry" }).click();
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));
  });

  test("languages API error shows Retry and recovers", async ({ page }) => {
    const api = await mockApi(page, { fail: new Set(["languages"]) });
    await page.goto("/course");
    await expect(page.getByRole("button", { name: "Retry" })).toBeVisible();

    api.fail.delete("languages");
    await page.getByRole("button", { name: "Retry" }).click();
    await expect(languageButton(page)).toHaveText("english");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));
  });

  test("no empty-state message while the request is still loading", async ({ page }) => {
    await mockApi(page, { delay: { [LANG.EN]: 2000 } });
    await page.goto("/course");
    await page.waitForTimeout(800);
    await expect(page.getByText(/No courses|No popular courses/)).toHaveCount(0);
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));
  });
});

test.describe("Thumbnails and layout", () => {
  test("missing and broken thumbnails show the placeholder; valid ones render", async ({ page }) => {
    await mockApi(page);
    await page.goto("/course");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));

    await expect(page.getByRole("img", { name: "Alpha Auditing thumbnail unavailable" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Mid Banking thumbnail unavailable" })).toBeVisible();
    const ok = page.getByRole("img", { name: "Zeta Taxation", exact: true });
    await expect(ok).toBeVisible();
    expect(await ok.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
  });

  test("no horizontal page scroll", async ({ page }) => {
    await mockApi(page);
    await page.goto("/course");
    await expect.poll(() => cardTitles(page)).toEqual(adminOrder(LANG.EN));
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
