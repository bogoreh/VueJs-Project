<template>
  <div class="message-list" ref="messageList">
    <div class="date-separator" v-if="showDateSeparator">
      <span>Today</span>
    </div>
    
    <div 
      v-for="message in messages" 
      :key="message.id"
      :class="['message-item', { 'sent': message.senderId === currentUserId, 'received': message.senderId !== currentUserId }]"
      @click="$emit('message-selected', message)"
    >
      <div class="message-content">
        <p>{{ message.content }}</p>
        <div class="message-meta">
          <span class="timestamp">{{ message.timestamp }}</span>
          <span v-if="message.senderId === currentUserId" class="read-status">
            {{ message.read ? '✓✓' : '✓' }}
          </span>
        </div>
      </div>
    </div>
    
    <div class="typing-indicator" v-if="showTypingIndicator">
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'MessageList',
  props: {
    messages: {
      type: Array,
      required: true
    },
    currentUserId: {
      type: Number,
      required: true
    }
  },
  emits: ['message-selected'],
  setup(props) {
    const messageList = ref(null)
    const showTypingIndicator = ref(false)
    const showDateSeparator = computed(() => props.messages.length > 0)

    onMounted(() => {
      scrollToBottom()
      animateMessages()
      simulateTyping()
    })

    watch(() => props.messages, () => {
      nextTick(() => {
        scrollToBottom()
        if (props.messages.length > 0) {
          animateNewMessage(props.messages[props.messages.length - 1])
        }
      })
    }, { deep: true })

    function scrollToBottom() {
      if (messageList.value) {
        messageList.value.scrollTop = messageList.value.scrollHeight
      }
    }

    function simulateTyping() {
      setTimeout(() => {
        showTypingIndicator.value = true
        setTimeout(() => {
          showTypingIndicator.value = false
          simulateTyping()
        }, 2000 + Math.random() * 2000)
      }, 8000 + Math.random() * 10000)
    }

    function animateMessages() {
      gsap.from('.message-item', {
        duration: 0.5,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out'
      })
    }

    function animateNewMessage(message) {
      const messageEl = document.querySelector(`.message-item:last-child`)
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

    return {
      messageList,
      showTypingIndicator,
      showDateSeparator
    }
  }
}
</script>

<style scoped>
.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding-bottom: 20px;
}

.date-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}

.date-separator span {
  padding: 6px 16px;
  background: var(--bg-tertiary);
  color: var(--text-tertiary);
  font-size: 12px;
  font-weight: 500;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.message-item {
  max-width: 70%;
  animation: fadeIn 0.3s ease-out;
}

.message-item.sent {
  align-self: flex-end;
}

.message-item.received {
  align-self: flex-start;
}

.message-content {
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.message-item.sent .message-content {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 0.9) 100%);
  color: white;
  border-bottom-right-radius: 4px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.message-item.received .message-content {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border-bottom-left-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.message-item:hover .message-content {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.message-item.received:hover .message-content {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.message-content p {
  margin: 0 0 8px 0;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
}

.message-meta {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 11px;
  opacity: 0.9;
}

.message-item.sent .message-meta {
  color: rgba(255, 255, 255, 0.9);
}

.message-item.received .message-meta {
  color: var(--text-tertiary);
}

.timestamp {
  font-size: 11px;
  margin-right: 4px;
}

.read-status {
  font-size: 12px;
  color: #a5b4fc;
}

/* Typing indicator */
.typing-indicator {
  align-self: flex-start;
  padding: 12px 16px;
  background: var(--bg-tertiary);
  border-radius: 18px;
  border-bottom-left-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.typing-dots {
  display: flex;
  gap: 6px;
  align-items: center;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary-color);
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% { 
    transform: scale(0.8); 
    opacity: 0.5; 
  }
  40% { 
    transform: scale(1); 
    opacity: 1; 
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Message selection effect */
.message-item:active .message-content {
  transform: scale(0.98);
}

/* Context menu styles */
.message-context-menu {
  position: absolute;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0 10px 40px var(--shadow-color);
  z-index: 1000;
  min-width: 160px;
}

.context-menu-item {
  padding: 8px 16px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.context-menu-item:hover {
  background: var(--hover-bg);
}
</style>