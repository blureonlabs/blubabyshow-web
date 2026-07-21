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

const FROM = 'Blu Baby Show <hello@blubabyshow.com>'; // blubabyshow.com verified in Resend

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
  // Health check: GET /api/subscribe reports which env vars the function can SEE
  // (booleans only — never leaks values). Visit in a browser to debug config.
  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      config: {
        SUPABASE_URL: !!process.env.SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      },
    });
  }
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

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email.' });
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
