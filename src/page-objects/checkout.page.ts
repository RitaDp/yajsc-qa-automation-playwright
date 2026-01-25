import { Locator, Page, Response } from 'playwright/test';
import { CartItem, CartResponse } from '../types/cart-response.types';
import { BillingAddressForm } from '../types/billing-address-form.types';
import { PaymentForm } from '../types/payment-form.types';
import { ExpectedCartProductData } from '../types/product-response.types';
export class CheckoutPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productQuantity: Locator;
  readonly productPrice: Locator;
  readonly totalProductsPrice: Locator;
  readonly cartTotal: Locator;
  readonly continueShoppingButton: Locator;
  readonly proceedButtonCartStep: Locator;
  readonly proceedButtonSignInStep: Locator;
  readonly billingForm: Locator;
  readonly stateField: Locator;
  readonly postcodeField: Locator;
  readonly proceedButtonBillingStep: Locator;
  readonly paymentMethodDropdown: Locator;
  readonly creditCardNumberField: Locator;
  readonly expirationDateField: Locator;
  readonly cvvField: Locator;
  readonly cardHolderField: Locator;
  readonly confirmButton: Locator;
  readonly paymentSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.getByTestId('product-title');
    this.productQuantity = page.getByTestId('product-quantity');
    this.productPrice = page.getByTestId('product-price');
    this.totalProductsPrice = page.getByTestId('line-price');
    this.cartTotal = page.getByTestId('cart-total');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.proceedButtonCartStep = page.getByTestId('proceed-1');
    this.proceedButtonSignInStep = page.getByTestId('proceed-2');
    this.billingForm = page.getByText('StreetCityStateCountryPostal');
    this.stateField = page.getByTestId('state');
    this.postcodeField = page.getByTestId('postal_code');
    this.proceedButtonBillingStep = page.getByTestId('proceed-3');
    this.paymentMethodDropdown = page.getByTestId('payment-method');
    this.creditCardNumberField = page.getByTestId('credit_card_number');
    this.expirationDateField = page.getByTestId('expiration_date');
    this.cvvField = page.getByTestId('cvv');
    this.cardHolderField = page.getByTestId('card_holder_name');
    this.confirmButton = page.getByTestId('finish');
    this.paymentSuccessMessage = page.getByTestId('payment-success-message');
  }

  async navigateCheckoutPage(): Promise<void> {
    await this.page.goto('/checkout');
  }

  async getProductPriceAsNumber(): Promise<number> {
    const textPrice = await this.productPrice.innerText();
    return parseFloat(textPrice.replace(/[^0-9.]/g, ''));
  }

  async getTotalPriceAsNumber(): Promise<number> {
    const textPrice = await this.totalProductsPrice.innerText();
    return parseFloat(textPrice.replace(/[^0-9.]/g, ''));
  }

  /**
   * Waits for a response from the Cart API after performing a specific action
   * @param method - The HTTP request method ('GET', 'POST', or 'PUT')
   * @param trigger - An asynchronous function (action) that triggers the request (example, a button click or navigation)
   * @returns {Promise<Response>} - Returns the Playwright Response object for further analysis
   * @example
   * const response = await checkoutPage.waitApiCartResponse('GET', async () => {
   * await checkoutPage.navigateCheckoutPage();
   * });
   */
  async waitApiCartResponse(method: 'GET' | 'POST' | 'PUT', trigger: () => Promise<void>): Promise<Response> {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        new RegExp(/\/carts/).test(response.url()) &&
          response.status() === 200 && response.request().method() === method
    );
    await trigger();
    return await responsePromise;
  }

  async getFullCartData(response: Response): Promise<CartResponse>{
    return await response.json() as CartResponse;
  };

  calculateTotalPrice(cartItems: CartItem[]): number {
    const totalPrice = cartItems.reduce((sum, item) => {
      const price = item.product.price;
      const quantity = item.quantity;
      return sum + (price * quantity);
    }, 0);
    return Number(totalPrice.toFixed(2));
  }
          
  getExpectedCartData(body: CartResponse, index: number): ExpectedCartProductData {
    return {
      name: body.cart_items[index].product.name,
      price: body.cart_items[index].product.price,
      totalPrice: this.calculateTotalPrice(body.cart_items)
    };
  }

  /**
 * Fills missing required billing fields (State, Postcode)
 * * @reason
 * The form fails to fill properly due to a race condition: the site's JS 
 * triggers a "reset" or "hydration" mid-input, wiping out the first few characters
 * * @solution
 * 1. pressSequentially() - simulates human typing to trigger validation events
 * 2. Retry logic - verifies the final value and re-fills if characters were lost
 */
  async fillBillingAddressForm(data: BillingAddressForm): Promise<void> {
    await this.stateField.pressSequentially(data.state, { delay: 200 });
    if (await this.stateField.inputValue() !== data.state) {
      await this.stateField.clear(); 
      await this.stateField.pressSequentially(data.state);
    }
    await this.postcodeField.pressSequentially(data.postcode, { delay: 200 });
  }

  async selectPaymentMethod(method: string): Promise<void> {
    await this.paymentMethodDropdown.selectOption(method);
  }

  async fillPaymentForm(data: PaymentForm): Promise<void>{
    await this.creditCardNumberField.fill(data.cardNumber);
    await this.expirationDateField.fill(data.expirationDate);
    await this.cvvField.fill(data.cvv);
    await this.cardHolderField.fill(data.cardHolder);
  }
}