"use client";

import { useEffect, useRef } from "react";

/**
 * Counts from zero to `value` the first time it scrolls into view. The final
 * figure is what the server renders, so it is correct without JavaScript and
 * for anyone who prefers reduced motion.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = Number.parseFloat(value);
    if (Number.isNaN(target)) return;
    const decimals = (value.split(".")[1] ?? "").length;
    const duration = 1700;
    let frame = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(2, -10 * t); // ease-out-expo
          el.textContent = (t === 1 ? target : target * eased).toFixed(decimals);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
