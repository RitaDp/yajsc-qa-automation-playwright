import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

if (!process.env.CI) {
  dotenvConfig({ path: join(process.cwd(), '.env') });
}

export const baseConfig = {
  isCI: !!process.env.CI,

  webUrl: process.env.BASE_URL ?? 'https://practicesoftwaretesting.com',
  apiUrl: process.env.API_URL ?? 'https://api.practicesoftwaretesting.com',

  endpoints: {
    login: '/users/login',
  } as const,
  
  customer: {
    email: process.env.CUSTOMER_EMAIL ?? '',
    password: process.env.CUSTOMER_PASSWORD ?? '',
    name: process.env.CUSTOMER_NAME ?? 'Jane Doe'
  },

  authFile: 'playwright/.auth/user.json',
} as const;
