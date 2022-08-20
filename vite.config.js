import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import framework7 from 'rollup-plugin-framework7';

process.env.TARGET = process.env.TARGET || 'web';
const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www',);
  
  
export default defineConfig(({ command, mode }) => {
  console.log('command',command);
  console.log('mode',mode);
  console.log('NODE_ENV',process.env.NODE_ENV);
  console.log('TARGET',process.env.TARGET);
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    
  return {
    plugins: [
      framework7({ emitCss: false }),
    ],
  root: SRC_DIR,
  base: '',
  publicDir: PUBLIC_DIR,
  build: {
    chunkSizeWarningLimit: 700,
    outDir: BUILD_DIR,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    rollupOptions: {
      treeshake: false,
      output: {
        inlineDynamicImports: false,
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
        // sourcemap: true,
        manualChunks: {
          // 'jquery':['jquery'],
          // 'jquery-i18next':['jquery-i18next'],
          // 'i18next':['i18next'],
          // 'dateformat':['dateformat'],
          'frameworkX':['framework7'],
        }
      }
    },
  },
  resolve: {
    alias: {
      '@': SRC_DIR,
    },
  },
  server: {
    host: true,
  },
  esbuild: {
    jsxFactory: '$jsx',
    jsxFragment: '"Fragment"',
  },
  }
})