import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, formatLongDate } from "@/lib/site";
import { LegalPageLayout, type TocItem } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Status Saver Pro Privacy Policy: what information the app accesses, how it uses Android permissions (SAF), AdMob ads, and your rights.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy · Status Saver Pro",
    description:
      "What information Status Saver Pro accesses, how it uses Android permissions, AdMob ads, and your rights.",
    url: `${siteConfig.siteUrl}/privacy`,
    type: "article",
  },
};

const toc: TocItem[] = [
  { id: "summary", label: "1. Summary" },
  {
    id: "information-we-access",
    label: "2. Information We Access",
    children: [
      { id: "device-permissions", label: "2.1 Device permissions" },
      { id: "info-stored-locally", label: "2.2 Stored locally on your device" },
      { id: "advertising", label: "2.3 Advertising (Google AdMob)" },
      { id: "other-services", label: "2.4 Other third-party services" },
    ],
  },
  { id: "how-we-use", label: "3. How We Use Information" },
  { id: "data-sharing", label: "4. Data Sharing & Disclosure" },
  { id: "data-retention", label: "5. Data Retention & Deletion" },
  { id: "childrens-privacy", label: "6. Children's Privacy" },
  { id: "your-rights", label: "7. Your Rights (GDPR/CCPA)" },
  { id: "security", label: "8. Security" },
  { id: "international-users", label: "9. International Users" },
  { id: "changes", label: "10. Changes to This Policy" },
  { id: "contact", label: "11. Contact Us" },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated={formatLongDate(siteConfig.lastUpdated.privacy)}
      description="Status Saver Pro is an independent, unofficial utility app. It is not affiliated with, endorsed by, sponsored by, or in any way officially connected to WhatsApp Inc. or Meta Platforms, Inc."
      toc={toc}
    >
      <p>
        Status Saver Pro (&ldquo;the App&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;) is developed by {siteConfig.developerName} (
        &ldquo;the Developer&rdquo;). This Privacy Policy explains what
        information the App accesses, collects, uses, and shares when you use
        Status Saver Pro on Android.
      </p>

      <p>
        Status Saver Pro is an independent, unofficial utility app.{" "}
        <strong>
          It is not affiliated with, endorsed by, sponsored by, or in any way
          officially connected to WhatsApp Inc. or Meta Platforms, Inc.
        </strong>{" "}
        &ldquo;WhatsApp&rdquo; is a trademark of WhatsApp Inc./Meta Platforms,
        Inc. The App simply reads status media files that WhatsApp already saves
        to your device&apos;s local storage, so that you can view and optionally
        keep a copy of them.
      </p>

      <h2 id="summary">1. Summary</h2>
      <ul>
        <li>
          Status Saver Pro does <strong>not</strong> operate its own backend
          server and does <strong>not</strong> collect, store, or transmit your
          personal data to the Developer. There is no account system, no login,
          and no sign-up.
        </li>
        <li>
          All status photos and videos you save stay on your device, inside your
          own device storage (Pictures/StatusSaverPro and Movies/StatusSaverPro
          folders). The App <strong>never</strong> uploads your saved statuses,
          favorites, or settings anywhere.
        </li>
        <li>
          The App uses Google AdMob to show ads. No other third-party tracking or
          analytics SDK is included. Details are below.
        </li>
      </ul>

      <h2 id="information-we-access">2. Information We Access</h2>

      <h3 id="device-permissions">2.1 Device permissions</h3>
      <p>
        The App requests the following Android permissions, and only uses them
        for the stated purpose:
      </p>
      <table>
        <thead>
          <tr>
            <th>Permission</th>
            <th>Why the App needs it</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Storage access via Storage Access Framework (SAF) on Android 11+,
              or legacy READ/WRITE_EXTERNAL_STORAGE on Android 8–10
            </td>
            <td>
              To read the specific WhatsApp status folder you grant access to,
              and to save copies of the statuses you choose into the App&apos;s
              own folder (Pictures/StatusSaverPro and Movies/StatusSaverPro) so
              you can keep them after WhatsApp deletes them. SAF access is
              scoped to that one folder — the App cannot browse other folders,
              your camera roll, your downloads, or WhatsApp&apos;s private chat
              database.
            </td>
          </tr>
          <tr>
            <td>Notifications (POST_NOTIFICATIONS)</td>
            <td>
              To show a notification when a background auto-save completes or
              when a bulk save finishes. The App does not send promotional
              notifications.
            </td>
          </tr>
          <tr>
            <td>Internet / Network State</td>
            <td>
              To show ads (Google AdMob) and to use the standard Google Play
              Services SDKs. The App does not make any other network requests.
            </td>
          </tr>
          <tr>
            <td>Vibrate</td>
            <td>
              To provide short haptic feedback for actions like save, select,
              and delete (a UI convenience — this permission does not let the
              App access any personal data).
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        We do <strong>not</strong> request access to your contacts, call logs,
        SMS, precise location, camera, microphone, or the WhatsApp app&apos;s
        private/encrypted chat data. The App only reads the plain status-cache
        folder that WhatsApp itself writes to shared device storage, and only
        the one you explicitly grant via SAF.
      </p>

      <h3 id="info-stored-locally">2.2 Information stored locally on your device</h3>
      <ul>
        <li>
          Saved statuses (photos, videos) are written to your device&apos;s
          shared storage in the Pictures/StatusSaverPro and Movies/StatusSaverPro
          folders. These files are visible to any gallery app and are yours to
          manage, copy, share, or delete.
        </li>
        <li>
          A local database (on-device only, in the App&apos;s private app data
          folder) that keeps track of which statuses you&apos;ve saved or marked
          as favorite. This data never leaves your device.
        </li>
        <li>
          Your app preferences (theme, language, auto-save toggle) are stored
          locally on your device.
        </li>
      </ul>

      <h3 id="advertising">2.3 Advertising (Google AdMob)</h3>
      <p>
        The App shows banner and interstitial ads served by{" "}
        <strong>Google AdMob</strong>. AdMob (and Google, its partner ad
        networks) may collect and use data such as your advertising ID, device
        information, IP address, and app interaction data to serve and measure
        ads, and to limit how many times you see the same ad, in accordance
        with{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google&apos;s Privacy &amp; Terms
        </a>{" "}
        and, where applicable, its{" "}
        <a
          href="https://business.safety.google/adsprocessorterms/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ads Data Processing Terms
        </a>
        . The App&apos;s current build ships with{" "}
        <strong>Google&apos;s public test ad unit ID</strong> (
        <code>ca-app-pub-3940256099942544~3347511313</code>) for development
        purposes; before or shortly after publishing, this will be switched to a
        production AdMob App ID configured to comply with Google&apos;s ad
        content, consent (including EU/UK consent management and, where
        required, Google&apos;s EU User Consent Policy), and
        children&apos;s-advertising policies.
      </p>
      <p>
        You can opt out of personalized (&ldquo;interest-based&rdquo;)
        advertising by adjusting your Google Account&apos;s ad settings at{" "}
        <a
          href="https://adssettings.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          adssettings.google.com
        </a>{" "}
        or your device&apos;s &ldquo;Opt out of Ads Personalization&rdquo;
        setting in Android Settings &gt; Privacy &gt; Ads. You can also reset
        or delete your advertising ID entirely on Android 12+ from the same
        screen.
      </p>

      <h3 id="other-services">2.4 Other third-party services</h3>
      <p>
        The App relies on standard Google Play services (Google Play Services,
        and crash/performance libraries that may be part of the Android/Google
        SDKs) to run properly on Android. These services may collect basic
        diagnostic data (e.g., app version, device model, OS version, crash
        logs) under Google&apos;s own privacy policy, to help us find and fix
        bugs. We do not link this diagnostic data to your identity. The App
        does not include any other third-party analytics SDK (no Firebase
        Analytics, no Facebook SDK, no third-party crash reporter).
      </p>

      <h2 id="how-we-use">3. How We Use Information</h2>
      <p>We use the limited information described above only to:</p>
      <ul>
        <li>Let the App find and display WhatsApp statuses already on your device.</li>
        <li>Save copies of statuses you choose to keep, in a folder you control.</li>
        <li>
          Optionally auto-save new statuses before they expire, if you enable
          the Auto-Save toggle in Settings.
        </li>
        <li>Show ads and measure basic ad performance, via Google AdMob.</li>
        <li>Diagnose crashes and improve app stability and performance.</li>
      </ul>
      <p>
        We do <strong>not</strong> sell your personal data. We do{" "}
        <strong>not</strong> use your data for any advertising or profiling
        purpose beyond what AdMob itself requires to serve ads inside the App.
        We do <strong>not</strong> share your data with any third party for
        cross-context advertising.
      </p>

      <h2 id="data-sharing">4. Data Sharing &amp; Disclosure</h2>
      <p>We do not share personal data with third parties except:</p>
      <ul>
        <li>
          With Google, strictly as described above (AdMob for ads, and standard
          Google Play Services SDKs).
        </li>
        <li>
          If required to comply with a valid legal request, court order, or
          applicable law.
        </li>
        <li>
          If necessary to investigate or prevent fraud, security incidents, or
          violations of our Terms of Service.
        </li>
      </ul>

      <h2 id="data-retention">5. Data Retention &amp; Deletion</h2>
      <ul>
        <li>
          Locally saved statuses and app preferences stay on your device until
          you delete them yourself (from within the App, by clearing app data,
          or by uninstalling the App from Android Settings).
        </li>
        <li>
          Because there is no backend server, there is no server-side retention
          period — the moment you delete local data, it is gone. There is no
          backup, no &ldquo;soft delete&rdquo; window, no copy anywhere else.
        </li>
        <li>
          See our{" "}
          <Link href="/data-deletion">Data Deletion</Link> page for
          step-by-step instructions and how to contact us for help.
        </li>
      </ul>

      <h2 id="childrens-privacy">6. Children&apos;s Privacy</h2>
      <p>
        Status Saver Pro is not directed to children under 13 (or the minimum
        age required in your country), and we do not knowingly collect personal
        data from children. If you believe a child has provided us personal
        data, please contact us at the email below so we can address it.
      </p>

      <h2 id="your-rights">7. Your Rights (GDPR/CCPA and similar laws)</h2>
      <p>
        Depending on where you live, you may have rights to access, correct,
        export, or delete your personal data, and to object to or restrict
        certain processing. Because Status Saver Pro stores your saved media
        locally on your own device, you are already in direct control of that
        data through the App and your device settings — uninstall the App or
        clear its storage and there is nothing left. For anything else, contact
        us using the details below and we will respond within a reasonable time
        and in accordance with applicable law.
      </p>

      <h2 id="security">8. Security</h2>
      <p>
        We take reasonable technical measures to protect the limited data the
        App handles — primarily by using Android&apos;s scoped Storage Access
        Framework on Android 11+ (which restricts the App to the single folder
        you grant) and by not operating any backend server at all. However, no
        method of electronic storage or transmission is 100% secure, and we
        cannot guarantee absolute security. See our{" "}
        <Link href="/security">Security page</Link> for a fuller explanation.
      </p>

      <h2 id="international-users">9. International Users</h2>
      <p>
        If you use the App outside {siteConfig.country}, be aware that any data
        you choose to send to Google (e.g., via AdMob) may be processed in other
        countries where Google operates, in accordance with Google&apos;s own
        privacy policy. The App itself does not transmit any data outside your
        device beyond what AdMob requires.
      </p>

      <h2 id="changes">10. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes
        will be reflected by updating the &ldquo;Last updated&rdquo; date at
        the top of this page. Continued use of the App after changes are posted
        means you accept the updated policy.
      </p>

      <h2 id="contact">11. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or how your data is
        handled, contact us at:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
        </li>
        <li>
          <strong>Developer:</strong> {siteConfig.developerName}
        </li>
        <li>
          <strong>Jurisdiction:</strong> {siteConfig.jurisdiction}
        </li>
      </ul>
    </LegalPageLayout>
  );
}
