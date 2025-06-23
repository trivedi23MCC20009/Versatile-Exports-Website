# Test info

- Name: Mobile Layout Tests >> Check mobile layout for product-details-kieffer-enkelspan-tuig.html
- Location: C:\Users\91904\Desktop\versatileexport\tests\mobile-layout.spec.js:17:5

# Error details

```
Error: page.goto: net::ERR_FILE_NOT_FOUND at file:///C:/Users/91904/Desktop/versatileexport/product-details-kieffer-enkelspan-tuig.html
Call log:
  - navigating to "file:///C:/Users/91904/Desktop/versatileexport/product-details-kieffer-enkelspan-tuig.html", waiting until "load"

    at C:\Users\91904\Desktop\versatileexport\tests\mobile-layout.spec.js:18:25
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |
   3 | const pagesToTest = [
   4 |   'index.html',
   5 |   'product-details-bridle.html',
   6 |   'product-details-kieffer-enkelspan-tuig.html',
   7 |   'product-details-kieffer-enkelspan-tuig-leder.html',
   8 |   'product-details-dark-brown-barcoo-bridle.html',
   9 |   'product-details-easy-go-harness-synthetic-2.html',
  10 |   'product-details-browbands.html',
  11 |   'product-details-halter.html',
  12 |   'inquiry.html',
  13 | ];
  14 |
  15 | test.describe('Mobile Layout Tests', () => {
  16 |   for (const page of pagesToTest) {
  17 |     test(`Check mobile layout for ${page}`, async ({ page: browserPage }) => {
> 18 |       await browserPage.goto(`file://${process.cwd()}/${page}`);
     |                         ^ Error: page.goto: net::ERR_FILE_NOT_FOUND at file:///C:/Users/91904/Desktop/versatileexport/product-details-kieffer-enkelspan-tuig.html
  19 |       // Check viewport width to confirm mobile size
  20 |       const viewportSize = browserPage.viewportSize();
  21 |       expect(viewportSize.width).toBeLessThanOrEqual(480);
  22 |
  23 |       // Check if meta viewport tag is present and correct
  24 |       const metaViewport = await browserPage.locator('meta[name="viewport"]').getAttribute('content');
  25 |       expect(metaViewport).toBe('width=device-width, initial-scale=1.0');
  26 |
  27 |       // Check that main container does not overflow viewport width
  28 |       const bodyWidth = await browserPage.evaluate(() => document.body.scrollWidth);
  29 |       expect(bodyWidth).toBeLessThanOrEqual(viewportSize.width);
  30 |
  31 |       // Additional checks can be added here, e.g., no horizontal scroll, images fit container, etc.
  32 |     });
  33 |   }
  34 | });
  35 |
```