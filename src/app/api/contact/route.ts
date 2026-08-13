import { NextResponse } from "next/server";
import { db, hasDB } from "@/lib/db";
import { getClientIp, rateLimit } from "@/lib/api-utils-server";
import { contactSchema } from "@/lib/validation";
import { sendNotification } from "@/lib/email";
import { contactEmailTemplate } from "@/lib/email-templates";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs"; // Prisma needs Node runtime, not Edge

/** Standard JSON response shape — never leak internal errors to the client. */
function json<T>(status: number, body: T) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(req: Request) {
  // ---- 1. Parse body ----------------------------------------------------
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, { ok: false, error: "Invalid request body." });
  }

  // ---- 2. Validate with zod --------------------------------------------
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || "Invalid input.";
    return json(422, { ok: false, error: firstError, fieldErrors: parsed.error.flatten().fieldErrors });
  }
  const data = parsed.data;

  // ---- 3. Rate limit (per IP) ------------------------------------------
  const ip = await getClientIp();
  const limit = await rateLimit(ip);
  if (!limit.success) {
    return json(429, {
      ok: false,
      error: "Too many submissions. Please wait a minute and try again.",
      retryAfter: Math.ceil((limit.reset - Date.now()) / 1000),
    });
  }

  // ---- 4. Persist (if DB available) -----------------------------------
  let persistedId: string | null = null;
  if (hasDB && db) {
    try {
      const row = await db.contactMessage.create({
        data: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          honeypot: data.website || "",
          ip,
        },
      });
      persistedId = row.id;
    } catch (err) {
      console.error("[/api/contact] DB write failed:", err);
      // Don't surface DB error to client — continue to email step
    }
  } else {
    console.log("[/api/contact] DB unavailable — skipping persist. Data:", {
      name: data.name,
      email: data.email,
      subject: data.subject,
    });
  }

  // ---- 5. Send notification email --------------------------------------
  const email = contactEmailTemplate({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });
  const emailResult = await sendNotification(email.subject, email.html, email.text);

  if (!emailResult.ok) {
    // Submission was accepted but email failed — still log success to client
    // (the message was received; we'll see it in the DB or our logs).
    console.error("[/api/contact] Email send failed:", emailResult.error);
  }

  // ---- 6. Honest success response -------------------------------------
  return json(200, {
    ok: true,
    message: `Thanks, ${data.name.split(" ")[0] || "there"}! Your message reached ${siteConfig.appName}. We'll reply within a few business days.`,
    submissionId: persistedId,
    emailQueued: emailResult.ok,
  });
}

/** Health check — useful for smoke-testing on Vercel. */
export async function GET() {
  return json(200, {
    ok: true,
    endpoint: "contact",
    db: hasDB ? "configured" : "not-configured",
    email: process.env.RESEND_API_KEY ? "configured" : "not-configured",
  });
}
