import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const packagesDir = resolve(__dirname, '../../packages')
export default defineConfig({
  resolve: {
    alias: {
      '@rxjsx/core': resolve(packagesDir, './core/src'),
      '@rxjsx/dom/jsx-runtime': resolve(packagesDir, './dom/src/jsx/jsx-runtime.ts'),
      '@rxjsx/dom/jsx-dev-runtime': resolve(packagesDir, './dom/src/jsx/jsx-dev-runtime.ts'),
      '@rxjsx/dom': resolve(packagesDir, './dom/src'),
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '@rxjsx/dom',
  },
})
