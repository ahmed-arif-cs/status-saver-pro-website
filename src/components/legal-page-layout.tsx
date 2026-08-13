import * as React from "react";
import { BackToTop } from "@/components/back-to-top";

export type TocItem = {
  /** Section anchor id (must match the id used in the rendered heading). */
  id: string;
  /** Display label. */
  label: string;
  /** Optional sub-items for nested headings. */
  children?: TocItem[];
};

/**
 * Shared layout for legal pages (/privacy, /terms, /data-deletion).
 *
 * - Narrow reading column (~760px) for legibility
 * - Sticky in-page nav (Table of Contents) on desktop, hidden on mobile
 * - Visible "Last updated" date at the top — required by Play Console
 * - BackToTop button for long pages
 */
export function LegalPageLayout({
  title,
  lastUpdated,
  description,
  toc,
  children,
}: {
  title: string;
  lastUpdated: string;
  description?: string;
  toc: TocItem[];
  children: React.ReactNode;
}) {
  return (
    <article className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-10 max-w-3xl">
        <p className="text-meta font-semibold uppercase tracking-wider text-primary">
          Legal
        </p>
        <h1 className="mt-2 text-headline text-foreground">{title}</h1>
        <p className="mt-3 text-body-lg text-muted-foreground">
          <span className="font-medium text-foreground/80">Last updated:</span>{" "}
          <time>{lastUpdated}</time>
        </p>
        {description ? (
          <p className="mt-4 text-body-lg text-muted-foreground">{description}</p>
        ) : null}
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
        {/* Sticky TOC */}
        <aside
          className="hidden lg:block"
          aria-label="Table of contents"
        >
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <p className="mb-3 text-meta font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </p>
            <nav>
              <ul className="space-y-1 border-l border-border">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-meta text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {item.label}
                    </a>
                    {item.children?.length ? (
                      <ul className="ml-4 mt-1 space-y-1 border-l border-border/60">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <a
                              href={`#${child.id}`}
                              className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-[0.8rem] text-muted-foreground/80 transition-colors hover:border-primary hover:text-primary"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Reading column */}
        <div className="prose-legal max-w-none lg:max-w-[46rem]">
          {children}
        </div>
      </div>

      <BackToTop />
    </article>
  );
}
