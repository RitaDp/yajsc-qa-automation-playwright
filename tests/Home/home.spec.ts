import { test, expect } from 'playwright/test';
import { HomePage } from '../../src/page-objects/home.page';
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from './product-constants';

test.describe('Products: sorting and filtering', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateHomePage();
  });

  /**
  * Test 2 & 3: Verify user can perform sorting by name (asc & desc)
  * Steps:
  * Open homepage: https://practicesoftwaretesting.com.
  * Select Name (A - Z) / Name (Z - A) in the sort dropdown.
  * Assert: 1. Verify all the displayed products are sorted by names ascending or descending.
  */

  test.describe('Sorting products by name', () => {
    const sortingCases = [
      SORT_OPTIONS.NAME_ASC,
      SORT_OPTIONS.NAME_DESC
    ];

    sortingCases.forEach (({ option, path }) => {
      test(`User can sort by name ${option}`, async () => {
        const response = await homePage.waitApiProductResponse(path, async () => 
          await homePage.sortBy(option));

        const { data } = (await response.json()) as { data: { name: string }[] };
        const apiProductNames = data.map((item) => item.name.trim());

        await expect.poll(async () => {
          return await homePage.getProductNames();
        },
        {
          message: `UI names should match API names for ${option}`,
          timeout: 5000,
        }
        ).toEqual(apiProductNames);
      });
    });
  });

  /**
  * Test 4 & 5: Verify user can perform sorting by price (asc & desc)
  * Steps:
  * Open homepage: https://practicesoftwaretesting.com.
  * Select Price (High - Low) / Price (Low - High) in the sort dropdown.
  * Assert: 1. Verify all the displayed products are sorted by prices ascending or descending.
  */

  test.describe('Sorting products by price', () => {
    const sortingCases = [
      SORT_OPTIONS.PRICE_ASC,
      SORT_OPTIONS.PRICE_DESC
    ];
    
    sortingCases.forEach (({ option, path }) => {
      test(`User can sort by price ${option}`, async () => {
        const response = await homePage.waitApiProductResponse(path, async () => 
          await homePage.sortBy(option));
        const { data } = (await response.json()) as { data: { price: number }[] };
        const apiProductPrice = data.map((item) => item.price);

        await expect.poll(async () => {
          return await homePage.getProductPrices();
        },
        {
          message: `UI prices should match API prices for ${option}`,
          timeout: 5000,
        }
        ).toEqual(apiProductPrice);
      });
    });
  });

  /**
   * Test 6: Verify user can filter products by category
   * Steps:
   * Open homepage: https://practicesoftwaretesting.com.
   * Select Sander in the category list (note: create 3 enums with categories: Hand Tools , Power Tools , and Other).
   * Assert: 1. Verify the displayed products contain Sander in their names.
   */

  test.describe('Filter products by category', () => {
    test('User can filter products by Sander category', async () => {
      await homePage.waitApiProductResponse('by_category', async () => 
        await homePage.filterProducts(PRODUCT_CATEGORIES.POWER_TOOLS.SANDER));
      const productNames = await homePage.getProductNames();

      for (const name of productNames) {
        expect(name).toContain('Sander');
      }
    });
  });
});


