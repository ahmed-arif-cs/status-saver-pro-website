import Link from "next/link";
import Image from "next/image";
import { siteConfig, footerLinks } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="relative inline-flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded-xl shadow-sm"
            >
              <Image
                src="/app-icon.svg"
                alt=""
                width={36}
                height={36}
                className="h-full w-full"
              />
            </span>
            <span className="text-[1.05rem] font-semibold tracking-tight text-foreground">
              {siteConfig.appName}
            </span>
          </div>
          <p className="mt-3 text-meta leading-relaxed text-muted-foreground">
            {siteConfig.tagline}.
          </p>
          <p className="mt-3 text-meta text-muted-foreground/80">
            An independent utility by {siteConfig.developerName}. Not affiliated
            with WhatsApp Inc. or Meta Platforms, Inc.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-2"
        >
          <p className="col-span-2 text-meta font-semibold uppercase tracking-wider text-foreground/70 sm:col-span-1">
            Site
          </p>
          {footerLinks.slice(0, 5).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-meta text-muted-foreground transition-colors hover:text-primary"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <nav
          aria-label="Footer legal"
          className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-1"
        >
          <p className="text-meta font-semibold uppercase tracking-wider text-foreground/70">
            Legal
          </p>
          {footerLinks.slice(5).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-meta text-muted-foreground transition-colors hover:text-primary"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-5 text-meta text-muted-foreground sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            © {year} {siteConfig.appName} · {siteConfig.developerName}
          </p>
          <p>Made in Pakistan · Independent &amp; unofficial</p>
        </div>
      </div>
    </footer>
  );
}
