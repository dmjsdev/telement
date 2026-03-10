import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/telement/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'github-pages-spa-fallback',
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist')
        const indexHtmlPath = path.join(distDir, 'index.html')
        const notFoundHtmlPath = path.join(distDir, '404.html')

        if (fs.existsSync(indexHtmlPath)) {
          fs.copyFileSync(indexHtmlPath, notFoundHtmlPath)
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
