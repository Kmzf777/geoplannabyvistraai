'use client';

import { motion } from 'motion/react';

export const EASE = [0.22, 1, 0.36, 1];

export function WhatsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.73 1.2h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06a6.7 6.7 0 0 1-1.98-1.22 7.48 7.48 0 0 1-1.37-1.71c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function Arrow(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

// Fades and lifts a block once as it enters the screen.
export function Reveal({ children, delay = 0, y = 28, as = 'div', className, ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -4% 0px' }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

// A heading whose lines slide up from behind a mask, one after another.
// The heading itself is watched (its lines start hidden by their masks, so they can never
// "enter" the screen on their own); each line follows with its own delay.
const lineVariants = {
  hidden: { y: '108%' },
  show: (c) => ({ y: '0%', transition: { duration: 1.1, ease: EASE, delay: c } }),
};

export function MaskLines({ lines, className, as = 'h2', delay = 0, inView = true, id }) {
  const Tag = motion[as];
  const trigger = inView
    ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -4% 0px' } }
    : { animate: 'show' };
  return (
    <Tag className={className} id={id} initial="hidden" {...trigger}>
      {lines.map((l, i) => (
        <span className="line-mask" key={i}>
          <motion.span variants={lineVariants} custom={delay + i * 0.09}>{l}</motion.span>
        </span>
      ))}
    </Tag>
  );
}
