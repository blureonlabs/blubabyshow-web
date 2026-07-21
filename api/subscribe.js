// Vercel serverless function — newsletter/waitlist signup.
// Writes leads to the SHARED Supabase `subscribers` table (same DB the Blululu
// studio dashboard reads), server-side so the service key stays secret.
// Env (Vercel Project Settings -> Environment Variables):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//
// The `subscribers` table (owned by the studio migration) has RLS enabled with
// NO policies, so only the service key (which bypasses RLS) can write — never
// the browser. Table: id · email (unique, normalized) · source · status · created_at.

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

  // Honeypot: bots fill the hidden field. Pretend success and drop.
  if (hp) return res.status(200).json({ ok: true });

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
    // 201 = created. 409 = already subscribed (unique email) — treat as success.
    if (r.ok || r.status === 409) return res.status(200).json({ ok: true });
    const detail = await r.text();
    console.error('supabase insert failed', r.status, detail);
    return res.status(502).json({ ok: false, error: 'Could not sign you up — please try again.' });
  } catch (e) {
    console.error('subscribe failed', e);
    return res.status(500).json({ ok: false, error: 'Something went wrong — please try again.' });
  }
}
