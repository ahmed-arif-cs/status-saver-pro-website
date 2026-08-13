# Status Saver Pro — Marketing & Legal Website (v2)

Production-ready marketing, legal, and support website for the Android app
**Status Saver Pro** by **AGC — Ahmed Group of Companies**. Built with
Next.js 16 + TypeScript + Tailwind CSS 4 + shadcn/ui, deployable on Vercel.

## What's inside

| Route             | Purpose                                                                |
| ----------------- | ---------------------------------------------------------------------- |
| `/`               | Landing page — hero, features (8), how-it-works, screenshots, FAQ, changelog, CTA |
| `/support`        | Support center — FAQ, Report a problem form, email fallback           |
| `/security`       | Security posture — local-only, SAF folder access, AdMob, revoke perms  |
| `/privacy`        | **Privacy Policy** — full Play-Console-compliant text                  |
| `/terms`          | **Terms of Service** (incl. Advertising & Third-Party Services clause) |
| `/data-deletion`  | **Data Deletion** — self-service local-only flow                      |
| `/contact`        | Contact form (with backend persistence + email notification)          |
| `/sitemap.xml`    | Auto-generated sitemap                                                  |
| `/robots.txt`     | Auto-generated robots                                                   |
| `/opengraph-image.png` | Static OG image (1200×630)                                         |
| `/icon.svg`, `/icon-192.png`, `/icon-512.png`, `/apple-touch-icon.png` | App icon set |

### Backend

- **Database**: PostgreSQL via Prisma (Vercel Postgres or Neon). Models:
  `ContactMessage`, `BugReport`.
- **API routes**:
  - `POST /api/contact` — zod validation, honeypot, rate limit, persist, email
  - `POST /api/report-bug` — same pattern
- **Email**: Resend (notification email on every form submission).
- **Rate limiting**: Upstash Redis sliding window (5/min/IP) in production,
  in-memory fallback in dev.

## Tech stack

- **Next.js 16** (App Router) + **TypeScript 5**
- **Tailwind CSS 4** with custom design tokens (emerald/indigo accent, glassmorphism)
- **shadcn/ui** + **Lucide** icons + **framer-motion** for animations
- **next-themes** for light/dark mode (respects system)
- **Prisma** ORM (PostgreSQL)
- **Resend** for transactional email
- **react-hook-form** + **zod** for forms
- **@upstash/ratelimit** + **@upstash/redis** for distributed rate limiting

## Run locally

```bash
bun install       # or: npm install
bun run dev       # or: npm run dev
# → http://localhost:3000
```

The site runs out-of-the-box with no env vars set — forms validate and return
success, submissions are logged to the server console, no emails are sent, no
database writes happen. To enable persistence + email locally, copy
`.env.example` to `.env` and fill in real values.

> Requires Node 18.18+ (or Bun 1.1+). No other system dependencies.

## Deploy to Vercel

See **[DEPLOY.md](./DEPLOY.md)** for the full step-by-step walkthrough with
screenshots and exact env var values. The short version:

1. Push this repo to GitHub.
2. Go to <https://vercel.com/new>, import the repo.
3. Create a Vercel Postgres (or Neon) database, copy its connection string.
4. Add env vars in Vercel: `DATABASE_URL`, `RESEND_API_KEY`,
   `SUPPORT_NOTIFY_EMAIL` (optional), `UPSTASH_REDIS_REST_URL` + token
   (optional).
5. Run `npx prisma db push` to create the tables.
6. Deploy. Vercel auto-detects Next.js — no extra config needed.

## Pre-deployment checklist

Every placeholder lives in **`src/lib/site.ts`**. As of v2, the only field
that still needs filling is:

| Field             | Current value | When to update |
| ----------------- | ------------- | --------------- |
| `playStoreUrl`    | `""` (empty)  | Once the app is published on Google Play, paste the listing URL here. Every Play Store badge across the site will automatically switch from "Coming soon" to a live clickable link. |
| `siteUrl`         | `https://statussaverpro.app` | Update to your real production URL once DNS is set up. Used in sitemap.xml, robots.txt, and OG tags. |

All other real values (developer name, support email, jurisdiction) are already
filled in with the AGC values:

```ts
appName: "Status Saver Pro",
developerName: "AGC — Ahmed Group of Companies",
supportEmail: "agcompanies.official@gmail.com",
jurisdiction: "Pakistan",
country: "Pakistan",
```

## Visual design notes

- **Glassmorphism** on cards, FAQ items, form containers (`.glass-card`).
- **Animated gradient mesh** behind the hero (CSS-only, respects
  `prefers-reduced-motion`).
- **Shine/sheen sweep** on primary buttons and the Play Store badge
  (`.shine-on-hover`).
- **Scroll-reveal** animations on every section via `<ScrollReveal>`.
- **Page transitions** via `src/app/template.tsx` (fade + slide).
- **5-step type scale** (display, headline, title, body-lg, body, meta) — no
  default Tailwind sizes used.
- Light + dark mode, mobile-first responsive, sticky header + footer.

## Compliance notes (for your records)

- ✅ Privacy Policy URL is **public**, **non-geofenced**, **non-PDF**, **no sign-in**.
- ✅ Account & Data Deletion page clearly explains there is no server-side
  flow — deletion is uninstalling the app + clearing local files.
- ✅ All legal pages are **text-based HTML** — no images, no PDFs.
- ✅ "Last updated" date visible at the top of every legal page.
- ✅ Footer on every page links to all legal pages.
- ✅ No dark patterns — no fake urgency, no fake download counters, no fake
  testimonials, no pre-checked consent boxes.
- ✅ "Not affiliated with WhatsApp/Meta" disclaimer visible on home + footer.
- ✅ All claims match the actual app behavior (SAF folder access only, no
  server upload, AdMob for ads, no accounts, no data sale).

## Project structure

```
prisma/
└── schema.prisma              # PostgreSQL models: ContactMessage, BugReport
public/
├── app-icon.svg                # Master app icon (indigo→coral gradient)
├── apple-touch-icon.png        # 180×180 iOS icon
├── icon-192.png / icon-512.png # PWA manifest icons
├── opengraph-image.png         # 1200×630 social preview
└── screenshots/                # 5 placeholder screenshots (replace before launch)
src/
├── app/
│   ├── layout.tsx              # Root layout, metadata, theme, header, footer
│   ├── template.tsx            # Page transition wrapper (framer-motion)
│   ├── globals.css             # Design tokens + glass + hero mesh + shine
│   ├── icon.svg                # Favicon (App Router convention)
│   ├── robots.ts               # /robots.txt
│   ├── sitemap.ts              # /sitemap.xml
│   ├── page.tsx                # Home (hero, features, how-it-works, screenshots, FAQ, changelog)
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── data-deletion/page.tsx
│   ├── security/page.tsx
│   ├── support/page.tsx
│   ├── contact/page.tsx
│   └── api/
│       ├── contact/route.ts    # POST /api/contact
│       └── report-bug/route.ts # POST /api/report-bug
├── components/
│   ├── app-logo.tsx            # Uses real app icon (next/image)
│   ├── play-store-badge.tsx    # Auto "Coming soon" state when URL empty
│   ├── site-header.tsx / site-footer.tsx
│   ├── theme-provider.tsx / theme-toggle.tsx
│   ├── legal-page-layout.tsx   # Narrow reading column + sticky TOC
│   ├── phone-mockup.tsx        # Abstract phone silhouette (no WhatsApp UI)
│   ├── back-to-top.tsx
│   ├── scroll-reveal.tsx       # framer-motion whileInView wrapper
│   ├── home-sections.tsx       # FeaturesGrid + HowItWorksSection
│   ├── screenshots-changelog.tsx # Carousel + Changelog
│   ├── faq-accordion.tsx       # Reusable FAQ (home + /support)
│   ├── contact-form.tsx        # react-hook-form + zod → /api/contact
│   └── bug-report-form.tsx     # react-hook-form + zod → /api/report-bug
└── lib/
    ├── site.ts                 # ALL site-wide copy + features/faq/changelog
    ├── db.ts                   # Lazy Prisma client (degrades when no DATABASE_URL)
    ├── email.ts                # Lazy Resend client (degrades when no API key)
    ├── email-templates.ts      # HTML + text templates for notifications
    └── api-utils.ts            # Zod schemas, rate limit, IP extraction
scripts/
├── generate-icons.py          # Re-run to regenerate icons + OG image
└── generate-screenshots.py     # Re-run to regenerate placeholder screenshots
```

## Regenerating assets

```bash
# Icons (favicon, apple-touch, PWA, OG image)
python3 scripts/generate-icons.py

# Placeholder screenshots (replace with real device captures before launch)
python3 scripts/generate-screenshots.py
```

Both require Pillow: `pip install Pillow`. The icon script also uses
`rsvg-convert` if available (for crisp SVG→PNG), with a Pillow fallback.

## License

This site source is private to the Status Saver Pro / AGC project. The legal
text is owned by the developer and is intended for this app only — do not
reuse verbatim for other apps without reviewing it with a lawyer.
