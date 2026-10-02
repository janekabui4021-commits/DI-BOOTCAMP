import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  esbuild: {
    loader: 'jsx',
    include: /.*\.(js|jsx)$/,
    exclude: [],
  },
  plugins: [react({ include: /\.(js|jsx)$/ })],
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
});