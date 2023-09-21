import { test } from '@playwright/test';
import config from '../config';
import { accessStoreWithPassword } from './__helpers__/flows';
import { fullPageHasScreenshot } from './__helpers__/assertions';

test.describe('Collection page', () => {
  test.beforeEach(async ({ page }) => {
    await accessStoreWithPassword(page)
    await page.goto(config.ROUTES.COLLECTION_PAGE_ALL)
  })

  test('matches the screenshot', async ({ page }) => {
    await fullPageHasScreenshot(page, {
      additionalLocators: [page.locator('#product-grid .grid__item')]
    })
  })
})
