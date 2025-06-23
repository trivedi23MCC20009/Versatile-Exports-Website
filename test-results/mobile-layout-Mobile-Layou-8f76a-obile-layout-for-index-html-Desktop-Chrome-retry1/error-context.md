# Test info

- Name: Mobile Layout Tests >> Check mobile layout for index.html
- Location: C:\Users\91904\Desktop\versatileexport\tests\mobile-layout.spec.js:17:5

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 480
Received:    1280
    at C:\Users\91904\Desktop\versatileexport\tests\mobile-layout.spec.js:21:34
```

# Page snapshot

```yaml
- banner:
  - text: Versatile Exports
  - navigation:
    - list:
      - listitem:
        - link "Home":
          - /url: index.html
      - listitem:
        - link "Our Products":
          - /url: product-details-bridle.html
      - listitem:
        - link "Contact":
          - /url: contact.html
      - listitem:
        - link "Inquiry":
          - /url: inquiry.html
- img "Chrome Four In Hand"
- main:
  - heading "ABOUT US" [level=2]
  - separator
  - paragraph: With a legacy spanning more than two decades, Versatile Exports has established itself as a trusted name in the saddlery manufacturing industry. Specializing in high-quality equestrian products, we combine traditional craftsmanship with modern techniques to produce saddles, bridles, harnesses, and a wide range of leather accessories that meet the highest standards of performance and durability.
  - paragraph: Our company has grown into a respected manufacturer supplying clients worldwide, including leading equestrian brands, retailers, and professional riders. Our skilled artisans bring years of experience and attention to detail to every product, ensuring excellence in both function and form.
  - paragraph: At Versatile Exports, our mission is to uphold the heritage of fine saddlery while continuously innovating to meet the evolving needs of the equestrian community. Whether for competition, leisure riding, or custom orders, we are committed to delivering products that reflect our passion, precision, and pride in craftsmanship.
- contentinfo: © 2024 Versatile Export. All rights reserved | Designed by Keshav Trivedi, +91-9044194542.
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
  18 |       await browserPage.goto(`file://${process.cwd()}/${page}`);
  19 |       // Check viewport width to confirm mobile size
  20 |       const viewportSize = browserPage.viewportSize();
> 21 |       expect(viewportSize.width).toBeLessThanOrEqual(480);
     |                                  ^ Error: expect(received).toBeLessThanOrEqual(expected)
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