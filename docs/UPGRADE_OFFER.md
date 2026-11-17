# Upgrade offer: "what you paid counts"

## What it does

Someone buys one book. On the thank-you page they see:

> **You just paid ₹149. Get both books for ₹100 more.**
> That's the ABC Book for ₹100 instead of ₹129.

One button opens a Dodo checkout for the Colouring + ABC Bundle with the money they just paid already taken off.

| They bought | Visitors in India (₹ shown) | Everyone else ($ shown) |
|---|---|---|
| Colouring Pack (₹149 / $7) | bundle for **₹100 more** | bundle for **$3 more** |
| ABC Book (₹129 / $5) | bundle for **₹120 more** | bundle for **$5 more** |
| Meltdown Scripts | plain bundle offer, no credit (it is not in the bundle) | same |
| The bundle | no offer | no offer |
| Failed payment | "No money was taken" page, no offer | same |

## How it works

1. `/thanks/?p=<book>&payment_id=…&status=succeeded` (Dodo's return URL) calls `POST /api/upgrade`.
2. `api/upgrade.js` asks Dodo for that payment with the secret key. It checks that:
   - the payment succeeded, less than 24 hours ago;
   - it was for that book (and not the bundle);
   - it was paid in **INR or USD**, at **full list price or more**.
3. It opens a Dodo checkout session for the bundle with the credit code already applied
   (`UPGRADE-COLOURING` or `UPGRADE-ABC`) and the code box locked. The return URL is
   `/thanks/?p=colouring-abc-bundle&from=<book>`.
4. It replies with **only** `{ checkout_url }`. It accepts POST only. Nothing about the buyer
   (email, country, currency) is sent back or pre-filled, because a `payment_id` sits in a URL and
   can leak (browser history, screenshots, shared links). The buyer types their own email at
   checkout, and must use the same email as the first order (the codes are for existing customers).
5. The page shows the offer only if it got a checkout link back, with ₹ for visitors in India and
   $ elsewhere (same rule as the buy buttons). Anything else (no key, Dodo error, other currency,
   cheaper local price, older than 24 h, 8 s timeout) → the normal bundle offer at full price.

Prices are never taken from the browser. The real one-use guard is the Dodo code settings below
(the server's in-memory memo does not survive restarts, so it is not a guard).

## Turn it on (founder steps)

### 1. Create 2 discount codes in Dodo (these settings are REQUIRED, not optional)
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

Keep the codes private (do not post them). The three settings that make this safe, and must never be
loosened: **restricted to the bundle**, **existing customers only**, **1 use per customer**.

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

## Leftover risks (accepted)

- **Leaked payment_id, within 24 h:** whoever has it can open a discounted bundle checkout. They
  learn nothing about the buyer. The code still only works for someone who already bought from us,
  once per customer, on the bundle. Worst case: another past customer gets the credit once.
- **Code reuse across customers:** any existing customer who learns the code name can type it at a
  normal bundle checkout. Our sessions lock the code box, but static links may not. Max loss = one
  credit per existing customer.
- **Currency display:** ₹/$ on the offer is picked by time zone. A rare buyer in India who paid in
  USD sees ₹ text; Dodo checkout shows the real amount before they pay.
- **No database:** the per-payment memo lives in memory only. Repeat requests can create more
  checkout sessions for the same payment; they are harmless (unpaid sessions expire), and the code's
  1-use-per-customer limit stops more than one redemption.

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

## Abuse limits (security review, 17 Nov 2026)
- `/api/upgrade` is POST only and returns only a checkout link + currency. No buyer data.
- The code itself is the guard: restricted to the bundle, existing customers only, 1 use per customer. Those Dodo settings are **required**, not optional.
- Residual risk: someone holding a code could use it once on their own account if they bought before. Max loss = ₹149 / $7 per person. Acceptable at this price; if abused, switch to per-payment single-use codes created through the API.
