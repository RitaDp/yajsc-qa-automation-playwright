import { baseConfig } from '../../src/config/base.config';
import { test, expect } from '../../src/fixtures/base-pages.fixture';

test.describe('Authentication - Login', { tag: '@smoke' }, () => {
  test('Login with valid credentials navigates to account page', async ({ loggedInApp }) => {

    await loggedInApp.accountPage.navigateAccountPage();
    await expect(loggedInApp.accountPage.header.userMenuButton).toHaveText(baseConfig.customer.name);
  });
});
