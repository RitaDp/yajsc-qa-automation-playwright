import { Locator, Page } from 'playwright/test';
import { HeaderFragment } from '../fragments/headerFragment';

export class ProductPage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly addFavouritesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.productName = this.page.locator('[data-test="product-name"]');
    this.productPrice = this.page.locator('[data-test="unit-price"]');
    this.addToCartButton = this.page.locator('[data-test="add-to-cart"]');
    this.addFavouritesButton = this.page.locator('[data-test="add-to-favorites"]');
  }
}
