// Vercel serverless function — newsletter/waitlist signup.
// 1) Writes the lead to the SHARED Supabase `subscribers` table (the same DB the
//    Blululu studio dashboard reads), server-side so keys stay secret.
// 2) Sends a warm welcome email via Resend (non-blocking — a mail failure never
//    fails the signup; capturing the lead is what matters).
// Env (Vercel Project Settings -> Environment Variables):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY
//
// blubabyshow.com is verified in Resend, so welcome emails deliver to all
// subscribers from hello@blubabyshow.com. If RESEND_API_KEY is unset, the
// welcome is skipped silently (signup still succeeds).

const FROM = 'Blu Baby Show <hello@notifications.blubabyshow.com>'; // verified subdomain in Resend
const REPLY_TO = 'hello@blubabyshow.com'; // replies route to the main inbox

// Per-IP rate limit via Upstash Redis REST (OPTIONAL). Unset env = limiting off.
// FAIL-OPEN: if Redis is unreachable we allow the signup — never block real users.
// Activate by setting UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN in Vercel.
const RL_MAX = 5;         // max signups per IP...
const RL_WINDOW = 3600;   // ...per hour (seconds)

async function rateLimited(ip) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token || !ip) return false;      // disabled, or no IP to key on
  try {
    const key = `rl:sub:${ip}`;
    const r = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      // INCR the counter; set the window only on first hit (EXPIRE ... NX)
      body: JSON.stringify([['INCR', key], ['EXPIRE', key, RL_WINDOW, 'NX']]),
    });
    const out = await r.json();                  // [{result: count}, {result: 0|1}]
    const count = Array.isArray(out) ? out[0]?.result : undefined;
    return typeof count === 'number' && count > RL_MAX;
  } catch (e) {
    console.error('rate-limit check failed (fail-open)', e);
    return false;
  }
}

function welcomeHtml() {
  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin:0 auto;color:#2b2c41;line-height:1.6">
    <h1 style="font-size:24px;color:#30598a;margin:0 0 8px">You're in 💛</h1>
    <p style="margin:0 0 14px">Welcome to <strong>Blu's Sunday Club</strong>.</p>
    <p style="margin:0 0 14px">Every Sunday we'll send you one gentle story and one new Blu video —
      the kind that makes the long days a little softer.</p>
    <p style="margin:0 0 14px">Your free <strong>Blu Emotion Cards</strong> — gentle things to say when the
      moment is hard — are on their way soon. 💙</p>
    <p style="margin:0 0 14px">You're doing better than you think.</p>
    <p style="margin:20px 0 0;color:#5c5d7a">— The Blu Baby Show family<br/>
      <a href="https://instagram.com/theblubabyshow" style="color:#2f83c9">@theblubabyshow</a></p>
  </div>`;
}

async function sendWelcome(email) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return; // welcome disabled if no key
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        reply_to: REPLY_TO,
        to: email,
        subject: "You're in! Welcome to Blu's Sunday Club 💛",
        html: welcomeHtml(),
      }),
    });
  } catch (e) {
    console.error('welcome email failed (non-blocking)', e);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(500).json({ ok: false, error: 'Signups aren’t configured yet.' });

  let email = '', source = 'website', hp = '';
  try {
    const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    email = (b.email || '').trim().toLowerCase();   // normalize: trim + lowercase (matches studio)
    source = (b.source || 'website').slice(0, 80);
    hp = b.hp || '';
  } catch { /* validation below */ }

  if (hp) return res.status(200).json({ ok: true });   // honeypot: bots fill it — drop silently

  // Validate: RFC max length (254) + shape. Caps pathological payloads before the DB/email hop.
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email.' });
  }

  // Rate limit by client IP (Vercel sets x-forwarded-for). No-op unless Upstash is configured.
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  if (await rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Too many signups just now — please try again in a bit.' });
  }

  try {
    const r = await fetch(`${url}/rest/v1/subscribers`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ email, source }),
    });

    if (r.status === 201) {
      await sendWelcome(email);                 // new subscriber → welcome (non-blocking)
      return res.status(200).json({ ok: true });
    }
    if (r.status === 409) return res.status(200).json({ ok: true }); // already subscribed — no re-welcome

    const detail = await r.text();
    console.error('supabase insert failed', r.status, detail);
    return res.status(502).json({ ok: false, error: 'Could not sign you up — please try again.' });
  } catch (e) {
    console.error('subscribe failed', e);
    return res.status(500).json({ ok: false, error: 'Something went wrong — please try again.' });
  }
}
