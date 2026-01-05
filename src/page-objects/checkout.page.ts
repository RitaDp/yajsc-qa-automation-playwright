import { Locator, Page } from 'playwright/test';
import { HeaderFragment } from '../fragments/headerFragment';

export class Checkout {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly productTitle: Locator;
  readonly productQuantity: Locator;
  readonly productPrice: Locator;
  readonly totalProductPrice: Locator;
  readonly cartTotal: Locator;
  readonly continueShoppingButton: Locator;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.productTitle = page.getByTestId('product-title');
    this.productQuantity = page.getByTestId('product-quantity');
    this.productPrice = page.getByTestId('product-price');
    this.totalProductPrice = page.getByTestId('line-price');
    this.cartTotal = page.getByTestId('cart-total');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.proceedButton = page.getByTestId('proceed-1');
  }

  async navigateCheckoutPage(): Promise<void> {
    await this.page.goto('/checkout');
  }
}