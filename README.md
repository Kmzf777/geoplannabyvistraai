# Geoplanna Topografia — site

Site da Geoplanna Topografia e Agrimensura (Patrocínio, MG), feito pela Vistra.
Next.js 15 + React 19, animações com Motion e rolagem suave com Lenis. Exporta como site estático.

## Rodar

```bash
npm install
npm run dev          # http://localhost:3010
```

Numa pasta sincronizada (OneDrive, Dropbox), o Next pode não perceber as mudanças nos arquivos:
use `WATCHPACK_POLLING=true npm run dev`.

## Publicar

```bash
npm run build        # gera a pasta out/, que sobe em qualquer hospedagem estática
```

## Onde mexer

- `app/conteudo.js`: todos os textos, serviços, etapas, credenciais, fotos dos trabalhos e dúvidas.
- `app/globals.css`: cores, tipografia e layout.
- `app/components/`: as seções (abertura, serviços, processo, responsável, trabalhos, dúvidas, contato).
- `public/img/`: fotos (do Instagram da Geoplanna, 1080px; trocar pelas originais em alta resolução).

Antes de publicar: trocar `metadataBase` em `app/layout.jsx` pelo domínio final.
