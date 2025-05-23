import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [vue(), mkcert()],
  server: {
    host: '0.0.0.0',   // доступен извне
    port: 8081,        // совпадает с проброшенным портом
    https: true,
    strictPort: true   // чтоб не прыгал на другой
  }
})
