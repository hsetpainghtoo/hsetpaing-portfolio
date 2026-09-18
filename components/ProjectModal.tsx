"use client";

import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Lock, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  project as projectMomentum,
  springDefault,
  springSnappy,
} from "@/lib/motion";

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  /** Bounds of the element that opened this, so the panel can grow out of it. */
  originRect?: DOMRect | null;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/** Past this projected endpoint, the flick is a dismissal rather than a nudge. */
const DISMISS_DISTANCE = 140;
const PANEL_MAX_WIDTH = 896; // max-w-4xl

export function ProjectModal({
  project,
  isOpen,
  onClose,
  originRect,
}: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const dragControls = useDragControls();
  const reduced = useReducedMotion();

  /**
   * Spatial consistency: the panel emerges from the card that was tapped and
   * returns along the same path. A dialog that scales from the centre of the
   * screen severs the relationship between the thing you touched and the thing
   * that appeared.
   */
  const originTransform = useMemo(() => {
    if (reduced || !originRect || typeof window === "undefined") {
      return { scale: 1, x: 0, y: 0 };
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const panelWidth = Math.min(vw - 32, PANEL_MAX_WIDTH);
    return {
      scale: Math.max(0.25, Math.min(1, originRect.width / panelWidth)),
      x: originRect.left + originRect.width / 2 - vw / 2,
      y: originRect.top + originRect.height / 2 - vh / 2,
    };
  }, [originRect, reduced]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      window.clearTimeout(timer);
      restoreFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  /**
   * Decide on the projected resting place, not on where the finger happened to
   * let go. A short, fast flick should dismiss; a long, slow drag that stops
   * should not.
   */
  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const projectedEndpoint = info.offset.y + projectMomentum(info.velocity.y);
      if (projectedEndpoint > DISMISS_DISTANCE) onClose();
    },
    [onClose]
  );

  const hasLive = project?.liveUrl !== "#";
  const hasCode = project?.githubUrl !== "#";

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="z-modal fixed inset-0 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] } }}
          transition={springSnappy}
        >
          {/* Dim to focus. The scrim materialises - blur and colour arrive
              together - rather than a flat opacity fade over the page. */}
          <motion.div
            className="absolute inset-0 bg-navy-950/70"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)",
              transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
            }}
            transition={springDefault}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Outer layer owns the anchored enter and exit path. */}
          <motion.div
            className="z-content relative w-full max-w-4xl"
            initial={{ opacity: 0, ...originTransform }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              ...originTransform,
              transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
            }}
            transition={reduced ? { duration: 0.2 } : springDefault}
            style={{ willChange: "transform" }}
          >
            {/* Inner layer owns the drag, so the two transforms never fight. */}
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              drag={reduced ? false : "y"}
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              /* Rubber-banding: resistance grows the further past the edge you
                 pull, instead of a hard stop. */
              dragElastic={{ top: 0.04, bottom: 0.55 }}
              dragTransition={{ bounceStiffness: 500, bounceDamping: 40 }}
              onDragEnd={handleDragEnd}
              className="max-h-[90dvh] overflow-y-auto rounded-2xl border border-border bg-card shadow-tinted-lg"
            >
              {/* Grabber. Dragging is confined to it so text stays selectable. */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="flex touch-none justify-center pt-3 pb-1"
                style={{ cursor: "grab" }}
                aria-hidden="true"
              >
                <span className="h-1.5 w-11 rounded-full bg-muted-foreground/25" />
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="press-feedback absolute right-4 top-4 z-20 rounded-full bg-surface p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-surface md:min-h-full md:rounded-bl-2xl">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} interface screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 512px"
                    className="object-contain p-6"
                  />
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <h2
                    id="project-modal-title"
                    className="mb-3 text-2xl font-semibold sm:text-3xl"
                  >
                    {project.title}
                  </h2>

                  <p className="mb-7 leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="mb-3 text-sm font-medium text-foreground">Built with</h3>
                    <ul className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <li key={tech}>
                          <Badge variant="tag">{tech}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    {hasLive ? (
                      <Button asChild size="xl" className="flex-1">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <ExternalLink aria-hidden="true" />
                          Visit site
                        </a>
                      </Button>
                    ) : (
                      <span className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-muted px-7 text-base font-medium text-muted-foreground/70">
                        <Lock className="h-4 w-4" aria-hidden="true" />
                        Internal tool
                      </span>
                    )}

                    {hasCode ? (
                      <Button
                        asChild
                        variant="outline"
                        size="xl"
                        className="flex-1"
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <Github aria-hidden="true" />
                          Source code
                        </a>
                      </Button>
                    ) : (
                      <span className="flex h-12 flex-1 items-center justify-center px-7 text-base text-muted-foreground/70">
                        Private repository
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
