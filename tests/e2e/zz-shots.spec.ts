import { test, expect } from "@playwright/test";
test("screenshots", async ({ page }) => {
  test.setTimeout(180_000);
  await page.goto("/");
  await expect(page.locator(".scene canvas")).toBeVisible({ timeout: 30_000 });
  const bases = page.locator(".panel > .section").nth(0).locator(".grid button");
  for (let i = 0; i < 21; i++) {
    await bases.nth(i).click();
    await page.waitForTimeout(900);
    await page.locator(".scene").screenshot({ path: `shots/${String(i).padStart(2, "0")}.jpg`, type: "jpeg", quality: 70 });
  }
});
