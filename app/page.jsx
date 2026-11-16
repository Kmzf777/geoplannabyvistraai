import Header from './components/Header';
import Hero from './components/Hero';
import { Marquee, Manifesto, Servicos, Processo } from './components/Secoes1';
import { Responsavel, Trabalhos, Duvidas, Contato, Fab } from './components/Secoes2';

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <Manifesto />
        <Servicos />
        <Processo />
        <Responsavel />
        <Trabalhos />
        <Duvidas />
      </main>
      <Contato />
      <Fab />
    </>
  );
}
