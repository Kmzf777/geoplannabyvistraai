'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { whats } from '../conteudo';
import { EASE, MaskLines, WhatsIcon, Arrow } from './ui';

// The boundary of the farm seen behind Daniel, in the photo's own pixels (1080 x 608),
// named the way SIGEF names a credentialed surveyor's marks.
const VTX = [
  [290, 118], [430, 92], [545, 112], [566, 160], [505, 205], [468, 268], [292, 254],
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const d = `M${VTX.map((p) => p.join(' ')).join(' L')} Z`;

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-h">
      <div className="hero__frame">
        <motion.div className="hero__media" style={{ y, scale }}>
          <motion.div
            style={{ position: 'absolute', inset: 0 }}
            initial={{ scale: 1.14, filter: 'brightness(.5)' }}
            animate={{ scale: 1, filter: 'brightness(1)' }}
            transition={{ duration: 2.2, ease: EASE }}
          >
            <img className="hero__img--wide" src="/img/hero-wide.jpg" alt="O engenheiro agrimensor Daniel Rodrigues com o receptor GNSS num morro de fazenda, com a sede ao fundo" fetchPriority="high" />
            <img className="hero__img--phone" src="/img/daniel-morro.jpg" alt="" aria-hidden="true" />
            <svg className="hero__plot" viewBox="0 0 1080 608" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <motion.path
                className="poly"
                d={d}
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 1 }}
                transition={{ pathLength: { duration: 2.4, ease: [0.65, 0, 0.35, 1], delay: 1.1 }, fillOpacity: { duration: 1, delay: 3.2 } }}
              />
              {VTX.map(([x, yy], i) => (
                <motion.g key={i} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE, delay: 1.1 + (i / VTX.length) * 2.4 }} style={{ transformOrigin: `${x}px ${yy}px` }}>
                  <rect className="vtx" x={x - 4} y={yy - 4} width="8" height="8" />
                  {i % 2 === 0 && <text className="lbl" x={x + 9} y={yy - 7}>{`EE3-M-${String(i + 1).padStart(4, '0')}`}</text>}
                </motion.g>
              ))}
            </svg>
          </motion.div>
        </motion.div>
        <div className="hero__shade" />
        <span className="hero__corner hero__corner--tl" /><span className="hero__corner hero__corner--tr" />
        <span className="hero__corner hero__corner--bl" /><span className="hero__corner hero__corner--br" />

        <motion.div className="hero__meta mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}>
          <span>Topografia e agrimensura · desde 2013</span>
          <span>Patrocínio · MG</span>
          <span><b>18°56′38″ S</b> · <b>46°59′33″ W</b></span>
          <span>SIRGAS 2000</span>
        </motion.div>

        <motion.div className="hero__content">
          <MaskLines as="h1" className="display hero__title" inView={false} delay={0.35} lines={['A terra medida', 'do jeito que', <>o cartório <em>aceita.</em></>]} />
          <div className="hero__row">
            <motion.p className="hero__sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.9 }}>
              Georreferenciamento com certificação no SIGEF, topografia e regularização de imóveis rurais e urbanos em Patrocínio e no Alto Paranaíba.
            </motion.p>
            <motion.div className="hero__actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 1.05 }}>
              <a className="btn" href={whats()} target="_blank" rel="noopener"><WhatsIcon />Pedir orçamento</a>
              <a className="btn btn--ghost btn--on-dark" href="#servicos">Ver serviços<Arrow className="btn__arrow" /></a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
