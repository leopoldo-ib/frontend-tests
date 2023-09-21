import { test, expect } from '@playwright/test';
import config from '../config';
import { accessStoreWithPassword } from './__helpers__/flows';

test.describe('Contact click', () => {
  test.beforeEach(async ({ page }) => {
    await accessStoreWithPassword(page)
    await page.goto(config.ROUTES.CONTACT)
    await expect(page).toHaveScreenshot()
  })
})