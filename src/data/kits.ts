// Blu Kits: pre-launch ("fake door") pages. Each kit page shows a real price and a Buy button.
// A tap does NOT charge anyone: it logs intent (PostHog `kit_buy_click` + Meta `InitiateCheckout`)
// and opens the early-access form (email -> Supabase `subscribers`, source `kit-waitlist:<slug>`).
// Rule: build a kit only once its page shows real buy intent. See blubabyshow/commerce/KIT_TESTS.md.

export interface Kit {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  inside: string[];
  forWho: string;
  inr: number;
  usd: number;
  img: string;
  imgAlt: string;
  accent: string;
  launch: string; // shown on the early-access form
}

export const kits: Kit[] = [
  {
    slug: 'potty',
    name: 'Blu Goes Potty',
    tagline: 'Potty training in tiny, toddler-sized steps, with Blu showing the way.',
    problem:
      'Most potty books are long, full of flaps, and only one page is about the potty. Toddlers lose interest and parents are left guessing what to say.',
    inside: [
      'A 2-minute Blu potty video to watch together',
      'A short swipe-through story: one idea per page, made for 2-year-old attention spans',
      'The exact words to say on every page (and what not to say)',
      'Tricky moments covered: accidents, "I don\'t want to!", going out, and when it\'s hard to poop',
      'A star chart to tap on your phone or print (A4 + US Letter)',
    ],
    forWho: 'Ages 18 months to 3 years',
    inr: 99,
    usd: 5,
    img: '/characters/blu.webp',
    imgAlt: 'Blu, smiling, ready for his potty adventure',
    accent: 'var(--sun, #ffc93c)',
    launch: 'in about a week',
  },
  {
    slug: 'new-sibling',
    name: 'Blu Becomes a Big Brother',
    tagline: 'Help your little one get ready for the new baby, and feel loved after it arrives.',
    problem:
      'A new baby turns a toddler\'s world upside down. Jealousy, clinginess and "send it back!" are normal, but most books skip the hard feelings.',
    inside: [
      'A 2-minute Blu video: the day Blu met his baby sister',
      'A short story to read before and after the baby comes',
      'What to say when your child feels jealous, left out or angry at the baby',
      '5 tiny "big sibling" jobs that build pride instead of resentment',
      'Works for big brothers AND big sisters',
    ],
    forWho: 'Ages 18 months to 4 years, with a baby on the way or just arrived',
    inr: 99,
    usd: 5,
    img: '/episodes/meets-baby-sister.webp',
    imgAlt: 'Blu meeting his baby sister for the first time',
    accent: 'var(--sky, #7cc4f5)',
    launch: 'in about a week',
  },
  {
    slug: 'kind-hands',
    name: 'Blu Learns Kind Hands',
    tagline: 'For the hitting, pushing and biting phase, with calm words that actually work.',
    problem:
      '"Hands are not for hitting" is easy to say and hard to teach. Simple rule books lose a 2-year-old fast, and in the moment you need words, not theory.',
    inside: [
      'A 2-minute Blu video: Blu gets mad, then finds a better way',
      'A short story your toddler will ask for again',
      'What to say in the moment, and after, when they hit, bite or push',
      '4 "big feeling" moves toddlers can do instead (stomp, squeeze, breathe, tell)',
      'A calm-down card to keep on your phone',
    ],
    forWho: 'Ages 18 months to 4 years',
    inr: 99,
    usd: 5,
    img: '/episodes/belly-hug.webp',
    imgAlt: 'Blu giving a big gentle hug',
    accent: 'var(--orange, #ff9f5a)',
    launch: 'in about a week',
  },
  {
    slug: 'bedtime',
    name: "Blu's Calm Bedtime",
    tagline: 'A gentle bedtime routine your toddler can follow, with Blu doing it too.',
    problem:
      'Bedtime battles drain the last of your energy. Toddlers fight sleep when the routine feels long and unpredictable.',
    inside: [
      'A 3-minute wind-down Blu video with soft music',
      'A picture routine: bath, teeth, story, cuddle, lights out',
      'What to say for "one more story", "I\'m scared" and "I\'m not tired"',
      'A 10-minute calm lullaby audio',
      'A routine chart to tap on your phone or print',
    ],
    forWho: 'Ages 1 to 4 years',
    inr: 99,
    usd: 5,
    img: '/characters/blu_book.webp',
    imgAlt: 'Blu with his bedtime book',
    accent: 'var(--lilac, #b8a6f0)',
    launch: 'in about a week',
  },
];

export const kitBySlug = (s: string) => kits.find((k) => k.slug === s);
