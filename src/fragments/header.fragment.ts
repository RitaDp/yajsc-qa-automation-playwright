import { Locator, Page } from 'playwright/test';

export class HeaderFragment {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly categoriesButton: Locator;
  readonly contactLink: Locator;
  readonly signInLink: Locator;
  readonly userMenuButton: Locator;
  readonly cartIcon: Locator;
  readonly languageSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByTestId('nav-home');
    this.categoriesButton = page.getByTestId('nav-categories');
    this.contactLink = page.getByTestId('nav-contact');
    this.signInLink = page.getByTestId('nav-sign-in');
    this.userMenuButton = page.getByTestId('nav-menu');
    this.cartIcon = page.getByTestId('nav-cart');
    this.languageSelect = page.getByTestId('language-select');
  }
}
