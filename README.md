# blubabyshow.com — web

The public website for **Blu Baby Show**. Built with [Astro](https://astro.build) (static output), deployed on Vercel.

> Sibling to the `blureonlabs/blubabyshow` content repo. Content/strategy lives there; this repo is *only* the website code. They couple at runtime (Supabase), never via imports — same rule as the studio.

---

## Why this exists

The #1 revenue bottleneck is the Instagram link-tap rate: **165K profile visits/mo → 0.32% tap out.** This site is the high-converting destination that click lands on — it replaces the Beacons link-in-bio and turns the traffic into owned email + revenue actions.

**Phase 0 (now):** a conversion-first single-page homepage — hero, newsletter capture, link hub, music, shop, YouTube. Ships fast, closes the leak.

**Phase 1 (next):** expand to the full site — `/watch`, `/learn`, `/shop`, `/about`, `/small-moments` (blog + SEO), `/listen`, `/press`, `/for-brands`.

Full spec: `blubabyshow` repo → `marketing/WEBSITE_PLAN.md`.

---

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output → dist/
npm run preview  # preview the build
```

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro (static) |
| Hosting | Vercel (free tier) |
| Newsletter | Beehiiv (embed — TODO) |
| Payments | Razorpay (India) + Gumroad (global) — TODO |
| Analytics | Plausible — TODO |
| Data (later) | Supabase — reads *published* content once the Blululu studio ships |

## Structure

```
src/
├── layouts/Base.astro       SEO head, fonts, nav + footer shell
├── components/
│   ├── Nav.astro            sticky 5-door nav
│   └── Footer.astro
├── pages/index.astro        the Phase-0 conversion homepage
└── styles/global.css        brand tokens (cream / crimson / honey) + type
public/characters/           Blu / Mom / Dad / Puppy art
```

## Design

Warm, character-first, editorial — a small children's publishing house, **not** a startup landing page. Cream `#faf7ee` base, crimson `#e11d48` accent, Fredoka + Poppins + Newsreader. Blu's face in the first 400px of every page.

`TODO` markers in the source flag every spot that gets wired to a real service (Beehiiv, Razorpay, Spotify, Supabase).

---

© 2026 BlureonLabs. Proprietary — all rights reserved.
