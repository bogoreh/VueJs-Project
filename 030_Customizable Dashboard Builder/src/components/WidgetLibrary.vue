<template>
  <div class="widget-library">
    <h3>Widget Library</h3>
    <p class="library-description">Drag widgets to the dashboard</p>
    
    <div class="widget-list">
      <div 
        v-for="widget in availableWidgets" 
        :key="widget.id"
        class="library-widget"
        draggable="true"
        @dragstart="handleDragStart($event, widget)"
        @dragend="handleDragEnd"
      >
        <div class="widget-icon" :class="widget.type">
          <span>{{ getWidgetIcon(widget.type) }}</span>
        </div>
        <div class="widget-info">
          <h4>{{ widget.title }}</h4>
          <p>{{ widget.description }}</p>
        </div>
      </div>
    </div>
    
    <div class="library-actions">
      <button @click="resetDashboard" class="reset-btn">
        Reset Dashboard
      </button>
      <button @click="saveDashboard" class="save-btn">
        Save Layout
      </button>
    </div>
    
    <div v-if="savedMessage" class="saved-message">
      {{ savedMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-widget', 'reset-dashboard'])

const savedMessage = ref('')

const availableWidgets = [
  {
    id: 'stats-widget',
    type: 'stats',
    title: 'Statistics',
    description: 'Key metrics and statistics',
    width: 2,
    height: 2
  },
  {
    id: 'chart-widget',
    type: 'chart',
    title: 'Chart',
    description: 'Visual data representation',
    width: 3,
    height: 2
  },
  {
    id: 'table-widget',
    type: 'table',
    title: 'Data Table',
    description: 'Tabular data display',
    width: 4,
    height: 3
  },
  {
    id: 'calendar-widget',
    type: 'calendar',
    title: 'Calendar',
    description: 'Upcoming events and schedule',
    width: 2,
    height: 3
  },
  {
    id: 'text-widget',
    type: 'text',
    title: 'Notes',
    description: 'Custom text and notes',
    content: 'Add your notes here...',
    width: 2,
    height: 2
  }
]

const getWidgetIcon = (type) => {
  const icons = {
    'stats': '📊',
    'chart': '📈',
    'table': '📋',
    'calendar': '📅',
    'text': '📝'
  }
  return icons[type] || '📦'
}

const handleDragStart = (event, widget) => {
  // Create a new widget instance with unique ID
  const newWidget = {
    ...widget,
    id: `${widget.type}-${Date.now()}`
  }
  event.dataTransfer.setData('text/plain', JSON.stringify(newWidget))
  event.dataTransfer.effectAllowed = 'copy'
}

const handleDragEnd = () => {
  // Optional: Add visual feedback
}

const resetDashboard = () => {
  emit('reset-dashboard')
}

const saveDashboard = () => {
  savedMessage.value = 'Dashboard layout saved!'
  setTimeout(() => {
    savedMessage.value = ''
  }, 2000)
}
</script>

<style scoped>
.widget-library {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 280px;
  flex-shrink: 0;
}

.widget-library h3 {
  color: #2c3e50;
  margin-bottom: 5px;
}

.library-description {
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 20px;
}

.widget-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.library-widget {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
  cursor: grab;
  transition: all 0.2s;
}

.library-widget:hover {
  background: #e9ecef;
  border-color: #3498db;
  transform: translateY(-2px);
}

.library-widget:active {
  cursor: grabbing;
}

.widget-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 6px;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.widget-info h4 {
  font-size: 14px;
  color: #2c3e50;
  margin-bottom: 2px;
}

.widget-info p {
  font-size: 12px;
  color: #7f8c8d;
  margin: 0;
}

.library-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reset-btn, .save-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.reset-btn {
  background: #e74c3c;
  color: white;
}

.reset-btn:hover {
  background: #c0392b;
}

.save-btn {
  background: #2ecc71;
  color: white;
}

.save-btn:hover {
  background: #27ae60;
}

.saved-message {
  margin-top: 15px;
  padding: 10px;
  background: #d4edda;
  color: #155724;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
  animation: fadeOut 2s forwards 2s;
}

@keyframes fadeOut {
  to {
    opacity: 0;
    height: 0;
    padding: 0;
    margin: 0;
  }
}
</style>