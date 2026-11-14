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
  dodoId?: string;
}

const env = import.meta.env;

// Dodo live checkout. Dodo picks the buyer's price from their country (fixed ₹ price for India,
// lower prices in lower-income countries, USD elsewhere), so one link serves everyone.
// Stays off until the Dodo account is approved: set PUBLIC_DODO_LIVE=true in Vercel to switch on.
// PUBLIC_DODO_TEST=true (local only) points the buttons at Dodo test mode instead, so the whole
// flow can be tried with a test card and no real money.
const DODO_LIVE = env.PUBLIC_DODO_LIVE === 'true';
const DODO_TEST = env.PUBLIC_DODO_TEST === 'true';
const SITE = DODO_TEST ? (env.PUBLIC_SITE_URL || 'http://localhost:4330') : 'https://www.blubabyshow.com';
// Test-mode copies of the live products (Dodo keeps the two modes separate).
const TEST_IDS: Record<string, string> = {
  'colouring-pack': 'pdt_0Nrvn2dnmiRS0XfDqKuF3',
  'meltdown-scripts': 'pdt_0NruxXvIUhcJwv3uUwW4s',
};
const dodo = (id: string, slug: string) => {
  if (DODO_TEST) return TEST_IDS[slug] ? `https://test.checkout.dodopayments.com/buy/${TEST_IDS[slug]}?quantity=1&redirect_url=${encodeURIComponent(`${SITE}/thanks/?p=${slug}`)}` : undefined;
  return DODO_LIVE ? `https://checkout.dodopayments.com/buy/${id}?quantity=1&redirect_url=${encodeURIComponent(`${SITE}/thanks/?p=${slug}`)}` : undefined;
};

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
    dodoId: 'pdt_0NrvQbzhsNPbZARBNl5o0',
    checkoutInr: dodo('pdt_0NrvQbzhsNPbZARBNl5o0', 'meltdown-scripts'),
    checkoutUsd: dodo('pdt_0NrvQbzhsNPbZARBNl5o0', 'meltdown-scripts'),
  },
  {
    slug: 'colouring-pack',
    name: 'Blu Colouring + Pencil Control Pack (PDF)',
    short: '79 printable pages for little hands: Blu colouring pages plus pencil-control pages that get them ready to write.',
    inr: 149,
    usd: 7,
    img: '/shop/colouring/shop_1_cover.webp',
    imgAlt: 'Cover of the Blu Colouring and Pencil Control Pack, with Blu holding a crayon',
    accent: 'var(--grass)',
    badge: 'Screen-free fun',
    format: 'Digital download only (PDF soft copy) · 79 pages · A4 and US Letter · print at home as often as your family needs. Nothing is shipped.',
    inside: [
      '52 colouring pages: Blu, Mum, Dad, Puppy, baby Sister, animals and everyday moments',
      '22 pencil-control pages in two levels: lines, curves, zigzags and road mazes',
      'Big, simple outlines made for little hands (ages 2 to 5)',
      'A "how to use this pack" page for parents, plus a finished-it certificate',
      'Print as many copies as your family needs',
    ],
    forWho: 'Children aged 2 to 5, and parents who want quiet, screen-free time that also builds pencil skills.',
    previews: ['/shop/colouring/shop_2_colouring.webp', '/shop/colouring/shop_3_pencil_control.webp', '/shop/colouring/shop_4_feelings_and_firsts.webp'],
    dodoId: 'pdt_0Nrvjcuq0CSzAEC8cdMWN',
    checkoutInr: dodo('pdt_0Nrvjcuq0CSzAEC8cdMWN', 'colouring-pack'),
    checkoutUsd: dodo('pdt_0Nrvjcuq0CSzAEC8cdMWN', 'colouring-pack'),
  },
  {
    slug: 'abc-book',
    name: 'Blu ABC Book (PDF)',
    short: 'A to Z with Blu: for every letter, a colour page to read, a page to trace and a page to colour.',
    inr: 129,
    usd: 5,
    img: '/shop/abc/shop_1_cover.webp',
    imgAlt: 'Cover of the Blu ABC Book',
    accent: 'var(--sun)',
    badge: 'Learn with Blu',
    format: 'Digital download only (PDF soft copy) · 82 pages · A4 and US Letter · read on a tablet or print at home. Nothing is shipped.',
    inside: [
      '26 colour pages: one letter, one word, one Blu picture',
      '26 tracing pages with big dotted letters and the word to trace',
      '26 matching colouring pages',
      'An A to Z poster for the wall and simple tips for parents',
    ],
    forWho: 'Children aged 2 to 5 who are starting letters, and parents who want a gentle, playful way in.',
    previews: ['/shop/abc/shop_2_three_in_one.webp', '/shop/abc/shop_3_read_pages.webp', '/shop/abc/shop_4_poster.webp'],
    dodoId: 'pdt_0Nrvjd0XaxrHfhj6utpFs',
    checkoutInr: dodo('pdt_0Nrvjd0XaxrHfhj6utpFs', 'abc-book'),
    checkoutUsd: dodo('pdt_0Nrvjd0XaxrHfhj6utpFs', 'abc-book'),
  },
  {
    slug: 'colouring-abc-bundle',
    name: 'Blu Colouring + ABC Bundle (PDF)',
    short: 'Both printable books together: the Colouring + Pencil Control Pack and the ABC Book. 161 pages.',
    inr: 249,
    usd: 10,
    img: '/shop/bundle/cover.webp',
    imgAlt: 'The Blu Colouring Pack and the Blu ABC Book side by side',
    accent: 'var(--grape)',
    badge: 'Best value',
    format: 'Digital download only (PDF soft copy) · 161 pages across two books · A4 and US Letter · print at home. Nothing is shipped.',
    inside: [
      'The full Blu Colouring + Pencil Control Pack (79 pages)',
      'The full Blu ABC Book (82 pages)',
      'Save compared with buying both separately',
    ],
    forWho: 'Families with a 2 to 5 year old who want weeks of screen-free activities.',
    previews: ['/shop/colouring/shop_2_colouring.webp', '/shop/abc/shop_2_three_in_one.webp', '/shop/colouring/shop_3_pencil_control.webp'],
    dodoId: 'pdt_0Nrvjd4cfdVZSWvMt4cUF',
    checkoutInr: dodo('pdt_0Nrvjd4cfdVZSWvMt4cUF', 'colouring-abc-bundle'),
    checkoutUsd: dodo('pdt_0Nrvjd4cfdVZSWvMt4cUF', 'colouring-abc-bundle'),
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);
