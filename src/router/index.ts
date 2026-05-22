import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home/Home.vue'
import Post from '../pages/post/Post.vue'
import About from '../pages/about/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/:slug', component: Post },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
