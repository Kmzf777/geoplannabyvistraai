'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// Smooth, inertial scrolling on desktop; native on touch and under reduced motion.
// Anchor links glide to their section with the header's height left free.
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    window.__lenis = lenis;
    let id = requestAnimationFrame(function raf(time) { lenis.raf(time); id = requestAnimationFrame(raf); });

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      const el = href === '#top' ? 0 : document.querySelector(href);
      if (el === null) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: href === '#top' ? 0 : -24, duration: 1.4 });
    };
    document.addEventListener('click', onClick);
    return () => { cancelAnimationFrame(id); document.removeEventListener('click', onClick); lenis.destroy(); delete window.__lenis; };
  }, []);
  return null;
}
