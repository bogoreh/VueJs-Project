<template>
  <div class="document-editor">
    <div class="editor-header">
      <h2>Document</h2>
      <div class="connection-indicator" :class="{ connected: connected }">
        {{ connected ? '🟢 Online' : '🔴 Offline' }}
      </div>
    </div>
    
    <textarea
      ref="textareaRef"
      v-model="localContent"
      @input="handleInput"
      @keyup="handleKeyUp"
      @click="handleClick"
      @blur="handleBlur"
      class="editor-textarea"
      placeholder="Start typing here..."
      :disabled="!connected"
    ></textarea>
    
    <!-- Remote cursors overlay -->
    <div class="cursors-overlay">
      <div
        v-for="user in otherUsers"
        :key="user.id"
        class="remote-cursor"
        :style="{
          left: `${getCursorPosition(user)}px`,
          '--cursor-color': user.color
        }"
        :title="user.name"
      >
        <div class="cursor-line"></div>
        <div class="cursor-label">{{ user.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  content: String,
  connected: Boolean,
  users: Array,
  currentUser: Object
})

const emit = defineEmits(['update:content', 'cursor'])

const textareaRef = ref(null)
const localContent = ref(props.content)
const remoteCursors = ref({})

const otherUsers = computed(() => {
  return props.users.filter(user => user.id !== props.currentUser?.id)
})

function handleInput() {
  emit('update:content', localContent.value)
  
  if (props.connected && props.currentUser) {
    // Debounce sending updates
    clearTimeout(updateTimeout)
    updateTimeout = setTimeout(() => {
      emit('cursor', getCursorPosition(props.currentUser))
    }, 100)
  }
}

let updateTimeout = null

function handleKeyUp(event) {
  if (props.connected && props.currentUser) {
    emit('cursor', getCursorPosition(props.currentUser))
  }
}

function handleClick() {
  if (props.connected && props.currentUser) {
    emit('cursor', getCursorPosition(props.currentUser))
  }
}

function handleBlur() {
  if (props.connected && props.currentUser) {
    emit('cursor', -1) // -1 indicates cursor is not active
  }
}

function getCursorPosition(user) {
  // This is a simplified version
  // In a real app, you'd calculate pixel position based on cursor index
  return 0
}

// Watch for content changes from parent (remote edits)
watch(() => props.content, (newContent) => {
  if (newContent !== localContent.value) {
    localContent.value = newContent
  }
})

onMounted(() => {
  if (textareaRef.value) {
    textareaRef.value.focus()
  }
})

onUnmounted(() => {
  clearTimeout(updateTimeout)
})
</script>

<style scoped>
.document-editor {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.editor-header h2 {
  margin: 0;
  color: #333;
}

.connection-indicator {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.connection-indicator.connected {
  background-color: #d1fae5;
  color: #065f46;
}

.connection-indicator:not(.connected) {
  background-color: #fee2e2;
  color: #991b1b;
}

.editor-textarea {
  flex: 1;
  width: 100%;
  padding: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  resize: none;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  background-color: #fafafa;
}

.editor-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.editor-textarea:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

.cursors-overlay {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  padding: 1.5rem;
}

.remote-cursor {
  position: absolute;
  top: 0;
  transition: left 0.1s ease;
}

.cursor-line {
  width: 2px;
  height: 1.5em;
  background-color: var(--cursor-color);
  position: relative;
}

.cursor-label {
  position: absolute;
  top: -20px;
  left: 0;
  background-color: var(--cursor-color);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  transform: translateX(-50%);
}
</style>