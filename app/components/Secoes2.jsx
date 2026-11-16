'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue,
} from 'motion/react';
import { credenciais, trabalhos, duvidas, whats } from '../conteudo';
import { EASE, MaskLines, Reveal, WhatsIcon, Arrow } from './ui';

/* ---------- the responsible engineer ---------- */
export function Responsavel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  return (
    <section className="section" id="responsavel" aria-labelledby="responsavel-h">
      <div className="wrap resp__grid">
        <Reveal className="resp__photo" y={40}>
          <div ref={ref} style={{ position: 'absolute', inset: 0 }}>
            <motion.img src="/img/daniel-cerca.jpg" alt="Daniel Rodrigues em campo, com um colega medindo junto à cerca" loading="lazy" style={{ y }} />
          </div>
          <div className="resp__badge">
            <strong className="display">5,0</strong>
            <span><span className="resp__stars" aria-hidden="true">★★★★★</span><br /><span className="mono" style={{ color: 'var(--muted)' }}>60 avaliações · Google</span></span>
          </div>
        </Reveal>
        <div>
          <Reveal><span className="mono eyebrow">04 — Responsável técnico</span></Reveal>
          <MaskLines id="responsavel-h" className="display resp__name" lines={['Daniel', 'Rodrigues']} />
          <Reveal delay={0.1}>
            <p className="lead">Quem mede é o mesmo que assina. Engenheiro agrimensor formado na UFV e técnico em agropecuária, Daniel vai a campo em cada trabalho da Geoplanna desde 2013.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="sheet">
              <div className="sheet__head mono"><span>Credenciais</span><span>Registro</span></div>
              {credenciais.map((c) => (
                <div className="sheet__row" key={c.nome}><dt>{c.nome}<small>{c.linha}</small></dt><dd>{c.valor}</dd></div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- field work: a horizontal run driven by the vertical scroll (desktop) ---------- */
export function Trabalhos() {
  const outer = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  const sx = useSpring(x, { stiffness: 90, damping: 24, mass: 0.4 });

  useEffect(() => {
    const measure = () => {
      if (!track.current || window.innerWidth < 1024) return setDist(0);
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section className="works" id="trabalhos" aria-labelledby="trabalhos-h">
      <div className="works__outer" ref={outer}>
        <div className="works__pin">
          <div className="wrap works__head">
            <div>
              <Reveal><span className="mono eyebrow">05 — Em campo</span></Reveal>
              <MaskLines id="trabalhos-h" className="display h2" lines={['Trabalhos no', 'Alto Paranaíba']} />
            </div>
            <Reveal delay={0.1}><p className="lead" style={{ maxWidth: '34ch' }}>Cafezais, pastagens, ferrovia e loteamentos. Patrocínio, Cruzeiro da Fortaleza, Patos de Minas e cidades vizinhas.</p></Reveal>
          </div>
          <motion.div className="works__track" ref={track} style={!dist ? undefined : { x: sx }}>
            {trabalhos.map((t, i) => (
              <figure className="work" key={t.foto} style={{ margin: 0 }}>
                <img src={`/img/${t.foto}`} alt={`Levantamento em campo: ${t.tag.toLowerCase()}`} loading="lazy" />
                <span className="mono work__tag">{t.tag}</span>
                <span className="display work__n">{String(i + 1).padStart(2, '0')}</span>
              </figure>
            ))}
          </motion.div>
          <div className="wrap works__progress"><motion.span style={{ scaleX: scrollYProgress }} /></div>
        </div>
      </div>
    </section>
  );
}

/* ---------- questions ---------- */
export function Duvidas() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="duvidas" aria-labelledby="duvidas-h">
      <div className="wrap faq__grid">
        <div className="faq__aside">
          <Reveal><span className="mono eyebrow">06 — Dúvidas</span></Reveal>
          <MaskLines id="duvidas-h" className="display h2" lines={['Antes de', 'medir']} />
          <Reveal delay={0.15}>
            <p className="lead" style={{ marginTop: 24 }}>Não achou sua pergunta? O Daniel responde pelo WhatsApp.</p>
            <a className="btn btn--ghost" href={whats('Olá, tenho uma dúvida sobre topografia.')} target="_blank" rel="noopener" style={{ marginTop: 28 }}>Perguntar no WhatsApp<Arrow className="btn__arrow" /></a>
          </Reveal>
        </div>
        <div className="faq__list">
          {duvidas.map((d, i) => {
            const isOpen = open === i;
            return (
              <Reveal className={`faq__item${isOpen ? ' is-open' : ''}`} key={d.p} delay={i * 0.05} y={16}>
                <button className="faq__q" type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{d.p}</span><span className="faq__icon" aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ height: { duration: 0.55, ease: EASE }, opacity: { duration: 0.35 } }}
                    >
                      <p>{d.r}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact: a magnetic button, the boundary line drawn under the call ---------- */
function Magnetic({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  return (
    <motion.div ref={ref} className="magnet" style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

export function Contato() {
  return (
    <>
      <section className="section cta" id="contato" aria-labelledby="contato-h">
        <svg className="cta__ring" viewBox="0 0 400 400" aria-hidden="true">
          {[60, 100, 140, 180].map((r) => <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="rgba(239,235,225,.14)" strokeWidth="1" />)}
          <path d="M200 0V400M0 200H400" stroke="rgba(239,235,225,.14)" strokeWidth="1" />
        </svg>
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal><span className="mono eyebrow" style={{ color: 'var(--on-dark-muted)' }}>07 — Orçamento</span></Reveal>
          <MaskLines id="contato-h" className="display cta__title" lines={['Vamos medir', 'a sua terra?']} />
          <svg className="cta__line" viewBox="0 0 980 40" preserveAspectRatio="none" aria-hidden="true">
            <motion.path d="M0 34 H950 V6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: '-20%' }} transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.3 }} />
            <motion.rect x="945" y="0" width="10" height="10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-20%' }} transition={{ delay: 2 }} />
          </svg>
          <div className="cta__row">
            <Reveal><p className="cta__text">Mande a matrícula ou a localização da área pelo WhatsApp. O orçamento volta com valor e prazo do trabalho.</p></Reveal>
            <Reveal delay={0.1}>
              <Magnetic><a className="btn btn--lg" href={whats()} target="_blank" rel="noopener"><WhatsIcon />Pedir orçamento no WhatsApp<Arrow className="btn__arrow" /></a></Magnetic>
            </Reveal>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="wrap">
          <dl className="carimbo">
            <div><dt className="mono">Empresa</dt><dd><span className="footer__logo"><img src="/img/geoplanna-logo.png" alt="Geoplanna Topografia" /></span></dd></div>
            <div><dt className="mono">Responsável técnico</dt><dd>Daniel de Freitas Rodrigues<br />Engenheiro agrimensor · CREA-MG 112.195/D</dd></div>
            <div><dt className="mono">Endereço</dt><dd>Rua Geralda Ferreira Alves<br />Bairro Ouro Preto · Patrocínio, MG</dd></div>
            <div><dt className="mono">Contato</dt><dd><a href={whats()} target="_blank" rel="noopener">(34) 9 8897-6888</a><br /><a href="https://www.instagram.com/geoplanna.top/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.facebook.com/geoplannatopografia" target="_blank" rel="noopener">Facebook</a></dd></div>
            <div><dt className="mono">Referência</dt><dd>SIRGAS 2000<br />Desde 2013</dd></div>
          </dl>
          <div className="footer__legal mono">
            <span>© 2026 Geoplanna Topografia e Agrimensura</span>
            <a href="#top">Voltar ao topo ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ---------- phones: WhatsApp at hand once the hero has scrolled away ---------- */
export function Fab() {
  const { scrollY } = useScroll();
  const [past, setPast] = useState(false);
  const [atCta, setAtCta] = useState(false);
  useEffect(() => scrollY.on('change', (v) => setPast(v > window.innerHeight * 0.9)), [scrollY]);
  // the closing section has its own big button: the floating one steps aside there
  useEffect(() => {
    const el = document.getElementById('contato');
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setAtCta(e.boundingClientRect.top < window.innerHeight), { threshold: [0, 0.01] });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const show = past && !atCta;
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          className="fab"
          href={whats()}
          target="_blank"
          rel="noopener"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <WhatsIcon />Orçamento
        </motion.a>
      )}
    </AnimatePresence>
  );
}
