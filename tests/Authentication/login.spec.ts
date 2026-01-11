import { test, expect } from '../../src/fixtures/base-pages.fixture';

test.describe('Authentication - Login', () => {
  test('Login with valid credentials navigates to account page', async ({ loggedInApp }) => {
    await loggedInApp.homePage.navigateHomePage();

    await loggedInApp.accountPage.navigateAccountPage();
    await expect(loggedInApp.page).toHaveURL(/\/account$/);
    await expect(loggedInApp.accountPage.header.userMenuButton).toHaveText('Jane Doe');
  });
});
