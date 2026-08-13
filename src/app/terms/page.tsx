import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, formatLongDate } from "@/lib/site";
import { LegalPageLayout, type TocItem } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Status Saver Pro Terms of Service: independent-unofficial notice, your responsibilities, advertising & third-party services clause, no warranty, and limitation of liability.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service · Status Saver Pro",
    description:
      "Independent-unofficial notice, your responsibilities, advertising & third-party services, no warranty, and limitation of liability for Status Saver Pro.",
    url: `${siteConfig.siteUrl}/terms`,
    type: "article",
  },
};

const toc: TocItem[] = [
  { id: "independent-app", label: "1. Independent, Unofficial App" },
  { id: "what-app-does", label: "2. What the App Does" },
  { id: "your-responsibilities", label: "3. Your Responsibilities" },
  { id: "ads-third-party", label: "4. Advertising & Third-Party Services" },
  { id: "no-warranty", label: "5. No Warranty" },
  { id: "liability", label: "6. Limitation of Liability" },
  { id: "changes", label: "7. Changes to the App or Terms" },
  { id: "termination", label: "8. Termination" },
  { id: "governing-law", label: "9. Governing Law" },
  { id: "contact", label: "10. Contact Us" },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated={formatLongDate(siteConfig.lastUpdated.terms)}
      description="Please read these Terms of Service carefully before using Status Saver Pro. By downloading, installing, or using the App, you agree to be bound by these Terms."
      toc={toc}
    >
      <p>
        Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully
        before using the Status Saver Pro mobile application
        (&ldquo;the App&rdquo;), provided by {siteConfig.developerName} (
        &ldquo;Developer&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By
        downloading, installing, or using the App, you agree to be bound by
        these Terms.
      </p>

      <h2 id="independent-app">1. Independent, Unofficial App</h2>
      <p>
        Status Saver Pro is an independent third-party utility. It is{" "}
        <strong>
          not affiliated with, endorsed by, or sponsored by WhatsApp Inc., Meta
          Platforms, Inc., or Google LLC
        </strong>
        , except through the standard, publicly available Android APIs and
        Google services (Play Services, AdMob) that any Android developer may
        use. All trademarks, including &ldquo;WhatsApp,&rdquo; belong to their
        respective owners.
      </p>

      <h2 id="what-app-does">2. What the App Does</h2>
      <p>
        The App lets you view, save, organize, and (optionally) trim WhatsApp
        status media that WhatsApp has already stored in shared device
        storage. The App accesses this folder using Android&apos;s Storage
        Access Framework (SAF) on Android 11+ and the legacy external-storage
        permissions on older versions. The App does not intercept, decrypt, or
        access WhatsApp&apos;s private, end-to-end-encrypted chats or
        messages. The App does not upload your saved statuses, favorites, or
        settings anywhere — there is no backend server.
      </p>

      <h2 id="your-responsibilities">3. Your Responsibilities</h2>
      <ul>
        <li>
          You are responsible for using the App in compliance with applicable
          law and with WhatsApp&apos;s own Terms of Service.
        </li>
        <li>
          Status updates you save are typically created by other people. You
          are responsible for respecting the copyright, privacy, and other
          rights of the original creator/owner before you re-share, publish, or
          otherwise use any status you save. Saving a status for personal,
          private viewing is generally fine; redistributing someone else&apos;s
          content without permission may not be.
        </li>
        <li>
          You must be old enough, under the laws of your country, to use the
          App and agree to these Terms.
        </li>
        <li>
          You are responsible for managing the storage space consumed by
          statuses you choose to save. The App will not delete saved files
          automatically unless you explicitly ask it to.
        </li>
      </ul>

      <h2 id="ads-third-party">4. Advertising &amp; Third-Party Services</h2>
      <p>
        The App is supported by ads served through Google AdMob. AdMob (and
        Google, its partner ad networks) may collect and use data such as your
        advertising ID, device information, IP address, and app interaction
        data to serve and measure ads, in accordance with Google&apos;s
        privacy policy and Ads Data Processing Terms. You can opt out of
        personalized advertising via your Google Account ad settings or your
        device&apos;s &ldquo;Opt out of Ads Personalization&rdquo; setting.
      </p>
      <p>
        The App also relies on standard Google Play Services to run properly on
        Android. These services may collect basic diagnostic data (e.g., app
        version, device model, OS version, crash logs) under Google&apos;s own
        privacy policy. We do not link this diagnostic data to your identity.
      </p>
      <p>
        The App does <strong>not</strong> include any other third-party
        advertising network, analytics SDK (such as Firebase Analytics or
        Facebook SDK), or third-party crash reporter beyond what is described
        above. If this ever changes, we will update our{" "}
        <Link href="/privacy">Privacy Policy</Link> before the change ships.
      </p>
      <p>
        If the App ever offers in-app purchases or a paid &ldquo;remove
        ads&rdquo; option, those transactions will be processed by Google Play
        Billing and governed by Google Play&apos;s own terms. The current build
        does not offer any in-app purchases.
      </p>

      <h2 id="no-warranty">5. No Warranty</h2>
      <p>
        The App is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo;
        without warranties of any kind, whether express or implied, including
        but not limited to fitness for a particular purpose, non-infringement,
        or uninterrupted/error-free operation. We do not guarantee that every
        status will be found, saved, or trimmed successfully (for example,
        WhatsApp may delete a status before the App can save it, or a video
        may be in a format the in-app trimmer does not support).
      </p>

      <h2 id="liability">6. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, the Developer will not be
        liable for any indirect, incidental, special, or consequential damages,
        or loss of data, arising from your use of, or inability to use, the
        App. Because the App stores all data locally on your device, you are
        solely responsible for backing up any saved statuses you wish to keep
        long-term.
      </p>

      <h2 id="changes">7. Changes to the App or Terms</h2>
      <p>
        We may update, modify, or discontinue features of the App, and may
        revise these Terms from time to time. Material changes to these Terms
        will be reflected by updating the &ldquo;Last updated&rdquo; date at
        the top of this page. Continued use of the App after changes take
        effect constitutes acceptance of the revised Terms.
      </p>

      <h2 id="termination">8. Termination</h2>
      <p>
        We may suspend or discontinue the App, in whole or in part, at any time.
        You may stop using the App and uninstall it at any time. Because there
        is no account system, &ldquo;termination&rdquo; of your use simply
        means uninstalling the App — see our{" "}
        <Link href="/data-deletion">Data Deletion page</Link> for what that
        entails.
      </p>

      <h2 id="governing-law">9. Governing Law</h2>
      <p>
        These Terms are governed by the laws of {siteConfig.jurisdiction},
        without regard to its conflict-of-law provisions, unless applicable
        local consumer-protection law requires otherwise.
      </p>

      <h2 id="contact">10. Contact Us</h2>
      <p>
        Questions about these Terms? Contact us at{" "}
        <a href={`mailto:${siteConfig.supportEmail}`}>
          {siteConfig.supportEmail}
        </a>
        .
      </p>
    </LegalPageLayout>
  );
}
