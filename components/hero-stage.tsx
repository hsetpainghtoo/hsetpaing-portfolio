"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Two plates of the same terrain, registered to each other: the bare mesh,
   and the same ground grown over. Both are 1280 x 724 and self-hosted. */
const BASE = "/hero-terrain-mesh.webp";
const REVEAL = "/hero-terrain-grown.webp";

const PLATE_CLASS = "object-cover object-[62%_58%]";

/**
 * The hero as a dark stage. A wireframe landscape sits behind the content,
 * and the cursor drags a soft light across it that shows the same ground
 * finished: structure first, surface second, which is the job.
 *
 * The stage is always dark, in either theme, because the artwork is. The
 * light is a CSS mask driven by two custom properties; the frame loop only
 * runs while the light is still catching up with the pointer.
 *
 * Weight: the second plate is not requested until it can be used. With a
 * mouse that is shortly after load, when the browser is idle. On touch it is
 * the first tap, so a phone that never taps never downloads it.
 */
export function HeroStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const plate = plateRef.current;
    if (!stage || !plate) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

    let tx = 0, ty = 0, sx = 0, sy = 0;
    let seeded = false;
    let frame = 0;

    const loop = () => {
      const k = reduce ? 1 : 0.1;
      sx += (tx - sx) * k;
      sy += (ty - sy) * k;
      stage.style.setProperty("--x", `${sx.toFixed(1)}px`);
      stage.style.setProperty("--y", `${sy.toFixed(1)}px`);
      const settled = Math.abs(tx - sx) < 0.1 && Math.abs(ty - sy) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(loop);
    };

    const aim = (x: number, y: number) => {
      const rect = plate.getBoundingClientRect();
      tx = x - rect.left;
      ty = y - rect.top;
      if (!seeded) {
        sx = tx;
        sy = ty;
        seeded = true;
      }
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      aim(e.clientX, e.clientY);
      stage.classList.add("is-lit");
    };
    const onLeave = () => stage.classList.remove("is-lit");

    /* Touch: a tap on open ground floods the finished plate in from that
       point, and another tap drains it. Taps on links and buttons are left
       alone, and `click` means a scroll gesture never triggers it. */
    const onTap = (event: MouseEvent) => {
      const e = event as PointerEvent;
      if (e.pointerType === "mouse") return;
      if ((e.target as Element).closest("a, button")) return;
      setArmed(true);
      seeded = false;
      aim(e.clientX, e.clientY);
      stage.classList.toggle("is-full");
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("click", onTap);

    let idle = 0;
    if (fine) {
      idle = window.setTimeout(() => setArmed(true), 600);
    }

    return () => {
      window.clearTimeout(idle);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("click", onTap);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={stageRef}
      className="spot spot-wide theme-dark relative overflow-hidden rounded-b-[2rem] bg-background text-foreground md:rounded-b-[3rem]"
    >
      {/* On phones the artwork is held to the lower part of the hero. Stretched
          over the full, much taller column it would be upscaled past what the
          source can carry, and cost more memory to do it. */}
      <div
        ref={plateRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38rem] md:h-full"
      >
        <Image
          src={BASE}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={80}
          className={`${PLATE_CLASS} hero-settle`}
        />
        {armed && (
          <Image
            src={REVEAL}
            alt=""
            fill
            sizes="100vw"
            quality={80}
            className={`${PLATE_CLASS} spot-reveal`}
          />
        )}

        {/* Text protection, not decoration: each scrim melts the plate into
            the stage colour where copy sits on it. */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-background/85 via-background/45 to-transparent md:block" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1600px] flex-col px-5 pb-8 pt-28 sm:px-8 md:pt-32 lg:px-12">
        {children}
      </div>
    </section>
  );
}
