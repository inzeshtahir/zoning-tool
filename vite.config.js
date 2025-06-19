import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // ✅ Allow iframe from Karmaflow
      'Content-Security-Policy': "frame-ancestors 'self' https://chat.karmaflow.ai"
    }
  }
})
