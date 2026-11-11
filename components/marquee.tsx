"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  /** Each inner array is one row. Rows alternate direction. */
  rows: string[][];
  className?: string;
}

/**
 * Ribbons of display type. Each row drifts on a compositor-only CSS loop, and
 * scrolling pushes the rows against each other on top of that, so the band
 * answers the scroll wheel instead of merely playing.
 */
export function Marquee({ rows, className }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 as the band enters at the bottom, +1 as it leaves at the top.
      const p = 1 - (2 * (rect.top + rect.height)) / (vh + rect.height);
      el.style.setProperty("--shift", `${(p * 110).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      el.dataset.live = entry.isIntersecting ? "true" : "false";
      if (entry.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        update();
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    });
    io.observe(el);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("marquee select-none overflow-x-clip", className)}
    >
      {rows.map((items, r) => (
        <div
          key={r}
          className="marquee-row -mx-40"
          style={{ "--dir": r % 2 ? -1 : 1 } as CSSProperties}
        >
          <div
            className={cn(
              "marquee-track display text-[clamp(3rem,9.5vw,9.5rem)] leading-[1.08]",
              r % 2 === 1 && "marquee-outline"
            )}
            data-reverse={r % 2 === 1 || undefined}
            style={{ "--dur": `${46 + r * 8}s` } as CSSProperties}
          >
            {/* The list is laid out twice so the loop has no seam. */}
            {[0, 1].map((copy) =>
              items.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center">
                  {item}
                  <span className="mx-[0.32em] inline-block size-[0.14em] rounded-full bg-signal" />
                </span>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
