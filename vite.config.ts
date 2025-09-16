import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    build({
      // Exclude favicon and icon files from worker routing
      exclude: ['/static/*', '/favicon*', '/apple-touch-icon.png', '/*.ico', '/*.png', '/*.svg']
    }),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ]
})
