<template>
  <div class="user-list">
    <h3>👥 Online Users ({{ users.length }})</h3>
    
    <div class="current-user" v-if="currentUser">
      <div class="user-item current">
        <div class="user-color" :style="{ backgroundColor: currentUser.color }"></div>
        <div class="user-info">
          <div class="user-name">
            <input
              v-model="editName"
              @blur="updateName"
              @keyup.enter="updateName"
              class="name-input"
              v-if="editingName"
              @click.stop
            />
            <span v-else @click="startEditing">
              {{ currentUser.name }} (You)
            </span>
          </div>
          <div class="user-status">
            <span class="status-indicator active"></span>
            Online
          </div>
        </div>
      </div>
    </div>
    
    <div class="other-users">
      <div
        v-for="user in otherUsers"
        :key="user.id"
        class="user-item"
      >
        <div class="user-color" :style="{ backgroundColor: user.color }"></div>
        <div class="user-info">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-status">
            <span class="status-indicator"></span>
            Editing
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="otherUsers.length === 0" class="empty-state">
      <p>No other users connected</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  users: Array,
  currentUser: Object
})

const emit = defineEmits(['rename'])

const editingName = ref(false)
const editName = ref(props.currentUser?.name || '')

const otherUsers = computed(() => {
  return props.users.filter(user => user.id !== props.currentUser?.id)
})

function startEditing() {
  editingName.value = true
  editName.value = props.currentUser.name
  nextTick(() => {
    document.querySelector('.name-input')?.focus()
  })
}

function updateName() {
  if (editName.value.trim() && editName.value !== props.currentUser.name) {
    emit('rename', editName.value.trim())
  }
  editingName.value = false
}
</script>

<style scoped>
.user-list {
  flex: 1;
  overflow-y: auto;
}

.user-list h3 {
  margin: 0 0 1rem;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s;
}

.user-item.current {
  background-color: #e0e7ff;
}

.user-item:hover {
  background-color: #f3f4f6;
}

.user-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 500;
  color: #111827;
  cursor: pointer;
  user-select: none;
}

.user-name input {
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: inherit;
  width: 100%;
}

.user-name input:focus {
  outline: none;
  border-color: #667eea;
}

.user-status {
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.status-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #10b981;
}

.status-indicator.active {
  background-color: #10b981;
  animation: pulse 2s infinite;
}

.empty-state {
  text-align: center;
  padding: 2rem 1rem;
  color: #9ca3af;
  font-style: italic;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>