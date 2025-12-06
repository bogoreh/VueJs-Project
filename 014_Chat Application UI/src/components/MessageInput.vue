<template>
  <div class="message-input">
    <div class="input-tools">
      <button class="tool-btn" @click="toggleEmoji" title="Emoji">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </button>
      <button class="tool-btn" @click="attachFile" title="Attach File">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
        </svg>
      </button>
      <button class="tool-btn" @click="startVoiceMessage" title="Voice Message">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
        </svg>
      </button>
    </div>
    
    <div class="input-wrapper">
      <textarea
        ref="textarea"
        v-model="message"
        @keydown.enter.exact.prevent="handleEnter"
        @input="adjustHeight"
        placeholder="Type a message..."
        rows="1"
      ></textarea>
      
      <button 
        class="send-btn" 
        :disabled="!message.trim()" 
        @click="sendMessage"
        :class="{ active: message.trim() }"
        :title="message.trim() ? 'Send message' : 'Type a message to send'"
      >
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
      </button>
    </div>

    <!-- Voice Message Recording Indicator -->
    <div class="voice-recording" v-if="isRecording">
      <div class="recording-indicator">
        <div class="pulse"></div>
        <span>Recording...</span>
      </div>
      <button class="stop-recording" @click="stopVoiceMessage">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M6 6h12v12H6z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'MessageInput',
  emits: ['send-message'],
  setup(props, { emit }) {
    const message = ref('')
    const textarea = ref(null)
    const isRecording = ref(false)

    onMounted(() => {
      focusInput()
    })

    watch(message, () => {
      adjustHeight()
    })

    function adjustHeight() {
      if (textarea.value) {
        textarea.value.style.height = 'auto'
        const newHeight = Math.min(textarea.value.scrollHeight, 120)
        textarea.value.style.height = newHeight + 'px'
        
        // Animate height change
        if (newHeight > 48) {
          gsap.to(textarea.value, {
            duration: 0.2,
            height: newHeight,
            ease: 'power2.out'
          })
        }
      }
    }

    function handleEnter(event) {
      if (!event.shiftKey && message.value.trim()) {
        sendMessage()
      }
    }

    function sendMessage() {
      if (!message.value.trim()) return
      
      emit('send-message', message.value)
      
      // Animate message clearing
      gsap.to(textarea.value, {
        duration: 0.2,
        opacity: 0.5,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          message.value = ''
          if (textarea.value) {
            textarea.value.style.height = 'auto'
          }
        }
      })
      
      animateSendButton()
    }

    function toggleEmoji() {
      // Emoji picker implementation would go here
      console.log('Toggle emoji picker')
      animateButton('.tool-btn:first-child')
    }

    function attachFile() {
      // File attachment implementation would go here
      console.log('Attach file')
      animateButton('.tool-btn:nth-child(2)')
      
      // Simulate file selection
      gsap.to('.tool-btn:nth-child(2)', {
        duration: 0.3,
        scale: 1.2,
        color: '#3b82f6',
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      })
    }

    function startVoiceMessage() {
      isRecording.value = true
      animateButton('.tool-btn:last-child')
      
      // Simulate recording animation
      gsap.to('.pulse', {
        duration: 1,
        scale: 1.5,
        opacity: 0,
        repeat: -1,
        ease: 'power2.out'
      })
    }

    function stopVoiceMessage() {
      isRecording.value = false
      
      // Simulate sending voice message
      emit('send-message', '[Voice message]')
      gsap.to('.stop-recording', {
        duration: 0.3,
        scale: 0.8,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      })
    }

    function focusInput() {
      if (textarea.value) {
        textarea.value.focus()
        gsap.from(textarea.value, {
          duration: 0.5,
          scale: 0.95,
          opacity: 0,
          ease: 'power3.out'
        })
      }
    }

    function animateSendButton() {
      const button = document.querySelector('.send-btn')
      if (button) {
        gsap.to(button, {
          duration: 0.2,
          scale: 0.9,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        })
      }
    }

    function animateButton(selector) {
      const button = document.querySelector(selector)
      if (button) {
        gsap.to(button, {
          duration: 0.2,
          rotate: 360,
          scale: 1.2,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out'
        })
      }
    }

    return {
      message,
      textarea,
      isRecording,
      sendMessage,
      handleEnter,
      adjustHeight,
      toggleEmoji,
      attachFile,
      startVoiceMessage,
      stopVoiceMessage
    }
  }
}
</script>

<style scoped>
.message-input {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background: var(--bg-tertiary);
  border-radius: 16px;
  padding: 12px;
  box-shadow: 0 4px 20px var(--shadow-color);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  position: relative;
}

.message-input:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
}

.input-tools {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 0;
}

.tool-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.tool-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.input-wrapper {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  position: relative;
}

textarea {
  flex: 1;
  border: none;
  background: var(--bg-secondary);
  border-radius: 14px;
  padding: 14px 18px;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  max-height: 120px;
  transition: all 0.3s ease;
  line-height: 1.4;
  color: var(--text-primary);
  border: 1px solid transparent;
}

textarea:focus {
  outline: none;
  background: var(--bg-primary);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

textarea::placeholder {
  color: var(--text-tertiary);
}

.send-btn {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  border: none;
  background: var(--bg-tertiary);
  color: var(--text-tertiary);
  cursor: not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  border: 1px solid var(--border-color);
}

.send-btn.active {
  background: var(--primary-gradient);
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
  border-color: transparent;
}

.send-btn.active:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Voice Recording Styles */
.voice-recording {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-tertiary);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border: 2px solid #ef4444;
  animation: pulseBorder 2s infinite;
}

.recording-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pulse {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ef4444;
  position: relative;
}

.recording-indicator span {
  color: #ef4444;
  font-weight: 500;
  font-size: 14px;
}

.stop-recording {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ef4444;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.stop-recording:hover {
  background: #dc2626;
  transform: scale(1.1);
}

@keyframes pulseBorder {
  0%, 100% {
    border-color: rgba(239, 68, 68, 0.5);
  }
  50% {
    border-color: rgba(239, 68, 68, 1);
  }
}

/* Text area character counter */
.char-counter {
  position: absolute;
  bottom: -20px;
  right: 12px;
  font-size: 11px;
  color: var(--text-tertiary);
}
</style>