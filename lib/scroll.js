import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * Single scroll engine for the whole app.
 *
 * One Lenis instance drives the native scrollbar; GSAP's ticker drives Lenis;
 * ScrollTrigger listens to Lenis. Nothing else is allowed to animate scroll —
 * no `scroll-behavior: smooth`, no `window.scrollBy`, no raw anchor jumps.
 */
let lenis = null;
let tickerFn = null;

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis;

  lenis = new Lenis({
    duration: 1.15,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.4
  });

  lenis.on('scroll', ScrollTrigger.update);

  tickerFn = time => lenis.raf(time * 1000);
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroySmoothScroll() {
  if (tickerFn) gsap.ticker.remove(tickerFn);
  lenis?.destroy();
  lenis = null;
  tickerFn = null;
}

export const getLenis = () => lenis;

/** Freeze/unfreeze scrolling (used while the preloader plays). */
export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.classList.toggle('scroll-locked', locked);
}

/**
 * Glide to a section. Falls back to native instant jump under reduced motion.
 * @param {string|HTMLElement|number} target e.g. '#work'
 */
export function scrollToTarget(target, { offset = 0 } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.3 });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (el instanceof HTMLElement) {
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + offset);
  } else if (typeof target === 'number') {
    window.scrollTo(0, target);
  }
}
