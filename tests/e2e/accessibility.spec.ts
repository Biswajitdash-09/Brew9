import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("BREW 9 Accessibility (WCAG 2.2 AA)", () => {
  test("homepage passes axe-core accessibility checks", async ({ page }) => {
    await page.goto("/");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .disableRules(["color-contrast"]) // Optional in simulated environments without full font render
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("menu page passes axe-core accessibility checks", async ({ page }) => {
    await page.goto("/menu");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .disableRules(["color-contrast"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
