import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Clock, LifeBuoy, FileText, ScrollText, Bug } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { BackToTop } from "@/components/back-to-top";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Contact & Support",
  description:
    "Get help with Status Saver Pro: send a message, ask a question, or report an issue. We respond within a few business days.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Support · Status Saver Pro",
    description:
      "Send a message to the Status Saver Pro team. Bug reports and data-deletion requests are welcome.",
    url: `${siteConfig.siteUrl}/contact`,
    type: "article",
  },
};

const quickPaths = [
  {
    icon: Bug,
    title: "Report a bug",
    description:
      "Found something broken? Use the bug report form on our Support page.",
    href: "/support#report",
  },
  {
    icon: LifeBuoy,
    title: "Delete my data",
    description:
      "Step-by-step self-service instructions on our Data Deletion page.",
    href: "/data-deletion",
  },
  {
    icon: FileText,
    title: "Privacy question",
    description:
      "Ask us anything about how the app accesses or uses your data.",
    href: "/privacy",
  },
  {
    icon: ScrollText,
    title: "Terms question",
    description:
      "Clarify any clause in the Terms of Service before using the App.",
    href: "/terms",
  },
] as const;

export default function ContactPage() {
  return (
    <section className="relative mx-auto max-w-4xl px-4 pb-20 pt-12 sm:px-6 md:pt-20 lg:px-8">
      <header className="mb-10">
        <ScrollReveal>
          <p className="text-meta font-semibold uppercase tracking-wider text-primary">
            Support
          </p>
          <h1 className="mt-2 text-headline text-foreground">
            Contact &amp; Support
          </h1>
          <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
            Have a question, found a bug, or need help with a data-deletion
            request? Send us a message — we read every one and aim to respond
            within a few business days.
          </p>
        </ScrollReveal>
      </header>

      {/* Primary email card */}
      <ScrollReveal>
        <Card className="border-primary/30 bg-primary/5 shadow-sm">
          <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span
                aria-hidden
                className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30"
              >
                <Mail className="h-6 w-6" strokeWidth={2} />
              </span>
              <div>
                <h2 className="text-title text-foreground">Prefer email?</h2>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="mt-1 inline-block text-body-lg font-medium text-primary underline underline-offset-4 hover:decoration-2"
                >
                  {siteConfig.supportEmail}
                </a>
                <p className="mt-3 flex items-center gap-1.5 text-meta text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Response time: a few business days.
                </p>
              </div>
            </div>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="shine-on-hover inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-body font-semibold text-primary-foreground shadow-sm shadow-primary/30 transition-colors hover:bg-primary/90"
            >
              Compose email
            </a>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Contact form */}
      <ScrollReveal delay={0.05} className="mt-10">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-title text-foreground">Send a message</h2>
          <p className="text-meta text-muted-foreground">All fields required</p>
        </div>
        <ContactForm />
      </ScrollReveal>

      {/* Quick paths */}
      <ScrollReveal className="mt-12">
        <h2 className="text-title text-foreground">Quick paths</h2>
        <p className="mt-1 text-body text-muted-foreground">
          Looking for something specific?
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {quickPaths.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="group flex h-full flex-col gap-2 rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
              >
                <q.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="text-base font-semibold text-foreground">
                {q.title}
              </h3>
              <p className="text-body text-muted-foreground">
                {q.description}
              </p>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      <BackToTop />
    </section>
  );
}
