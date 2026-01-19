export const BILLING_TEST_DATA = {
  state: 'Vienna',
  postcode: '1010'
} as const;

export const PAYMENT_TEST_DATA = {
  cardNumber: '1111-1111-1111-1111',
  expirationDate: '04/2026',
  cvv: '111',
  cardHolder: 'Jane Doe'
} as const;
