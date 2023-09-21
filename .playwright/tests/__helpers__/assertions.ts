import { Locator, expect } from "@playwright/test";
import { Page } from "playwright-core";

type FullPageHasScreenshotOptions = {
  /**
   * Locators of elements to check that are visible before capturing the screenshot.
   */
  additionalLocators?: Locator[],

  /**
   * An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1`. Default is
   * configurable with `TestConfig.expect`. Unset by default.
   */
  maxDiffPixelRatio?: number
}

/**
 * Assert that the full page matches the screenshot reference.
 */
export const fullPageHasScreenshot = async (page: Page, options?: FullPageHasScreenshotOptions) => {
  const additionalLocators = options?.additionalLocators || []
  const locators = [
    page.locator('main > *'),
    page.locator('footer'),
    ...additionalLocators,
    /**
     * The header is sticky, so when we scroll the previous locators into the view
     * the header may be attached in different positions and generate unexpected screenshots.
     * So we put the announcement bar as the last locator to scroll the page to the top before acquiring the screenshot.
     */
    page.locator('.announcement-bar')
  ]
  for (const locator of locators) {
    const pageElements = await locator.all()
    for (const pageElement of pageElements) {
      // Before capturing the screenshot, check that all elements in the page are visible.
      await pageElement.scrollIntoViewIfNeeded()
      await pageElement.isVisible()
    }
  }
  await page.evaluate(() => {
    document.querySelectorAll('video').forEach((video) => {
      video.pause()
      video.load()
      video.currentTime = 0
    });
  })
  const maxDiffPixelRatio = options?.maxDiffPixelRatio || undefined
  await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio })
}
