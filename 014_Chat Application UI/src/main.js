import { createApp } from 'vue'
import App from './App.vue'

import { gsap } from 'gsap'

const app = createApp(App)

app.config.globalProperties.$gsap = gsap

// Mount the app
app.mount('#app')