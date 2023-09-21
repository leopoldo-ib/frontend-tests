import { defineConfig, devices } from '@playwright/test';
import config from './.playwright/config';

const {
  SHOPIFY_FLAG_STORE,
  SHOPIFY_CLI_THEME_TOKEN,
  HOST,
  PORT
} = config.TEST_WEB_SERVER

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: '.playwright/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: '.playwright/artifacts',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: '.playwright/report' }]],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  /* Launch a development web server (or multiple) during the tests. */
  webServer: {
    command: `shopify theme dev --store=${SHOPIFY_FLAG_STORE} --host=${HOST} --port=${PORT} --password=${SHOPIFY_CLI_THEME_TOKEN} --live-reload=off`,
    url: `http://${HOST}:${PORT}`,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `http://${HOST}:${PORT}`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Context geolocation */
    geolocation: { longitude: 45.46423680740791, latitude: 9.192119618860735 },
    permissions: ['geolocation'],

    /* Emulates the user locale */
    locale: 'it-IT',

    /* Emulates the user timezone. */
    timezoneId: 'Europe/Rome',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    }
  ]
});
