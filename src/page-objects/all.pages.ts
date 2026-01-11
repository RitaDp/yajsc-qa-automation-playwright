import { Page } from 'playwright/test';
import { AccountPage } from './account.page';
import { CheckoutPage } from './checkout.page';
import { HomePage } from './home.page';
import { LoginPage } from './login.page';
import { ProductPage } from './product.page';

export class AllPages {
  readonly page: Page;
  readonly loginPage: LoginPage;
  readonly accountPage: AccountPage;
  readonly homePage: HomePage;
  readonly productPage: ProductPage;
  readonly checkoutPage: CheckoutPage;

  constructor (page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.accountPage = new AccountPage(page);
    this.homePage = new HomePage(page);
    this.productPage = new ProductPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }
}