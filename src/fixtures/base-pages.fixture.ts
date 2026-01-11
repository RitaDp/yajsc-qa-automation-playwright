import { test as base } from '@playwright/test';
import { AllPages } from '../page-objects/all.pages';
import path from 'path';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

type TestFixtures = {
  allPages: AllPages;
  loggedInApp: AllPages;
};

export const test = base.extend<TestFixtures>({
  allPages: async ({ page }, use) => {
    const allPages = new AllPages(page);

    await use(allPages);
  },
  loggedInApp: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: authFile });
    const allPages = new AllPages(await context.newPage());

    await use(allPages);
    await context.close();
  }
});

export { expect } from '@playwright/test';