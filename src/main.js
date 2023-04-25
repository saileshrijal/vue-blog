import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$hostname = "http://localhost:5008/api"
app.use(pinia)
app.use(router)
app.mount('#app')
