import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://libreria2001.com.ar',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  build: { format: 'directory' },
});
