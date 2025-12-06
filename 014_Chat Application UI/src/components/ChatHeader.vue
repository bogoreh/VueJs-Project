<template>
  <div class="app-header">
    <div class="header-content">
      <div class="logo">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="#3b82f6" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </div>
        <div class="logo-text">
          <h1>Chat<span>Pro</span></h1>
          <p class="tagline">Professional Messaging</p>
        </div>
      </div>
      <div class="user-menu">
        <div class="notification-badge">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <span class="badge">3</span>
        </div>
        <button class="new-chat-btn" @click="startNewChat">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          New Chat
        </button>
      </div>
    </div>
    <div class="search-box">
      <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18">
        <path fill="#94a3b8" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
      <input 
        type="text" 
        placeholder="Search conversations..." 
        v-model="searchQuery"
        @input="handleSearch"
      >
      <button class="clear-btn" @click="clearSearch" v-if="searchQuery">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'ChatHeader',
  emits: ['new-chat', 'search'],
  setup(props, { emit }) {
    const searchQuery = ref('')

    function startNewChat() {
      emit('new-chat')
      animateButton()
    }

    function handleSearch() {
      emit('search', searchQuery.value)
    }

    function clearSearch() {
      searchQuery.value = ''
      emit('search', '')
      animateClearButton()
    }

    function animateButton() {
      gsap.to('.new-chat-btn', {
        duration: 0.2,
        scale: 0.95,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      })
    }

    function animateClearButton() {
      gsap.to('.clear-btn', {
        duration: 0.2,
        rotate: 90,
        ease: 'power2.out'
      })
    }

    return {
      searchQuery,
      startNewChat,
      handleSearch,
      clearSearch
    }
  }
}
</script>

<style scoped>
.app-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--primary-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.logo-text h1 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.logo-text h1 span {
  color: #3b82f6;
  font-weight: 800;
}

.tagline {
  font-size: 11px;
  color: var(--text-tertiary);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 2px;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 15px;
}

.notification-badge {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.notification-badge:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.notification-badge .badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  border: 2px solid var(--bg-secondary);
}

.new-chat-btn {
  padding: 10px 18px;
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.new-chat-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box input {
  width: 100%;
  padding: 12px 40px 12px 40px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 14px;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary-color);
  background: var(--bg-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-box input::placeholder {
  color: var(--text-tertiary);
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.clear-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: none;
  background: var(--bg-secondary);
  color: var(--text-tertiary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: var(--primary-color);
  color: white;
}
</style>