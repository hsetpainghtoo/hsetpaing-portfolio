"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The hero portrait, standing in a pale arch.
 *
 * A full-length cut-out, cropped by the arch at about the hip. The arch is
 * a flat paper tone in both themes so the black suit always has an edge.
 *
 * The only motion is a few pixels of drift against the pointer, for depth.
 * It listens only while the hero is on screen, only for a mouse, and its
 * frame loop stops as soon as the figure has settled.
 */
export function Portrait() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const figure = root?.querySelector<HTMLElement>("[data-figure]");
    if (!root || !figure) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let x = 0, y = 0, tx = 0, ty = 0;
    let frame = 0;

    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      figure.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      const settled = Math.abs(tx - x) < 0.05 && Math.abs(ty - y) < 0.05;
      frame = settled ? 0 : requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = (e.clientX / window.innerWidth - 0.5) * -16;
      ty = (e.clientY / window.innerHeight - 0.5) * -10;
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("pointermove", onMove, { passive: true });
      } else {
        window.removeEventListener("pointermove", onMove);
      }
    });
    io.observe(root);

    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="pt-[12%]">
      <div className="portrait-arch relative aspect-[4/5] rounded-b-[1.75rem] rounded-t-[999px]">
        {/* The clip stays put while the figure drifts inside it: open above
            the arch so the head can break out, closed at its rounded foot. */}
        <div className="absolute inset-0 [clip-path:inset(-20%_0_0_0_round_0_0_1.75rem_1.75rem)]">
          <div data-figure className="absolute inset-0 will-change-transform">
            <Image
              src="/hero-section-selfie.png"
              alt="Hset Paing Htoo in a black suit, taking a mirror photo"
              width={1024}
              height={1536}
              priority
              sizes="(min-width: 1024px) 45vw, 480px"
              quality={80}
              className="absolute -top-[11%] left-1/2 h-[190%] w-auto max-w-none -translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
