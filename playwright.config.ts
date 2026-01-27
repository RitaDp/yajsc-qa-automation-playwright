import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from './src/config/base.config';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

chromium.use(stealth());

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
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/test-results.json' }],
    [
      '@testomatio/reporter/playwright',
      {
        apiKey: process.env.TESTOMATIO,
      },
    ],
    ...(process.env.CI ? [] : [[
      '@reportportal/agent-js-playwright',
      {
        apiKey: process.env.RP_API_KEY,
        endpoint: 'http://localhost:9005/api/v1',
        project: 'yajsc2026',
        launch: 'Smoke & Regression',
        attributes: [
          { key: 'env', value: 'local' },
          { key: 'agent', value: 'playwright' }
        ],
        description: 'Test Automation Reports',
      },
    ] as [string, object]]),
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    channel: 'chrome',
    baseURL: baseConfig.webUrl,
    testIdAttribute: 'data-test',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    launchOptions: {
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled' 
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
  ],
});
