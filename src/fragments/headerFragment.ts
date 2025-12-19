import { Locator, Page } from 'playwright/test';

export class HeaderFragment {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly categoriesButton: Locator;
  readonly contactLink: Locator;
  readonly signInLink: Locator;
  readonly userMenuButton: Locator;
  readonly languageSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = this.page.locator('[data-test="nav-home"]');
    this.categoriesButton = this.page.locator('[data-test="nav-categories"]');
    this.contactLink = this.page.locator('[data-test="nav-contact"]');
    this.signInLink = this.page.locator('[data-test="nav-sign-in"]');
    this.userMenuButton = this.page.locator('[data-test="nav-menu"]');
    this.languageSelect = this.page.locator('[data-test="language-select"]');
  }
}
