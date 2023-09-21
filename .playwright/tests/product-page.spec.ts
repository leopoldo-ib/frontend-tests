import { test } from '@playwright/test';
import config from '../config';
import { fullPageHasScreenshot } from './__helpers__/assertions';
import { accessStoreWithPassword } from './__helpers__/flows';

test.describe('Product page', () => {
  test.beforeEach(async ({ page }) => {
    await accessStoreWithPassword(page)
    await page.goto(config.ROUTES.PRODUCT_PAGE_SAMPLE)
  })

  test('matches the screenshot', async ({ page }) => {
    /**
     * The product recommendations are in a lazy-loaded component,
     * so we have to trigger their loading before capturing the screenshot.
     */
    const productRecommendations = page.locator('product-recommendations')
    await productRecommendations.scrollIntoViewIfNeeded()
    await productRecommendations.filter({ has: page.locator('img') }).waitFor({ "state": "visible" })
    await fullPageHasScreenshot(page)
  })
})
