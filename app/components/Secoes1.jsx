'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion, AnimatePresence, useScroll, useTransform, useSpring,
  useInView, animate,
} from 'motion/react';
import { cidades, servicos, etapas, whats } from '../conteudo';
import { EASE, MaskLines, Reveal, Arrow } from './ui';

/* ---------- cities marquee ---------- */
export function Marquee() {
  const group = (k) => (
    <div className="marquee__group" key={k} aria-hidden={k === 'b'}>
      {cidades.map((c, i) => (
        <span key={c} style={{ display: 'contents' }}>
          <span className={`display marquee__item${i % 2 ? ' marquee__item--outline' : ''}`}>{c}</span>
          <span className="marquee__sep" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee" role="region" aria-label="Região atendida">
      <div className="marquee__track">{group('a')}{group('b')}</div>
    </div>
  );
}

/* ---------- manifesto: words light up as you read ---------- */
const MANIFESTO =
  'Antes de vender, dividir, herdar ou financiar a terra, alguém precisa medir. Em Patrocínio, desde 2013, quem mede e assina é a Geoplanna: o engenheiro agrimensor Daniel Rodrigues, em campo, do primeiro marco até a matrícula atualizada.';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span className="w" style={{ opacity }}>{children}</motion.span>;
}

function Count({ to, decimals = 0, prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{prefix}{v.toFixed(decimals).replace('.', ',')}</span>;
}

export function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = MANIFESTO.split(' ');
  const { scrollYProgress: photoP } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const photoY = useTransform(photoP, [0, 1], ['-5%', '5%']);
  return (
    <section className="section" id="sobre" aria-label="Sobre a Geoplanna">
      <div className="wrap">
        <Reveal><span className="mono eyebrow">01 — Sobre</span></Reveal>
        <div className="manifesto__grid" style={{ marginTop: 32 }}>
          <p ref={ref} className="manifesto__text">
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
            ))}
          </p>
          <Reveal as="figure" className="manifesto__photo" y={40} style={{ margin: 0 }}>
            <motion.img src="/img/daniel-retrato.jpg" alt="Daniel Rodrigues sorrindo em campo, ao lado do receptor GNSS no tripé" loading="lazy" style={{ y: photoY }} />
            <figcaption className="mono">Daniel Rodrigues · em campo</figcaption>
          </Reveal>
        </div>
        <div className="stats">
          {[
            { n: '2013', l: 'Ano em que a Geoplanna começou a medir no Alto Paranaíba' },
            { n: <Count to={5} decimals={1} />, l: 'Nota no Google, em 60 avaliações de clientes' },
            { n: 'EE3', l: 'Código de credenciado no INCRA para certificar no SIGEF' },
            { n: 'TJMG', l: 'Perito cadastrado para medições, laudos e avaliações' },
          ].map((s, i) => (
            <Reveal className="stat" key={i} delay={i * 0.08}>
              <span className="display stat__n">{s.n}</span>
              <span className="stat__l">{s.l}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- services: a big list; each row darkens under the pointer ---------- */
export function Servicos() {
  return (
    <section className="section" id="servicos" aria-labelledby="servicos-h">
      <div className="wrap">
        <div className="section__head section__head--split">
          <div>
            <Reveal><span className="mono eyebrow">02 — Serviços</span></Reveal>
            <MaskLines id="servicos-h" className="display h2" lines={['O que a', 'Geoplanna mede']} />
          </div>
          <Reveal delay={0.15}><p className="lead">Cada serviço termina num documento que o cartório, o banco ou o juiz aceitam. Toque num deles para pedir o orçamento direto no WhatsApp.</p></Reveal>
        </div>
        <ul className="svc" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {servicos.map((s, i) => (
            <Reveal as="li" key={s.key} delay={i * 0.05} y={20}>
              <a
                className="svc__row"
                href={whats(`Olá, quero um orçamento de ${s.nome.toLowerCase()}.`)}
                target="_blank"
                rel="noopener"
              >
                <span className="mono svc__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="display svc__name">{s.nome}<span className="svc__sub">{s.desc}</span></span>
                <span className="svc__desc">{s.desc}</span>
                <span className="mono svc__code">{`EE3-M-${String(i + 1).padStart(4, '0')}`}</span>
                <span className="svc__go"><Arrow /></span>
                <img className="svc__thumb" src={`/img/${s.foto}`} alt="" loading="lazy" />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- process: sticky photo, a red rail joins the vertices as you scroll ---------- */
function Step({ e, i, setActive }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  useEffect(() => { if (inView) setActive(i); }, [inView, i, setActive]);
  return (
    <div ref={ref} className={`proc__step${inView ? ' is-on' : ''}`}>
      <span className="proc__vtx" />
      <span className="mono proc__code">{`Etapa ${String(i + 1).padStart(2, '0')} · EE3-P-${String(i + 1).padStart(4, '0')}`}</span>
      <h3 className="display proc__title">{e.titulo}</h3>
      <p className="proc__text">{e.texto}</p>
      <img className="proc__mimg" src={`/img/${e.foto}`} alt="" loading="lazy" />
    </div>
  );
}

export function Processo() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.5', 'end 0.5'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <section className="section proc" id="processo" aria-labelledby="processo-h">
      <div className="wrap">
        <div className="section__head section__head--split">
          <div>
            <Reveal><span className="mono eyebrow">03 — Processo</span></Reveal>
            <MaskLines id="processo-h" className="display h2" lines={['Do campo', 'ao cartório']} />
          </div>
          <Reveal delay={0.15}><p className="lead">O georreferenciamento em quatro etapas. A Geoplanna cuida de todas, do primeiro marco na divisa até a matrícula atualizada.</p></Reveal>
        </div>
        <div className="proc__grid">
          <div className="proc__sticky" aria-hidden="true">
            <AnimatePresence initial={false}>
              <motion.img
                key={active}
                src={`/img/${etapas[active].foto}`}
                alt=""
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              />
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                className="display proc__big"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {String(active + 1).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="proc__steps" ref={ref}>
            <div className="proc__rail"><motion.div className="proc__rail-fill" style={{ scaleY: fill }} /></div>
            {etapas.map((e, i) => <Step key={e.titulo} e={e} i={i} setActive={setActive} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
