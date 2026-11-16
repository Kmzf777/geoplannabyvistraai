// Every fact on the page comes from the client's Instagram, Facebook and Google profile (15/11/2026).
// Nothing invented: no hours, prices, durations or client names the client has not given.

const FONE = '5534988976888';
export const whats = (msg = 'Olá, quero um orçamento de topografia.') =>
  `https://wa.me/${FONE}?text=${encodeURIComponent(msg)}`;

export const nav = [
  { href: '#servicos', label: 'Serviços', n: '02' },
  { href: '#processo', label: 'Processo', n: '03' },
  { href: '#responsavel', label: 'Responsável', n: '04' },
  { href: '#trabalhos', label: 'Trabalhos', n: '05' },
  { href: '#duvidas', label: 'Dúvidas', n: '06' },
];

export const cidades = ['Patrocínio', 'Cruzeiro da Fortaleza', 'Patos de Minas', 'Alto Paranaíba', 'Cerrado Mineiro'];

export const servicos = [
  { key: 'geo', nome: 'Georreferenciamento', desc: 'Certificação no SIGEF/INCRA para vender, dividir, herdar ou financiar o imóvel rural.', foto: 'gnss-cafezal.jpg', tag: 'Cafezal' },
  { key: 'plani', nome: 'Planialtimétrico', desc: 'Curvas de nível e cadastro de uso do solo para projeto, terraplenagem ou loteamento.', foto: 'terra-roxa.jpg', tag: 'Terra roxa' },
  { key: 'cartorio', nome: 'Usucapião e retificação', desc: 'Planta e memorial descritivo para usucapião, retificação, desmembramento e unificação.', foto: 'marco-pedra.jpg', tag: 'Marco de divisa' },
  { key: 'car', nome: 'CAR e outorga', desc: 'Inscrição e retificação do CAR, reserva legal, licenciamento e outorga de água para irrigar.', foto: 'cerrado-buqueirao.jpg', tag: 'Cerrado' },
  { key: 'urbano', nome: 'Lote urbano', desc: 'Demarcação de lote, desdobro e levantamento cadastral na cidade.', foto: 'tripe-casa.jpg', tag: 'Cidade' },
  { key: 'pericia', nome: 'Perícias e laudos', desc: 'Perito cadastrado no TJMG para medições, laudos e avaliações em processos.', foto: 'dois-gnss.jpg', tag: 'Justiça' },
];

export const etapas = [
  { titulo: 'Medição no campo', texto: 'Receptor GNSS em cada marco da divisa. Os vizinhos de cerca são avisados antes da equipe chegar.', foto: 'gnss-campo.jpg' },
  { titulo: 'Planta e memorial', texto: 'Os pontos medidos viram a planta e o memorial descritivo, assinados pelo responsável técnico com ART.', foto: 'coletora-mao.jpg' },
  { titulo: 'Certificação no SIGEF', texto: 'O trabalho entra no sistema do INCRA pelo credenciamento EE3 e sai com a área certificada.', foto: 'antena-ceu.jpg' },
  { titulo: 'Matrícula atualizada', texto: 'Com a certificação, o cartório averba a nova descrição. A terra pode ser vendida, dividida ou financiada.', foto: 'base-curral.jpg' },
];

export const credenciais = [
  { nome: 'Engenheiro agrimensor', linha: 'Registro no CREA-MG', valor: '112.195/D' },
  { nome: 'Credenciado no INCRA', linha: 'Certifica imóveis no SIGEF', valor: 'EE3' },
  { nome: 'Perito judicial', linha: 'Auxiliares da Justiça do TJMG', valor: 'TJMG' },
  { nome: 'Formação', linha: 'Universidade Federal de Viçosa', valor: 'UFV' },
];

export const trabalhos = [
  { foto: 'tripe-lavoura.jpg', tag: 'Lavoura' },
  { foto: 'trilho.jpg', tag: 'Ferrovia' },
  { foto: 'gnss-cerrado.jpg', tag: 'Cerrado' },
  { foto: 'cerca-pasto.jpg', tag: 'Pastagem' },
  { foto: 'tripe-casa.jpg', tag: 'Lote urbano' },
  { foto: 'calcada.jpg', tag: 'Área urbana' },
  { foto: 'tripe-rua.jpg', tag: 'Loteamento' },
];

export const duvidas = [
  { p: 'O prazo do georreferenciamento mudou. Ainda preciso fazer?', r: 'O Decreto 12.689/2025 levou a exigência geral para outubro de 2029. Mas o cartório já pede o georreferenciamento certificado para vender, desmembrar, unificar ou fazer inventário de imóvel rural. Quem vai negociar a terra precisa agora.' },
  { p: 'Quanto custa?', r: 'Depende da área, do relevo e da documentação. Mande a matrícula ou a localização pelo WhatsApp e o orçamento volta com valor e prazo.' },
  { p: 'O que eu preciso separar?', r: 'A matrícula atualizada, o CCIR, o CAR se já tiver, e o contato dos vizinhos de divisa.' },
  { p: 'Vocês atendem fora de Patrocínio?', r: 'Sim. A Geoplanna trabalha em Patrocínio, Cruzeiro da Fortaleza, Patos de Minas e nas cidades vizinhas do Alto Paranaíba.' },
  { p: 'Fazem perícia judicial?', r: 'Sim. Daniel é perito cadastrado no sistema de Auxiliares da Justiça do TJMG, para medições, laudos e avaliações em processos.' },
];
