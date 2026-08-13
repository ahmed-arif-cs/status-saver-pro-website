import type { Metadata } from "next";
import Link from "next/link";
import { Mail, LifeBuoy, BookOpen, Bug } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { FaqAccordion } from "@/components/faq-accordion";
import { BugReportForm } from "@/components/bug-report-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BackToTop } from "@/components/back-to-top";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Support Center",
  description:
    "Status Saver Pro support: browse the FAQ, report a problem, and find quick links to data deletion and privacy information.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "Support Center · Status Saver Pro",
    description:
      "Browse the FAQ, report a problem, or get help with Status Saver Pro.",
    url: `${siteConfig.siteUrl}/support`,
    type: "article",
  },
};

export default function SupportPage() {
  return (
    <section className="relative mx-auto max-w-4xl px-4 pb-20 pt-12 sm:px-6 md:pt-20 lg:px-8">
      <header className="mb-10">
        <ScrollReveal>
          <p className="text-meta font-semibold uppercase tracking-wider text-primary">
            Help center
          </p>
          <h1 className="mt-2 text-headline text-foreground">
            How can we help?
          </h1>
          <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
            Browse the FAQ, report a problem, or reach out by email. The FAQ
            covers most common questions — if yours isn&apos;t there, the form
            below goes straight to our inbox.
          </p>
        </ScrollReveal>
      </header>

      {/* Quick action cards */}
      <ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="#faq"
            className="glass-card group flex flex-col gap-3 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span
              aria-hidden
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
            >
              <BookOpen className="h-5 w-5" strokeWidth={2} />
            </span>
            <h2 className="text-base font-semibold text-foreground">
              Read the FAQ
            </h2>
            <p className="text-body text-muted-foreground">
              Common questions about the app, WhatsApp, ads, and Android
              versions.
            </p>
          </Link>

          <Link
            href="#report"
            className="glass-card group flex flex-col gap-3 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span
              aria-hidden
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
            >
              <Bug className="h-5 w-5" strokeWidth={2} />
            </span>
            <h2 className="text-base font-semibold text-foreground">
              Report a problem
            </h2>
            <p className="text-body text-muted-foreground">
              Found a bug or unexpected behavior? Tell us what happened.
            </p>
          </Link>

          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="glass-card group flex flex-col gap-3 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span
              aria-hidden
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
            >
              <Mail className="h-5 w-5" strokeWidth={2} />
            </span>
            <h2 className="text-base font-semibold text-foreground">
              Email us
            </h2>
            <p className="break-all text-body text-muted-foreground">
              {siteConfig.supportEmail}
            </p>
          </a>
        </div>
      </ScrollReveal>

      {/* FAQ */}
      <section id="faq" className="mt-16 scroll-mt-24">
        <ScrollReveal>
          <p className="text-meta font-semibold uppercase tracking-wider text-primary">
            FAQ
          </p>
          <h2 className="mt-2 text-headline text-foreground">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-body-lg text-muted-foreground">
            Tap any question to expand the answer. Don&apos;t see yours?
            Scroll down to the report form.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.05} className="mt-8">
          <FaqAccordion />
        </ScrollReveal>
      </section>

      {/* Bug report form */}
      <section id="report" className="mt-16 scroll-mt-24">
        <ScrollReveal>
          <p className="text-meta font-semibold uppercase tracking-wider text-primary">
            Report a problem
          </p>
          <h2 className="mt-2 text-headline text-foreground">
            Tell us what went wrong
          </h2>
          <p className="mt-3 text-body-lg text-muted-foreground">
            The more detail you share, the faster we can fix it. Your email is
            optional — include it only if you want a reply.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.05} className="mt-8">
          <BugReportForm />
        </ScrollReveal>
      </section>

      {/* Need more help? */}
      <ScrollReveal className="mt-12">
        <Card className="border-border/60 bg-muted/30">
          <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span
                aria-hidden
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
              >
                <LifeBuoy className="h-6 w-6" strokeWidth={2} />
              </span>
              <div>
                <h3 className="text-title text-foreground">
                  Still need a human?
                </h3>
                <p className="mt-1 text-body text-muted-foreground">
                  Email{" "}
                  <a
                    href={`mailto:${siteConfig.supportEmail}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {siteConfig.supportEmail}
                  </a>{" "}
                  and we&apos;ll get back to you within a few business days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      <BackToTop />
    </section>
  );
}
