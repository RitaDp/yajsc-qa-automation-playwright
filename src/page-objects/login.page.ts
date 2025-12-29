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
    this.emailField = page.getByTestId('email');
    this.passwordField = page.getByTestId('password');
    this.submitButton = page.getByTestId('login-submit');
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
