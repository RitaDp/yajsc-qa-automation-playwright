import { Locator, Page } from 'playwright/test';
import { HeaderFragment } from '../fragments/header.fragment';

export class AccountPage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.title = page.getByTestId('page-title');
  }

  async navigateAccountPage(): Promise<void> {
    await this.page.goto('/account');
  }
}
