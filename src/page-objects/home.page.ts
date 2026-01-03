import { Locator, Page, Response } from 'playwright/test';
import { HeaderFragment } from '../fragments/headerFragment';

export class HomePage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly productCard: Locator;
  readonly productPrice: Locator;
  readonly sortDropdown: Locator;
  readonly filterCheckbox: (option: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.productCard = page.getByTestId('product-name');
    this.productPrice = page.getByTestId('product-price');
    this.sortDropdown = page.getByTestId('sort');
    this.filterCheckbox = (option: string) => page.getByRole('checkbox', { name: option });
  }

  async navigateHomePage(): Promise<void> {
    await this.page.goto('/');
  }

  async clickProductByName(name: string): Promise<void> {
    await this.productCard.filter({ hasText: name }).click();
  }

  async waitApiProductResponse (path: string, trigger: () => Promise<void>): Promise<Response> {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        new RegExp(`products.*${path}=`).test(response.url()) &&
          response.status() === 200
    );
    await trigger();
    return await responsePromise;
  }

  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    const names = await this.productCard.allTextContents();
    return names.map(name => name.trim());
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.productPrice.allTextContents();
    return prices.map(p => parseFloat(p.replace(/[^\d.]/g, '')));
  }

  async filterProducts(option: string): Promise<void> {
    await this.filterCheckbox(option).check();
  }
}

