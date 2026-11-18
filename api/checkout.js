// Vercel serverless function: opens a Dodo checkout session for the custom /checkout/<slug>/ page.
//
// The page POSTs { p: <slug>, ph_id?, ph_session? }. Server-side we map the slug to a product ID
// from the allow-list below (a product ID or price from the browser is never used), create a
// checkout session and reply { checkout_url, mode } only. The page embeds that URL with the
// dodopayments-checkout SDK (inline mode). Inline mode needs nothing extra on the session: it is a
// normal checkout session; the SDK frames its checkout_url.
// Anything missing or odd -> { fallback: true } and the page sends the buyer to the static
// /buy/ link, so a sale is never lost. Docs: docs/CUSTOM_CHECKOUT.md.
//
// Env (Vercel Project Settings -> Environment Variables), same names as api/upgrade.js:
//   DODO_PAYMENTS_API_KEY        secret API key (never sent to the browser, never logged)
//   DODO_PAYMENTS_ENVIRONMENT    'test_mode' (default) or 'live_mode'
//   PUBLIC_SITE_URL              optional, base for return_url (default: https://<request host>)
//   DODO_<SLUG>_PRODUCT_ID       optional per-product override, e.g. DODO_ABC_PRODUCT_ID
//
// Grant access from the Dodo webhook / Dodo's own delivery email, never from return_url.

// Same product IDs as src/data/products.ts (live mode).
const LIVE_IDS = {
  'meltdown-scripts': 'pdt_0NrvQbzhsNPbZARBNl5o0',
  'colouring-pack': 'pdt_0Nrvjcuq0CSzAEC8cdMWN',
  'abc-book': 'pdt_0Nrvjd0XaxrHfhj6utpFs',
  'colouring-abc-bundle': 'pdt_0Nrvjd4cfdVZSWvMt4cUF',
};
// Test-mode copies (Dodo keeps modes separate). Same list as TEST_IDS in products.ts.
const TEST_IDS = {
  'colouring-pack': 'pdt_0Nrvn2dnmiRS0XfDqKuF3',
  'meltdown-scripts': 'pdt_0NruxXvIUhcJwv3uUwW4s',
};
const ENV_OVERRIDE = {
  'meltdown-scripts': 'DODO_MELTDOWN_PRODUCT_ID',
  'colouring-pack': 'DODO_COLOURING_PRODUCT_ID',
  'abc-book': 'DODO_ABC_PRODUCT_ID',
  'colouring-abc-bundle': 'DODO_BUNDLE_PRODUCT_ID',
};

// Light in-memory rate limit: per warm instance only, so it slows a script down; it is not a wall.
const LIMIT = 10; // sessions per IP per window
const WINDOW_MS = 60 * 1000;
const hits = new Map(); // ip -> { n, t }

function limited(ip) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > WINDOW_MS) {
    hits.set(ip, { n: 1, t: now });
    if (hits.size > 2000) hits.delete(hits.keys().next().value);
    return false;
  }
  h.n += 1;
  return h.n > LIMIT;
}

const fallback = (res, why, status = 200) => {
  console.warn('checkout fallback:', why); // reason only, never keys, emails or ids
  return res.status(status).json({ fallback: true });
};

function productId(slug, mode) {
  const envKey = ENV_OVERRIDE[slug];
  if (envKey && process.env[envKey]) return process.env[envKey];
  return mode === 'live_mode' ? LIVE_IDS[slug] : TEST_IDS[slug];
}

// PostHog ids are random strings (uuid-like). Anything else is dropped, so no email can ride in.
const cleanId = (v) => {
  const s = String(v || '').trim();
  return /^[A-Za-z0-9_\-]{8,80}$/.test(s) && !s.includes('@') ? s : '';
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ fallback: true });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  if (limited(ip)) return fallback(res, 'rate limited', 429);

  let slug = '', phId = '', phSession = '';
  try {
    const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    slug = String(b.p || '').trim();
    phId = cleanId(b.ph_id);
    phSession = cleanId(b.ph_session);
  } catch { /* checked below */ }

  if (!Object.prototype.hasOwnProperty.call(LIVE_IDS, slug)) return fallback(res, 'unknown product', 400);

  const key = process.env.DODO_PAYMENTS_API_KEY;
  const mode = process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode';
  if (!key) return fallback(res, 'not configured');
  const base = mode === 'live_mode' ? 'https://live.dodopayments.com' : 'https://test.dodopayments.com';
  const pid = productId(slug, mode);
  if (!pid) return fallback(res, 'product id missing for ' + mode);

  const site = (process.env.PUBLIC_SITE_URL || `https://${req.headers.host}`).replace(/\/+$/, '');
  const metadata = {};
  if (phId) metadata.ph_id = phId;
  if (phSession) metadata.ph_session = phSession;

  const body = {
    product_cart: [{ product_id: pid, quantity: 1 }],
    return_url: `${site}/thanks/?p=${slug}`,
    customization: { theme: "light" },
    ...(Object.keys(metadata).length ? { metadata } : {}),
  };

  try {
    const cr = await fetch(`${base}/checkouts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!cr.ok) return fallback(res, 'checkout create ' + cr.status);
    const out = await cr.json();
    if (!out || typeof out.checkout_url !== 'string' || !/^https:\/\/([a-z0-9-]+\.)*dodopayments\.com\//.test(out.checkout_url)) {
      return fallback(res, 'no checkout_url');
    }
    return res.status(200).json({ checkout_url: out.checkout_url, mode: mode === 'live_mode' ? 'live' : 'test' });
  } catch (e) {
    return fallback(res, 'error ' + (e && e.name));
  }
}
