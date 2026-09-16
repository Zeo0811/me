import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';
import './scripts/geo-env.mjs';

export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  resolve: { dedupe: ['react', 'react-dom'] },
  ssr: { external: ['ip-location-api'] },
  plugins: [vinext()],
});
