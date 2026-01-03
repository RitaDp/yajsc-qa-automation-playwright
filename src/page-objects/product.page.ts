import { Locator, Page } from 'playwright/test';
import { HeaderFragment } from '../fragments/headerFragment';

export class ProductPage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly addFavoritesButton: Locator;
  readonly alertMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.productName = page.getByTestId('product-name');
    this.productPrice = page.getByTestId('unit-price');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.addFavoritesButton = page.getByTestId('add-to-favorites');
    this.alertMessage = page.getByRole('alert');
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
