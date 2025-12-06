<template>
  <div class="chat-app dark-theme">
    <!-- Sidebar with user list -->
    <div class="sidebar">
      <ChatHeader />
      <UserList :users="users" @select-user="selectUser" />
    </div>

    <!-- Main chat area -->
    <div class="main-chat">
      <!-- Chat header with selected user info -->
      <div class="chat-header" v-if="selectedUser">
        <div class="user-info">
          <div class="avatar-wrapper">
            <img :src="selectedUser.avatar" :alt="selectedUser.name" class="avatar">
            <span class="status-indicator" :class="selectedUser.status"></span>
          </div>
          <div class="user-details">
            <h3>{{ selectedUser.name }}</h3>
            <p class="status">{{ selectedUser.status === 'online' ? 'Online' : 'Offline' }}</p>
          </div>
        </div>
        <div class="chat-actions">
          <button class="icon-btn" title="Video call">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
          </button>
          <button class="icon-btn" title="Voice call">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </button>
          <button class="icon-btn" title="More options">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Messages area -->
      <div class="messages-container">
        <MessageList 
          :messages="filteredMessages" 
          :current-user-id="currentUserId" 
          @message-selected="handleMessageSelect"
        />
      </div>

      <!-- Message input -->
      <div class="message-input-container">
        <MessageInput @send-message="sendMessage" />
      </div>
    </div>

    <!-- Theme toggle button -->
    <button class="theme-toggle" @click="toggleTheme">
      <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
      </svg>
      <svg v-else viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
      </svg>
    </button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import ChatHeader from './components/ChatHeader.vue'
import UserList from './components/UserList.vue'
import MessageList from './components/MessageList.vue'
import MessageInput from './components/MessageInput.vue'

export default {
  name: 'App',
  components: {
    ChatHeader,
    UserList,
    MessageList,
    MessageInput
  },
  setup() {
    const currentUserId = ref(1) // Simulate logged-in user
    const selectedUser = ref(null)
    const theme = ref('dark')
    
    const users = ref([
      { id: 1, name: 'You', avatar: 'https://i.pravatar.cc/150?img=1', status: 'online', lastSeen: 'Just now' },
      { id: 2, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=5', status: 'online', lastSeen: '2 min ago' },
      { id: 3, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=8', status: 'online', lastSeen: '5 min ago' },
      { id: 4, name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=12', status: 'offline', lastSeen: '2 hours ago' },
      { id: 5, name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?img=15', status: 'online', lastSeen: '30 min ago' },
      { id: 6, name: 'Mike Wilson', avatar: 'https://i.pravatar.cc/150?img=19', status: 'offline', lastSeen: 'Yesterday' },
      { id: 7, name: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?img=23', status: 'online', lastSeen: '10 min ago' },
      { id: 8, name: 'David Brown', avatar: 'https://i.pravatar.cc/150?img=32', status: 'offline', lastSeen: '5 hours ago' }
    ])

    const messages = ref([
      { id: 1, senderId: 1, receiverId: 2, content: 'Hey there! How are you?', timestamp: '10:30 AM', read: true },
      { id: 2, senderId: 2, receiverId: 1, content: 'I\'m good! Working on a new project.', timestamp: '10:32 AM', read: true },
      { id: 3, senderId: 1, receiverId: 2, content: 'That sounds exciting! What is it about?', timestamp: '10:33 AM', read: true },
      { id: 4, senderId: 2, receiverId: 1, content: 'Building a chat app with Vue and GSAP!', timestamp: '10:35 AM', read: true },
      { id: 5, senderId: 2, receiverId: 1, content: 'Want to collaborate?', timestamp: '10:36 AM', read: false },
      { id: 6, senderId: 3, receiverId: 1, content: 'Hi! Are you free for a call later?', timestamp: '9:45 AM', read: true },
      { id: 7, senderId: 1, receiverId: 3, content: 'Sure! How about 3 PM?', timestamp: '9:50 AM', read: true },
      { id: 8, senderId: 5, receiverId: 1, content: 'Meeting tomorrow at 10 AM', timestamp: 'Yesterday', read: true },
      { id: 9, senderId: 7, receiverId: 1, content: 'Can you review the design mockups?', timestamp: '11:15 AM', read: false },
      { id: 10, senderId: 1, receiverId: 7, content: 'Yes, I\'ll take a look in the afternoon.', timestamp: '11:20 AM', read: true }
    ])

    // Initialize with first user selected
    onMounted(() => {
      selectUser(users.value[1])
      animateEntrance()
      applyTheme()
    })

    const filteredMessages = computed(() => {
      if (!selectedUser.value) return []
      return messages.value.filter(msg => 
        (msg.senderId === currentUserId.value && msg.receiverId === selectedUser.value.id) ||
        (msg.senderId === selectedUser.value.id && msg.receiverId === currentUserId.value)
      ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    })

    function selectUser(user) {
      selectedUser.value = user
      animateUserSelection(user)
      
      // Mark messages as read
      messages.value.forEach(msg => {
        if (msg.senderId === user.id && msg.receiverId === currentUserId.value) {
          msg.read = true
        }
      })
    }

    function sendMessage(content) {
      if (!content.trim() || !selectedUser.value) return
      
      const newMessage = {
        id: messages.value.length + 1,
        senderId: currentUserId.value,
        receiverId: selectedUser.value.id,
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true
      }
      
      messages.value.push(newMessage)
      animateMessageSend(newMessage)
    }

    function handleMessageSelect(message) {
      console.log('Selected message:', message)
      // You can implement message actions (reply, forward, delete, etc.)
    }

    function toggleTheme() {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
      applyTheme()
      animateThemeToggle()
    }

    function applyTheme() {
      const root = document.documentElement
      if (theme.value === 'dark') {
        root.style.setProperty('--bg-primary', '#0f172a')
        root.style.setProperty('--bg-secondary', '#1e293b')
        root.style.setProperty('--bg-tertiary', '#334155')
        root.style.setProperty('--text-primary', '#f1f5f9')
        root.style.setProperty('--text-secondary', '#cbd5e1')
        root.style.setProperty('--text-tertiary', '#94a3b8')
        root.style.setProperty('--border-color', '#334155')
        root.style.setProperty('--primary-color', '#3b82f6')
        root.style.setProperty('--primary-gradient', 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)')
        root.style.setProperty('--hover-bg', '#2d3748')
        root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.5)')
      } else {
        root.style.setProperty('--bg-primary', '#ffffff')
        root.style.setProperty('--bg-secondary', '#f8fafc')
        root.style.setProperty('--bg-tertiary', '#e2e8f0')
        root.style.setProperty('--text-primary', '#1e293b')
        root.style.setProperty('--text-secondary', '#475569')
        root.style.setProperty('--text-tertiary', '#64748b')
        root.style.setProperty('--border-color', '#e2e8f0')
        root.style.setProperty('--primary-color', '#3b82f6')
        root.style.setProperty('--primary-gradient', 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)')
        root.style.setProperty('--hover-bg', '#f1f5f9')
        root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)')
      }
    }

    // GSAP Animations
    function animateEntrance() {
      gsap.from('.sidebar', {
        duration: 0.8,
        x: -50,
        opacity: 0,
        ease: 'power3.out'
      })
      
      gsap.from('.main-chat', {
        duration: 0.8,
        x: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.2
      })
    }

    function animateUserSelection(user) {
      const tl = gsap.timeline()
      tl.to('.chat-header', {
        duration: 0.3,
        y: -20,
        opacity: 0,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to('.chat-header', {
            duration: 0.3,
            y: 0,
            opacity: 1,
            ease: 'power2.out'
          })
        }
      })
    }

    function animateMessageSend(message) {
      const messageEl = document.querySelector('.message-item:last-child')
      if (messageEl) {
        gsap.from(messageEl, {
          duration: 0.4,
          scale: 0.8,
          opacity: 0,
          y: 20,
          ease: 'back.out(1.7)'
        })
      }
    }

    function animateThemeToggle() {
      gsap.to('.theme-toggle', {
        duration: 0.3,
        rotate: 360,
        scale: 1.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      })
    }

    return {
      currentUserId,
      selectedUser,
      users,
      messages,
      filteredMessages,
      theme,
      selectUser,
      sendMessage,
      handleMessageSelect,
      toggleTheme
    }
  }
}
</script>

<style>
:root {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --border-color: #334155;
  --primary-color: #3b82f6;
  --primary-gradient: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  --hover-bg: #2d3748;
  --shadow-color: rgba(0, 0, 0, 0.5);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: var(--text-primary);
}

.chat-app {
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  background: var(--bg-primary);
  border-radius: 16px;
  box-shadow: 0 20px 60px var(--shadow-color);
  display: flex;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-color);
}

/* Sidebar */
.sidebar {
  width: 350px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

/* Main Chat Area */
.main-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
}

/* Chat Header */
.chat-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-secondary);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-wrapper {
  position: relative;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary-color);
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid var(--bg-secondary);
}

.status-indicator.online {
  background: #10b981;
}

.status-indicator.offline {
  background: #6b7280;
}

.user-details h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.user-details .status {
  font-size: 12px;
  color: var(--text-tertiary);
}

.chat-actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.icon-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

/* Messages Container */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: var(--bg-primary);
}

.message-input-container {
  padding: 20px;
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

/* Theme Toggle Button */
.theme-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.theme-toggle:hover {
  background: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Scrollbar Styling */
.messages-container::-webkit-scrollbar {
  width: 8px;
}

.messages-container::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 4px;
}

.messages-container::-webkit-scrollbar-thumb {
  background: var(--bg-tertiary);
  border-radius: 4px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}

/* Smooth transitions */
.chat-app, .chat-app * {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
</style>