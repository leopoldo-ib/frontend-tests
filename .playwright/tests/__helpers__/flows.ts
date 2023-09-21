import { Page } from "@playwright/test";
import config from "../../config";

/**
 * Access the online store if it's protected by a password.
 */
export const accessStoreWithPassword = async (page: Page) => {
  await page.goto(config.ROUTES.HOMEPAGE)
  await page.getByLabel('Enter store password').fill(config.ONLINE_STORE_PASSWORD)
  await page.getByRole('button', { name: 'Enter' }).click()
}
