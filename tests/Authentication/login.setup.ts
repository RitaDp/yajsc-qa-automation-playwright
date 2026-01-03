import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../src/page-objects/login.page';
// import path from 'path';

// const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

const authFile = 'playwright/.auth/user.json';

setup('Authenticate as valid user', async ({ request, page }) => {
  const loginPage = new LoginPage(page);

  const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
    data: {
      email: process.env.TEST_EMAIL,
      password: process.env.TEST_PASSWORD,
    },
  });

  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json() as { access_token: string };;
  const token = responseBody.access_token;

  await loginPage.navigateLoginPage();

  await page.evaluate((jwt) => {
    localStorage.setItem('auth-token', jwt);
  }, token);

  await page.context().storageState({ path: authFile });
});
