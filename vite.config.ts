import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Markdown({
      frontmatter: true,
    }),
    vue({
      include: ['**/*.vue', '**/*.md'],
    }),
  ],
})
