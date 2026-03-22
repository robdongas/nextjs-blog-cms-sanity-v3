import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import sanity from '@sanity/astro'
import node from '@astrojs/node'

export default defineConfig({
  site: 'https://www.ilanabode.com',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: {
    allowedHosts: ['www.ilanabode.com', 'ilanabode.com'],
  },
  integrations: [
    sanity({
      projectId: '2rllabgd',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/studio',
    }),
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
