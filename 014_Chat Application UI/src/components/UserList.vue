<template>
  <div class="user-list">
    <div class="user-list-header">
      <h3>Conversations</h3>
      <div class="header-actions">
        <span class="badge">{{ filteredUsers.length }}</span>
        <button class="sort-btn" @click="toggleSort" :title="sortAsc ? 'Sort A-Z' : 'Sort Z-A'">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path v-if="sortAsc" fill="currentColor" d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
            <path v-else fill="currentColor" d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="users-container">
      <div 
        v-for="user in sortedUsers" 
        :key="user.id"
        :class="['user-item', { active: user.id === selectedUserId, unread: getUnreadCount(user.id) > 0 }]"
        @click="selectUser(user)"
      >
        <div class="user-avatar">
          <img :src="user.avatar" :alt="user.name">
          <span class="status-indicator" :class="user.status"></span>
        </div>
        
        <div class="user-content">
          <div class="user-main">
            <div class="user-name-time">
              <h4>{{ user.name }}</h4>
              <span class="time">{{ user.lastSeen }}</span>
            </div>
            <span class="unread-count" v-if="getUnreadCount(user.id) > 0">
              {{ getUnreadCount(user.id) }}
            </span>
          </div>
          <div class="user-preview">
            <p>{{ getLastMessage(user.id) }}</p>
            <span class="message-status" v-if="getLastMessageStatus(user.id)">
              {{ getLastMessageStatus(user.id) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="typing-indicator" v-if="typingUser">
      <div class="typing-content">
        <div class="typing-avatar">
          <img :src="typingUser.avatar" :alt="typingUser.name">
        </div>
        <div class="typing-text">
          <p>{{ typingUser.name }} is typing</p>
          <div class="typing-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'UserList',
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  emits: ['select-user'],
  setup(props, { emit }) {
    const messages = inject('messages', [])
    const selectedUserId = ref(null)
    const sortAsc = ref(true)
    const typingUser = ref(null)
    
    const filteredUsers = computed(() => {
      return props.users.filter(user => user.id !== 1) // Filter out current user
    })

    const sortedUsers = computed(() => {
      return [...filteredUsers.value].sort((a, b) => {
        const nameA = a.name.toLowerCase()
        const nameB = b.name.toLowerCase()
        return sortAsc.value ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
      })
    })

    onMounted(() => {
      animateUserList()
      simulateTyping()
    })

    onUnmounted(() => {
      if (typingTimer) clearTimeout(typingTimer)
    })

    let typingTimer

    function simulateTyping() {
      typingTimer = setTimeout(() => {
        const randomUser = filteredUsers.value[Math.floor(Math.random() * filteredUsers.value.length)]
        typingUser.value = randomUser
        
        setTimeout(() => {
          typingUser.value = null
          simulateTyping()
        }, 2000 + Math.random() * 2000)
      }, 5000 + Math.random() * 10000)
    }

    function getLastMessage(userId) {
      const userMessages = messages.filter(msg => 
        msg.senderId === userId || msg.receiverId === userId
      )
      const lastMessage = userMessages[userMessages.length - 1]
      return lastMessage ? lastMessage.content : 'Start a conversation'
    }

    function getLastMessageStatus(userId) {
      const userMessages = messages.filter(msg => 
        msg.senderId === userId && msg.receiverId === 1
      )
      const lastMessage = userMessages[userMessages.length - 1]
      if (lastMessage) {
        return lastMessage.read ? '✓✓' : '✓'
      }
      return null
    }

    function getUnreadCount(userId) {
      return messages.filter(msg => 
        msg.senderId === userId && !msg.read
      ).length
    }

    function selectUser(user) {
      selectedUserId.value = user.id
      emit('select-user', user)
      animateUserClick(user)
    }

    function toggleSort() {
      sortAsc.value = !sortAsc.value
      animateSortButton()
    }

    // GSAP Animations
    function animateUserList() {
      gsap.from('.user-item', {
        duration: 0.6,
        x: -30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3
      })
    }

    function animateUserClick(user) {
      const userEl = document.querySelector(`.user-item:nth-child(${sortedUsers.value.indexOf(user) + 1})`)
      if (userEl) {
        gsap.to(userEl, {
          duration: 0.2,
          scale: 0.98,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        })
      }
    }

    function animateSortButton() {
      gsap.to('.sort-btn', {
        duration: 0.3,
        rotate: 180,
        ease: 'power2.inOut'
      })
    }

    return {
      selectedUserId,
      filteredUsers,
      sortedUsers,
      sortAsc,
      typingUser,
      getLastMessage,
      getLastMessageStatus,
      getUnreadCount,
      selectUser,
      toggleSort
    }
  }
}
</script>

<style scoped>
.user-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 10px;
  position: relative;
}

.user-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}

.user-list-header h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  background: var(--primary-color);
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 10px;
  min-width: 24px;
  text-align: center;
}

.sort-btn {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.sort-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.users-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.user-item:hover {
  background: var(--hover-bg);
}

.user-item.active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(29, 78, 216, 0.15) 100%);
  border-left: 3px solid var(--primary-color);
}

.user-item.unread {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%);
}

.user-item.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  opacity: 0.05;
  z-index: -1;
}

.user-avatar {
  position: relative;
  flex-shrink: 0;
}

.user-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid var(--border-color);
}

.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--bg-secondary);
}

.status-indicator.online {
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
}

.status-indicator.offline {
  background: #6b7280;
}

.user-content {
  flex: 1;
  min-width: 0;
}

.user-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.user-name-time {
  flex: 1;
  min-width: 0;
}

.user-name-time h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.time {
  font-size: 11px;
  color: var(--text-tertiary);
  display: block;
}

.unread-count {
  background: var(--primary-color);
  color: white;
  font-size: 11px;
  font-weight: 600;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.user-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-preview p {
  font-size: 13px;
  color: var(--text-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 8px;
}

.message-status {
  font-size: 12px;
  color: var(--primary-color);
  flex-shrink: 0;
}

/* Typing Indicator */
.typing-indicator {
  margin: 10px;
  padding: 12px;
  background: var(--bg-tertiary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  animation: slideIn 0.3s ease;
}

.typing-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.typing-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 2px solid var(--primary-color);
}

.typing-text {
  flex: 1;
}

.typing-text p {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 2px;
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary-color);
  animation: typing 1.4s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

@keyframes slideIn {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>