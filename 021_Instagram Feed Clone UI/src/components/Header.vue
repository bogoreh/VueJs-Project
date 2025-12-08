<template>
  <header class="header">
    <div class="header-container">
      <h1 class="logo">Instagram</h1>
      <div class="header-icons">
        <button class="icon-button">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.53 20.47l-3.66-3.66A8.98 8.98 0 0 0 20 11a9 9 0 1 0-9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66a.746.746 0 0 0 1.06 0 .747.747 0 0 0 0-1.06zM3.5 11a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0z"/>
          </svg>
        </button>
        <button class="icon-button">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
          </svg>
        </button>
        <button class="icon-button">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 15c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm-9-9c0-1.66-1.34-3-3-3S7 4.34 7 6s1.34 3 3 3 3-1.34 3-3zm7 0c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zM2 15c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3z"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { onMounted } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'Header',
  setup() {
    onMounted(() => {
      gsap.from('.header', {
        duration: 0.6,
        y: -50,
        opacity: 0,
        ease: 'power2.out'
      })
    })
  }
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
  padding: 10px 0;
}

.header-container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  font-family: 'Instagram', cursive, sans-serif;
  font-size: 1.8rem;
  background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.header-icons {
  display: flex;
  gap: 20px;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.icon-button:hover {
  transform: scale(1.1);
}

.icon {
  width: 24px;
  height: 24px;
  color: #262626;
}
</style>