/**
 * Motion system, translated from Apple's "Designing Fluid Interfaces" (WWDC 2018).
 *
 * Apple deliberately replaced the physics triplet (mass/stiffness/damping) with two
 * designer-facing parameters:
 *
 *   damping ratio - 1.0 settles with no overshoot; below 1.0 overshoots and bounces.
 *   response      - how quickly the value reaches its target, in seconds.
 *                   Not a duration: a spring has no fixed end time.
 *
 * Framer Motion's `bounce` + `duration` spring API maps onto those directly,
 * with bounce ≈ 1 − damping.
 *
 * House rule: critically damped (bounce 0) everywhere by default. Overshoot is
 * reserved for motion the user's own gesture put momentum into - a flick, a throw,
 * a drag release. Bounce on a menu that merely faded in reads as decoration.
 */

import type { Transition } from "framer-motion";

/** Move or reposition. Apple: damping 1.0, response 0.4. */
export const springDefault: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
};

/** Small, frequent UI changes that should feel immediate. */
export const springSnappy: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.28,
};

/** Larger surfaces entering or leaving. Still critically damped. */
export const springGentle: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.55,
};

/** Drawers and sheets. Apple: damping 0.8, response 0.3. */
export const springSheet: Transition = {
  type: "spring",
  bounce: 0.2,
  duration: 0.3,
};

/**
 * Navigation is a repeated action, so the page transition stays well under the
 * 300ms ceiling. Exits are faster than enters throughout: slow where the user
 * is deciding, fast where the system is responding.
 */
export const pageEnter: Transition = {
  type: "tween",
  duration: 0.26,
  ease: [0.23, 1, 0.32, 1],
};

export const pageExit: Transition = {
  type: "tween",
  duration: 0.16,
  ease: [0.23, 1, 0.32, 1],
};

/** Momentum-carrying motion - only after a flick or drag release. */
export const springMomentum: Transition = {
  type: "spring",
  bounce: 0.2,
  duration: 0.4,
};

/**
 * Apple's momentum projection, from the Designing Fluid Interfaces sample code.
 * Predicts where a flick would come to rest so you can snap to the target nearest
 * the *projected* endpoint rather than the release point - which is what makes a
 * flick feel like it throws the element.
 *
 * Note this is exponential decay, not the textbook v²/(2a) form.
 *
 * @param initialVelocity px/s at the moment of release
 * @param decelerationRate 0.998 for normal scroll feel, 0.99 for snappier
 */
export function project(initialVelocity: number, decelerationRate = 0.998): number {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Progressive resistance past a boundary. A hard stop reads as "frozen";
 * continuous resistance reads as "responsive, but there is nothing more here".
 */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant = 0.55
): number {
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  );
}

/**
 * Normalise a gesture velocity for spring APIs that expect it relative to the
 * remaining distance. Framer Motion takes absolute px/s, so this is only needed
 * when driving a value manually.
 */
export function relativeVelocity(
  gestureVelocity: number,
  current: number,
  target: number
): number {
  const distance = target - current;
  return distance === 0 ? 0 : gestureVelocity / distance;
}

/**
 * Staggered entry. Elements cascade rather than mounting all at once.
 * Reduced motion collapses the cascade to a plain cross-fade.
 */
export function entryContainer(reduced: boolean | null, stagger = 0.06) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: reduced
        ? { duration: 0.2 }
        : { staggerChildren: stagger, delayChildren: 0.02 },
    },
  };
}

/**
 * Entry for a single item. Under reduced motion this becomes an opacity
 * cross-fade with no travel - gentler, not absent. Reduced motion asks for a
 * non-vestibular equivalent, not for the feedback to disappear.
 */
export function entryItem(reduced: boolean | null, distance = 18) {
  return {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduced ? { duration: 0.2 } : springGentle,
    },
  };
}
