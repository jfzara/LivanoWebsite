import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: cloudflare(),
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },
    ssr: {
      noExternal: ['path-to-regexp']
    },
    // Optimisation Vite native
    optimizeDeps: {
      exclude: ['node_modules/*'],
      include: ['@astrojs/tailwind']
    }
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});