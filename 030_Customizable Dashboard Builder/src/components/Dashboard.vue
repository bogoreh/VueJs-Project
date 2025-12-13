<template>
  <div 
    class="dashboard"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <div class="dashboard-header">
      <h2>My Dashboard</h2>
      <div class="dashboard-controls">
        <span class="widget-count">{{ widgets.length }} widgets</span>
        <button @click="toggleEditMode" class="edit-btn">
          {{ editMode ? 'Done Editing' : 'Edit Layout' }}
        </button>
      </div>
    </div>
    
    <div v-if="widgets.length === 0" class="empty-dashboard" @dragover="handleDragOver" @drop="handleDrop">
      <div class="empty-message">
        <p>📋 Your dashboard is empty</p>
        <p>Drag widgets from the library to get started!</p>
      </div>
    </div>
    
    <div v-else class="dashboard-grid">
      <Widget
        v-for="widget in widgets"
        :key="widget.id"
        :widget="widget"
        @dragstart="handleWidgetDragStart"
        @dragend="handleDragEnd"
        @remove="removeWidget(widget.id)"
        @update:widget="updateWidget"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import Widget from './Widget.vue'
import { useDragAndDrop } from '../composables/useDragAndDrop.js'

const props = defineProps({
  widgets: {
    type: Array,
    required: true
  }
})

const emit = defineEmits([
  'update:widgets',
  'add-widget',
  'remove-widget',
  'reorder-widgets'
])

const editMode = ref(false)

const {
  handleDragStart: handleDragStartComposable,
  handleDragOver,
  handleDrop: handleDropComposable,
  handleDragEnd
} = useDragAndDrop()

const handleWidgetDragStart = (event, widget) => {
  if (editMode.value) {
    handleDragStartComposable(event, widget)
  }
}

const handleDrop = (event) => {
  if (!editMode.value) return
  
  try {
    const data = event.dataTransfer.getData('text/plain')
    
    // Check if it's a new widget from library
    if (data.startsWith('{')) {
      const widget = JSON.parse(data)
      emit('add-widget', widget)
    } else {
      // It's a reorder operation
      handleDropComposable(event, props.widgets)
      emit('reorder-widgets', [...props.widgets])
    }
  } catch (error) {
    console.error('Drop error:', error)
  }
}

const removeWidget = (widgetId) => {
  if (editMode.value) {
    emit('remove-widget', widgetId)
  }
}

const updateWidget = (updatedWidget) => {
  emit('update:widgets', props.widgets.map(w => 
    w.id === updatedWidget.id ? updatedWidget : w
  ))
}

const toggleEditMode = () => {
  editMode.value = !editMode.value
}
</script>

<style scoped>
.dashboard {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  min-height: 600px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f8f9fa;
}

.dashboard-header h2 {
  color: #2c3e50;
  font-size: 24px;
}

.dashboard-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.widget-count {
  background: #f8f9fa;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  color: #7f8c8d;
}

.edit-btn {
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.edit-btn:hover {
  background: #2980b9;
}

.empty-dashboard {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 8px;
  border: 3px dashed #dee2e6;
  transition: all 0.3s;
}

.empty-dashboard:hover {
  border-color: #3498db;
  background: #e9ecef;
}

.empty-message {
  text-align: center;
  color: #7f8c8d;
}

.empty-message p:first-child {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  gap: 20px;
  grid-auto-flow: dense;
}
</style>