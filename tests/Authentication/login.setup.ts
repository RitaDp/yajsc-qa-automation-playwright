import { test as setup, expect } from '@playwright/test';
import { LoginPage, UserCredentials } from '../../src/page-objects/login.page';
//import path from 'path';

//const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

const authFile = 'playwright/.auth/user.json';

setup('Authenticate as valid user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const validUser: UserCredentials = {
    email: process.env.TEST_EMAIL!,
    password: process.env.TEST_PASSWORD!
  };

  await loginPage.navigateLoginPage();
  await loginPage.performLogin(validUser);
    
  await expect(page).toHaveURL(/\/account$/);

  await page.context().storageState({ path: authFile });
});
