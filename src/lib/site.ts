/**
 * =====================================================================
 *  STATUS SAVER PRO — SITE CONFIGURATION
 * =====================================================================
 *  Single source of truth for every piece of site-wide copy.
 *
 *  Owned by: AGC — Ahmed Group of Companies
 *  Last content review: see `lastUpdated` below.
 * =====================================================================
 */

export const siteConfig = {
  /** App display name (used in headers, footers, OG tags, JSON-LD). */
  appName: "Status Saver Pro",

  /** One-line description used on the home hero + meta tags. */
  tagline:
    "Save and re-share WhatsApp status updates — photos, videos, and text — directly to your phone",

  /**
   * Public, canonical site URL. MUST be the production URL you deploy to.
   * Used for sitemap.xml, robots.txt, Open Graph tags, and JSON-LD.
   */
  siteUrl: "https://statussaverpro.app",

  /**
   * Google Play Store listing URL.
   * Empty string = "Coming soon" disabled state on every Play Store badge.
   * Once the app is published, paste the real URL here and every badge site-wide
   * will automatically become a clickable link to the Play Store listing.
   */
  playStoreUrl: "",

  /** Support email — shown on the Contact page and used as the Resend "to" address. */
  supportEmail: "agcompanies.official@gmail.com",

  /** Developer / company name shown in legal pages and JSON-LD. */
  developerName: "AGC — Ahmed Group of Companies",

  /** Country / jurisdiction used in Privacy Policy §9 and Terms §9. */
  jurisdiction: "Pakistan",
  country: "Pakistan",

  /**
   * "Last updated" dates for each legal page.
   * Format: ISO yyyy-mm-dd, rendered as e.g. "August 13, 2026".
   */
  lastUpdated: {
    privacy: "2026-08-13",
    terms: "2026-08-13",
    dataDeletion: "2026-08-13",
    security: "2026-08-13",
  },
} as const;

/** Helper: format an ISO date as a human-readable "Month D, YYYY" string. */
export function formatLongDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** All top-level navigation destinations. */
export const mainNav = [
  { title: "Home", href: "/" },
  { title: "Features", href: "/#features" },
  { title: "Support", href: "/support" },
  { title: "Security", href: "/security" },
  { title: "Privacy", href: "/privacy" },
  { title: "Contact", href: "/contact" },
] as const;

/** Footer link groups (legal pages, surfaced on every page). */
export const footerLinks = [
  { title: "Features", href: "/#features" },
  { title: "How it works", href: "/#how-it-works" },
  { title: "FAQ", href: "/#faq" },
  { title: "Support", href: "/support" },
  { title: "Security", href: "/security" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms of Service", href: "/terms" },
  { title: "Data Deletion", href: "/data-deletion" },
  { title: "Contact", href: "/contact" },
] as const;

/* ============================================================
 *  HOME PAGE — FEATURE GRID
 *  8 real features, each with icon name (lucide), title, body.
 * ============================================================ */
export const features = [
  {
    icon: "ImagePlay",
    title: "Save photos & videos",
    body: "One tap saves any WhatsApp status photo or video to your gallery — kept forever, even after the 24-hour expiry.",
  },
  {
    icon: "Scissors",
    title: "Built-in video trimmer",
    body: "Trim long status videos to just the moment you want before saving, with a fast in-app editor. No watermark added.",
  },
  {
    icon: "TimerOff",
    title: "Auto-save before expiry",
    body: "Optionally watch the status folder and auto-save new statuses as soon as WhatsApp writes them — never miss a 24-hour status again.",
  },
  {
    icon: "LayoutGrid",
    title: "Home-screen widget",
    body: "A lightweight 2x2 home-screen widget shows the newest saved statuses at a glance, no app launch needed.",
  },
  {
    icon: "Languages",
    title: "Multi-language UI",
    body: "Switch between English, Urdu, and Hindi in Settings. The interface strings, not your saved files, are translated.",
  },
  {
    icon: "MoonStar",
    title: "Dark mode",
    body: "A true Material You dark theme that follows your system setting. Easy on the eyes when you're browsing late at night.",
  },
  {
    icon: "CheckSquare",
    title: "Bulk select & save",
    body: "Long-press to multi-select, then save dozens of statuses in one tap. A quiet notification confirms the batch.",
  },
  {
    icon: "Star",
    title: "Favorites tab",
    body: "Star the statuses you love. They're pinned in a separate Favorites tab so you can re-watch or re-share them anytime.",
  },
] as const;

/* ============================================================
 *  HOME PAGE — HOW IT WORKS (4 steps)
 * ============================================================ */
export const howItWorks = [
  {
    step: 1,
    icon: "FolderOpen",
    title: "Grant folder access",
    body: "On first launch, approve Android's Storage Access Framework (SAF) prompt to read the WhatsApp status folder. We never see your chats — only the status cache.",
  },
  {
    step: 2,
    icon: "Eye",
    title: "Browse statuses",
    body: "Open Status Saver Pro. The Photos, Videos, and Saved tabs show every status WhatsApp has stored — recent first.",
  },
  {
    step: 3,
    icon: "Download",
    title: "Save or trim",
    body: "Tap Save to keep a copy in your gallery, or tap Trim on a video to crop it first. Files land in Pictures/StatusSaverPro and Movies/StatusSaverPro.",
  },
  {
    step: 4,
    icon: "Images",
    title: "Find them in your gallery",
    body: "Open any gallery app — your saved statuses are right there, organised by date. Share, re-post, or keep them private. They're yours now.",
  },
] as const;

/* ============================================================
 *  HOME PAGE — SCREENSHOTS (placeholder set, swappable)
 *  Replace files in /public/screenshots/ with real device captures
 *  before going live. Filenames here MUST match files in that folder.
 * ============================================================ */
export const screenshots = [
  { src: "/screenshots/01-home.png", alt: "Status Saver Pro home screen" },
  { src: "/screenshots/02-statuses.png", alt: "Recent statuses grid" },
  { src: "/screenshots/03-trim.png", alt: "Video trimmer" },
  { src: "/screenshots/04-saved.png", alt: "Saved statuses tab" },
  { src: "/screenshots/05-settings.png", alt: "Settings — theme, language, auto-save" },
] as const;

/* ============================================================
 *  FAQ — used on both the home page and the /support page
 *  (same source of truth).
 * ============================================================ */
export const faq = [
  {
    q: "Is Status Saver Pro affiliated with WhatsApp?",
    a: "No. Status Saver Pro is an independent, unofficial utility built by AGC. It is not affiliated with, endorsed by, sponsored by, or in any way officially connected to WhatsApp Inc. or Meta Platforms, Inc. \"WhatsApp\" is a trademark of WhatsApp Inc./Meta Platforms, Inc. The app only reads status media files that WhatsApp itself already saves to your device's shared storage.",
  },
  {
    q: "Is the app free?",
    a: "Yes. Status Saver Pro is free to download and use. It is supported by ads served through Google AdMob. We do not sell in-app upgrades, and there are no hidden paywalls. If we ever add a paid \"remove ads\" option, it will be entirely optional and processed by Google Play Billing.",
  },
  {
    q: "Does the app upload my files anywhere?",
    a: "No. Status Saver Pro has no backend server of its own. The statuses you save stay on your device, in the Pictures/StatusSaverPro and Movies/StatusSaverPro folders. Nothing — not your saved statuses, not your favorites, not your settings — is uploaded to us. The only network requests the app makes are to load AdMob ads and the standard Google Play Services APIs.",
  },
  {
    q: "Which Android versions are supported?",
    a: "Status Saver Pro supports Android 8.0 (Oreo) and above. On Android 11+, the app uses Android's Storage Access Framework (SAF) to read the WhatsApp status folder — this is the modern, privacy-preserving way to access shared storage. On older Android versions, it uses the legacy READ/WRITE_EXTERNAL_STORAGE permissions.",
  },
  {
    q: "How do I report a bug or request a feature?",
    a: "Visit our Support page and use the \"Report a problem\" form, or email us directly at agcompanies.official@gmail.com with the subject line \"Bug Report\". Include your Android version, device model, and a short description of what happened. We aim to respond within a few business days.",
  },
  {
    q: "How do I delete the data the app has stored?",
    a: "Because nothing is uploaded to us, deletion is fully under your control. Long-press items in the Saved tab to delete them, or go to Android Settings → Apps → Status Saver Pro → Storage → Clear storage to wipe everything at once. Uninstalling the app has the same effect. See our Data Deletion page for step-by-step instructions.",
  },
  {
    q: "Why can't the app see some statuses?",
    a: "WhatsApp only writes a status to shared storage after you've viewed it at least once in WhatsApp itself. If a status hasn't appeared in Status Saver Pro, open WhatsApp, view the status, then return to Status Saver Pro and pull to refresh. Statuses that have already expired (after 24 hours) cannot be recovered.",
  },
  {
    q: "Does the app work with WhatsApp Business?",
    a: "Yes. Status Saver Pro reads the status folder used by both regular WhatsApp and WhatsApp Business. If you have both installed, the app shows statuses from whichever WhatsApp is currently active.",
  },
] as const;

/* ============================================================
 *  CHANGELOG / WHAT'S NEW
 *  Append new entries to the top of the array. `version` should
 *  match the versionName in the Android build; `date` is ISO.
 * ============================================================ */
export const changelog = [
  {
    version: "1.0.0",
    date: "2026-08-13",
    tag: "Initial release",
    changes: [
      "Save photos and videos from WhatsApp statuses to your gallery",
      "Built-in video trimmer with no watermark",
      "Auto-save option that captures new statuses before they expire",
      "Home-screen widget showing newest saved statuses",
      "Multi-language UI: English, Urdu, Hindi",
      "Dark mode following system theme",
      "Bulk select & save with quiet confirmation",
      "Favorites tab for starred statuses",
    ],
  },
] as const;

/* ============================================================
 *  SECURITY PAGE — key facts (drives the /security page layout)
 * ============================================================ */
export const securityFacts = [
  {
    icon: "HardDrive",
    title: "Local-only storage",
    body: "Every photo, video, and favorite you save lives on your device. The app has no backend server of its own. There is nowhere for your files to be uploaded to.",
  },
  {
    icon: "FolderTree",
    title: "Scoped SAF folder access",
    body: "On Android 11+, the app uses Android's Storage Access Framework to read only the WhatsApp status folder you explicitly grant. It cannot browse other folders, your chats, your contacts, or your camera roll.",
  },
  {
    icon: "ShieldOff",
    title: "No chat access, ever",
    body: "WhatsApp's chats are end-to-end encrypted and stored in a private app folder. Status Saver Pro does not request, read, or attempt to access any chat content — only the plain status cache files.",
  },
  {
    icon: "Megaphone",
    title: "AdMob, nothing more",
    body: "The only third-party SDK included for monetisation is Google AdMob. It may use a resettable advertising ID and basic device info to serve ads. You can reset the ID in Android Settings → Privacy → Ads.",
  },
  {
    icon: "UserX",
    title: "No accounts, no tracking",
    body: "There is no login, no sign-up, no account system. We don't collect your name, email, phone number, or location. Crash logs come through Google Play's standard SDK and are not linked to your identity.",
  },
  {
    icon: "Power",
    title: "Revoke anytime",
    body: "You can withdraw folder access at any time from Android Settings → Apps → Status Saver Pro → Permissions. The app will simply stop finding new statuses — nothing is retained server-side because there is no server.",
  },
] as const;
