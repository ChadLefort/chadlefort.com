import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://chadlefort.com',
  output: 'static',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  integrations: [
    react(),
    mdx(),
    icon(),
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date()
    }),
    AstroPWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'me.png', 'card.png'],
      manifest: {
        name: 'Chad Lefort - Senior Frontend Engineer',
        short_name: 'Chad Lefort',
        description:
          'Portfolio and resume for Chad Lefort - Senior Frontend Engineer from Mandeville, Louisiana building accessible, performant web apps.',
        theme_color: '#21252b',
        background_color: '#21252b',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        lang: 'en-US',
        orientation: 'portrait',
        categories: ['portfolio', 'personal', 'productivity'],
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,avif,webp,woff2,ico}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: '/',
        navigateFallbackDenylist: [/^\/llms/, /^\/resume\.md$/, /^\/sitemap/, /\.pdf$/],
        runtimeCaching: [
          {
            urlPattern: /^https?.*\.(?:png|jpg|jpeg|svg|avif|webp|gif|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          },
          {
            urlPattern: /^https?.*\.(?:woff2?|ttf|otf)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'font-cache',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          }
        ]
      },
      devOptions: {
        enabled: false
      },
      experimental: {
        directoryAndTrailingSlashHandler: true
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }
  },
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro'
  },
  compressHTML: true,
  experimental: {
    clientPrerender: true
  }
});
