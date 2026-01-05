import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../../src/page-objects/login.page';
import { getApiLoginToken, UserCredentials } from '../../src/utils/auth-helper';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

const credentials: UserCredentials = {
  email: process.env.TEST_EMAIL!,
  password: process.env.TEST_PASSWORD!,
};

setup('Authenticate as valid user', async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  await loginPage.setAuthToken(async () => {
    return getApiLoginToken(request, credentials);
  });
  
  await page.context().storageState({ path: authFile });
});
