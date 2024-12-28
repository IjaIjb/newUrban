import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://urban-chi.vercel.app/auth/login");
  await page.locator("#emailOrUsername").click();
  await page
    .locator("#emailOrUsername")
    .fill("akinmutimioluwagbemiro@gmail.com");
  await page.locator("#password").click();
  await page.locator("#password").fill("123456");
  await page.getByRole("button", { name: "login" }).click();
});
