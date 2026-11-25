import { test, expect, type Page } from "@playwright/test";
import { statSync, readFileSync } from "node:fs";

const ERROR_TITLE = "No se pudo iniciar el estudio 3D";

async function openStudio(page: Page) {
  const pageErrors: string[] = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  // The studio must not depend on third-party hosts (HDR, fonts): the APK may be offline.
  await page.route(url => !["127.0.0.1", ""].includes(url.hostname), route => route.abort());
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".scene canvas")).toBeVisible({ timeout: 30_000 });
  return pageErrors;
}

async function expectHealthy(page: Page, pageErrors: string[]) {
  await page.waitForTimeout(500);
  expect(pageErrors, pageErrors.join("\n")).toEqual([]);
  await expect(page.getByText(ERROR_TITLE)).toHaveCount(0);
  await expect(page.locator(".scene canvas")).toBeVisible();
}

test("the 3D studio hydrates and creates a WebGL canvas", async ({ page }) => {
  const pageErrors = await openStudio(page);
  const info = await page.locator(".scene canvas").evaluate((element: HTMLCanvasElement) => ({
    width: element.clientWidth,
    height: element.clientHeight,
    hasWebGL: Boolean(element.getContext("webgl2") || element.getContext("webgl")),
  }));
  expect(info.width).toBeGreaterThan(0);
  expect(info.height).toBeGreaterThan(0);
  expect(info.hasWebGL).toBe(true);
  await expectHealthy(page, pageErrors);
});

test("all bases, species, finishes, modes and engraving zones render without errors", async ({ page }) => {
  test.setTimeout(180_000);
  const pageErrors = await openStudio(page);
  const sections = page.locator(".panel > .section");
  const bases = sections.nth(0).locator(".grid button");
  const species = sections.nth(1).locator(".grid button");
  const finishes = page.locator(".finishes button");
  await expect(bases).toHaveCount(21);
  await expect(species).toHaveCount(25);
  await expect(finishes).toHaveCount(6);
  for (const group of [bases, species, finishes, page.locator(".paws button")]) {
    for (let i = 0; i < (await group.count()); i++) {
      await group.nth(i).click();
      await page.waitForTimeout(80);
    }
  }
  await page.getByPlaceholder("Siempre estarás en nuestro corazón").fill("Siempre contigo, pequeña ñ");
  for (const name of ["Solo animal", "Solo huella", "Animal + huella", "Sobresaliente", "Hundida", "Tapa superior", "Trasera", "Lateral derecho", "Frontal", "Solo base", "Solo figura", "Toda la pieza"]) {
    await page.getByRole("button", { name, exact: true }).click();
    await page.waitForTimeout(80);
  }
  await expectHealthy(page, pageErrors);
});

test("exports PNG, STL and GLB files", async ({ page }) => {
  test.setTimeout(120_000);
  const pageErrors = await openStudio(page);
  await page.waitForTimeout(2_000);
  const download = async (button: string) => {
    const [file] = await Promise.all([page.waitForEvent("download", { timeout: 60_000 }), page.getByRole("button", { name: button, exact: true }).first().click()]);
    const path = await file.path();
    expect(statSync(path).size).toBeGreaterThan(1_000);
    return readFileSync(path);
  };
  const png = await download("Guardar diseño PNG");
  expect(png.readUInt32BE(16)).toBe(2048);
  expect(png.readUInt32BE(20)).toBe(2048);
  const stl = await download("Descargar STL");
  expect(stl.subarray(0, 5).toString()).toBe("solid");
  const glb = await download("Descargar GLB");
  expect(glb.subarray(0, 4).toString()).toBe("glTF");
  await expectHealthy(page, pageErrors);
});

test("cloud save reports its status without breaking the studio", async ({ page }) => {
  const pageErrors = await openStudio(page);
  await page.getByRole("button", { name: "Respaldar en la nube" }).click();
  await expect(page.getByRole("status")).toContainText(/Supabase|guardar/i, { timeout: 20_000 });
  await expectHealthy(page, pageErrors);
});
