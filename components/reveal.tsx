"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* One observer for the whole page rather than one per element. Each target is
   dropped the moment it has revealed, so the observer's list only shrinks. */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = "";
          observer?.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
  }
  return observer;
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Milliseconds. Use for a short stagger between siblings. */
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "header";
  style?: CSSProperties;
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </Tag>
  );
}
