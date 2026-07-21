import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build
export default defineConfig({
  site: 'https://blubabyshow.com',
  // Static output — best SEO, free hosting, portable.
  // Later: swap static content for Supabase reads (published-only) once the studio ships.
  output: 'static',
  integrations: [sitemap()], // auto-generates /sitemap-index.xml at build
  build: {
    inlineStylesheets: 'auto',
  },
});
