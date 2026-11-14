// The Blu Shop catalogue. One source of truth for /shop, product pages and /thanks.
// Checkout links come from Dodo Payments (hosted checkout / payment links), set per product in
// Vercel env. No link set = the buy button falls back to "notify me" (newsletter), so the page
// can ship before Dodo is approved.

export interface Product {
  slug: string;
  name: string;
  short: string;
  inr: number;
  usd: number;
  img: string;
  imgAlt: string;
  accent: string;
  badge: string;
  // Shown everywhere a price is shown: these are soft copies only for now.
  format: string;
  inside: string[];
  forWho: string;
  previews?: string[];
  checkoutInr?: string;
  checkoutUsd?: string;
}

const env = import.meta.env;

export const products: Product[] = [
  {
    slug: 'meltdown-scripts',
    name: 'What to Say When Your Toddler Melts Down',
    short: '20 calm scripts with Blu for the hardest everyday moments: what to say, what to do, and what to avoid.',
    inr: 49,
    usd: 3,
    img: '/shop/meltdown/cover.webp',
    imgAlt: 'Cover of What to Say When Your Toddler Melts Down, with Blu and his family',
    accent: 'var(--orange)',
    badge: 'Starter guide',
    format: 'Digital download only (PDF soft copy) · 17 pages · A4 and US Letter · read on your phone or print at home. Nothing is shipped.',
    inside: [
      '20 real moments: leaving the park, bedtime, the car seat, hitting, the new baby and more',
      'For each one: what to say, what to do, and what to avoid',
      'The science of meltdowns in plain words (one page, no jargon)',
      'A cut-out fridge card: 5 calm steps and 3 lines for any meltdown',
      'When to talk to your doctor',
      'Every "why it works" linked to its source: AAP, NHS, CDC, WHO, UNICEF, ZERO TO THREE, Harvard',
    ],
    forWho: 'Parents, grandparents and carers of little ones aged 1 to 4.',
    previews: ['/shop/meltdown/page03.webp', '/shop/meltdown/page05.webp', '/shop/meltdown/page14.webp'],
    checkoutInr: env.PUBLIC_DODO_LINK_MELTDOWN_INR,
    checkoutUsd: env.PUBLIC_DODO_LINK_MELTDOWN_USD,
  },
  {
    slug: 'coloring-book',
    name: "Blu's Big Feelings Colouring Book (PDF)",
    short: '20 pages of Blu, his family and his big feelings to colour in, and talk about together.',
    inr: 149,
    usd: 7,
    img: '/characters/blu_book.webp',
    imgAlt: 'Blu holding the Blu colouring book',
    accent: 'var(--grass)',
    badge: 'Most loved',
    format: 'Digital download only (PDF soft copy) · 20 colouring pages · print at home as often as you like. This is not a printed book; nothing is shipped.',
    inside: [
      'Blu, Mum, Dad, Puppy and baby Sister in 20 everyday moments',
      'Each page names a feeling: happy, cross, scared, proud, shy',
      'A one-line “talk about it” prompt for you on every page',
      'Big, simple outlines made for little hands (2–6 years)',
      'Print as many copies as your family needs',
    ],
    forWho: 'Children aged 2–6 who love Blu, and parents who want 15 quiet, screen-free minutes.',
    checkoutInr: env.PUBLIC_DODO_LINK_BOOK_INR,
    checkoutUsd: env.PUBLIC_DODO_LINK_BOOK_USD,
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);
