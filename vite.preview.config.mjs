import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';

const root = fileURLToPath(new URL('.', import.meta.url));

// `npm run build:preview` → /preview-dist, a copy of the site with relative
// paths for preview links. The real site is still `npm run build` (Next.js).
export default defineConfig({
  root: 'preview',
  base: './',
  publicDir: '../public',
  plugins: [react()],
  resolve: { alias: { '@': root } },
  css: { postcss: { plugins: [tailwindcss({ base: root })] } },
  build: { outDir: '../preview-dist', emptyOutDir: true },
});
