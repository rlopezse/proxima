import { createApp } from 'vue'
import './assets/css/reset.css'
import './assets/css/variables.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
