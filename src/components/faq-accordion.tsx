"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/lib/site";

/**
 * Reusable FAQ accordion — used on both the home page and /support.
 * Pulls from the single source of truth in src/lib/site.ts.
 */
export function FaqAccordion({ items = faq }: { items?: typeof faq }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={items[0] ? `item-0` : undefined}
    >
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="glass-card mb-3 overflow-hidden rounded-xl border-border/60 px-5 last:mb-0"
        >
          <AccordionTrigger className="text-left text-body font-semibold text-foreground hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-body leading-relaxed text-muted-foreground">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
