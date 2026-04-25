import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const renderPort = Number(process.env.PORT)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: renderPort || 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: renderPort || 4173,
  },
})
