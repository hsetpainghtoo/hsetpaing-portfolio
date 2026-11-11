"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const SRC = "/profile_me_transparent.png";
const SIZES = "(min-width: 1024px) 27vw, 260px";
const FIGURE =
  "absolute bottom-0 left-1/2 h-[113%] w-auto max-w-none -translate-x-1/2 [clip-path:inset(-20%_0_0_0_round_0_0_1.5rem_1.5rem)]";

/**
 * The hero portrait. It sits in greyscale; the cursor carries a soft
 * spotlight that restores the photograph's own colour underneath it, and the
 * whole figure drifts a few pixels against the pointer for depth.
 *
 * Both layers are the same file at the same size, so the colour pass costs no
 * second download. The mask is a CSS radial-gradient driven by two custom
 * properties, and the frame loop stops itself as soon as it has settled.
 *
 * Touch has no hover, so a tap floods the colour in from the point touched
 * and a second tap drains it. Nothing runs continuously on a phone.
 */
export function Portrait() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const figure = root.querySelector<HTMLElement>("[data-figure]");
    const reveal = root.querySelector<HTMLElement>("[data-reveal]");
    if (!figure || !reveal) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

    let tx = 0, ty = 0, sx = 0, sy = 0; // spotlight target / smoothed
    let px = 0, py = 0, ptx = 0, pty = 0; // parallax smoothed / target
    let seeded = false;
    let frame = 0;

    const loop = () => {
      const k = reduce ? 1 : 0.12;
      sx += (tx - sx) * k;
      sy += (ty - sy) * k;
      px += (ptx - px) * 0.08;
      py += (pty - py) * 0.08;
      root.style.setProperty("--x", `${sx.toFixed(1)}px`);
      root.style.setProperty("--y", `${sy.toFixed(1)}px`);
      figure.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0)`;

      const settled =
        Math.abs(tx - sx) < 0.1 &&
        Math.abs(ty - sy) < 0.1 &&
        Math.abs(ptx - px) < 0.05 &&
        Math.abs(pty - py) < 0.05;
      frame = settled ? 0 : requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const aim = (e: PointerEvent) => {
      const rect = reveal.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      if (!seeded) {
        // Snap to the first position so the light never flies in from a corner.
        sx = tx;
        sy = ty;
        seeded = true;
      }
      kick();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      aim(e);
      root.classList.add("is-lit");
    };
    const onLeave = () => root.classList.remove("is-lit");
    /* `click`, not `pointerdown`: a finger landing to scroll the page must
       not count as a tap. */
    const onTap = (event: MouseEvent) => {
      const e = event as PointerEvent;
      if (e.pointerType === "mouse") return;
      seeded = false;
      aim(e);
      root.classList.toggle("is-full");
    };

    const onWindowMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      ptx = (e.clientX / window.innerWidth - 0.5) * -16;
      pty = (e.clientY / window.innerHeight - 0.5) * -10;
      kick();
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("click", onTap);

    // Parallax only listens while the hero is actually on screen.
    const parallax = fine && !reduce;
    const io = new IntersectionObserver(([entry]) => {
      if (!parallax) return;
      if (entry.isIntersecting) {
        window.addEventListener("pointermove", onWindowMove, { passive: true });
      } else {
        window.removeEventListener("pointermove", onWindowMove);
      }
    });
    io.observe(root);

    return () => {
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("click", onTap);
      window.removeEventListener("pointermove", onWindowMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="spot pt-[12%]">
      <div className="relative aspect-[4/5] rounded-b-[1.75rem] rounded-t-[999px] border border-foreground/10 bg-surface">
        <div data-figure className="absolute inset-0 will-change-transform">
          <Image
            src={SRC}
            alt="Hset Paing Htoo"
            width={508}
            height={830}
            priority
            sizes={SIZES}
            className={`${FIGURE} contrast-[1.06] grayscale`}
          />
          <Image
            data-reveal
            src={SRC}
            alt=""
            aria-hidden="true"
            width={508}
            height={830}
            sizes={SIZES}
            className={`${FIGURE} spot-reveal`}
          />
        </div>
        <p className="eyebrow pointer-events-none absolute bottom-3 left-3 rounded-full bg-background/85 px-3 py-2 text-foreground backdrop-blur-sm">
          Shipping since 2024
        </p>
      </div>
    </div>
  );
}
