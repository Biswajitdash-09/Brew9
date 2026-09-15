import { test, expect } from "@playwright/test";

test.describe("BREW 9 Menu Page", () => {
  test("renders menu with category filter pills and search bar", async ({ page }) => {
    await page.goto("/menu");
    await expect(page).toHaveTitle(/Menu/);

    // Filter pills
    await expect(page.locator('button[role="tab"]:has-text("All Drinks")')).toBeVisible();
    await expect(page.locator('button[role="tab"]:has-text("Hot Coffee")')).toBeVisible();
    await expect(page.locator('button[role="tab"]:has-text("Cold Coffee")')).toBeVisible();

    // Search input
    const searchInput = page.locator('input[type="search"]');
    await expect(searchInput).toBeVisible();

    // Verify search filtering works locally
    await searchInput.fill("Cappuccino");
    await expect(page.locator("text=Cappuccino")).toBeVisible();
  });
});
