# Product page study (17 Nov 2026)

Brands picked from the 1800DTC directory, Baby & Kids category (https://1800dtc.com/brands/category/baby-kids).
Each product page was opened at 390 px phone width (headless browser, 17 Nov 2026).

| Brand | Page looked at | What stood out |
|---|---|---|
| Nugget | /products/the-nugget-blueridge | Swipe gallery with dots, star row + review count right under the title, an age pill ("For ages 1+"), accordions (Details · Care · Certifications · Safety), "Bundle & save", FAQ, "you may like", sticky cart |
| Hiya | /products/kids-daily-essential | Badges on the photo, icon row of benefits (8 small icons), long list of accordions, "Jump to" chips (Ingredients · Stories · FAQs · Reviews), comparison table |
| CrunchLabs | /products/creative-kit-subscription | Video first in the gallery, thumbnails under it, "How it works" in 3 steps (Build · Play · Dream), reviews block, what kids learn, long FAQ |
| Yoto | /products/yoto-mini-…-bundle | "Includes:" list of what's in the box, sticky price + add-to-cart bar on phones |
| Lovevery | /products/the-play-kits | Age tabs, "How it works", "What parents are saying", "We did the research so you don't have to" (expert trust) |
| Little Spoon | /products/formula/… | Safety and testing first, certification badges, accordions (Safety · Ingredients · Allergens · Preparation) |
| Caden Lane | /products/labor-delivery-nightgown | "Pairs well with", "You may also like", recently viewed |
| Tubby Todd | (blocked by a bot check; not studied) | — |

## The pattern they share

1. **Gallery first**: big product picture, swipe on phones, thumbnails under it.
2. **Title block**: name, review stars + count, a short promise line, an age pill.
3. **One clear buy button**, price next to it; small trust row under it (shipping, returns, secure pay).
4. **Sticky buy bar** on phones once the main button scrolls away (Nugget, Yoto).
5. **Benefits as icons**, 3 to 8, one short line each.
6. **What's inside / includes** list.
7. **Accordions** for details so the page stays short on a phone.
8. **How it works** in 3 steps.
9. **Reviews** block with real buyer quotes.
10. **FAQ** accordion.
11. **Guarantee / promise** line.
12. **Related products** row.

## What we built (src/pages/shop/[slug].astro)

All 12 parts, with these rules for Blululu:

- **No made-up social proof.** The stars line under the title says "No reviews yet". The reviews section is an honest empty slot ("we only show reviews from real buyers") until real reviews exist. No sales counts, no "loved by thousands".
- Age pill + facts chips come from real product data (`ages`, `pages` added to `src/data/products.ts`).
- Trust row: instant PDF download · 7-day refund · secure checkout. All true today.
- Buy button is the same `BuyButton` (Dodo Payments, ₹ in India / $ elsewhere). Keys and env untouched.
- Sticky buy bar shows on phones only, only after the main button scrolls off screen.
- Gallery = cover + the existing preview pages (no new art).
- We did **not** move to Shopify: the pattern is copied, the stack stays Astro + Dodo.

## Later (when there is data)

- Real reviews: collect by email after purchase, then show 3 to 5 with first name + city initial.
- A short video of the pages being coloured, as gallery item 1 (CrunchLabs-style).
- "Bundle & save" box on single-product pages pointing at the bundle.
