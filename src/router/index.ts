import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import Home from '../pages/home/Home.vue'
import Post from '../pages/post/Post.vue'
import About from '../pages/about/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/:slug', component: Post },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to: RouteLocationNormalized) => {
  window.gtag?.('event', 'page_view', {
    page_path: to.fullPath,
  })
})

export default router
