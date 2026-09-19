import { useRef, useCallback, useState, useEffect, useMemo, type ReactNode } from 'react';

interface BorderGlowProps {
  children?: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
}

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor: string, intensity: number): string {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers: [number, number, number, number, number, boolean][] = [
    [0, 0, 0, 1, 100, true], [0, 0, 1, 0, 60, true], [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true], [0, 0, 15, 0, 30, true], [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false], [0, 0, 3, 0, 50, false], [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false], [0, 0, 25, 2, 20, false], [0, 0, 50, 2, 10, false],
  ];
  return layers.map(([x, y, blur, spread, alpha, inset]) => {
    const a = Math.min(alpha * intensity, 100);
    return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
  }).join(', ');
}

/* Three layers are steered by the cursor angle. Each mask is defined once
   here and used by both the initial render and the rAF paint, because when
   they were written out twice they drifted: paint updated the border and left
   the fill and glow frozen at their mount angle, so only the hairline tracked
   the pointer. */
function borderMask(angle: string, coneSpread: number) {
  return `conic-gradient(from ${angle} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`;
}

function fillMask(angle: string) {
  return [
    'linear-gradient(to bottom, black, black)',
    'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
    'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
    'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
    'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
    'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
    `conic-gradient(from ${angle} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
  ].join(', ');
}

function glowMask(angle: string) {
  return `conic-gradient(from ${angle} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`;
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function easeOutCubic(x: number) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x: number) { return x * x * x; }

interface AnimateOpts {
  start?: number; end?: number; duration?: number; delay?: number;
  ease?: (t: number) => number; onUpdate: (v: number) => void; onEnd?: () => void;
}

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }: AnimateOpts) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors: string[]): string[] {
  const gradients: string[] = [];
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`);
  }
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
  return gradients;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [sweepActive, setSweepActive] = useState(false);

  /* Cursor angle and edge proximity change on every pointermove. Holding them
     in React state re-rendered this whole subtree (card image, badges,
     buttons) every frame and rebuilt eight gradient strings, a conic mask and
     a thirteen-layer box-shadow each time. They live in refs now and are
     written straight to the DOM on a single rAF tick. */
  const cursorAngleRef = useRef(45);
  const edgeProximityRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const borderLayerRef = useRef<HTMLDivElement>(null);
  const fillLayerRef = useRef<HTMLDivElement>(null);
  const glowLayerRef = useRef<HTMLSpanElement>(null);

  const getCenterOfElement = useCallback((el: HTMLElement) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenterOfElement]);

  const getCursorAngle = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }, [getCenterOfElement]);

  const paint = useCallback(() => {
    frameRef.current = null;
    const proximity = edgeProximityRef.current;
    const visible = isHoveredRef.current || sweepActiveRef.current;
    const colorSensitivity = edgeSensitivity + 20;
    const borderOpacity = visible
      ? Math.max(0, (proximity * 100 - colorSensitivity) / (100 - colorSensitivity))
      : 0;
    const glowOpacity = visible
      ? Math.max(0, (proximity * 100 - edgeSensitivity) / (100 - edgeSensitivity))
      : 0;
    const angle = `${cursorAngleRef.current.toFixed(2)}deg`;

    const setMask = (el: HTMLElement | null, mask: string, opacity: number) => {
      if (!el) return;
      el.style.opacity = String(opacity);
      el.style.maskImage = mask;
      el.style.setProperty('-webkit-mask-image', mask);
    };

    setMask(borderLayerRef.current, borderMask(angle, coneSpread), borderOpacity);
    setMask(fillLayerRef.current, fillMask(angle), borderOpacity * fillOpacity);
    setMask(glowLayerRef.current, glowMask(angle), glowOpacity);
  }, [edgeSensitivity, coneSpread, fillOpacity]);

  const schedulePaint = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(paint);
  }, [paint]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    /* Decorative cursor tracking only. Coarse pointers fire pointermove while
       scrolling, and reduced-motion users should not get it at all. */
    if (e.pointerType !== 'mouse' || prefersReducedMotion()) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    edgeProximityRef.current = getEdgeProximity(card, x, y);
    cursorAngleRef.current = getCursorAngle(card, x, y);
    schedulePaint();
  }, [getEdgeProximity, getCursorAngle, schedulePaint]);

  const isHoveredRef = useRef(false);
  const sweepActiveRef = useRef(false);

  /* Mirrored in an effect rather than during render: writing a ref while
     rendering is unsafe under concurrent rendering, and this runs before the
     repaint below so paint() always reads the current values. */
  useEffect(() => {
    isHoveredRef.current = isHovered;
    sweepActiveRef.current = sweepActive;
    schedulePaint();
  }, [isHovered, sweepActive, schedulePaint]);

  useEffect(() => () => {
    /* Clearing the id matters as much as cancelling the frame. Strict Mode
       double-invokes effects on mount, reusing the same refs: schedule,
       clean up, schedule again. If the cancel left a stale id behind, the
       re-entrancy guard in schedulePaint saw a frame still pending and bailed
       forever, because only paint() resets it and paint never ran. That is a
       race with the first real frame, which is why a hard refresh appeared to
       fix it and a client-side navigation did not. */
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!animated) return;
    const angleStart = 110;
    const angleEnd = 465;
    if (prefersReducedMotion()) return;
    setSweepActive(true);
    cursorAngleRef.current = angleStart;

    const setAngle = (v: number) => {
      cursorAngleRef.current = (angleEnd - angleStart) * (v / 100) + angleStart;
      schedulePaint();
    };
    const setProximity = (v: number) => {
      edgeProximityRef.current = v / 100;
      schedulePaint();
    };

    animateValue({ duration: 500, onUpdate: setProximity });
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: setAngle });
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: setAngle });
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: setProximity,
      onEnd: () => setSweepActive(false),
    });
  }, [animated, schedulePaint]);

  const isVisible = isHovered || sweepActive;
  /* Initial paint only. Once mounted, paint() writes these straight to the DOM. */
  const borderOpacity = 0;
  const glowOpacity = 0;

  const meshGradients = useMemo(() => buildMeshGradients(colors), [colors]);
  const borderBg = meshGradients.map(g => `${g} border-box`);
  const fillBg = meshGradients.map(g => `${g} padding-box`);
  /* Initial paint only, and invisible at opacity 0. paint() owns the
     real angle from the first frame onward. */
  const angleDeg = '45deg';

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={`relative grid isolate border border-white/15 ${className}`}
      style={{
        background: backgroundColor,
        borderRadius: `${borderRadius}px`,
        transform: 'translate3d(0, 0, 0.01px)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {/* mesh gradient border */}
      <div
        ref={borderLayerRef}
        className="absolute inset-0 rounded-[inherit] -z-[1]"
        style={{
          border: '1px solid transparent',
          background: [
            `linear-gradient(${backgroundColor} 0 100%) padding-box`,
            'linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box',
            ...borderBg,
          ].join(', '),
          opacity: borderOpacity,
          maskImage: borderMask(angleDeg, coneSpread),
          WebkitMaskImage: borderMask(angleDeg, coneSpread),
          transition: isVisible
            ? 'opacity 250ms cubic-bezier(0.23, 1, 0.32, 1)'
            : 'opacity 180ms cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      />

      {/* mesh gradient fill near edges */}
      <div
        ref={fillLayerRef}
        className="absolute inset-0 rounded-[inherit] -z-[1]"
        style={{
          border: '1px solid transparent',
          background: fillBg.join(', '),
          maskImage: fillMask(angleDeg),
          WebkitMaskImage: fillMask(angleDeg),
          maskComposite: 'subtract, add, add, add, add, add',
          WebkitMaskComposite: 'source-out, source-over, source-over, source-over, source-over, source-over',
          opacity: borderOpacity * fillOpacity,
          mixBlendMode: 'soft-light',
          transition: isVisible
            ? 'opacity 250ms cubic-bezier(0.23, 1, 0.32, 1)'
            : 'opacity 180ms cubic-bezier(0.23, 1, 0.32, 1)',
        } as React.CSSProperties}
      />

      {/* outer glow */}
      <span
        ref={glowLayerRef}
        className="absolute pointer-events-none z-[1] rounded-[inherit]"
        style={{
          inset: `${-glowRadius}px`,
          maskImage: glowMask(angleDeg),
          WebkitMaskImage: glowMask(angleDeg),
          opacity: glowOpacity,
          mixBlendMode: 'plus-lighter',
          transition: isVisible
            ? 'opacity 250ms cubic-bezier(0.23, 1, 0.32, 1)'
            : 'opacity 180ms cubic-bezier(0.23, 1, 0.32, 1)',
        } as React.CSSProperties}
      >
        <span
          className="absolute rounded-[inherit]"
          style={{
            inset: `${glowRadius}px`,
            boxShadow: buildBoxShadow(glowColor, glowIntensity),
          }}
        />
      </span>

      <div className="flex flex-col relative overflow-hidden rounded-[inherit] z-[1] h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
