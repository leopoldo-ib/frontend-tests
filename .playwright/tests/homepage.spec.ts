import { test } from '@playwright/test';
import config from '../config';
import { fullPageHasScreenshot } from './__helpers__/assertions';
import { accessStoreWithPassword } from './__helpers__/flows';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await accessStoreWithPassword(page)
    await page.goto(config.ROUTES.HOMEPAGE)
  });

  test('matches the screenshot', async ({ page }) => {
    /**
     * We set the maxDiffPixelRatio because the loading bar of a video with an autoplay policy
     * can show a different, and not-predictable, caching progress between each test.
     */
    await fullPageHasScreenshot(page, { maxDiffPixelRatio: 0.01 })
  })
})
