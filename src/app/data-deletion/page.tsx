import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone, Trash2, Megaphone, LifeBuoy, ShieldOff } from "lucide-react";
import { siteConfig, formatLongDate } from "@/lib/site";
import { LegalPageLayout, type TocItem } from "@/components/legal-page-layout";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Data Deletion",
  description:
    "How to delete Status Saver Pro data: locally saved statuses, the app database, and how to reset your advertising ID. Self-service, no account needed.",
  alternates: { canonical: "/data-deletion" },
  openGraph: {
    title: "Data Deletion · Status Saver Pro",
    description:
      "Step-by-step instructions to delete your local data, reset ad identifiers, and uninstall the app.",
    url: `${siteConfig.siteUrl}/data-deletion`,
    type: "article",
  },
};

const toc: TocItem[] = [
  { id: "what-this-means", label: "1. What \"deletion\" means here" },
  { id: "local-data", label: "2. Locally saved statuses & app data" },
  { id: "ad-identifiers", label: "3. Advertising identifiers" },
  { id: "revoke", label: "4. Revoke all permissions" },
  { id: "need-help", label: "5. Need help?" },
];

const dataBlocks = [
  {
    id: "local-data",
    icon: Smartphone,
    title: "2. Locally saved statuses & app data",
    intro:
      "This includes every status photo, video, and favorite you've saved, plus your app settings (theme, language, auto-save toggle). All of it lives on your device.",
    steps: [
      {
        label: "Delete individual items (in-app)",
        body: "Open Status Saver Pro → Saved tab → long-press the item you want to remove → tap Delete. The file is removed from your gallery immediately.",
      },
      {
        label: "Delete everything (in-app)",
        body: "Open Status Saver Pro → Settings → Clear data / Delete all saved statuses. This wipes your saved-statuses list, favorites, and the app's local database in one tap.",
      },
      {
        label: "Delete via Android Settings",
        body: "Go to Android Settings → Apps → Status Saver Pro → Storage & cache → Clear storage. This immediately and permanently removes all local app data — saved files, favorites, settings, the lot.",
      },
    ],
  },
  {
    id: "ad-identifiers",
    icon: Megaphone,
    title: "3. Advertising identifiers",
    intro:
      "Status Saver Pro shows ads via Google AdMob. AdMob may use a resettable advertising ID and basic device info to serve and measure ads. You can reset or delete this ID at any time — it's not tied to your identity.",
    steps: [
      {
        label: "On your device",
        body: "Android Settings → Privacy → Ads → Delete advertising ID (Android 12+) or Reset advertising ID (older versions).",
      },
      {
        label: "On the web",
        body: "Adjust your Google Account's ad personalization settings at adssettings.google.com.",
        link: {
          href: "https://adssettings.google.com/",
          label: "Google Ad Settings",
        },
      },
    ],
  },
  {
    id: "revoke",
    icon: ShieldOff,
    title: "4. Revoke all permissions at once",
    intro:
      "The fastest way to remove every trace of the app from your device is to uninstall it. Because there is no server-side data, uninstalling is a complete deletion.",
    steps: [
      {
        label: "Uninstall the app",
        body: "Long-press the Status Saver Pro icon on your home screen or app drawer → Uninstall. This removes the app, its local database, and all of its permissions in one step.",
      },
      {
        label: "Optional — clean up saved files",
        body: 'If you previously saved statuses to your gallery, those files live in Pictures/StatusSaverPro and Movies/StatusSaverPro. Open any gallery app and delete those folders if you no longer want the saved statuses.',
      },
    ],
  },
];

export default function DataDeletionPage() {
  return (
    <LegalPageLayout
      title="Account & Data Deletion"
      lastUpdated={formatLongDate(siteConfig.lastUpdated.dataDeletion)}
      description="Status Saver Pro does not use accounts and does not have a backend server. Here's what data exists, where it lives, and how to delete each part of it."
      toc={toc}
    >
      <h2 id="what-this-means">1. What &ldquo;deletion&rdquo; means here</h2>
      <p>
        Status Saver Pro does <strong>not</strong> require creating an account
        with us, and we do <strong>not</strong> host any user data on our own
        servers. The app has no backend. That means there is no
        server-side deletion flow to walk you through — &ldquo;deleting your
        data&rdquo; here means one of three things, all of which you can do
        yourself in under a minute:
      </p>
      <ul>
        <li>
          <strong>Delete individual saved statuses</strong> from inside the
          app (long-press → Delete).
        </li>
        <li>
          <strong>Clear all local app data</strong> in one tap from the app or
          Android Settings.
        </li>
        <li>
          <strong>Uninstall the app</strong> — which removes the app, its
          database, and all of its permissions at once.
        </li>
      </ul>
      <p>
        Each of those is described in detail below. Because nothing is uploaded
        to us, every step is self-service and immediate — no waiting for a
        support ticket, no &ldquo;deletion window&rdquo;.
      </p>

      {dataBlocks.map((block) => (
        <section key={block.id} className="not-prose mb-8">
          <Card
            id={block.id}
            className="scroll-mt-24 overflow-hidden border-border/60 bg-card/60 shadow-sm"
          >
            <CardContent className="p-0">
              <div className="flex items-center gap-3 border-b border-border/60 bg-muted/30 px-6 py-4">
                <span
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"
                >
                  <block.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h2 className="text-title m-0 text-foreground">{block.title}</h2>
              </div>
              <div className="prose-legal max-w-none px-6 py-5">
                <p>{block.intro}</p>
                <ul>
                  {block.steps.map((step) => (
                    <li key={step.label}>
                      <strong>{step.label}:</strong> {step.body}{" "}
                      {step.link ? (
                        <a
                          href={step.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {step.link.label}
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>
      ))}

      <h2 id="need-help">5. Need help?</h2>
      <p>
        Because none of your data is stored on our servers, deletion is fully
        under your control and happens instantly. If you run into any trouble,
        or would like written confirmation that there is no server-side copy of
        your data, email us at{" "}
        <a href={`mailto:${siteConfig.supportEmail}?subject=Data%20Deletion%20Request`}>
          {siteConfig.supportEmail}
        </a>{" "}
        with the subject line &ldquo;Data Deletion Request&rdquo;. We&apos;ll
        respond within a reasonable time.
      </p>

      <div className="not-prose mt-10 rounded-xl border border-primary/30 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-primary text-primary-foreground"
          >
            <LifeBuoy className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <h3 className="text-title text-foreground">
              Want the fastest path?
            </h3>
            <p className="mt-1 text-body text-muted-foreground">
              The in-app steps above complete instantly. For anything you
              can&apos;t resolve yourself, our support team responds within a
              few business days.
            </p>
            <Link
              href="/support"
              className="mt-3 inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
            >
              Go to Support page
            </Link>
          </div>
        </div>
      </div>
    </LegalPageLayout>
  );
}
