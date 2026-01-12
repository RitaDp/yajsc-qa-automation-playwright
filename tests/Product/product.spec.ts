import { test, expect } from '../../src/fixtures/base-pages.fixture';

/**
 * Test Unit-11: Verify user can view product details
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

/**
 * Test 1 -> Unit 12: Verify user can add product to cart
 * Steps:
 * Open homepage: https://practicesoftwaretesting.com.
 * 
 * Click on the product "Slip Joint Pliers".
 * Assert: 1. Verify URL contains https://practicesoftwaretesting.com/product.
 * 2. Verify product name is "Slip Joint Pliers".
 * 3. Verify product price is 9.17.
 * 
 * Click "Add to Cart" button.
 * Assert: 1. Verify alert message is visible.
 * 2. Verify alert message text is "Product added to shopping cart".
 * 3. Verify alert disappears in 8 seconds.
 * 4. Verify cart icon in navigation shows quantity = 1.
 *
 * Click on the cart icon in the navigation.
 * Assert: 1. Verify URL is https://practicesoftwaretesting.com/checkout.
 * 2. Verify the number of products in the cart table equals 1.
 * 3. Verify product title in the cart is "Slip Joint Pliers".
 * 4. Verify "Proceed to Checkout" button is visible.
 */

test.describe('Product', () => {

  test.beforeEach(async ({ allPages }) => {
    await allPages.homePage.navigateHomePage();
  });

  test('User can view product details', async ({ allPages, page }) => {;
    await allPages.homePage.clickProductByName('Combination Pliers');

    await expect(page).toHaveURL(/\/product\//);
    await expect(allPages.productPage.productName).toHaveText('Combination Pliers');
    await expect(allPages.productPage.productPrice).toHaveText('14.15');
    await expect(allPages.productPage.addToCartButton).toBeVisible();
    await expect(allPages.productPage.addFavoritesButton).toBeVisible();
  });

  test('User can add product to cart', async ({ allPages, page }) => {
    await allPages.homePage.clickProductByName('Slip Joint Pliers');

    await expect(page).toHaveURL(/\/product\//);
    await expect(allPages.productPage.productName).toHaveText('Slip Joint Pliers');
    await expect(allPages.productPage.productPrice).toHaveText('9.17');

    await allPages.productPage.addToCart();

    await expect(allPages.productPage.alertMessage).toHaveText(/Product added to shopping cart/);
    await expect(allPages.productPage.alertMessage).toBeHidden({ timeout: 8000 });
    await expect(allPages.productPage.header.cartIcon).toHaveText('1');

    await allPages.checkoutPage.navigateCheckoutPage();

    await expect(page).toHaveURL(/\/checkout/);
    await expect(allPages.checkoutPage.productQuantity).toHaveValue('1');
    await expect(allPages.checkoutPage.productTitle).toHaveText('Slip Joint Pliers');
    await expect(allPages.checkoutPage.proceedButtonCartStep).toBeVisible();
  });
});
