import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/olsenbande-headquarter/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            // HTTP Basic Auth Header prüfen
            const auth = req.headers['authorization']
            if (!auth) {
              proxyReq.abort()
              req.res.statusCode = 401
              req.res.setHeader('WWW-Authenticate', 'Basic realm="Olsenbande Headquarter"')
              req.res.end('Authentifizierung erforderlich')
              return
            }
            
            // Auth-Daten decodieren
            const base64 = auth.split(' ')[1]
            const credentials = Buffer.from(base64, 'base64').toString('utf-8')
            const [username, password] = credentials.split(':')
            
            // Einfache Auth-Prüfung (Demo)
            if (username !== 'admin' || password !== 'olsen123') {
              proxyReq.abort()
              req.res.statusCode = 401
              req.res.setHeader('WWW-Authenticate', 'Basic realm="Olsenbande Headquarter"')
              req.res.end('Ungültige Anmeldedaten')
            }
          })
        }
      }
    }
  }
})
