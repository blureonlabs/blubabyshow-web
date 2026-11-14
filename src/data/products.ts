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
  checkoutInr?: string;
  checkoutUsd?: string;
}

const env = import.meta.env;

export const products: Product[] = [
  {
    slug: 'dos-and-donts',
    name: "Blu's Baby Dos & Don'ts",
    short: 'The little rules that keep 0–3 year olds safe, calm and sleeping, in one friendly picture guide.',
    inr: 49,
    usd: 3,
    img: '/characters/mom.webp',
    imgAlt: 'Mum from Blu Baby Show',
    accent: 'var(--orange)',
    badge: 'Starter guide',
    format: 'Digital download only (PDF soft copy) · 12 illustrated pages · read on your phone or print at home. Nothing is shipped.',
    inside: [
      'Safe sleep: the simple checklist for cot, room and bedtime',
      'When your baby cries: 3 things to try, and 3 to never do',
      'Choking hazards: the everyday foods and toys to watch',
      'Bath and water time: the rules that matter most',
      'Screen time by age: what the guidance actually says',
      'Every tip drawn with Blu and linked to its official source',
    ],
    forWho: 'New and tired parents of babies and toddlers (0–3 years), grandparents and caregivers.',
    checkoutInr: env.PUBLIC_DODO_LINK_DOS_INR,
    checkoutUsd: env.PUBLIC_DODO_LINK_DOS_USD,
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
