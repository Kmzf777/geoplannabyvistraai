import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import SmoothScroll from './components/SmoothScroll';
import './globals.css';

// Archivo carries a width axis: condensed for the display type (kin to the logo), normal for text.
const archivo = Archivo({ subsets: ['latin'], weight: 'variable', axes: ['wdth'], variable: '--f-archivo', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-mono', display: 'swap' });

export const metadata = {
  metadataBase: new URL('http://localhost:3010'),
  title: 'Geoplanna Topografia — Georreferenciamento e topografia em Patrocínio, MG',
  description:
    'Georreferenciamento com certificação no SIGEF, topografia, CAR e regularização de imóveis no Alto Paranaíba. Engenheiro agrimensor credenciado no INCRA, desde 2013.',
  icons: { icon: '/img/geoplanna-logo.png' },
  openGraph: {
    type: 'website',
    title: 'Geoplanna Topografia — Patrocínio, MG',
    description: 'A terra medida do jeito que o cartório aceita. Desde 2013.',
    images: ['/share.jpg'],
  },
};

export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#0e110d' };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
