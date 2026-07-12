import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  site: 'https://blubabyshow.com',
  // Static output — best SEO, free hosting, portable.
  // Later: swap static content for Supabase reads (published-only) once the studio ships.
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
