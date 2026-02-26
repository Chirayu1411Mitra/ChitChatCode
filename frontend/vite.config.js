import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(loadEnv('', path.resolve(__dirname, '..'), '').VITE_FRONTEND_PORT || '5173'),
  },
})
