"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Wraps every page in a subtle fade/slide-up transition.
 * Lives in template.tsx so it re-mounts on every route change,
 * triggering the enter animation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
