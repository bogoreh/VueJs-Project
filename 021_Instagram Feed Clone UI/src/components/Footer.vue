<template>
  <footer class="footer">
    <div class="footer-nav">
      <button class="nav-button" :class="{ active: activeTab === 'home' }" @click="setActiveTab('home')">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z"/>
        </svg>
        <span class="nav-label">Home</span>
      </button>
      <button class="nav-button" :class="{ active: activeTab === 'search' }" @click="setActiveTab('search')">
        <svg class="nav-icon" xmlns="http://www.w3.org2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <span class="nav-label">Search</span>
      </button>
      <button class="nav-button" :class="{ active: activeTab === 'reels' }" @click="setActiveTab('reels')">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
        </svg>
        <span class="nav-label">Reels</span>
      </button>
      <button class="nav-button" :class="{ active: activeTab === 'shop' }" @click="setActiveTab('shop')">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zm10 15H4V8h16v11zM9 18l7.5-5L9 9z"/>
        </svg>
        <span class="nav-label">Shop</span>
      </button>
      <button class="nav-button" :class="{ active: activeTab === 'profile' }" @click="setActiveTab('profile')">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
        <span class="nav-label">Profile</span>
      </button>
    </div>
  </footer>
</template>

<script>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'Footer',
  setup() {
    const activeTab = ref('home')
    
    const setActiveTab = (tab) => {
      activeTab.value = tab
    }

    onMounted(() => {
      gsap.from('.footer', {
        duration: 0.6,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: 'power2.out'
      })
    })

    return {
      activeTab,
      setActiveTab
    }
  }
}
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: white;
  border-top: 1px solid #dbdbdb;
  padding: 10px 0;
}

.footer-nav {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
}

.nav-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  color: #8e8e8e;
  transition: color 0.2s;
}

.nav-button.active {
  color: #262626;
}

.nav-button:hover {
  color: #262626;
}

.nav-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.nav-label {
  font-size: 0.7rem;
  font-weight: 500;
}
</style>