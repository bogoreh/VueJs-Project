import { ref } from 'vue'

export function useWebSocket(options = {}) {
  const ws = ref(null)
  const connected = ref(false)

  function initialize() {
    // For development, connect directly to the WebSocket server
    const socket = new WebSocket('ws://localhost:3001')
    
    socket.onopen = () => {
      connected.value = true
      ws.value = socket
      options.onOpen?.()
    }
    
    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        options.onMessage?.(message)
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }
    
    socket.onclose = () => {
      connected.value = false
      options.onClose?.()
    }
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error)
      options.onError?.(error)
    }
  }

  function sendMessage(message) {
    if (ws.value && connected.value) {
      ws.value.send(JSON.stringify(message))
      return true
    }
    return false
  }

  return {
    connected,
    initialize,
    sendMessage
  }
}