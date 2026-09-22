import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages menyajikan situs di https://restuba.github.io/labspace/, bukan root.
  // Tanpa base ini, path aset (/assets/...) diminta dari root domain → 404.
  base: '/labspace/',
  plugins: [react(), tailwindcss()],
});
