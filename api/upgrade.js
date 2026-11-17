// Vercel serverless function — "credit what you paid" upgrade to the Colouring + ABC bundle.
//
// The /thanks page calls this right after someone buys ONE book (colouring-pack or abc-book).
// Server-side we:
//   1) fetch the payment from Dodo and check it really succeeded, is recent, and was for that book;
//   2) open a Dodo checkout session for the bundle with the matching credit code pre-applied
//      (static payment links can't pre-apply a code; checkout sessions can);
//   3) reply { checkout_url, currency } ('INR' or 'USD').
// Anything missing or odd → { fallback: true } and the page shows the plain bundle button instead.
//
// Env (Vercel Project Settings -> Environment Variables):
//   DODO_PAYMENTS_API_KEY        secret API key (never sent to the browser, never logged)
//   DODO_PAYMENTS_ENVIRONMENT    'test_mode' (default) or 'live_mode'
//   UPGRADE_CODE_COLOURING       optional, default UPGRADE-COLOURING
//   UPGRADE_CODE_ABC             optional, default UPGRADE-ABC
//   DODO_BUNDLE_PRODUCT_ID       optional override (e.g. the test-mode copy of the bundle)
//   DODO_COLOURING_PRODUCT_ID / DODO_ABC_PRODUCT_ID   optional overrides (test-mode copies)
//
// Price rule: we never trust prices from the browser. The credit only applies when the buyer
// paid in INR or USD and paid at least the full list price (PPP / lower local prices → fallback),
// because the credit codes are set up in INR and USD only.
// Real one-use guard = the Dodo code itself (1 use per customer). The in-memory set below just
// stops one warm instance from making many sessions for the same payment.

// Same product IDs as src/data/products.ts (live mode).
const LIVE_IDS = {
  'colouring-pack': 'pdt_0Nrvjcuq0CSzAEC8cdMWN',
  'abc-book': 'pdt_0Nrvjd0XaxrHfhj6utpFs',
  'colouring-abc-bundle': 'pdt_0Nrvjd4cfdVZSWvMt4cUF',
};
// Test-mode copies (Dodo keeps modes separate). Only the colouring pack has one so far.
const TEST_IDS = {
  'colouring-pack': 'pdt_0Nrvn2dnmiRS0XfDqKuF3',
};

// What each book costs at full price, in the smallest unit (paise / cents). Mirrors products.ts.
const LIST_PRICE = {
  'colouring-pack': { INR: 14900, USD: 700 },
  'abc-book': { INR: 12900, USD: 500 },
};

const CODE_FOR = {
  'colouring-pack': () => process.env.UPGRADE_CODE_COLOURING || 'UPGRADE-COLOURING',
  'abc-book': () => process.env.UPGRADE_CODE_ABC || 'UPGRADE-ABC',
};

const WINDOW_MS = 7 * 24 * 3600 * 1000; // offer stays open for 7 days after the first purchase
const seen = new Map(); // payment_id -> { checkout_url, currency } (per warm instance)

const fallback = (res, why) => {
  console.warn('upgrade fallback:', why); // reason only, never keys or emails
  return res.status(200).json({ fallback: true });
};

function productId(slug, mode) {
  const envKey = { 'colouring-pack': 'DODO_COLOURING_PRODUCT_ID', 'abc-book': 'DODO_ABC_PRODUCT_ID', 'colouring-abc-bundle': 'DODO_BUNDLE_PRODUCT_ID' }[slug];
  if (envKey && process.env[envKey]) return process.env[envKey];
  return mode === 'live_mode' ? LIVE_IDS[slug] : TEST_IDS[slug];
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST' && req.method !== 'GET') return res.status(405).json({ fallback: true });

  let paymentId = '', slug = '';
  try {
    const b = req.method === 'POST'
      ? (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {}))
      : (req.query || {});
    paymentId = String(b.payment_id || '').trim();
    slug = String(b.p || '').trim();
  } catch { /* checked below */ }

  if (!/^pay_[A-Za-z0-9]{6,64}$/.test(paymentId)) return fallback(res, 'bad payment_id');
  if (!CODE_FOR[slug]) return fallback(res, 'no credit for this product');

  const key = process.env.DODO_PAYMENTS_API_KEY;
  const mode = process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode';
  if (!key) return fallback(res, 'not configured');
  const base = mode === 'live_mode' ? 'https://live.dodopayments.com' : 'https://test.dodopayments.com';
  const bookId = productId(slug, mode);
  const bundleId = productId('colouring-abc-bundle', mode);
  if (!bookId || !bundleId) return fallback(res, 'product id missing for ' + mode);

  if (seen.has(paymentId)) return res.status(200).json(seen.get(paymentId));

  const headers = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
  try {
    // 1) The payment, straight from Dodo.
    const pr = await fetch(`${base}/payments/${encodeURIComponent(paymentId)}`, { headers });
    if (!pr.ok) return fallback(res, 'payment lookup ' + pr.status);
    const pay = await pr.json();

    if (pay.status !== 'succeeded') return fallback(res, 'payment not succeeded');
    const created = Date.parse(pay.created_at || '');
    if (created && Date.now() - created > WINDOW_MS) return fallback(res, 'offer window over');
    const cart = Array.isArray(pay.product_cart) ? pay.product_cart : [];
    const ids = cart.map((x) => x && x.product_id);
    if (!ids.includes(bookId)) return fallback(res, 'payment not for this product');
    if (ids.includes(bundleId)) return fallback(res, 'already has bundle');

    const currency = String(pay.currency || '').toUpperCase();
    const list = LIST_PRICE[slug][currency];
    if (!list) return fallback(res, 'currency has no credit code');
    if (!(Number(pay.total_amount) >= list)) return fallback(res, 'paid less than list price');

    const email = pay.customer && pay.customer.email;
    const country = pay.billing && pay.billing.country;

    // 2) Bundle checkout with the credit pre-applied.
    const site = process.env.PUBLIC_SITE_URL || `https://${req.headers.host}`;
    const body = {
      product_cart: [{ product_id: bundleId, quantity: 1 }],
      discount_codes: [CODE_FOR[slug]()],
      return_url: `${site}/thanks/?p=colouring-abc-bundle&from=${slug}`,
      metadata: { upgrade_from: slug, upgrade_from_payment: paymentId },
      feature_flags: { allow_discount_code: false },
    };
    if (email) body.customer = { email };
    if (country) body.billing_address = { country };

    const cr = await fetch(`${base}/checkouts`, { method: 'POST', headers, body: JSON.stringify(body) });
    if (!cr.ok) return fallback(res, 'checkout create ' + cr.status);
    const out = await cr.json();
    if (!out.checkout_url) return fallback(res, 'no checkout_url');

    // currency tells the page which prices to show (what they really paid, not a guess).
    const reply = { checkout_url: out.checkout_url, currency };
    seen.set(paymentId, reply);
    if (seen.size > 500) seen.delete(seen.keys().next().value);
    return res.status(200).json(reply);
  } catch (e) {
    return fallback(res, 'error ' + (e && e.name));
  }
}
