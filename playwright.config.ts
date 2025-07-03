import { EyesFixture } from '@applitools/eyes-playwright/types/fixture';
import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<EyesFixture>({
  timeout: 10000,
  // globalTimeout: 60000, /* tests in docker are slower*/
  // expect: {
  //   timeout: 2000,
  // toMatchSnapshot: {maxDiffPixels: 50}
  // },
  testDir: './tests',
  /* Run tests in files in parallel */
  // fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      {
        uploadToArgos: !!process.env.CI,
      },
    ],
  ],

  // [['json', {outputFile: 'test-results/jsonReport.json'}],
  //           ['junit', {outputFile: 'test-results/junitReport.xml'}],
  // ['allure-playwright'], [html]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Configuration for Eyes VisualAI */
    eyesConfig: {
      /* The following and other configuration parameters are documented at: https://applitools.com/tutorials/playwright/api/overview */
      apiKey: 'E7Za12AWFUwMR110ZssFgckmpYZ9gBIf6UTfyWE1TlDY0110', // alternatively, set this via environment variable APPLITOOLS_API_KEY
      // serverUrl: 'https://eyes.applitools.com',

      // failTestsOnDiff: false,
      // appName: 'My App',
      // matchLevel: 'Strict',
      // batch: { name: 'My Batch' },
      // proxy: {url: 'http://127.0.0.1:8888'},
      // stitchMode: 'CSS',
      // matchTimeout: 0,
      // waitBeforeScreenshots: 50,
      // saveNewTests: true,
    },

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4200/',
    // globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop',
    // baseURL: process.env.DEV === '1' ? 'http://localhost:4200/'
    //         : process.env.STIGING == '1' ? 'http://localhost:4202/'
    //         : 'http://localhost:4201/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // actionTimeout: 5000,
    navigationTimeout: 5000,
    headless: true,
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 }
    }
  },

  /* Configure projects for major browsers */
  projects: [
    //   {
    //   name: 'dev',
    //   use: { ...devices['Desktop Chrome'],
    //         baseURL: 'http://localhost:4202/',
    //    },
    //   fullyParallel: true,
    // },
    // {
    //   name: 'stage',
    //   use: { ...devices['Desktop Chrome'],
    //   baseURL: 'http://localhost:4201/',
    //    },
    //   fullyParallel: true
    // },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      timeout: 40000,
      fullyParallel: true
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use:
        { ...devices['iPhone 13 Pro'] },
      //{ viewport: {width: 414, height: 800}}
    },
    // {
    //   name: 'pageObjects',
    //   testMatch: 'usePageObjects.spec.ts',
    //   use: {
    //     viewport: {width: 1920, height: 1080}
    //   }
    // },

    // {
    //   name: 'firefox',
    //   browserName: 'firefox',
    // video: {
    //  mode: 'off',
    //  size: {width: 1920, height: 1080}
    // }
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

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
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200',
    timeout: 120 * 1000
    //   reuseExistingServer: !process.env.CI,
  },
});
