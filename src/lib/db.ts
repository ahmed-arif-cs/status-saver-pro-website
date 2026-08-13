import { PrismaClient } from "@prisma/client";

/**
 * Lazy Prisma client wrapper.
 *
 * - In production (Vercel) with DATABASE_URL set, this returns a real
 *   PrismaClient connected to Postgres.
 * - In dev without DATABASE_URL, `getDB()` returns null and API routes
 *   fall back to console.log + email-only flow. The site still works
 *   end-to-end; submissions just aren't persisted.
 *
 * This pattern keeps `npm run build` and `vercel deploy` working with
 * zero env vars during initial setup, and starts persisting as soon as
 * DATABASE_URL is provided.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrisma(): PrismaClient | null {
  const url = process.env.DATABASE_URL;
  if (!url || url.trim() === "" || url.startsWith("file:")) {
    // No DATABASE_URL (or still pointing at SQLite file) — disable persistence.
    return null;
  }
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const client = new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error", "warn"] : ["query", "error", "warn"],
  });
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }
  return client;
}

export const db = createPrisma();

/** True when persistence (Postgres) is configured. */
export const hasDB = db !== null;

export type DB = PrismaClient;
