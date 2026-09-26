import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { markdownPosts } from './vite-plugins/markdown-posts.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [markdownPosts(), react()],
})
