import { test, expect } from '@playwright/test';
import { AccountPage } from '../../src/page-objects/account.page';

test.describe('Authentication - Login', () => {
  test('Login with valid credentials navigates to account page', async ({ page }) => {
    const accountPage = new AccountPage(page);

    await accountPage.navigateAccountPage();
    await expect(accountPage.header.userMenuButton).toHaveText('Jane Doe');
  });
});
