# Upgrade offer: "what you paid counts"

## What it does

Someone buys one book. On the thank-you page they see:

> **You just paid ₹149. Get both books for ₹100 more.**
> That's the ABC Book for ₹100 instead of ₹129.

One button opens a Dodo checkout for the Colouring + ABC Bundle with the money they just paid already taken off.

| They bought | India (INR) | Other INR/USD buyers (USD) |
|---|---|---|
| Colouring Pack (₹149 / $7) | bundle for **₹100 more** | bundle for **$3 more** |
| ABC Book (₹129 / $5) | bundle for **₹120 more** | bundle for **$5 more** |
| Meltdown Scripts | plain bundle offer, no credit (it is not in the bundle) | same |
| The bundle | no offer | no offer |
| Failed payment | "No money was taken" page, no offer | same |

## How it works

1. `/thanks/?p=<book>&payment_id=…&status=succeeded` (Dodo's return URL) calls `POST /api/upgrade`.
2. `api/upgrade.js` asks Dodo for that payment with the secret key. It checks that:
   - the payment succeeded, in the last 7 days;
   - it was for that book (and not the bundle);
   - it was paid in **INR or USD**, at **full list price or more**.
3. It opens a Dodo checkout session for the bundle with the credit code already applied
   (`UPGRADE-COLOURING` or `UPGRADE-ABC`), the buyer's email filled in, and the code box locked.
   The return URL is `/thanks/?p=colouring-abc-bundle&from=<book>`.
4. The page shows the offer only if it got a checkout link back. Prices come from the currency
   they actually paid in. Anything else (no key, Dodo error, other currency, cheaper local price,
   8 s timeout) → the page quietly shows the normal bundle offer at full price.

Prices are never taken from the browser. Each code is 1 use per customer inside Dodo, which is the real guard.

## Turn it on (founder steps)

### 1. Create 2 discount codes in Dodo
Do this in **test mode first**, then again in **live mode** (the modes are separate).
Dodo dashboard → **Sales → Discounts → Create**:

| Field | Code 1 | Code 2 |
|---|---|---|
| Code | `UPGRADE-COLOURING` | `UPGRADE-ABC` |
| Type | **Amount** (flat) | **Amount** (flat) |
| Currency options | INR **149** (default) · USD **7** | INR **129** (default) · USD **5** |
| Minimum subtotal | 0 | 0 |
| Applies to (restricted to) | only **Blu Colouring + ABC Bundle** (`pdt_0Nrvjd4cfdVZSWvMt4cUF` in live) | same bundle only |
| Customer eligibility | **Existing customers** | **Existing customers** |
| Uses per customer | **1** | **1** |
| Total usage limit / expiry | leave empty | leave empty |

Keep the codes private (do not post them). They only work on the bundle, only for people who already bought.

### 2. Add env vars in Vercel
Vercel → blubabyshow-web → Settings → Environment Variables:

| Name | Value | Where |
|---|---|---|
| `DODO_PAYMENTS_API_KEY` | secret API key from Dodo → Developer → API Keys | Preview first (test key), then Production (live key) |
| `DODO_PAYMENTS_ENVIRONMENT` | `test_mode` for Preview, `live_mode` for Production | same |

Optional:
- `UPGRADE_CODE_COLOURING`, `UPGRADE_CODE_ABC` if you name the codes differently.
- Test mode only: the bundle and ABC book have no test-mode copies yet. Create test copies in Dodo
  test mode and set `DODO_BUNDLE_PRODUCT_ID` (and `DODO_ABC_PRODUCT_ID`) on Preview. The colouring
  pack test copy (`pdt_0Nrvn2dnmiRS0XfDqKuF3`) is already built in. Without a test bundle ID the
  page just shows the plain offer.

Redeploy after adding env vars.

### 3. Test it
1. On a preview deploy with test keys, buy the Colouring Pack with a Dodo test card.
2. The thank-you page should show "You just paid ₹149 … ₹100 more".
3. Click it: the Dodo checkout should show the bundle with ₹149 off.
4. Pay, and check you land on the thank-you page with no second offer.

## Local prices (PPP) caveat

Dodo charges some countries a lower local price, or a different currency. The credit codes are set
up in INR and USD only. So the code only makes a credit offer when the buyer paid **in INR or USD at
full price**. Anyone who paid in another currency (BRL, EUR …) or a lower local price gets the
normal bundle offer at their normal price, with no credit. Nobody is ever shown a credit bigger than
what they paid.

If many buyers come from PPP countries later, add more currency rows to the two codes and to
`LIST_PRICE` in `api/upgrade.js`.

## Files
- `api/upgrade.js`: the server check + checkout session.
- `src/pages/thanks.astro`: the offer card (`#creditOffer`) and the fallback card (`#upsell`).
- Tracking: PostHog `upgrade_offer_shown`, `upgrade_click`; Meta `InitiateCheckout`. The bundle
  Purchase event after an upgrade records the amount actually paid (bundle minus credit).
