import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Asegura que Vite trate .glb como asset estático
  assetsInclude: ['**/*.glb', '**/*.gltf'],
})
