import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@/app':        path.resolve(__dirname, 'src/app'),
        '@/api':        path.resolve(__dirname, 'src/api'),
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/hooks':      path.resolve(__dirname, 'src/hooks'),
        '@/config':     path.resolve(__dirname, 'src/config'),
        '@/types':      path.resolve(__dirname, 'src/types'),
        '@/constants':  path.resolve(__dirname, 'src/constants'),
        '@/utils':      path.resolve(__dirname, 'src/utils'),
        '@/lib':        path.resolve(__dirname, 'src/lib'),
        '@/styles':     path.resolve(__dirname, 'src/styles'),
        '@/assets':     path.resolve(__dirname, 'src/assets'),
        '@/modules':    path.resolve(__dirname, 'src/modules'),
        '@modules':     path.resolve(__dirname, 'src/modules'),
      },
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            query:  ['@tanstack/react-query'],
            ui:     ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          },
        },
      },
    },
  };
});
