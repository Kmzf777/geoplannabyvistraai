'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'motion/react';
import { nav, whats } from '../conteudo';
import { WhatsIcon, EASE } from './ui';

export default function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const heroEnd = window.innerHeight * 0.82;
    setSolid(y > heroEnd);
    setHidden(y > heroEnd && y > prev + 4 && !open);
    if (y < prev - 4) setHidden(false);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    window.__lenis?.[open ? 'stop' : 'start']();
  }, [open]);

  return (
    <>
      <motion.header
        className={`hdr${solid ? ' is-solid' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: hidden ? 0 : 0.15 }}
      >
        <div className="wrap hdr__bar">
          <a className="hdr__logo" href="#top" aria-label="Geoplanna Topografia, voltar ao início">
            <img src="/img/geoplanna-logo.png" alt="Geoplanna Topografia" width="596" height="420" />
          </a>
          <nav className="hdr__nav" aria-label="Principal">
            {nav.map((n) => <a key={n.href} className="hdr__link" href={n.href}>{n.label}</a>)}
          </nav>
          <div className="hdr__right">
            <a className="btn hdr__cta" href={whats()} target="_blank" rel="noopener"><WhatsIcon />Pedir orçamento</a>
            <button className="hdr__menu" type="button" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(true)}><span /></button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu__top">
              <span className="mono" style={{ color: 'var(--on-dark-muted)' }}>Geoplanna · Patrocínio, MG</span>
              <button className="menu__close" type="button" aria-label="Fechar menu" onClick={() => setOpen(false)}>×</button>
            </div>
            <nav className="menu__links" aria-label="Menu">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  className="display"
                  onClick={() => setOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.06 }}
                >
                  <small>{n.n}</small>{n.label}
                </motion.a>
              ))}
            </nav>
            <a className="btn btn--lg" href={whats()} target="_blank" rel="noopener" style={{ justifyContent: 'center' }}><WhatsIcon />Pedir orçamento no WhatsApp</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
