import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up Lenis smooth-scrolling for the whole document and keeps GSAP's
 * ScrollTrigger perfectly in sync with it (required for ScrollFloat's
 * scroll-scrubbed heading animation to track the real scroll position).
 * No-ops entirely when the user prefers reduced motion.
 */
export default function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true
    });

    const syncScrollTrigger = () => ScrollTrigger.update();
    lenis.on('scroll', syncScrollTrigger);

    const tick = time => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off('scroll', syncScrollTrigger);
      lenis.destroy();
    };
  }, []);
}
