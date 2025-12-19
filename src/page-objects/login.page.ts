import { Locator, Page } from 'playwright/test';
import { HeaderFragment } from '../fragments/headerFragment';

export type UserCredentials = {
  email: string;
  password: string;
};

export class LoginPage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.emailField = this.page.locator('#email');
    this.passwordField = this.page.locator('#password');
    this.submitButton = this.page.locator('[data-test="login-submit"]');
  }

  async navigateLoginPage(): Promise<void> {
    await this.page.goto('/auth/login');
  }

  async performLogin(user: UserCredentials): Promise<void> { 
    await this.emailField.fill(user.email);
    await this.passwordField.fill(user.password);
    await this.submitButton.click();
  }
}
