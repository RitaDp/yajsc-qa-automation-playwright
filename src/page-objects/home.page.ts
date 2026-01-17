import { Locator, Page, Response } from 'playwright/test';
export class HomePage {
  readonly page: Page;
  readonly productCard: Locator;
  readonly productPrice: Locator;
  readonly sortDropdown: Locator;
  readonly filterCheckbox: (option: string) => Locator;

  constructor(page: Page) {
    this.page = page;
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

  async clickProductByIndex(index: number): Promise<void> {
    await this.productCard.nth(index).click();
  }

  /**
   * Waits for a response from the Products API with a specific query parameter
   * @param path - The query parameter or path segment to match in the URL (example, 'sort', 'by_category')
   * @param trigger - An asynchronous function (action) that triggers the request (example, applying a sorting or filter)
   * @returns {Promise<Response>} - Returns the Playwright Response object for further analysis
   * @example
   * const response = await allPages.homePage.waitApiAllProductsResponse(path, async () => 
   * await allPages.homePage.sortBy('Name (A - Z)');
   * });
   */
  async waitApiAllProductsResponse (path: string, trigger: () => Promise<void>): Promise<Response> {
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

  async getAllProductNames(): Promise<string[]> {
    const names = await this.productCard.allTextContents();
    return names.map(name => name.trim());
  }

  async getAllProductPrices(): Promise<number[]> {
    const prices = await this.productPrice.allTextContents();
    return prices.map(p => parseFloat(p.replace(/[^\d.]/g, '')));
  }

  async filterProducts(option: string): Promise<void> {
    await this.filterCheckbox(option).check();
  }

  async getPageProductsCount(): Promise<number> {
    const count = await this.productCard.count();
    return count;
  }
}

