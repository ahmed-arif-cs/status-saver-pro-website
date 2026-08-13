import type { Metadata } from "next";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { siteConfig, securityFacts, formatLongDate } from "@/lib/site";
import { LegalPageLayout, type TocItem } from "@/components/legal-page-layout";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";

type LucideIconName = keyof typeof LucideIcons;
function getIcon(name: string): LucideIcons.LucideIcon {
  return (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name] ?? LucideIcons.ShieldCheck;
}

export const metadata: Metadata = {
  title: "Security",
  description:
    "Status Saver Pro's security posture: local-only storage, scoped SAF folder access, no chat access, AdMob's role, and how to revoke permissions.",
  alternates: { canonical: "/security" },
  openGraph: {
    title: "Security · Status Saver Pro",
    description:
      "How Status Saver Pro protects your data: local-only storage, scoped SAF folder access, no chat access, AdMob only.",
    url: `${siteConfig.siteUrl}/security`,
    type: "article",
  },
};

const toc: TocItem[] = [
  { id: "summary", label: "Summary" },
  { id: "storage", label: "How your data is stored" },
  { id: "permissions", label: "Permissions & folder access" },
  { id: "third-parties", label: "Third-party SDKs" },
  { id: "no-accounts", label: "Accounts & tracking" },
  { id: "revoke", label: "How to revoke access" },
  { id: "contact", label: "Reporting a security issue" },
];

export default function SecurityPage() {
  return (
    <article className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-10 max-w-3xl">
        <ScrollReveal>
          <p className="text-meta font-semibold uppercase tracking-wider text-primary">
            Trust &amp; safety
          </p>
          <h1 className="mt-2 text-headline text-foreground">Security</h1>
          <p className="mt-3 text-body-lg text-muted-foreground">
            <span className="font-medium text-foreground/80">Last updated:</span>{" "}
            <time>{formatLongDate(siteConfig.lastUpdated.security)}</time>
          </p>
          <p className="mt-4 text-body-lg text-muted-foreground">
            Status Saver Pro is built to be honest about what it touches and
            what it doesn&apos;t. This page explains, in plain language, how
            the app handles your data — and how you can take that data back
            at any time.
          </p>
        </ScrollReveal>
      </header>

      {/* Fact grid */}
      <ScrollReveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {securityFacts.map((fact) => {
            const Icon = getIcon(fact.icon);
            return (
              <Card
                key={fact.title}
                className="glass-card h-full border-border/60 shadow-sm"
              >
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="text-title text-foreground">{fact.title}</h3>
                  <p className="text-body text-muted-foreground">{fact.body}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Long-form detail */}
      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
        {/* Sticky TOC */}
        <aside className="hidden lg:block" aria-label="On this page">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <p className="mb-3 text-meta font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </p>
            <nav>
              <ul className="space-y-1 border-l border-border">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-meta text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <div className="prose-legal max-w-none lg:max-w-[46rem]">
          <h2 id="summary">Summary</h2>
          <p>
            Status Saver Pro is an independent Android utility by{" "}
            {siteConfig.developerName}. Its job is simple: read the status
            media files that WhatsApp already saves to your device&apos;s
            shared storage, and copy the ones you choose into a folder you
            control. Everything else — your chats, your contacts, your
            location, your account — is off-limits by design.
          </p>
          <p>
            The app has no backend server of its own. It does not require an
            account. It does not upload your saved statuses, your favorites,
            or your settings anywhere. The only network requests it makes are
            to load ads (via Google AdMob) and to use the standard Google Play
            Services SDKs that every Android app uses to function.
          </p>

          <h2 id="storage">How your data is stored</h2>
          <p>
            Every status you save — photo, video, or text — lives on your
            device, in one of two folders under your own shared storage:
          </p>
          <ul>
            <li>
              <code>Pictures/StatusSaverPro</code> for saved photos
            </li>
            <li>
              <code>Movies/StatusSaverPro</code> for saved videos
            </li>
          </ul>
          <p>
            These folders are visible to any gallery app on your phone, and
            are yours to manage, copy, share, or delete as you see fit. The
            app also keeps a small on-device database (in its private app
            data folder) to remember which statuses you&apos;ve saved or
            starred. This database never leaves your device.
          </p>

          <h2 id="permissions">Permissions &amp; folder access</h2>
          <p>
            On Android 11 and above, Status Saver Pro uses Android&apos;s
            Storage Access Framework (SAF) to request access to the specific
            folder where WhatsApp writes status files. You grant this access
            explicitly via Android&apos;s standard folder picker, and you
            can revoke it at any time from Android Settings.
          </p>
          <p>
            This scoped approach means the app cannot see your chats, your
            contacts, your camera roll, your downloads, or any other folder
            on your device. It only sees the one folder you granted. On
            older Android versions (8.0–10), the app falls back to the legacy
            READ/WRITE_EXTERNAL_STORAGE permissions, which are also clearly
            shown in the install prompt before you download.
          </p>
          <p>
            Status Saver Pro does <strong>not</strong> request access to:
            contacts, call logs, SMS, precise location, camera, microphone,
            or WhatsApp&apos;s private, end-to-end-encrypted chat database.
            Those are off-limits — the app simply doesn&apos;t need them.
          </p>

          <h2 id="third-parties">Third-party SDKs</h2>
          <p>
            The app includes the following third-party SDKs, all from Google:
          </p>
          <ul>
            <li>
              <strong>Google AdMob</strong> — serves banner and interstitial
              ads. May use a resettable advertising ID, device model, OS
              version, IP address, and basic app-interaction data, in
              accordance with Google&apos;s privacy policy. You can reset the
              advertising ID in Android Settings → Privacy → Ads.
            </li>
            <li>
              <strong>Google Play Services</strong> — the standard Android
              runtime services every modern app uses. May collect crash logs
              and basic diagnostic data to help us find and fix bugs. This
              data is not linked to your identity.
            </li>
          </ul>
          <p>
            The app does not include any analytics SDK beyond what comes
            bundled with the above. There is no Facebook SDK, no Firebase
            Analytics, no third-party crash reporter, no third-party ad
            network other than AdMob. If this ever changes, we will update
            this page and the Privacy Policy before the change ships.
          </p>

          <h2 id="no-accounts">Accounts &amp; tracking</h2>
          <p>
            Status Saver Pro has no login, no sign-up, and no account system.
            We do not collect your name, email, phone number, or location.
            The app does not run any background tracking, does not build a
            profile of your usage, and does not share any data with third
            parties for advertising or profiling beyond what AdMob requires
            to serve ads inside the app.
          </p>

          <h2 id="revoke">How to revoke access</h2>
          <p>
            You can withdraw any permission at any time:
          </p>
          <ul>
            <li>
              <strong>Folder access:</strong> Android Settings → Apps → Status
              Saver Pro → Permissions → Storage → Deny.
            </li>
            <li>
              <strong>Notifications:</strong> Android Settings → Apps → Status
              Saver Pro → Notifications → toggle off.
            </li>
            <li>
              <strong>Advertising ID:</strong> Android Settings → Privacy →
              Ads → Delete advertising ID, or reset it.
            </li>
            <li>
              <strong>Everything at once:</strong> Uninstall the app. There is
              no server-side data to delete — see our{" "}
              <Link href="/data-deletion">Data Deletion page</Link> for full
              details.
            </li>
          </ul>

          <h2 id="contact">Reporting a security issue</h2>
          <p>
            If you believe you&apos;ve found a security vulnerability in
            Status Saver Pro, please email{" "}
            <a href={`mailto:${siteConfig.supportEmail}?subject=Security%20Report`}>
              {siteConfig.supportEmail}
            </a>{" "}
            with the subject line &ldquo;Security Report&rdquo;. Please do not
            post security issues publicly — give us a chance to fix them
            first. We aim to acknowledge receipt within 48 hours and to ship
            a fix or mitigation within 30 days for any confirmed issue.
          </p>
          <p>
            For non-security questions, the{" "}
            <Link href="/support">Support page</Link> is the fastest path.
          </p>
        </div>
      </div>
    </article>
  );
}
