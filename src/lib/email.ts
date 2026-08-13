import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

/**
 * Lazy Resend client. Returns null when RESEND_API_KEY is not set,
 * so the site works in dev without email and starts sending as soon
 * as the env var is configured on Vercel.
 */
let cached: Resend | null | undefined;

export function getResend(): Resend | null {
  if (cached !== undefined) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key || key.trim() === "") {
    cached = null;
    return cached;
  }
  cached = new Resend(key);
  return cached;
}

/**
 * Where notification emails are sent TO. Defaults to the support email
 * from site.ts; can be overridden via SUPPORT_NOTIFY_EMAIL env var
 * (useful when you want bug reports routed to a different inbox).
 */
export function getNotifyTo(): string {
  return process.env.SUPPORT_NOTIFY_EMAIL || siteConfig.supportEmail;
}

/**
 * Sends a notification email. Returns true on success, false on failure.
 * When RESEND_API_KEY is not set, returns true and logs to console
 * (dev fallback so the form flow still works end-to-end).
 */
export async function sendNotification(
  subject: string,
  html: string,
  text: string,
): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();
  const to = getNotifyTo();

  if (!resend) {
    // Dev fallback — log instead of sending.
    console.log("[email:dev-fallback] Would send:", { to, subject, text });
    return { ok: true };
  }

  try {
    const { error } = await resend.emails.send({
      from: `${siteConfig.appName} <onboarding@resend.dev>`,
      to,
      subject,
      html,
      text,
      // Tag for easy filtering in Resend dashboard
      tags: [{ name: "source", value: "website" }],
    });
    if (error) {
      console.error("[email] Resend returned error:", error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[email] sendNotification threw:", msg);
    return { ok: false, error: msg };
  }
}
