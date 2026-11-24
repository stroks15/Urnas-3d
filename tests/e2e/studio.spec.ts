import { test, expect } from "@playwright/test";

test("the 3D studio hydrates, creates WebGL canvas and keeps controls interactive", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", error => pageErrors.push(error.message));

  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByText("NEXTLI", { exact: false }).first()).toBeVisible();

  const canvas = page.locator(".scene canvas");
  await expect(canvas).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText("No se pudo iniciar el estudio 3D")).toHaveCount(0);

  const canvasInfo = await canvas.evaluate((element: HTMLCanvasElement) => {
    const gl = element.getContext("webgl2") || element.getContext("webgl");
    return {
      width: element.width,
      height: element.height,
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight,
      hasWebGL: Boolean(gl),
    };
  });

  expect(canvasInfo.clientWidth).toBeGreaterThan(0);
  expect(canvasInfo.clientHeight).toBeGreaterThan(0);
  expect(canvasInfo.hasWebGL).toBe(true);

  await page.getByRole("button", { name: "Corazón liso" }).click();
  await expect(page.locator(".scene canvas")).toBeVisible();
  await page.waitForTimeout(1_000);

  expect(pageErrors, pageErrors.join("\n")).toEqual([]);
  await expect(page.getByText("No se pudo iniciar el estudio 3D")).toHaveCount(0);
});
