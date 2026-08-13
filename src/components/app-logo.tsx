import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function AppLogo({
  className,
  withWordmark = true,
  size = 36,
}: {
  className?: string;
  withWordmark?: boolean;
  size?: number;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      aria-label={`${siteConfig.appName} — home`}
    >
      <span
        aria-hidden
        className="relative inline-flex flex-none items-center justify-center overflow-hidden rounded-xl shadow-sm transition-transform group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <Image
          src="/app-icon.svg"
          alt=""
          width={size}
          height={size}
          className="h-full w-full"
          priority
        />
        {/* Subtle glow on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-2 ring-white/30 transition-opacity duration-300 group-hover:opacity-100"
        />
      </span>
      {withWordmark && (
        <span className="text-[1.05rem] font-semibold tracking-tight text-foreground">
          {siteConfig.appName}
        </span>
      )}
    </Link>
  );
}
