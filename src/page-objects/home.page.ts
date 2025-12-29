import { Locator, Page } from 'playwright/test';
import { HeaderFragment } from '../fragments/headerFragment';

export class HomePage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly productCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.productCard = page.getByTestId('product-name');
  }

  async navigateHomePage(): Promise<void> {
    await this.page.goto('/');
  }

  async clickProductByName(name: string): Promise<void> {
    await this.productCard.filter({ hasText: name }).click();
  }
}
