import { test, expect } from '@playwright/test';
import { AccountPage } from '../../src/page-objects/account.page';
import { HomePage } from '../../src/page-objects/home.page';

test.describe('Authentication - Login', () => {
  test('Login with valid credentials navigates to account page', async ({ page }) => {
    const accountPage = new AccountPage(page);
    const homePage = new HomePage(page);

    await homePage.navigateHomePage();

    await accountPage.navigateAccountPage();
    await expect(page).toHaveURL(/\/account$/);
    await expect(accountPage.header.userMenuButton).toHaveText('Jane Doe');
  });
});
