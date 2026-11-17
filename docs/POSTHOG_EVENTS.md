# PostHog events: blubabyshow.com

One event layer for the whole site. Analytics is off unless `PUBLIC_POSTHOG_KEY` is set in Vercel.

## How it is wired

| Piece | File | Job |
|---|---|---|
| PII strip | `src/layouts/Base.astro` (first inline script in `<head>`) | Removes `email`, `customer_email`, `name`, `first_name`, `last_name`, `phone` from the address bar **before** PostHog or the Meta Pixel load. Dodo adds `&email=` to the `/thanks` return URL. |
| PostHog snippet | `src/layouts/Base.astro` | Loads PostHog async (never blocks the page). Sets `page_type` on every event, sends `$pageview`, saves first-touch UTM / Instagram data. `sanitize_properties` + `before_send` drop `email`, `payment_id`, `name`, `phone`, `license_key` from every stored URL (`$current_url`, `$referrer`, ...) and drop any property with "email" in its name. |
| Shared click/scroll layer | `src/components/Analytics.astro` (included once in `Base.astro`) | `product_viewed`, scroll depth, `buy_clicked`, `checkout_redirect`, `cta_clicked`, `tile_clicked`, `free_download_clicked`, `outbound_link_clicked`. Adds `metadata_ph_id` to Dodo checkout links. |
| Helper | `src/lib/track.ts` | `track(event, props)` and `signup.submitted/success/error(form)`. Every page script uses this, never `posthog.capture` directly. |

Settings kept from before: `person_profiles: 'identified_only'`, `autocapture: true`, `capture_pageleave: true`. Do Not Track was not honoured before and still is not (no change).

**Debug:** open any page with `?bbs_debug=1`. The tab then logs `[bbs-track]` (what the page sent) and `[bbs-posthog] sent` (the final, cleaned event) to the browser console.

## Page types (`page_type`, on every event)

| `page_type` | Pages |
|---|---|
| `home` | `/` |
| `shop_index` | `/shop/` |
| `product` | `/shop/<slug>/` |
| `kit_index` | `/kits/` |
| `kit` | `/kits/<slug>/` |
| `blog_index` | `/blog/` |
| `blog_post` | `/blog/<slug>/` |
| `start` | `/start/` (Instagram link in bio) |
| `thanks` | `/thanks/` (after checkout) |
| `info` | contact, privacy, terms, refund, delivery, studio |

Free downloads are PDFs, not pages: they show up as `free_download_clicked`.

## Event list

### Automatic (every page)

| Event | Properties | Fired when |
|---|---|---|
| `$pageview` | `page_type` (+ PostHog defaults: URL, referrer, UTM, `$geoip_country_code`) | Every page load |
| `$pageleave` | same | Leaving a page |
| `$autocapture` | PostHog defaults | Clicks on links/buttons (PostHog default) |
| `scroll_depth` | `depth` (50 or 90), `product` (product pages) | `product` and `blog_post` pages, once per depth |
| `outbound_link_clicked` | `host`, `url` (no query string) | Any link to another site (not Dodo checkout) |
| `cta_clicked` | `name` (the element's `data-track` value) | Any element with `data-track`, site-wide |
| `free_download_clicked` | `file` | Any link to `/free/...` |

### Shop funnel

| Event | Properties | Fired when / where |
|---|---|---|
| `product_viewed` | `product`, `price_shown`, `currency_shown` (INR/USD), `country_guess` (IN / non-IN, from time zone) | Product page load |
| `buy_clicked` | `product`, `price`, `currency` | Any buy button (`a.buy`): product page, `/shop/`, `/thanks` upsell |
| `checkout_redirect` | `product`, `via` (`buy_button` / `upgrade` / `leave`), `currency` | Any click that goes to `*.dodopayments.com`, sent with sendBeacon just before leaving |
| `purchase_completed` | `product`, `payment_status`, `value`, `currency` | `/thanks` with `payment_id` and `status=succeeded`. Once per payment: a refresh does not count again (sessionStorage key per `payment_id`). No email, no payment id. |
| `purchase_failed` | `product`, `payment_status` | `/thanks` with a status other than `succeeded`, once per payment |
| `upgrade_offer_shown` | `from_product`, `offer_product` | `/thanks` upsell card scrolls into view |
| `upgrade_clicked` | `from_product`, `offer_product` | Buy button in the `/thanks` upsell |
| `leave_offer_shown` | `product`, `how` (`exit-top` / `fast-scroll-up`), `code` (STAY15) | "Before you go" popup on product pages |
| `leave_offer_clicked` | `product`, `action` (`copy_code` / `checkout`), `code` | Copy code or continue to checkout in that popup |
| `leave_offer_dismissed` | `product` | Popup closed |

Kit pages (fake-door test, no real checkout yet) keep their own events: `kit_view`, `kit_buy_click`, `kit_waitlist`, `kit_cross_click` (props: `kit`, `price`, `currency`, `utm_*`).

**Checkout link tagging:** on click, every Dodo link gets `metadata_ph_id=<PostHog distinct_id>` and `metadata_ph_session=<session id>` added. `quantity` and `redirect_url` stay as they are. Dodo passes `metadata_*` into the payment's metadata, so a future Dodo webhook can send a server-side `purchase` to PostHog with the same distinct_id (ties the payment to the visit, UTM and Instagram source).

### Leads (every email form)

| Event | Properties | Fired when |
|---|---|---|
| `signup_submitted` | `form` | Submit pressed |
| `signup_success` | `form` | API said ok |
| `signup_error` | `form`, `reason` (`invalid_email` / `server` / `network`) | Anything else |

`form` values: `home-newsletter` (home), `link-in-bio` (`/start`), `kit-waitlist:<slug>` (kit pages). Never the email itself.

### Link in bio (`/start`)

| Event | Properties | Fired when |
|---|---|---|
| `tile_clicked` | `tile` (`data-track` value: `shop`, `kit-potty`, `kits`, `guide`, `video`, `blog`, `watch`) | Tile tap on `/start` (also sends `cta_clicked`) |

### First touch (UTM + Instagram)

When a visitor arrives with any `utm_*` param or from Instagram (instagram.com referrer or the Instagram in-app browser), these are saved once:
`first_utm_source`, `first_utm_medium`, `first_utm_campaign`, `first_utm_content`, `first_utm_term`, `first_from_instagram`, `first_landing_path`, `first_referrer_host`.

- Saved in the PostHog cookie, so **every later event** carries them (works for funnels without person profiles).
- Also set as **person properties** (`$set_once`). This creates a person profile for those visitors only (normal visitors stay anonymous and cheap).

### Renamed events (old names, before this branch)

| Old | New |
|---|---|
| `buy_click` | `buy_clicked` |
| `purchase` | `purchase_completed` |
| `newsletter_signup` | `signup_success` |
| `start_click` {target} | `tile_clicked` {tile} |
| `exit_offer_shown` / `exit_offer_copy` / `exit_offer_checkout` | `leave_offer_shown` / `leave_offer_clicked` {action} |

## Dashboard to build in PostHog ("Blu shop")

1. **Shop funnel** (Funnel insight): `product_viewed` → `buy_clicked` → `checkout_redirect` → `purchase_completed`. Window 1 day. Make two copies: breakdown by `product`, and by `$geoip_country_code` (or `country_guess`).
2. **Revenue by product** (Trend): `purchase_completed`, sum of `value`, breakdown `product` and `currency`.
3. **Bio tile clicks** (Trend, bar): `tile_clicked` count, breakdown `tile`, last 30 days. Add `$pageview` where `page_type = start` as the denominator to get tap rate.
4. **Signup rate** (Funnel): `$pageview` → `signup_success`, breakdown `page_type`. Plus a Trend of `signup_error` by `reason`.
5. **Instagram → sale** (Funnel): `$pageview` filtered `first_from_instagram = true` → `product_viewed` → `purchase_completed`, breakdown `first_utm_campaign`.
6. **Offers** (Trend): `leave_offer_shown` vs `leave_offer_clicked`; `upgrade_offer_shown` vs `upgrade_clicked`.
7. **Content depth** (Trend): `scroll_depth` breakdown `depth`, filtered `page_type = blog_post`, breakdown by URL.

## Connect PostHog for Claude (so future sessions can read the numbers)

The site key (`PUBLIC_POSTHOG_KEY`, starts `phc_`) can only **send** events. To **read** insights, Claude needs a personal API key.

The founder does this once:

1. PostHog → avatar (bottom left) → **Account settings → Personal API keys → Create personal API key**.
   - Name: `claude-read`
   - Scopes: **read only**: `insight:read`, `query:read`, `project:read`, `dashboard:read`, `event_definition:read`, `person:read`. Nothing with write.
   - Limit it to the Blu Baby Show project.
2. Note the **project id** (Project settings → "Project ID", a number) and the **host** (`https://us.posthog.com` for US cloud, `https://eu.posthog.com` for EU; the API host is the app host, not `us.i.posthog.com`).
3. Put them in a **gitignored** `.env` in the repo where Claude works (the `blubabyshow` repo `.env`, or this repo's `.env.local`). `.env` and `.env.*` are already in `.gitignore` here. Never commit them, never paste them in a chat log:

```
POSTHOG_PERSONAL_API_KEY=phx_...   # read-only personal key
POSTHOG_PROJECT_ID=12345
POSTHOG_HOST=https://us.posthog.com
```

Claude then queries with HogQL, for example:

```
curl -s -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" -H "Content-Type: application/json" \
  "$POSTHOG_HOST/api/projects/$POSTHOG_PROJECT_ID/query/" \
  -d '{"query":{"kind":"HogQLQuery","query":"select event, count() from events where timestamp > now() - interval 7 day group by event order by 2 desc"}}'
```

**Option: the official PostHog MCP server.** PostHog ships an MCP server (`https://mcp.posthog.com/mcp`, or `npx @posthog/wizard mcp add`) that lets Claude list insights, run HogQL, read dashboards and create insights from chat. It uses the same personal API key (give it the same read-only scopes; add `insight:write` / `dashboard:write` only if you want Claude to build the dashboard above itself). Add it with `claude mcp add` and keep the key in the environment, not in a committed file.

## Still to do (not in this branch)

- `PUBLIC_POSTHOG_KEY` (+ `PUBLIC_POSTHOG_HOST` if EU) must be set in Vercel for production, or nothing is sent.
- Dodo webhook → PostHog server-side `purchase` using `metadata.ph_id` (the source of truth; the browser `purchase_completed` misses buyers who close the tab before `/thanks`).
- Privacy page already lists PostHog; no change needed.
