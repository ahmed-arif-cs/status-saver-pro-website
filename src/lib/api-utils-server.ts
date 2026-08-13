import "server-only";
import { headers } from "next/headers";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * SERVER-ONLY helpers for API routes.
 *
 * This file must never be imported by client components — it pulls in
 * `next/headers`, `@upstash/ratelimit`, and `@upstash/redis`, none of
 * which are browser-safe. Zod schemas live separately in
 * `src/lib/validation.ts` so forms can import them safely.
 *
 * The `import "server-only"` at the top is a hard guard — if a client
 * component tries to import this file, the build will fail loudly.
 */

/**
 * Returns the requester's IP for rate-limiting purposes.
 * Falls back to a stable identifier ("anon") when no IP header is present.
 */
export async function getClientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip")?.trim() ||
    h.get("cf-connecting-ip")?.trim() ||
    "anon"
  );
}

let cachedLimiter: Ratelimit | null | undefined;

function getLimiter(): Ratelimit | null {
  if (cachedLimiter !== undefined) return cachedLimiter;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token || url.trim() === "" || token.trim() === "") {
    cachedLimiter = null;
    return cachedLimiter;
  }
  const redis = new Redis({ url, token });
  cachedLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 reqs / min / IP
    analytics: true,
    prefix: "ratelimit:statussaverpro",
  });
  return cachedLimiter;
}

/**
 * In-memory rate limiter — used when Upstash env vars aren't configured.
 * Caps at 5 requests / minute / IP per process. Resets on cold start.
 * Good enough for dev; production should use the Upstash-backed limiter.
 */
const memoryHits = new Map<string, number[]>();

function inMemoryLimit(ip: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 5;
  const hits = (memoryHits.get(ip) || []).filter((t) => now - t < windowMs);
  if (hits.length >= max) {
    return { success: false, remaining: 0 };
  }
  hits.push(now);
  memoryHits.set(ip, hits);
  return { success: true, remaining: max - hits.length };
}

export async function rateLimit(
  ip: string,
): Promise<{ success: boolean; remaining: number; limit: number; reset: number }> {
  const limiter = getLimiter();
  if (limiter) {
    const r = await limiter.limit(ip);
    return {
      success: r.success,
      remaining: r.remaining,
      limit: r.limit,
      reset: r.reset,
    };
  }
  // Fallback — in-memory (per-process, dev only)
  const r = inMemoryLimit(ip);
  return {
    success: r.success,
    remaining: r.remaining,
    limit: 5,
    reset: Date.now() + 60_000,
  };
}
