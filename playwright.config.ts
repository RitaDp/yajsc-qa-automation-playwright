import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from './src/config/base.config';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    channel: 'chrome',
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: baseConfig.webUrl,
    testIdAttribute: 'data-test',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-all-retries',
    screenshot: 'only-on-failure',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    launchOptions: {
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-infobars',                         
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'perform-login', 
      testMatch: /login\.setup\.ts/,
    },
    {
      name: 'full-run',
      use: { 
        ...devices['Desktop Chrome'],
      },
      dependencies: ['perform-login'],
    },
    {
      name: 'smoke',
      use: { 
        ...devices['Desktop Chrome'],
      },
      grep: /@smoke/,
      dependencies: ['perform-login'],
    },
    {
      name: 'regression',
      use: { 
        ...devices['Desktop Chrome'],
      },
      grep: /@regression/, 
      // Currently, no tests require a logged-in user; uncomment if needed.
      // dependencies: ['perform-login'], 
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
