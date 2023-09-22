import { test, expect } from '@playwright/test';
import config from '../config';
import { accessStoreWithPassword } from './__helpers__/flows';
import { fullPageHasScreenshot } from './__helpers__/assertions';

test.describe('Contact click', () => {
  test.beforeEach(async ({ page }) => {
    await accessStoreWithPassword(page)
  })

  test('matches the screenshot', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click();
    await page.goto(config.ROUTES.CONTACT)
    await fullPageHasScreenshot(page)
  })
})
