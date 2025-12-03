import { createApp } from 'vue'
import App from './App.vue'
import gsap from 'gsap'

const app = createApp(App)

// Optional: Provide GSAP globally
app.config.globalProperties.$gsap = gsap

app.mount('#app')