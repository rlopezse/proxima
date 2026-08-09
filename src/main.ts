import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import './assets/css/reset.css'
import './assets/css/variables.css'
import App from './App.vue'
import router from './router'

const head = createHead()

createApp(App).use(router).use(head).mount('#app')
