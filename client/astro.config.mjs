import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://yashbarhate.dev', // change to your real domain when you deploy
  compressHTML: true,
});
