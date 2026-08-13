# Deployment Guide — Status Saver Pro Website

This guide walks you through deploying the site to Vercel, end to end.
The whole process takes about 15 minutes if you already have a GitHub
account. No Vercel-specific config files are needed — Vercel auto-detects
Next.js.

## Prerequisites

- A GitHub account with this repo pushed to it.
- A Vercel account (free tier is fine — <https://vercel.com/signup>).
- A Resend account (free tier is 100 emails/day — <https://resend.com>).
- (Optional) An Upstash Redis account for distributed rate limiting
  (free tier is plenty — <https://upstash.com>).

---

## Step 1 — Create the Vercel project

1. Go to <https://vercel.com/new>.
2. Import your GitHub repo.
3. Vercel auto-detects Next.js — **leave all build settings as defaults**.
   - Framework preset: Next.js
   - Build command: `next build` (auto)
   - Output directory: `.next` (auto)
4. **Don't click Deploy yet** — set env vars first (Step 3).

## Step 2 — Provision a PostgreSQL database

Pick one of these (both work; Vercel Postgres is simplest if you're
already on Vercel):

### Option A — Vercel Postgres

1. In your Vercel project dashboard, go to **Storage → Create Database**.
2. Choose **Postgres (Neon)**.
3. Name it (e.g. `statussaverpro-db`), pick a region close to your users.
4. Once created, Vercel auto-injects `POSTGRES_URL` and friends as env vars.
   We only need the `postgres://...` connection string — copy it for Step 3.

### Option B — Neon (free, serverless Postgres)

1. Sign up at <https://neon.tech>.
2. Create a new project, name it `statussaverpro`.
3. Copy the **Connection string** — looks like
   `postgresql://user:pass@host/db?sslmode=require`.
4. You'll paste this as `DATABASE_URL` in Step 3.

## Step 3 — Set environment variables in Vercel

In your Vercel project dashboard → **Settings → Environment Variables**,
add the following (use the Production + Preview + Development scopes for
all of them):

| Name                          | Value                                            | Required |
| ----------------------------- | ------------------------------------------------ | -------- |
| `DATABASE_URL`                | Your Postgres connection string from Step 2      | ✅       |
| `RESEND_API_KEY`              | Your Resend API key (see Step 4)                  | ✅       |
| `SUPPORT_NOTIFY_EMAIL`        | `agcompanies.official@gmail.com` (or wherever you want notifications to go) | Optional (defaults to support email in `site.ts`) |
| `UPSTASH_REDIS_REST_URL`      | Your Upstash Redis REST URL (Step 5)             | Optional |
| `UPSTASH_REDIS_REST_TOKEN`    | Your Upstash Redis REST token (Step 5)           | Optional |

Click **Save** after each one.

## Step 4 — Get a Resend API key

1. Sign up at <https://resend.com/api-keys>.
2. Click **Create API Key**, name it `statussaverpro-website`, pick
   **Sending access** → **Domains only** (or full access if you'll add a
   custom domain later).
3. Copy the `re_xxx...` key. Paste it as `RESEND_API_KEY` in Vercel.

> The site sends notifications from `onboarding@resend.dev` by default
> (Resend's testing sender). This works on the free tier without domain
> verification. To send from your own domain (e.g. `noreply@statussaverpro.app`),
> add + verify the domain in Resend and update the `from` address in
> `src/lib/email.ts`.

## Step 5 — (Optional) Set up Upstash Redis for rate limiting

Without Upstash, the API routes use an in-memory rate limiter. This works
fine in dev and on Vercel's hobby tier (single serverless instance), but
in production with multiple instances, rate limits are per-instance —
effectively 5 req/min/IP per server, not per IP overall. For proper
distributed rate limiting:

1. Sign up at <https://upstash.com>.
2. Create a **Global Redis** database, name it `statussaverpro-ratelimit`.
3. Copy the **REST URL** and **REST Token** from the database detail page.
4. Paste them as `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
   in Vercel env vars.

## Step 6 — Create the database tables

After you've set `DATABASE_URL`, you need to create the `ContactMessage` and
`BugReport` tables. Easiest way:

### Option A — Run `prisma db push` locally against your prod database

```bash
# In a local clone of the repo, with DATABASE_URL set in your local .env
# (paste your Vercel/Neon connection string)
bun install
bunx prisma db push
```

This applies the schema in `prisma/schema.prisma` to your database. Done.

### Option B — Run it from Vercel's terminal

In your Vercel project dashboard → **Storage → your-database → Connect**,
there's a built-in SQL editor. Run the contents of
`prisma/migrations/0_init.sql` (or just let `prisma db push` do it —
easier).

## Step 7 — Deploy

1. Back in your Vercel project dashboard → **Deployments**.
2. Click **Redeploy** (or push any commit to your main branch on GitHub —
   Vercel auto-deploys).
3. Wait ~1–2 minutes for the build.
4. Visit your deployment URL. Click through every page to make sure
   nothing 404s:
   - `/` (home)
   - `/support`
   - `/security`
   - `/privacy`
   - `/terms`
   - `/data-deletion`
   - `/contact`
5. Submit the contact form once with a real email address — you should
   receive a notification at `agcompanies.official@gmail.com` within a
   few seconds.

## Step 8 — Smoke-test the API

```bash
# Health check
curl https://YOUR-DOMAIN/api/contact
# → {"ok":true,"endpoint":"contact","db":"configured","email":"configured"}

# Test a submission (rate limit: 5/min)
curl -X POST https://YOUR-DOMAIN/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Smoke test","message":"Just verifying the form works end to end."}'
# → {"ok":true,"message":"Thanks, Test! ...","submissionId":"clxxx...","emailQueued":true}
```

If `db` shows `"not-configured"` or `email` shows `"not-configured"`,
double-check your Vercel env vars are set in the right environments
(Production + Preview + Development).

## Step 9 — Set a custom domain (optional)

In your Vercel project → **Settings → Domains** → add your domain
(e.g. `statussaverpro.app`). Follow Vercel's DNS instructions.

Once the domain is live:

1. Update `siteUrl` in `src/lib/site.ts` to your real domain.
2. Commit + push — Vercel auto-deploys.
3. Update the URL in your Google Play Console listing once the app is
   published.

## Troubleshooting

| Symptom | Likely cause |
| ------- | ------------ |
| Contact form returns `{"ok":true,"emailQueued":false}` | `RESEND_API_KEY` is unset or invalid. Check Vercel env vars. |
| Contact form returns 500 error | `DATABASE_URL` is set but tables don't exist. Run `prisma db push`. |
| Contact form returns 429 | Rate limit hit (5/min/IP). Wait a minute or set up Upstash for distributed limiting. |
| Page shows old icon | Browser cached the old favicon. Hard-refresh (Cmd/Ctrl+Shift+R). |
| `db` shows `"not-configured"` in API health check | `DATABASE_URL` env var isn't set in the Production environment. |
| Build fails with `Cannot find module '@prisma/client'` | Shouldn't happen — `postinstall: prisma generate` runs automatically on every `npm install`, including Vercel's build step. If you still hit this (e.g. a package manager that skips `postinstall`), run `npx prisma generate` locally, commit, and push. |
