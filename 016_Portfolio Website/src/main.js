import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Import GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const app = createApp(App)

// Make GSAP available globally
app.config.globalProperties.$gsap = gsap
app.config.globalProperties.$ScrollTrigger = ScrollTrigger

app.mount('#app')