import { test, expect } from "@playwright/test";

  const EMAIL = process.env.TEST_EMAIL!;
  const PASSWORD = process.env.TEST_PASSWORD!;

test.describe("Login", () => {
  test("Verify login with valid credentials navigates to account page", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page).toHaveURL(/.*\/auth\/login/);

    await page.fill("#email", EMAIL);
    await page.fill("#password", PASSWORD);
    await page.locator('[data-test="login-submit"]').click();

    await expect(page.locator('[data-test="page-title"]')).toHaveText("My account");

    await expect(page.locator('[data-test="nav-menu"]')).toHaveText("Jane Doe");
  });
});
