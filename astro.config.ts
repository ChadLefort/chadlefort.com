import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import type { AstroUserConfig } from 'astro';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

type AstroVitePlugins = NonNullable<NonNullable<AstroUserConfig['vite']>['plugins']>;

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
    })
  ],
  vite: {
    plugins: tailwindcss() as unknown as AstroVitePlugins,
    optimizeDeps: {
      include: ['swiper', 'swiper/react', 'swiper/modules']
    }
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }
  },
  build: {
    inlineStylesheets: 'always',
    assets: '_astro'
  },
  compressHTML: true,
  experimental: {
    clientPrerender: true
  }
});
