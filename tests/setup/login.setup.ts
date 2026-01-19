import { test as setup } from '../../src/fixtures/base-pages.fixture';
import path from 'path';
import { getApiLoginToken, UserCredentials } from '../../src/utils/auth.helper';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

const credentials: UserCredentials = {
  email: process.env.TEST_EMAIL!,
  password: process.env.TEST_PASSWORD!,
};

setup('Authenticate as valid user', async ({ allPages, request }) => {
  await allPages.loginPage.setAuthToken(async () => {
    return getApiLoginToken(request, credentials);
  });

  await allPages.page.reload();
  
  await allPages.page.context().storageState({ path: authFile });
});
