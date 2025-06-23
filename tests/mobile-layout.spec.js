const { test, expect } = require('@playwright/test');

const pagesToTest = [
  'index.html',
  'product-details-bridle.html',
  'product-details-kieffer-enkelspan-tuig.html',
  'product-details-kieffer-enkelspan-tuig-leder.html',
  'product-details-dark-brown-barcoo-bridle.html',
  'product-details-easy-go-harness-synthetic-2.html',
  'product-details-browbands.html',
  'product-details-halter.html',
  'inquiry.html',
];

test.describe('Mobile Layout Tests', () => {
  for (const page of pagesToTest) {
    test(`Check mobile layout for ${page}`, async ({ page: browserPage }) => {
      await browserPage.goto(`file://${process.cwd()}/${page}`);
      // Check viewport width to confirm mobile size
      const viewportSize = browserPage.viewportSize();
      expect(viewportSize.width).toBeLessThanOrEqual(480);

      // Check if meta viewport tag is present and correct
      const metaViewport = await browserPage.locator('meta[name="viewport"]').getAttribute('content');
      expect(metaViewport).toBe('width=device-width, initial-scale=1.0');

      // Check that main container does not overflow viewport width
      const bodyWidth = await browserPage.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportSize.width);

      // Additional checks can be added here, e.g., no horizontal scroll, images fit container, etc.
    });
  }
});
