import { test, expect } from "@playwright/test";

test.describe("BREW 9 Homepage", () => {
  test("loads homepage with correct brand headline, taglines and CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/BREW 9 — YOUR 9-TO-9 BREW/);

    const heading = page.locator("h1");
    await expect(heading).toContainText("YOUR");
    await expect(heading).toContainText("9-TO-9");
    await expect(heading).toContainText("BREW");

    // CTA buttons
    const menuButton = page.locator('a[href="/menu"]:has-text("View Menu")').first();
    await expect(menuButton).toBeVisible();

    const kioskButton = page.locator('a[href="/locations"]:has-text("Find a Kiosk")').first();
    await expect(kioskButton).toBeVisible();
  });

  test("contains accessible skip link targeting main content", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toHaveCount(1);
  });

  test("displays 3 Core Pillars", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=GOOD COFFEE").first()).toBeVisible();
    await expect(page.locator("text=FAIR PRICE").first()).toBeVisible();
    await expect(page.locator("text=FAST SERVICE").first()).toBeVisible();
  });
});
