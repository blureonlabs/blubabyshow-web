// One tiny event helper for the whole site. Every PostHog event goes through track().
// No key set (PUBLIC_POSTHOG_KEY) = window.posthog is missing and every call is a no-op.
// Never pass emails, names or payment ids in props: the PostHog sanitizer in Base.astro is a
// safety net, not a licence. Event list + properties: docs/POSTHOG_EVENTS.md.

type Props = Record<string, unknown>;
const w = window as any;

/** Debug: open any page with ?bbs_debug=1 once (stays on for the tab) to log events to the console. */
export const debug = (() => {
  try {
    if (new URLSearchParams(location.search).get('bbs_debug') === '1') sessionStorage.setItem('bbs_debug', '1');
    return sessionStorage.getItem('bbs_debug') === '1';
  } catch { return false; }
})();

/** Same rule as the buy buttons: India time zone = INR, anywhere else = USD. */
export const inIndia = (() => {
  try { return /Asia\/(Kolkata|Calcutta)/.test(Intl.DateTimeFormat().resolvedOptions().timeZone); } catch { return true; }
})();
export const currency = inIndia ? 'INR' : 'USD';
/** Rough guess from the browser time zone. PostHog also adds $geoip_country_code server-side. */
export const countryGuess = inIndia ? 'IN' : 'non-IN';
export const pageType = document.documentElement.dataset.pageType || 'other';

/**
 * Send one event. `leaving: true` = the browser is about to leave the page (checkout, outbound),
 * so send it now with sendBeacon instead of waiting for the next batch.
 */
export function track(event: string, props: Props = {}, leaving = false) {
  if (debug) console.info('[bbs-track]', event, props);
  try {
    w.posthog?.capture?.(event, props, leaving ? { transport: 'sendBeacon', send_instantly: true } : undefined);
  } catch {}
}

/** Email forms: one form name per form, e.g. 'home-newsletter', 'link-in-bio', 'kit-waitlist:potty'. */
export const signup = {
  submitted: (form: string) => track('signup_submitted', { form }),
  success: (form: string) => track('signup_success', { form }),
  error: (form: string, reason: 'invalid_email' | 'server' | 'network') => track('signup_error', { form, reason }),
};
