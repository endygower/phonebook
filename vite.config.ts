/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./testSetup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src/'),
    },
  },
})
