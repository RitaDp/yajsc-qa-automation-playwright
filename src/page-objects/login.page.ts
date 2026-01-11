import { Locator, Page } from 'playwright/test';
import { HomePage } from './home.page';
export class LoginPage {
  readonly page: Page;
  readonly homePage: HomePage;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.emailField = page.getByTestId('email');
    this.passwordField = page.getByTestId('password');
    this.submitButton = page.getByTestId('login-submit');
  }

  async navigateLoginPage(): Promise<void> {
    await this.page.goto('/auth/login');
  }

  async setAuthToken(tokenCallback: () => Promise<string>): Promise<void> {
    const token = await tokenCallback();
    await this.homePage.navigateHomePage();
    await this.page.evaluate((jwt) => {
      localStorage.setItem('auth-token', jwt);
    }, token);
  }
}
