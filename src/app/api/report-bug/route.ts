import { NextResponse } from "next/server";
import { db, hasDB } from "@/lib/db";
import { getClientIp, rateLimit } from "@/lib/api-utils-server";
import { bugReportSchema } from "@/lib/validation";
import { sendNotification } from "@/lib/email";
import { bugReportEmailTemplate } from "@/lib/email-templates";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

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

  // ---- 2. Validate ------------------------------------------------------
  const parsed = bugReportSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || "Invalid input.";
    return json(422, { ok: false, error: firstError, fieldErrors: parsed.error.flatten().fieldErrors });
  }
  const data = parsed.data;
  // Empty strings -> null for storage/display (the schema keeps these as
  // optional strings so react-hook-form's types stay in sync with zod's).
  const reporterEmail = data.email ? data.email : null;
  const deviceInfo = data.deviceInfo ? data.deviceInfo : null;

  // ---- 3. Rate limit ----------------------------------------------------
  const ip = await getClientIp();
  const limit = await rateLimit(ip);
  if (!limit.success) {
    return json(429, {
      ok: false,
      error: "Too many submissions. Please wait a minute and try again.",
      retryAfter: Math.ceil((limit.reset - Date.now()) / 1000),
    });
  }

  // ---- 4. Persist ------------------------------------------------------
  let persistedId: string | null = null;
  if (hasDB && db) {
    try {
      const row = await db.bugReport.create({
        data: {
          email: reporterEmail,
          deviceInfo: deviceInfo,
          description: data.description,
          honeypot: data.website || "",
          ip,
        },
      });
      persistedId = row.id;
    } catch (err) {
      console.error("[/api/report-bug] DB write failed:", err);
    }
  } else {
    console.log("[/api/report-bug] DB unavailable — skipping persist.");
  }

  // ---- 5. Email --------------------------------------------------------
  const emailContent = bugReportEmailTemplate({
    email: reporterEmail,
    deviceInfo: deviceInfo,
    description: data.description,
  });
  const emailResult = await sendNotification(emailContent.subject, emailContent.html, emailContent.text);

  if (!emailResult.ok) {
    console.error("[/api/report-bug] Email send failed:", emailResult.error);
  }

  // ---- 6. Response -----------------------------------------------------
  return json(200, {
    ok: true,
    message: `Thanks for the report! We've logged it. If you shared your email, we'll follow up at ${siteConfig.supportEmail} when we have an update.`,
    submissionId: persistedId,
    emailQueued: emailResult.ok,
  });
}

export async function GET() {
  return json(200, {
    ok: true,
    endpoint: "report-bug",
    db: hasDB ? "configured" : "not-configured",
    email: process.env.RESEND_API_KEY ? "configured" : "not-configured",
  });
}
