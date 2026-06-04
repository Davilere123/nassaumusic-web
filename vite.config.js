import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Configurações para fazer o Vite rodar num tunel
  server: {
    host: '0.0.0.0', // Faz o vite escutar a rede do container
    allowedHosts: true, // Evita erros que podem acontcer por causa do tunel
    headers: {
      'Bypass-Tunnel-Reminder': 'true'
    },
    hmr: {
      clientPort: 443, // Faz o vite usar portas seguras do tunel
    }
  }
})
