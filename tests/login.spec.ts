import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  test("Verify login with valid credentials navigates to account page", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page).toHaveURL(/.*\/auth\/login/);

   // await page.getByPlaceholder('email').fill('customer@practicesoftwaretesting.com'); 
    await page.getByPlaceholder('email').fill(process.env.TEST_EMAIL!);
   // await page.getByPlaceholder('password').fill('welcome01');
    await page.getByPlaceholder('password').fill(process.env.TEST_PASSWORD!);

    await page.locator('[data-test="login-submit"]').click();

    await expect(page.locator('[data-test="page-title"]')).toHaveText("My account");

    await expect(page.locator('[data-test="nav-menu"]')).toHaveText("Jane Doe");
  });
});
