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
    this.homeLink = this.page.getByTestId('nav-home');
    this.categoriesButton = this.page.getByTestId('nav-categories');
    this.contactLink = this.page.getByTestId('nav-contact');
    this.signInLink = this.page.getByTestId('nav-sign-in');
    this.userMenuButton = this.page.getByTestId('nav-menu');
    this.languageSelect = this.page.getByTestId('language-select');
  }
}
