import { test as setup, expect } from '@playwright/test';
import { HomePage } from '../../src/page-objects/home.page';
import path from 'path';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

setup('Authenticate as valid user', async ({ request, page }) => {
  const homePage = new HomePage(page);

  const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
    data: {
      email: process.env.TEST_EMAIL,
      password: process.env.TEST_PASSWORD,
    },
  });

  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json() as { access_token: string };;
  const token = responseBody.access_token;

  await homePage.navigateHomePage();

  await page.evaluate((jwt) => {
    localStorage.setItem('auth-token', jwt);
  }, token);

  await page.context().storageState({ path: authFile });
});
