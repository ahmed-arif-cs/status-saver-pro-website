"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Floating "Back to top" button. Appears after the user scrolls past
 * ~1 viewport height. Useful for the long legal pages (Privacy Policy).
 */
export function BackToTop({ className }: { className?: string }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Back to top"
      title="Back to top"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-5 right-5 z-30 h-11 w-11 rounded-full border-border/70 bg-background/80 shadow-md backdrop-blur-md transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
        className,
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
