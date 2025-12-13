<template>
  <div class="connection-status">
    <div class="status-header">
      <h3>Connection</h3>
      <div class="status-dot" :class="connected ? 'connected' : 'disconnected'"></div>
    </div>
    
    <div class="status-info">
      <div class="info-item">
        <span class="label">Status:</span>
        <span class="value" :class="connected ? 'connected' : 'disconnected'">
          {{ connected ? 'Connected' : 'Disconnected' }}
        </span>
      </div>
      
      <div class="info-item" v-if="currentUser">
        <span class="label">Your ID:</span>
        <span class="value">{{ currentUser.id.slice(0, 8) }}...</span>
      </div>
      
      <div class="info-item">
        <span class="label">Users:</span>
        <span class="value">{{ users.length }}</span>
      </div>
    </div>
    
    <div class="reconnect-button" v-if="!connected">
      <button @click="$emit('reconnect')">
        🔄 Reconnect
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  connected: Boolean,
  users: Array,
  currentUser: Object
})

defineEmits(['reconnect'])
</script>

<style scoped>
.connection-status {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.status-header h3 {
  margin: 0;
  font-size: 1rem;
  color: #374151;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-dot.connected {
  background-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.status-dot.disconnected {
  background-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.status-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

.label {
  color: #6b7280;
}

.value {
  font-weight: 500;
  color: #111827;
}

.value.connected {
  color: #10b981;
}

.value.disconnected {
  color: #ef4444;
}

.reconnect-button {
  margin-top: 1rem;
}

.reconnect-button button {
  width: 100%;
  padding: 0.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.reconnect-button button:hover {
  background-color: #2563eb;
}
</style>