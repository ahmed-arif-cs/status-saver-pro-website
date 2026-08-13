import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { PlayCircle, Clock } from "lucide-react";

/**
 * Google Play badge.
 *
 * Behavior:
 * - If `siteConfig.playStoreUrl` is a real URL → renders as a clickable
 *   link that opens the Play Store listing in a new tab.
 * - If `playStoreUrl` is empty / "#" → renders a styled but non-clickable
 *   "Coming soon to Google Play" badge.
 *
 * To make every badge on the site go live, just set the real URL in
 * `src/lib/site.ts` — no component changes needed.
 */
export function PlayStoreBadge({
  className,
  variant = "primary",
}: {
  className?: string;
  variant?: "dark" | "light" | "primary";
}) {
  const url = siteConfig.playStoreUrl?.trim();
  const isLive = url && url !== "#" && url.length > 0;

  const styles = {
    dark: "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:border-white dark:hover:bg-neutral-100",
    light:
      "bg-white text-neutral-900 border-neutral-200 hover:bg-neutral-50",
    primary:
      "bg-primary text-primary-foreground border-primary hover:bg-primary/90 shadow-sm shadow-primary/30",
  } as const;

  const baseClasses = cn(
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border px-5 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    isLive
      ? cn(styles[variant], "hover:scale-[1.02]")
      : cn(styles[variant], "cursor-default opacity-95"),
    className,
  );

  const Icon = isLive ? PlayCircle : Clock;
  const labelLine1 = isLive ? "Get it on" : "Coming soon to";
  const labelLine2 = "Google Play";

  const inner = (
    <>
      {/* Shine/sheen sweep on hover (only when live) */}
      {isLive ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      ) : null}

      <Icon className="h-7 w-7 flex-none" strokeWidth={1.6} />
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[0.625rem] uppercase tracking-wide opacity-80">
          {labelLine1}
        </span>
        <span className="text-base font-semibold tracking-tight">
          {labelLine2}
        </span>
      </span>
    </>
  );

  if (!isLive) {
    return (
      <span
        className={baseClasses}
        aria-label={`${siteConfig.appName} is coming soon to Google Play`}
        title="Coming soon to Google Play"
      >
        {inner}
      </span>
    );
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClasses}
      aria-label={`Get ${siteConfig.appName} on Google Play (opens in a new tab)`}
    >
      {inner}
    </Link>
  );
}

/**
 * Convenience hook — true when the Play Store URL is configured.
 * Useful for conditionally rendering marketing copy.
 */
export function useIsPlayStoreLive() {
  const url = siteConfig.playStoreUrl?.trim();
  return Boolean(url && url !== "#" && url.length > 0);
}
