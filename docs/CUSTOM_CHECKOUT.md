# Custom checkout (Dodo inline checkout)

Our own checkout page at `/checkout/<slug>/`: order summary on the left (top on phones), the Dodo
Payments inline checkout frame on the right (below on phones). **Off by default.**

## How it works

1. Buy button → `/checkout/<slug>/` (only when `CUSTOM_CHECKOUT = true` in `src/data/products.ts`).
2. The page POSTs `{ p: slug, ph_id, ph_session }` to `api/checkout.js`.
3. The function maps the slug to a product ID from its allow-list (never from the browser), calls
   `POST {base}/checkouts` with `return_url = /thanks/?p=<slug>` and `metadata.ph_id` /
   `metadata.ph_session` (PostHog ids, same join as the `metadata_ph_id` link tag), and returns
   `{ checkout_url, mode }`, or `{ fallback: true }`.
4. The page loads `dodopayments-checkout` (npm, pinned 2.1.0, bundled; no CDN) with
   `displayType: 'inline'` and opens the session in `#dodo-inline-checkout`. Inline mode needs nothing
   special on the session: it is a normal checkout session.
5. `checkout.breakdown` events fill Price / Discount / Tax / Total in the summary (live, in the
   buyer's real currency, incl. PPP via `finalTotal`/`finalTotalCurrency`).
6. After payment the SDK redirects the whole page to `return_url` (`/thanks/`), as today.
   Delivery still comes from Dodo (email + webhook), never from the redirect.

**A sale is never lost.** The buyer goes to the static Dodo `/buy/` link (tagged with
`metadata_ph_id`) when: the API returns `fallback` / errors / takes >10 s; the SDK chunk fails to
load; the frame does not open within 15 s; the frame errors before it opens; or the page script never
runs at all (20 s inline safety timer). A "Pay on the Dodo checkout page instead" link is always shown
under the frame.

The StayOffer "Continue to checkout" button follows the same flag. The discount-code field is shown
by default in Dodo sessions, so STAY15 still works.

## Env vars (Vercel → Project → Settings → Environment Variables)

| Var | Value | Notes |
|---|---|---|
| `DODO_PAYMENTS_API_KEY` | live secret key | Server-only. Already needed by `api/upgrade.js` on `blululu-redesign`. |
| `DODO_PAYMENTS_ENVIRONMENT` | `live_mode` | Anything else = test mode. |
| `PUBLIC_SITE_URL` | `https://www.blubabyshow.com` | Optional; `return_url` base. Default `https://<request host>`. Set it so `return_url` always uses the canonical www host. |
| `DODO_MELTDOWN_PRODUCT_ID`, `DODO_COLOURING_PRODUCT_ID`, `DODO_ABC_PRODUCT_ID`, `DODO_BUNDLE_PRODUCT_ID` | `pdt_…` | Optional overrides (e.g. test-mode copies). |

`PUBLIC_DODO_LIVE=true` must stay set (it produces the static fallback links).

## Test in test mode

1. Local `.env` (gitignored): `DODO_PAYMENTS_API_KEY=<test key>`, `DODO_PAYMENTS_ENVIRONMENT=test_mode`,
   `PUBLIC_SITE_URL=http://localhost:3000`, `PUBLIC_DODO_TEST=true`.
2. Only `colouring-pack` and `meltdown-scripts` have test-mode copies; the other two fall back
   unless you set `DODO_ABC_PRODUCT_ID` / `DODO_BUNDLE_PRODUCT_ID` to test IDs.
3. Set `CUSTOM_CHECKOUT = true` locally (don't commit), run `vercel dev` (runs `api/` + the site;
   `astro preview` alone has no `/api`, so it always tests the fallback path).
4. Open `/checkout/colouring-pack/?bbs_debug=1`, pay with Dodo's test card, check you land on
   `/thanks/?p=colouring-pack&payment_id=…&status=succeeded`, and that the console shows
   `checkout_page_viewed` → `checkout_loaded`.
5. Fallback check: unset the key → the page should jump to the `/buy/` link at once.

Or deploy the branch as a Vercel **Preview** with test-mode env vars scoped to Preview only.

## Flip it on

1. Add the env vars above (Production).
2. Apple Pay inside an embedded frame needs domain verification: Dodo dashboard → Settings →
   Payment Methods → Apple Pay → Manage domains → register `www.blubabyshow.com` and host the file at
   `public/.well-known/apple-developer-merchantid-domain-association`. Not needed for hosted checkout.
3. `CUSTOM_CHECKOUT = true` in `src/data/products.ts`, deploy, buy one item live, refund it.

## PostHog events (also in docs/POSTHOG_EVENTS.md)

| Event | Props |
|---|---|
| `checkout_page_viewed` | product, price_shown, currency |
| `checkout_loaded` | product, mode (`live`/`test`), ms (time to frame ready) |
| `checkout_failed_fallback` | product, reason (`api_unreachable`, `api_fallback`, `sdk_load`, `sdk_error`, `frame_timeout`, `frame_error`), currency |
| `checkout_pay_clicked` | product |

No email, name, card or payment data is tracked. `buy_clicked` still fires on the shop buttons; the
"pay on the Dodo page" link fires `checkout_redirect` with `via: checkout_page_link`.

## Risks

- **Permissions-Policy.** The site sends `payment=()` on every page, which blocks Google Pay /
  Apple Pay inside iframes. `vercel.json` adds a `/checkout/(.*)` rule that allows `payment` for
  `self` and the two Dodo checkout origins. Vercel applies matching rules in order (later wins for the
  same header); confirm on the preview with `curl -I …/checkout/abc-book/`.
- **Rate limit is per warm instance** (10 sessions / IP / min). It slows scripts; it is not a wall.
  Each session is free to create but shows up in the Dodo dashboard.
- **Extra hop.** One API call + SDK load before the form shows (vs. a direct link). Watch
  `checkout_loaded.ms` and `checkout_failed_fallback` vs. purchases before deciding it beats `/buy/`.
- **Test vs live mode mismatch**: the SDK mode comes from the API's `mode`, so they always match.
- **Product IDs live in two places** (`products.ts` and `api/checkout.js`, like `api/upgrade.js`).
  Change both when a product changes.
- Inline frame events are UI hints only. Delivery and any "paid" decision stay on Dodo's
  webhook / email, never the frame or `return_url`.
