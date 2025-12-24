import { Locator, Page } from 'playwright/test';
import { HeaderFragment } from '../fragments/headerFragment';

export class AccountPage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.title = this.page.getByTestId('page-title');
  }
}
