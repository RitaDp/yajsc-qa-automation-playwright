import { test as setup } from '../../src/fixtures/base-pages.fixture';
import { getApiLoginToken } from '../../src/utils/auth.helper';
import { baseConfig } from '../../src/config/base.config';

setup('Authenticate as valid user', async ({ allPages, request }) => {
  await allPages.loginPage.setAuthToken(async () => {
    return getApiLoginToken(request, baseConfig.customer);
  });

  await allPages.page.reload();
  
  await allPages.page.context().storageState({ path: baseConfig.authFile });
});
