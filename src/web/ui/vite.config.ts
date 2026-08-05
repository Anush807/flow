import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// In production the API process serves this bundle itself (see
// src/routes/console-static.ts), so every request the console makes is
// same-origin. In development Vite proxies those same paths to the API server,
// which keeps the browser on one origin and avoids CORS entirely.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_API_TARGET || 'http://127.0.0.1:3000';
  const proxy = { target, changeOrigin: true };

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: Number(env.VITE_PORT || 5173),
      proxy: {
        '/api': proxy,
        // The support page's webhook tester posts to real public ingress.
        '/webhooks': proxy,
        '/health': proxy,
        '/ready': proxy,
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  };
});
