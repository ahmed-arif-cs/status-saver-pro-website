"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig, mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AppLogo } from "@/components/app-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { PlayStoreBadge } from "@/components/play-store-badge";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActiveHref = (href: string) => {
    if (href.includes("#")) {
      // anchor links — match by path prefix
      const [path] = href.split("#");
      return pathname === path;
    }
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <AppLogo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {mainNav.map((item) => {
            const active = isActiveHref(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-meta font-medium transition-colors",
                  active
                    ? "bg-accent/70 text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/40 hover:text-accent-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <PlayStoreBadge
            variant="primary"
            size="compact"
            className="hidden sm:inline-flex"
          />

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[88vw] max-w-sm border-l border-border bg-background p-0"
            >
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="flex h-16 items-center justify-between border-b border-border/60 px-5">
                <AppLogo />
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav
                className="flex flex-col gap-1 p-4"
                aria-label="Primary mobile"
              >
                {mainNav.map((item) => {
                  const active = isActiveHref(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-lg px-4 py-3 text-body font-medium transition-colors",
                        active
                          ? "bg-accent/70 text-accent-foreground"
                          : "text-foreground/80 hover:bg-accent/40 hover:text-accent-foreground",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.title}
                    </Link>
                  );
                })}
                <div className="mt-4">
                  <PlayStoreBadge variant="primary" className="w-full justify-center" />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
