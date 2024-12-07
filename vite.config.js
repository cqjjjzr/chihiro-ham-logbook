/** @type {import('vite').UserConfig} */

import { resolve } from 'path';

export default {
  resolve: {
    alias: {
      '../../images/backgrounds': 'uikit/src/images/backgrounds',
      '../../images/components': 'uikit/src/images/components',
      '../../images/icons': 'uikit/src/images/icons'
    }
  },
  build: {
    rollupOptions: {
      input: {
        default: resolve(__dirname, 'index.html'),
        en: resolve(__dirname, 'index-en.html'),
        ja: resolve(__dirname, 'index-ja.html'),
      }
    }
  }
};