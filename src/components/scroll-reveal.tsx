"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type Props = {
  children: React.ReactNode;
  /** Delay before the reveal animation starts, in seconds. */
  delay?: number;
  /** Direction to slide from. */
  from?: "bottom" | "left" | "right" | "top";
  /** Distance to travel, in px. */
  distance?: number;
  /** Render as a different element (default: div). */
  as?: React.ElementType;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * Wraps children in a framer-motion reveal-on-scroll animation.
 * Respects prefers-reduced-motion automatically (framer-motion handles it).
 *
 * Usage:
 *   <ScrollReveal>
 *     <h2>My heading</h2>
 *   </ScrollReveal>
 */
export function ScrollReveal({
  children,
  delay = 0,
  from = "bottom",
  distance = 24,
  as = motion.div,
  className,
  ...rest
}: Props) {
  const offset = React.useMemo(() => {
    switch (from) {
      case "bottom":
        return { y: distance, x: 0 };
      case "top":
        return { y: -distance, x: 0 };
      case "left":
        return { y: 0, x: -distance };
      case "right":
        return { y: 0, x: distance };
      default:
        return { y: distance, x: 0 };
    }
  }, [from, distance]);

  const MotionTag = as as React.ElementType;

  return (
    <MotionTag
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
