import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function GooglePlayGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gp-blue-green" x1="382.4" y1="129.6" x2="16" y2="527.4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00A0FF" />
          <stop offset="0.007" stopColor="#00A1FF" />
          <stop offset="0.26" stopColor="#00BEFF" />
          <stop offset="0.512" stopColor="#00D2FF" />
          <stop offset="0.76" stopColor="#00DFFF" />
          <stop offset="1" stopColor="#00E3FF" />
        </linearGradient>
        <linearGradient id="gp-yellow" x1="511.9" y1="256" x2="0" y2="256" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFE000" />
          <stop offset="0.409" stopColor="#FFBD00" />
          <stop offset="0.775" stopColor="#FFA500" />
          <stop offset="1" stopColor="#FF9C00" />
        </linearGradient>
        <linearGradient id="gp-red" x1="349.6" y1="230.6" x2="-30.5" y2="704" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF3A44" />
          <stop offset="1" stopColor="#C31162" />
        </linearGradient>
        <linearGradient id="gp-green" x1="-24" y1="8.6" x2="139.9" y2="212.2" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#32A071" />
          <stop offset="0.068" stopColor="#2DA771" />
          <stop offset="0.476" stopColor="#15CF74" />
          <stop offset="0.801" stopColor="#06E775" />
          <stop offset="1" stopColor="#00F076" />
        </linearGradient>
      </defs>
      <path d="M35.7 20.5C29 27.6 25 38.6 25 52.9v406.2c0 14.3 4 25.3 10.7 32.4l1.7 1.6L266 262.5v-5.1L37.4 18.9l-1.7 1.6z" fill="url(#gp-blue-green)" />
      <path d="M341 339.7l-75-75.1v-5.3l75-75.1 1.7 1L438 240.1c25.6 14.5 25.6 38.4 0 53l-95.3 54.6-1.7 1z" fill="url(#gp-yellow)" />
      <path d="M342.7 338.7L266 262l-230.3 230.7c8.5 9 22.6 10.2 38.4 1.2l268.6-155.2" fill="url(#gp-red)" />
      <path d="M342.7 185.3L74.1 30.1c-15.8-9-29.9-7.8-38.4 1.2L266 262l76.7-76.7z" fill="url(#gp-green)" />
    </svg>
  );
}

export function PlayStoreBadge({
  className,
  variant = "primary",
  size = "default",
}: {
  className?: string;
  variant?: "dark" | "light" | "primary";
  size?: "default" | "compact";
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

  const iconWrapStyles = {
    dark: "bg-white/10 dark:bg-neutral-900/10",
    light: "bg-neutral-100",
    primary: "bg-primary-foreground/15",
  } as const;

  const isCompact = size === "compact";

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    isCompact ? "h-9 gap-2 px-4" : "gap-3 rounded-2xl px-5 py-2.5",
    isLive
      ? cn(styles[variant], "hover:scale-[1.02]")
      : cn(styles[variant], "cursor-default opacity-95"),
    className,
  );

  const inner = isCompact ? (
    <>
      <GooglePlayGlyph className="h-4 w-4 flex-none" />
      <span className="text-meta font-semibold tracking-tight whitespace-nowrap">
        {isLive ? "Get on Google Play" : "Coming soon"}
      </span>
    </>
  ) : (
    <>
      {isLive ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      ) : null}

      <span
        aria-hidden
        className={cn(
          "flex h-8 w-8 flex-none items-center justify-center rounded-lg",
          iconWrapStyles[variant],
        )}
      >
        <GooglePlayGlyph className="h-[18px] w-[18px]" />
      </span>
      <span className="flex flex-col items-start justify-center leading-tight">
        <span className="text-[0.6rem] font-medium tracking-wider opacity-80">
          {isLive ? "GET IT ON" : "COMING SOON TO"}
        </span>
        <span className="text-base font-semibold tracking-tight">
          Google Play
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

export function useIsPlayStoreLive() {
  const url = siteConfig.playStoreUrl?.trim();
  return Boolean(url && url !== "#" && url.length > 0);
}
