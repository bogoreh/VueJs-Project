<template>
  <div class="app">
    <h1>Collaborative Editor</h1>
    <p v-if="!connected">Connecting to server...</p>
    <div v-else>
      <p>Connected! Users online: {{ users.length }}</p>
      <textarea 
        v-model="content" 
        @input="handleInput"
        placeholder="Start typing here..."
        class="editor"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useWebSocket } from './composables/useWebSocket'

const content = ref('')
const users = ref([])
const currentUser = ref(null)
const connected = ref(false)

const { initialize, sendMessage } = useWebSocket({
  onOpen: () => {
    connected.value = true
    console.log('Connected to WebSocket server')
  },
  onMessage: (message) => {
    console.log('Received message:', message)
    
    switch (message.type) {
      case 'init':
        currentUser.value = message.user
        content.value = message.document?.content || ''
        break
      case 'edit':
        if (message.userId !== currentUser.value?.id) {
          content.value = message.content
        }
        break
      case 'users':
        users.value = message.users
        break
    }
  },
  onClose: () => {
    connected.value = false
    console.log('Disconnected from WebSocket server')
  }
})

function handleInput() {
  if (connected.value) {
    sendMessage({
      type: 'edit',
      content: content.value
    })
  }
}

onMounted(() => {
  initialize()
})
</script>

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.editor {
  width: 100%;
  height: 400px;
  padding: 20px;
  font-size: 16px;
  line-height: 1.6;
  border: 2px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  font-family: 'Monaco', 'Menlo', monospace;
}

.editor:focus {
  outline: none;
  border-color: #4CAF50;
}
</style>