import { test, expect } from '@playwright/test';
import { LoginPage, UserCredentials } from '../../src/page-objects/login.page';
import { AccountPage } from '../../src/page-objects/account.page';

/**
 * Test 1: Verify login with valid credentials
 * Steps:
 * Open URL: https://practicesoftwaretesting.com/auth/login
 * Fill in credentials.
 * Click the Login button.
 * Assertions:
 * Verify URL is https://practicesoftwaretesting.com/account
 * Verify page title is "My Account".
 * Verify username "Jane Doe" appears in the navigation bar.
 */

test.describe('Authentication - Login', () => {
  test('Verify login with valid credentials navigates to account page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    const validUser: UserCredentials = {
      email: process.env.TEST_EMAIL!,
      password: process.env.TEST_PASSWORD!
    };

    await loginPage.navigateLoginPage();

    await loginPage.performLogin(validUser);
    
    await expect(page).toHaveURL(/\/account$/);
    await expect(accountPage.title).toHaveText('My account');
    await expect(accountPage.header.userMenuButton).toHaveText('Jane Doe');
  });
});
