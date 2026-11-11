"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Line } from "@/components/page-intro";

/* All three plates share one frame (16:9, the bowl in the same place), so
   they are stacked in a box that keeps that ratio and covers the stage. */
const RATIO = 1280 / 714;
const SIZES = "(max-width: 768px) 1100px, 100vw";

/**
 * The About hero: a terrarium on moss, with a giant word passing behind the
 * glass. Depth comes from the stacking order, not from an effect:
 *
 *   photograph  ->  word  ->  cut-out of the bowl alone  ->  light
 *
 * The cut-out is the same bowl again, laid over the word, which is what puts
 * the word behind the glass. Because the word has to stay locked to the bowl
 * at every screen shape, everything lives in one "plate" that scales as a
 * single piece, and the word is sized and placed in units of that plate.
 *
 * The light is the cursor: under it, the still gives way to footage of the
 * same scene, so the terrarium is only alive where you are looking. It is
 * confined to below the word so it never paints over the lettering.
 *
 * Weight: the footage is not requested until it can be used. With a mouse
 * that is shortly after load; on touch it is the first tap, which floods the
 * footage in from the point touched.
 */
export function AboutHero() {
  const stageRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
    /* `click`, so a finger landing to scroll is not mistaken for a tap. */
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

    const idle = fine ? window.setTimeout(() => setArmed(true), 600) : 0;

    return () => {
      window.clearTimeout(idle);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("click", onTap);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* The footage only decodes while the hero is on screen. */
  useEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!armed || !stage || !video) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(stage);
    return () => io.disconnect();
  }, [armed]);

  return (
    <section
      ref={stageRef}
      className="spot spot-wide theme-dark relative h-svh max-h-[68rem] min-h-[38rem] overflow-hidden rounded-b-[2rem] bg-background text-foreground [container-type:size] md:rounded-b-[3rem]"
    >
      <div
        ref={plateRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 [container-type:inline-size] [mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_76%,transparent)] md:top-1/2"
        /* Covers the stage on wide screens. On a tall, narrow one, covering
           by height would blow the bowl up past the screen's width (and past
           what the photograph can carry), so the plate stops growing at 1.9x
           the stage width and its edges are feathered into the dark. */
        style={{
          width: `max(100cqw, min(calc(100cqh * ${RATIO}), 190cqw))`,
          height: `max(calc(100cqw / ${RATIO}), min(100cqh, calc(190cqw / ${RATIO})))`,
        }}
      >
        <Image
          src="/about-terrarium.webp"
          alt=""
          fill
          priority
          sizes={SIZES}
          quality={75}
          className="hero-settle object-cover"
        />

        {/* Sized in plate units so it stays wider than the bowl, and capped
            so it still fits a phone's width and a short laptop's height. */}
        <p
          className="rise-in absolute inset-x-0 bottom-[62.5%] text-center font-serif text-[min(19cqw,38vw,31svh)] uppercase leading-[0.78] tracking-[-0.02em]"
          style={{ "--d": "200ms" } as CSSProperties}
        >
          About
        </p>

        <Image
          src="/about-terrarium-bowl.webp"
          alt=""
          fill
          priority
          sizes={SIZES}
          quality={75}
          className="hero-settle object-cover"
        />

        {armed && (
          <video
            ref={videoRef}
            src="/about-terrarium.mp4"
            muted
            loop
            playsInline
            preload="auto"
            className="spot-reveal absolute inset-0 size-full object-cover [clip-path:inset(38%_0_0_0)]"
          />
        )}
      </div>

      {/* Text protection along the floor, where the copy sits on the moss. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-background via-background/75 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto grid max-w-[1600px] gap-5 px-5 pb-9 sm:px-8 md:grid-cols-12 md:items-end md:gap-10 md:pb-12 lg:px-12">
        <div className="md:col-span-7">
          <p className="eyebrow rise-in mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-foreground/30" aria-hidden="true" />
            About
          </p>
          <h1 className="display text-[clamp(2rem,4.6vw,4.25rem)]">
            <Line delay={420}>The person</Line>
            <Line delay={510}>
              behind{" "}
              <span className="serif-accent text-muted-foreground">the code</span>
            </Line>
          </h1>
        </div>
        <p
          className="rise-in max-w-sm text-muted-foreground md:col-span-4 md:col-start-9 md:pb-2 md:text-lg"
          style={{ "--d": "700ms" } as CSSProperties}
        >
          Two and a half years in, still counting the things I want to get
          better at.
        </p>
      </div>
    </section>
  );
}
