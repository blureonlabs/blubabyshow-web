import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkUnlinkFuturePosts from './src/plugins/remark-unlink-future-posts.mjs';

// https://astro.build
export default defineConfig({
  site: 'https://www.blubabyshow.com',
  // Static output — best SEO, free hosting, portable.
  // Later: swap static content for Supabase reads (published-only) once the studio ships.
  output: 'static',
  integrations: [
    // Auto-generates /sitemap-index.xml at build. /thanks is post-checkout only (also noindex).
    sitemap({
      filter: (page) => !page.includes('/thanks'),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkUnlinkFuturePosts],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
