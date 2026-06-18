import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 5176,
    strictPort: true,
    open: '/zh-CN/',
  },
  build: {
    rollupOptions: {
      input: {
        root: resolve(__dirname, 'index.html'),
        'zh-CN': resolve(__dirname, 'zh-CN/index.html'),
        en: resolve(__dirname, 'en/index.html'),
        ja: resolve(__dirname, 'ja/index.html'),
        'zh-CN-guide': resolve(__dirname, 'zh-CN/guide/index.html'),
        'en-guide': resolve(__dirname, 'en/guide/index.html'),
        'ja-guide': resolve(__dirname, 'ja/guide/index.html'),
      },
    },
  },
});
