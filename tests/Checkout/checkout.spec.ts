import { expect, test } from '../../src/fixtures/base-pages.fixture';
import { billingTestData, paymentTestData } from '../../src/test-data/checkout.data';
import { PAYMENT_METHODS } from './payment-methods.constants';

/**
 * Додати перший товар зі домашньої сторінки в корзину (зберегти назву та ціну товару).
 * Відкрити корзину та перевірити, що назва, ціна і сумарна ціна відповідають доданому товару.
 * Натиснути Proceed to checkout
 * Перевірити, що юзер вже залогінений і нічого додатково робити не потрібно
 * Ввести відсутні поля на сторінці Billing Address
 * На наступній сторінці вибрати:
 * Credit Card -> Card number: 1111-1111-1111-1111 
 * -> Expiration Date: +3 місяці до дати запуску тесту 
 * -> CVV: 111 
 * -> Card Holder Name: any name 
 * -> Confirm
 * Перевірити, що платіж був успішним.
 */

test.describe('Checkout', () => {
  test('Logged in user can check out a product', async ({ loggedInApp }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'Race condition on Billing form: Form are reset during input. Using pressSequentially() and retry logic'
    });

    const itemIndex = 0;

    await test.step('Navigate to product and add to cart', async () => {
      await loggedInApp.homePage.navigateHomePage();
      await loggedInApp.homePage.clickProductByIndex(itemIndex);

      await loggedInApp.checkoutPage.waitApiCartResponse('POST', async() => {
        await loggedInApp.productPage.addToCart();
      });
    });

    await test.step('Verify product name, price and total price', async () => {
      const actualProductName = await loggedInApp.productPage.getProductName();
        
      const cartResponse = await loggedInApp.checkoutPage.waitApiCartResponse('GET', async() => {
        await loggedInApp.checkoutPage.navigateCheckoutPage();
      });
    
      const actualProductPrice = await loggedInApp.checkoutPage.getProductPriceAsNumber();
      const actualTotalPrice = await loggedInApp.checkoutPage.getTotalPriceAsNumber();

      const responseBody = await loggedInApp.checkoutPage.getFullCartData(cartResponse);
      const expected = loggedInApp.checkoutPage.getExpectedCartData(responseBody, itemIndex);

      expect(actualProductName).toBe(expected.name);
      expect(actualProductPrice).toBe(expected.price);
      expect(actualTotalPrice).toBe(expected.totalPrice);
    });

    await test.step('Proceed to sign in step and verify the user is logged in', async () => {
      await loggedInApp.checkoutPage.proceedButtonCartStep.click();
      await loggedInApp.checkoutPage.proceedButtonSignInStep.click();
    });

    await test.step('Fill billing address information', async () => {
      await loggedInApp.checkoutPage.fillBillingAddressForm(billingTestData);
      await loggedInApp.checkoutPage.proceedButtonBillingStep.click();
    });

    await test.step('Complete payment and verify success', async () => {
      await loggedInApp.checkoutPage.selectPaymentMethod(PAYMENT_METHODS.CREDIT_CARD);
      await loggedInApp.checkoutPage.fillPaymentForm(paymentTestData);
      await loggedInApp.checkoutPage.confirmButton.click();
    
      await expect(loggedInApp.checkoutPage.paymentSuccessMessage).toBeVisible();
    });
  });
});