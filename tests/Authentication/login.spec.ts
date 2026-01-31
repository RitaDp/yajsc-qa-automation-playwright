import { baseConfig } from '../../src/config/base.config';
import { test, expect } from '../../src/fixtures/base-pages.fixture';

test.describe('Authentication - Login', { tag: '@smoke' }, () => {
  test('Login with valid credentials navigates to account page', async ({ loggedInApp }) => {
    await test.step('Navigate to the Account page', async () => {
      await loggedInApp.accountPage.navigateAccountPage();
    });
    
    await test.step('Verify that the user name is displayed correctly in the header', async () => {
      await expect(loggedInApp.accountPage.header.userMenuButton).toHaveText(baseConfig.customer.name);
    });
  });
});
