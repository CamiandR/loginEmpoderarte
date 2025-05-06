import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ghPages } from 'vite-plugin-gh-pages'

export default defineConfig({
  base: '/NOMBRE-DEL-REPO/', // 👈 cambia esto por el nombre real del repo
  plugins: [react(), ghPages()]
})
