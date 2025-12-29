import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/page-objects/home.page';
import { ProductPage } from '../../src/page-objects/product.page';

/**
 * Test 2: Verify user can view product details
 * Steps:
 * Open homepage: https://practicesoftwaretesting.com 
 * Click on the product "Combination Pliers".
 * Assertions:
 * Verify URL contains https://practicesoftwaretesting.com/product
 * Verify product name is "Combination Pliers".
 * Verify product price is 14.15.
 * Verify "Add to Cart" button is visible.
 * Verify "Add to Favorites" button is visible.
 */

test.describe('Product', () => {
  test('Verify user can view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.navigateHomePage();
    await homePage.clickProductByName('Combination Pliers');

    await expect(page).toHaveURL(/\/product\//);
    await expect(productPage.productName).toHaveText('Combination Pliers');
    await expect(productPage.productPrice).toHaveText('14.15');
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addFavouritesButton).toBeVisible();
  });
});
