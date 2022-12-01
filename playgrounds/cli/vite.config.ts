import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const packagesDir = resolve(__dirname, '../../packages')
export default defineConfig({
  resolve: {
    alias: {
      '@rxact/core': resolve(packagesDir, './core/src'),
      '@rxact/console': resolve(packagesDir, './console/src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/main.ts'),
      formats: ['es'],
    },
  },
})
