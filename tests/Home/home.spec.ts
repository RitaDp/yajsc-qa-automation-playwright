import { test, expect } from '../../src/fixtures/base-pages.fixture';
import { MockProductsResponse } from '../../src/models-types/mock-product.types';
import { addMockProducts } from '../../src/utils/product.factory';
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from './product.constants';

test.describe('Products: sorting and filtering', () => {

  test.beforeEach(async ({ allPages }) => {
    await allPages.homePage.navigateHomePage();
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
      test(`User can sort by name ${option}`, async ({ allPages }) => {
        const response = await allPages.homePage.waitApiAllProductsResponse(path, async () => 
          await allPages.homePage.sortBy(option));

        const { data } = (await response.json()) as { data: { name: string }[] };
        const apiProductNames = data.map((item) => item.name.trim());

        await expect.poll(async () => {
          return await allPages.homePage.getAllProductNames();
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
      test(`User can sort by price ${option}`, async ({ allPages }) => {
        const response = await allPages.homePage.waitApiAllProductsResponse(path, async () => 
          await allPages.homePage.sortBy(option));
        const { data } = (await response.json()) as { data: { price: number }[] };
        const apiProductPrice = data.map((item) => item.price);

        await expect.poll(async () => {
          return await allPages.homePage.getAllProductPrices();
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
    test('User can filter products by Sander category', async ({ allPages }) => {
      await allPages.homePage.waitApiAllProductsResponse('by_category', async () => 
        await allPages.homePage.filterProducts(PRODUCT_CATEGORIES.POWER_TOOLS.SANDER));
      const productNames = await allPages.homePage.getAllProductNames();

      for (const name of productNames) {
        expect(name).toContain('Sander');
      }
    });
  });
});


test.describe('Mocked data scenarios', () => {
  test('20 products should be displayed', async ({ allPages }) => {
    const mocksData = addMockProducts(20);
    const mockProductNames = mocksData.map(product => product.name);  

    await allPages.page.route('**/products?**', async route => {
      const response = await route.fetch();
      const json = await response.json() as MockProductsResponse;   
      json.data = mocksData;      
      await route.fulfill({ response, json });
    });

    await allPages.homePage.navigateHomePage();
    
    for (const name of mockProductNames) {
      await expect(allPages.page.getByText(name, { exact: true })).toBeVisible();
    }

    const actualProductCount = await allPages.homePage.getPageProductsCount();

    expect(actualProductCount).toBe(20);
  });
});

