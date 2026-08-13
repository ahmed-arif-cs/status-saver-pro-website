import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Abstract phone silhouette used as hero artwork on the homepage.
 * Deliberately NOT a WhatsApp UI mockup — just a generic rounded
 * rectangle "phone" with a simple status-grid inside, to avoid any
 * trademark concerns while still communicating "this is an Android app".
 */
export function PhoneMockup({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[9/18] w-full max-w-[260px]",
        className,
      )}
      aria-hidden
    >
      {/* Phone body */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-border bg-card shadow-xl shadow-primary/10 ring-1 ring-black/5 dark:ring-white/5">
        {/* Notch */}
        <div className="absolute left-1/2 top-3 h-1.5 w-16 -translate-x-1/2 rounded-full bg-foreground/15" />

        {/* Screen content */}
        <div className="absolute inset-x-3 bottom-3 top-8 overflow-hidden rounded-[2rem] bg-background">
          {/* Status bar */}
          <div className="flex items-center justify-between px-4 pt-2 text-[0.55rem] text-muted-foreground">
            <span>9:41</span>
            <span className="flex items-center gap-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
              <span className="h-1.5 w-2.5 rounded-sm bg-primary/60" />
              <span className="h-2 w-3 rounded-sm bg-primary/40" />
            </span>
          </div>

          {/* App header */}
          <div className="px-4 pt-3">
            <div className="h-2 w-20 rounded-full bg-foreground/80" />
            <div className="mt-1 h-1.5 w-28 rounded-full bg-foreground/20" />
          </div>

          {/* Status grid — 2x3 abstract thumbnails */}
          <div className="grid grid-cols-2 gap-2 px-4 pt-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-lg border border-border/60",
                  i % 3 === 0 && "bg-primary/15",
                  i % 3 === 1 && "bg-accent",
                  i % 3 === 2 && "bg-muted",
                )}
              >
                <div className="flex h-full items-end p-1.5">
                  <div className="h-1 w-5 rounded-full bg-foreground/30" />
                </div>
              </div>
            ))}
          </div>

          {/* Floating "saved" badge */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 rounded-xl border border-border/60 bg-card p-2.5 shadow-sm">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="h-1.5 w-20 rounded-full bg-foreground/80" />
              <div className="mt-1 h-1 w-24 rounded-full bg-foreground/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle floating glow */}
      <div className="absolute -inset-4 -z-10 rounded-full bg-primary/15 blur-3xl" />
    </div>
  );
}
