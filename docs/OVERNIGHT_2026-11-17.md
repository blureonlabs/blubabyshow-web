# Overnight: Blululu site redesign (17 Nov 2026)

Branch **`blululu-redesign`**. Not merged. Production, domain, DNS and Vercel env vars are untouched.

## Preview

- Vercel preview for this branch: https://blubabyshow-qqrgbe05z-blubabyshow-6774s-projects.vercel.app
  (Vercel login wall is on for previews; open it while signed in to Vercel.)
- Newer pushes: `gh api "repos/blureonlabs/blubabyshow-web/commits/$(git rev-parse blululu-redesign)/statuses"`, or the Vercel dashboard → Deployments → branch `blululu-redesign`.
- Local: `npm run build && npx astro preview --port 4344`.

## Screenshots (this folder)

`docs/overnight-2026-11-17/` → `home390.jpg` · `home390_top.jpg` · `home1280.jpg` · `pdp390.jpg` · `pdp1280.jpg`

## What changed

1. **One design system** (`src/styles/global.css`): Blululu red `#EA0738`, ink `#16120F`, Archivo headings, Nunito Sans body, Fraunces for soft display words. The old Blu Baby Show variable names now point at the new values, so every older page (blog, kits, start, legal, thanks, studio) picked up the look without a rewrite. Hard-coded old navy colours in those pages swapped for tokens.
2. **Header** (`Nav.astro`): red announcement bar + white header. Burger · wordmark · mail + bag icons on phones; Shop · BluBabyShow · Blog · About on desktop. Phone menu needs no JavaScript.
3. **Footer** (`Footer.astro`): 10C black blocks: Get in touch · About us · Quick links, wordmark, yellow "Feelings first. Always." band.
4. **Home** (`index.astro`), in the order you picked: hero "Engineering childhood." + proof strip + Shop by moment → What we make (01/02/03 + black "Coming soon" kits card) → BluBabyShow sky panel → How a Blululu printable works (grid paper, red boxes) → Join the Blululu family (same working `/api/subscribe`) + slogan band → "Find your moment" colour wall (masonry pattern, filled with moments/products, Instagram + YouTube tiles) → Watch / Play / Shop cards.
5. **Product pages** (`shop/[slug].astro`): rebuilt from the DTC study (`docs/PDP_STUDY.md`): swipe gallery + thumbs, badges, honest "No reviews yet", facts chips (age, pages, PDF, paper size), price, Dodo buy button, trust row, "nothing is shipped" note, accordions, benefits row, look inside, how it works, empty reviews slot, FAQ, 7-day promise, related products, sticky buy bar on phones.
6. **New pages**: `/blubabyshow/` (old home content: show intro, video, real stats, family, most-watched episodes, real comments, four kinds of episode, products from the show) and `/about/` (our story, what we make, promise).
7. **Shop index** restyled; titles and eyebrows changed from "Blu Baby Show / The Blu Shop" to Blululu.
8. **Wordmark**: `public/brand/blululu-red.svg` + `blululu-white.svg`, made from the official `channel-art/blululu/official/blululu_logo_type.svg` (background removed, cropped).
9. **Structured data**: Organization is now "Blululu" (alternateName Blu Baby Show); the show schema moved to `/blubabyshow/`.

## Decisions I made

- Proof strip: dropped the canvas line "0–10 years, made for every stage" (our products are for ages 1–5, so it wasn't true). Used: 92M+ views · ₹/$ · Instant PDF · 7-day refund.
- Masonry ("not family but this pattern"): tiles are moments → products/kits (Big feelings, Colouring, First letters, New baby sibling kit, Bedtime kit, Free printables) with the characters as art, plus Instagram and YouTube tiles.
- Watch / Play / Shop: Watch → /blubabyshow/, Play → colouring pack, Shop → /shop/.
- Rabbit is **Nini** (checked against CHARACTER_BIBLE).
- Footer support email = blubabyshow@gmail.com (real, in repo). "Brands & partnerships" links to /studio/ instead of a placeholder email. **[LEGAL ENTITY NAME]** left as a placeholder.
- No reviews, ratings or sales counts anywhere on product pages.
- Header icons are honest: mail → newsletter, bag → shop (no fake search/account/cart).

## Open questions for you

1. Legal entity name for the footer and the legal pages (privacy/terms still say "Blu Baby Show (we)").
2. A separate partnerships email, or keep the /studio/ link?
3. `/studio/` still says "made entirely with AI" / "100% made with AI". That clashes with the "no Made with AI text" rule. Keep (it's the B2B pitch) or rewrite?
4. Merge to main when you're happy? It changes the live blubabyshow.com home page to Blululu.
5. The newsletter welcome email still comes from "Blu Baby Show" (`api/subscribe.js`), not touched tonight.

## Not done

- No new art made; all images are existing files in `public/`.
- Blog post layout, kits and /start/ got the new colours/fonts/header/footer but kept their own layouts.
- The old `Doodles.astro` component is no longer used on the main pages (kept in the repo).
- `docs/BLULULU_SITE_PLAN.md` is still untracked (it was untracked before tonight).

## Migration map (old blubabyshow.com → this branch)

| Old | New |
|---|---|
| `/` hero video, stats marquee | `/blubabyshow/` hero video + stats strip |
| `/#watch` most-watched episodes | `/blubabyshow/#watch` (+ `/watch` redirect) |
| `/` real comments | `/blubabyshow/` "What parents say" |
| `/` link hub | header + footer + `/start/` (unchanged) |
| `/#newsletter` | `/#newsletter` on the new home (same API), also on `/blubabyshow/` |
| `/#kinds` four kinds of Blu | `/blubabyshow/` |
| `/#story` meet the family wall | `/blubabyshow/` Meet the family; pattern reused on home as "Find your moment" |
| `/` about block | `/about/` (+ `/our-story` redirect) |
| `/#kits`, `/#shop` carousel | home "What we make" + `/shop/` + `/kits/` |
| `/shop/`, `/shop/[slug]/` | same URLs, new design |
| `/kits/`, `/kits/[slug]/` | same URLs |
| `/blog/` + 25 posts | same URLs |
| `/start/`, `/studio/`, `/contact/`, `/privacy/`, `/terms/`, `/refund/`, `/delivery/`, `/thanks/` | same URLs |
| `/shop/dos-and-donts`, `/shop/coloring-book` | existing redirects kept |

Hash links (`/#story`, `/#watch`) can't be redirected by the server; they now land on the new home top.

## Checklist

- [x] New branch, commits with attribution, pushed; Vercel preview built (success)
- [x] `npm run build` passes (28+ pages)
- [x] Every old URL still builds (shop, kits, blog ×25, start, studio, legal, thanks)
- [x] Newsletter posts to the same `/api/subscribe` with `{ email, source, hp }`
- [x] Dodo checkout, keys, env untouched; live/test switch untouched
- [x] One nav: Shop · BluBabyShow · Blog · About
- [x] Shared header/footer/type/colours on every page
- [x] No fake reviews, ratings or counts
- [x] Screenshots at 390 px and 1280 px, two review passes (fixed: hero headline overflow, stacked hero buttons, carousel edge padding, footer spacing, desktop hero art size, shop page old style)
- [ ] Founder review of preview
- [ ] Legal entity name
- [ ] Merge decision
