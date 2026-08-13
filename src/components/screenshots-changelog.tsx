"use client";

import * as React from "react";
import Image from "next/image";
import { screenshots, changelog, formatLongDate } from "@/lib/site";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Horizontally-scrollable screenshot carousel.
 * Uses native scroll-snap for buttery mobile feel + arrow buttons for desktop.
 * All screenshots live in /public/screenshots/ — replace before launch.
 */
export function ScreenshotsSection() {
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 720);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="relative border-t border-border/60 bg-muted/20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-meta font-semibold uppercase tracking-wider text-primary">
              App preview
            </p>
            <h2 className="mt-2 text-headline text-foreground">
              See it before you tap install
            </h2>
            <p className="mt-3 text-body-lg text-muted-foreground">
              A quick tour of the main screens. The screenshots below are
              pre-launch placeholders — real device captures will land here
              when the app goes live on Google Play.
            </p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </ScrollReveal>

        <div
          ref={scrollerRef}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        >
          {screenshots.map((shot, i) => (
            <ScrollReveal
              key={shot.src}
              delay={(i % 4) * 0.06}
              className="glass-card flex flex-none snap-center flex-col overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[9/16] w-[220px] overflow-hidden bg-muted sm:w-[260px]">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 220px, 260px"
                />
              </div>
              <p className="px-4 py-3 text-center text-meta text-muted-foreground">
                {shot.alt}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-6 text-center text-meta text-muted-foreground/80">
          Pre-launch screenshots shown above are illustrative placeholders.
        </p>
      </div>
    </section>
  );
}

/**
 * Versioned changelog / "What's new".
 * Data-driven from src/lib/site.ts — just append a new entry to add a version.
 */
export function ChangelogSection() {
  return (
    <section id="changelog" className="relative border-t border-border/60 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-meta font-semibold uppercase tracking-wider text-primary">
            What&apos;s new
          </p>
          <h2 className="mt-2 text-headline text-foreground">Changelog</h2>
          <p className="mt-3 text-body-lg text-muted-foreground">
            Every release, all in one place. We ship small, focused updates —
            no surprise tracking, no surprise permissions.
          </p>
        </ScrollReveal>

        <div className="mt-10 space-y-6">
          {changelog.map((entry, i) => (
            <ScrollReveal
              key={entry.version}
              delay={i * 0.05}
              className="glass-card overflow-hidden rounded-2xl"
            >
              <div className="flex flex-col gap-1 border-b border-border/60 bg-muted/30 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  >
                    <Sparkles className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="text-title text-foreground">
                      v{entry.version}
                      <span
                        className={cn(
                          "ml-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide",
                          "bg-primary/15 text-primary",
                        )}
                      >
                        {entry.tag}
                      </span>
                    </h3>
                    <p className="text-meta text-muted-foreground">
                      {formatLongDate(entry.date)}
                    </p>
                  </div>
                </div>
              </div>
              <ul className="px-6 py-5">
                {entry.changes.map((change, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 py-1.5 text-body text-foreground/90"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary"
                    />
                    {change}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
