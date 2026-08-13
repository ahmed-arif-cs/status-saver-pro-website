import * as React from "react";
import * as LucideIcons from "lucide-react";
import { features, howItWorks } from "@/lib/site";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";

type LucideIconName = keyof typeof LucideIcons;

function getIcon(name: string): LucideIcons.LucideIcon {
  return (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name] ?? LucideIcons.Circle;
}

/**
 * 8-card feature grid used on the home page.
 * Each card uses glassmorphism styling.
 */
export function FeaturesGrid() {
  return (
    <section
      id="features"
      className="relative border-t border-border/60 bg-muted/20 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-meta font-semibold uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="mt-2 text-headline text-foreground">
            Everything you need to keep statuses
          </h2>
          <p className="mt-3 text-body-lg text-muted-foreground">
            Eight thoughtful features, all designed to respect your privacy and
            your phone&apos;s storage. No sign-up, no cloud, no nonsense.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
              <ScrollReveal
                key={f.title}
                delay={(i % 4) * 0.08}
                className="glass-card group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
              >
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-title text-foreground">{f.title}</h3>
                <p className="mt-2 text-body text-muted-foreground">{f.body}</p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * "How it works" — 4-step visual walkthrough.
 */
export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative border-t border-border/60 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-meta font-semibold uppercase tracking-wider text-primary">
            How it works
          </p>
          <h2 className="mt-2 text-headline text-foreground">
            Four taps. Done.
          </h2>
          <p className="mt-3 text-body-lg text-muted-foreground">
            No accounts. No internet required to save. Just grant folder access
            and start keeping the statuses you love.
          </p>
        </ScrollReveal>

        <div className="relative mt-14">
          {/* Connecting line behind steps (desktop only) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
          />

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            {howItWorks.map((step, i) => {
              const Icon = getIcon(step.icon);
              return (
                <ScrollReveal
                  key={step.step}
                  delay={i * 0.1}
                  className="relative flex flex-col items-center text-center md:items-start md:text-left"
                >
                  {/* Step badge */}
                  <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-background shadow-sm">
                    <Icon className="h-6 w-6 text-primary" strokeWidth={2} />
                    <span
                      aria-hidden
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                    >
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-title text-foreground">{step.title}</h3>
                  <p className="mt-2 text-body text-muted-foreground">
                    {step.body}
                  </p>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
