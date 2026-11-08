import { test, expect } from "@playwright/test";
import { mockApi, cardTitles, DATA } from "./support/mockApi";

test.describe("Homepage Most Popular", () => {
  test("calls /courses/popular?page=1&limit=6 and renders the curated list", async ({ page }) => {
    const api = await mockApi(page);
    await page.goto("/home");

    await expect.poll(() => cardTitles(page)).toEqual(DATA.homepagePopular.map((c) => c.title));
    const req = api.requests.find((r) => r.path === "/courses/popular");
    expect(req.params).toEqual({ page: "1", limit: "6" });
    // Homepage never hits the catalog list endpoint.
    expect(api.requests.some((r) => r.path === "/courses")).toBe(false);
  });

  test("API error shows Retry and recovers", async ({ page }) => {
    const api = await mockApi(page, { fail: new Set(["homepagePopular"]) });
    await page.goto("/home");
    await expect(page.getByText("We couldn't load popular courses right now.", { exact: false })).toBeVisible();

    api.fail.delete("homepagePopular");
    await page.getByRole("button", { name: "Retry" }).click();
    await expect.poll(() => cardTitles(page)).toEqual(DATA.homepagePopular.map((c) => c.title));
  });

  test("empty list shows the empty message", async ({ page }) => {
    const saved = DATA.homepagePopular;
    DATA.homepagePopular = [];
    try {
      await mockApi(page);
      await page.goto("/home");
      await expect(page.getByText("No popular courses available yet.")).toBeVisible();
    } finally {
      DATA.homepagePopular = saved;
    }
  });
});
