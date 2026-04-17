# SIGEF — Sistema de Inspecciones Gremiales

Sistema web para la gestión de expedientes administrativos de inspección gremial y obra social.

**Demo en vivo:** https://leandromondin-gh.github.io/sigef-inspecciones/

## Stack

- Next.js 16 (App Router) con TypeScript
- Tailwind CSS
- Exportación estática para GitHub Pages

## Correr en local

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Build de producción

```bash
npm run build
# genera la carpeta ./out con el sitio estático
```

## Despliegue

El push a `main` dispara el workflow `.github/workflows/deploy.yml` que buildea y publica en GitHub Pages automáticamente.
