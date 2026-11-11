"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BackgroundVideoProps {
  /** Self-hosted, muted clip. This is the light rendition phones get. */
  video: string;
  /** Full-resolution rendition, used from laptop width up. */
  videoHd?: string;
  /** First frame of the clip. This is what paints, and all some visitors get. */
  poster: string;
  /** Positioning for the layer itself. Defaults to filling its parent. */
  className?: string;
  /** Applied to both the still and the video, e.g. an object-position. */
  mediaClassName?: string;
  /** Set for footage above the fold, so the still is not lazy-loaded. */
  priority?: boolean;
  /**
   * For clips whose last frame does not match their first: fade back to the
   * still underneath at the end of each pass, so the loop has no seam.
   */
  seamFade?: boolean;
}

/**
 * Footage as a background, built so it can never be the reason a page is
 * heavy.
 *
 * The still frame is the real background: it is in the HTML and paints
 * first. The video is not requested until its layer is actually on screen,
 * fades in over the still once it is playing, and is paused again whenever
 * it scrolls away. Visitors on Data Saver, or with reduced motion switched
 * on, keep the still and never download the video at all.
 */
export function BackgroundVideo({
  video,
  videoHd,
  poster,
  className,
  mediaClassName,
  priority = false,
  seamFade = false,
}: BackgroundVideoProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const el = videoRef.current;
    if (!layer || !el) return;

    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true;
    if (saveData || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const FADE = 0.7; // seconds
    let visible = false;
    let requested = false;

    const onTime = () => {
      const nearEnd = seamFade && el.duration - el.currentTime < FADE;
      el.style.opacity = nearEnd ? "0" : "1";
    };
    const onCanPlay = () => {
      if (visible) el.play().catch(() => {});
    };

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("canplay", onCanPlay);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          if (!requested) {
            requested = true;
            /* Decided once, when the footage is first needed: a phone gets
               the small file, a laptop or monitor the sharp one. */
            const wide = matchMedia("(min-width: 1024px)").matches;
            el.src = wide && videoHd ? videoHd : video;
          }
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(layer);

    return () => {
      io.disconnect();
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("canplay", onCanPlay);
      el.pause();
    };
  }, [video, videoHd, seamFade]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <Image
        src={poster}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        quality={80}
        className={cn("object-cover", mediaClassName)}
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className={cn(
          "absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-700 ease-linear",
          mediaClassName
        )}
      />
    </div>
  );
}
