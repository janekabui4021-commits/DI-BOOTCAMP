import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/users': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/users/, '/users'),
      },
      '/api/customers': {
        target: 'http://127.0.0.1:3002',
        changeOrigin: true,
      },
    },
  },
});
