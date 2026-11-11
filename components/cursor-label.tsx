"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * A label that rides the cursor over anything marked `data-cursor="…"`.
 * Mounted once in the layout. On touch devices it never attaches a listener,
 * and its frame loop only runs while it is visible or still settling.
 */
export function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const text = textRef.current;
    if (!el || !text) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const k = matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0.2;
    let tx = 0, ty = 0, x = 0, y = 0;
    let active = false;
    let frame = 0;

    const loop = () => {
      x += (tx - x) * k;
      y += (ty - y) * k;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      const settled = Math.abs(tx - x) < 0.2 && Math.abs(ty - y) < 0.2;
      frame = active || !settled ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      const target =
        e.target instanceof Element
          ? e.target.closest<HTMLElement>("[data-cursor]")
          : null;
      tx = e.clientX;
      ty = e.clientY;

      if (target && !active) {
        // Appear where the pointer is rather than gliding in from elsewhere.
        x = tx;
        y = ty;
        text.textContent = target.dataset.cursor ?? "";
      }
      active = !!target;
      el.dataset.active = String(active);
      if (active && !frame) frame = requestAnimationFrame(loop);
    };
    const hide = () => {
      active = false;
      el.dataset.active = "false";
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("scroll", hide, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("scroll", hide);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-active="false"
      className="cursor-label pointer-events-none fixed left-0 top-0 z-[70]"
    >
      <div className="cursor-label-disc flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-full bg-foreground text-sm font-medium text-background">
        <span ref={textRef} />
        <ArrowUpRight className="size-4" />
      </div>
    </div>
  );
}
