import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { siteConfig, faq } from "@/lib/site";
import { PhoneMockup } from "@/components/phone-mockup";
import { PlayStoreBadge } from "@/components/play-store-badge";
import {
  FeaturesGrid,
  HowItWorksSection,
} from "@/components/home-sections";
import {
  ScreenshotsSection,
  ChangelogSection,
} from "@/components/screenshots-changelog";
import { FaqAccordion } from "@/components/faq-accordion";
import { ScrollReveal } from "@/components/scroll-reveal";

// JSON-LD structured data — Organization + WebSite + MobileApplication + FAQPage
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.siteUrl}/#organization`,
      name: siteConfig.developerName,
      alternateName: siteConfig.appName,
      url: siteConfig.siteUrl,
      description: siteConfig.tagline,
      email: `mailto:${siteConfig.supportEmail}`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
      url: siteConfig.siteUrl,
      name: siteConfig.appName,
      description: siteConfig.tagline,
      publisher: { "@id": `${siteConfig.siteUrl}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "MobileApplication",
      "@id": `${siteConfig.siteUrl}/#mobileapp`,
      name: siteConfig.appName,
      operatingSystem: "ANDROID",
      applicationCategory: "UtilitiesApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      availableOnDevice: "Android",
      installUrl: siteConfig.playStoreUrl || undefined,
      author: { "@id": `${siteConfig.siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.siteUrl}/#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden">
        {/* Animated gradient mesh background */}
        <div aria-hidden className="hero-mesh">
          <span className="blob-3" />
        </div>
        {/* Decorative grid overlay (kept for texture) */}
        <div
          aria-hidden
          className="hero-grid absolute inset-0 -z-10 opacity-30"
        />

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-12 md:py-24 lg:px-8 lg:py-28">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-meta font-medium text-primary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Independent · Android · Local-only
            </span>

            <h1 className="mt-5 text-display text-foreground">
              {siteConfig.appName}
            </h1>

            <p className="mt-5 max-w-xl text-body-lg text-muted-foreground">
              {siteConfig.tagline}.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <PlayStoreBadge variant="primary" />
              <Link
                href="/#features"
                className="inline-flex items-center gap-2 text-body font-medium text-foreground/80 underline-offset-4 hover:text-primary hover:underline"
              >
                See what it does
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-6 max-w-md text-meta text-muted-foreground/80">
              An independent utility by {siteConfig.developerName}. Not
              affiliated with, endorsed by, or sponsored by WhatsApp Inc. or
              Meta Platforms, Inc.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="md:justify-self-end">
            <PhoneMockup />
          </ScrollReveal>
        </div>
      </section>

      {/* ============================ FEATURES ============================ */}
      <FeaturesGrid />

      {/* ============================ HOW IT WORKS ============================ */}
      <HowItWorksSection />

      {/* ============================ SCREENSHOTS ============================ */}
      <ScreenshotsSection />

      {/* ============================ FAQ ============================ */}
      <section id="faq" className="border-t border-border/60 bg-muted/20 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center">
            <p className="text-meta font-semibold uppercase tracking-wider text-primary">
              FAQ
            </p>
            <h2 className="mt-2 text-headline text-foreground">
              Questions, answered honestly
            </h2>
            <p className="mt-3 text-body-lg text-muted-foreground">
              The short version: this app is independent, free, and never
              uploads your files anywhere. The longer version is below.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.05} className="mt-10">
            <FaqAccordion />
          </ScrollReveal>

          <ScrollReveal className="mt-10 text-center">
            <p className="text-body text-muted-foreground">
              Still have a question?{" "}
              <Link
                href="/support"
                className="font-semibold text-primary hover:underline"
              >
                Visit the support page
              </Link>{" "}
              or{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary hover:underline"
              >
                email us directly
              </Link>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================ CHANGELOG ============================ */}
      <ChangelogSection />

      {/* ============================ CTA ============================ */}
      <section className="relative overflow-hidden border-t border-border/60">
        <div aria-hidden className="hero-mesh">
          <span className="blob-3" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8">
          <ScrollReveal>
            <span
              aria-hidden
              className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"
            >
              <ShieldCheck className="h-6 w-6" strokeWidth={2} />
            </span>
            <h2 className="text-headline text-foreground">
              Ready to keep the statuses you love?
            </h2>
            <p className="mt-3 text-body-lg text-muted-foreground">
              {siteConfig.appName} is launching soon on Google Play. Free to
              download, no account required, and your files never leave your
              phone.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PlayStoreBadge variant="dark" />
              <Link
                href="/security"
                className="inline-flex items-center gap-2 text-body font-medium text-foreground/80 underline-offset-4 hover:text-primary hover:underline"
              >
                Read the security overview
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
