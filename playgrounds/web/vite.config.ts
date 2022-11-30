import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const packagesDir = resolve(__dirname, '../../packages')
export default defineConfig({
  resolve: {
    alias: {
      '@rxact/core': resolve(packagesDir, './core/src'),
      '@rxact/dom': resolve(packagesDir, './dom/src'),
    },
  },
})
