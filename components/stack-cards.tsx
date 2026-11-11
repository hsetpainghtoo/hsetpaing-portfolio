"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sticky stacking cards. CSS `position: sticky` does the stacking; this only
 * adds the small scale-down on a card as the next one slides over it.
 *
 * Children must be `[data-stack-card]` elements whose first child is the
 * surface to scale. The sticky wrapper itself is never transformed, so its
 * measurements stay honest.
 */
export function StackCards({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-stack-card]")
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const tops = cards.map((card) => card.getBoundingClientRect().top);
      cards.forEach((card, i) => {
        const surface = card.firstElementChild as HTMLElement | null;
        if (!surface || i === cards.length - 1) return;
        const gap = tops[i + 1] - tops[i];
        const covered = Math.min(1, Math.max(0, 1 - gap / card.offsetHeight));
        surface.style.transform = `scale(${(1 - covered * 0.05).toFixed(4)})`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        update();
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    });
    io.observe(root);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={ref} className={className}>
      {children}
    </ol>
  );
}
