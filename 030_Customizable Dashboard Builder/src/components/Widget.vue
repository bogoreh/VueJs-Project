<template>
  <div 
    class="widget"
    :class="{ 'dragging': isDragging, 'resizing': isResizing }"
    :style="widgetStyles"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="widget-header">
      <h3>{{ widget.title }}</h3>
      <div class="widget-controls">
        <button @click="toggleMinimize" class="control-btn" :title="isMinimized ? 'Maximize' : 'Minimize'">
          {{ isMinimized ? '↔' : '–' }}
        </button>
        <button @click="$emit('remove')" class="control-btn remove-btn" title="Remove">
          ×
        </button>
      </div>
    </div>
    
    <div class="widget-content" v-if="!isMinimized">
      <div v-if="widget.type === 'stats'" class="stats-widget">
        <div class="stat-item">
          <span class="stat-value">{{ stats.value1 }}</span>
          <span class="stat-label">{{ stats.label1 }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ stats.value2 }}</span>
          <span class="stat-label">{{ stats.label2 }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ stats.value3 }}</span>
          <span class="stat-label">{{ stats.label3 }}</span>
        </div>
      </div>
      
      <div v-else-if="widget.type === 'chart'" class="chart-widget">
        <div class="chart-placeholder">
          <div class="chart-bar" v-for="(value, index) in chartData" :key="index" 
               :style="{ height: value + '%' }" :title="'Value: ' + value">
          </div>
        </div>
        <p class="chart-label">Sample Chart Data</p>
      </div>
      
      <div v-else-if="widget.type === 'table'" class="table-widget">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in tableData" :key="index">
              <td>{{ row.name }}</td>
              <td>
                <span :class="'status-' + row.status.toLowerCase()" class="status-badge">
                  {{ row.status }}
                </span>
              </td>
              <td>{{ row.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else-if="widget.type === 'calendar'" class="calendar-widget">
        <div class="calendar-header">
          <h4>Upcoming Events</h4>
        </div>
        <ul class="event-list">
          <li v-for="(event, index) in events" :key="index" class="event-item">
            <span class="event-time">{{ event.time }}</span>
            <span class="event-title">{{ event.title }}</span>
          </li>
        </ul>
      </div>
      
      <div v-else class="text-widget">
        <p>{{ widget.content }}</p>
      </div>
    </div>
    
    <div v-else class="widget-minimized">
      <p>{{ widget.title }} (minimized)</p>
    </div>
    
    <!-- Resize handles -->
    <div class="resize-handle right" @mousedown="startResize('horizontal')"></div>
    <div class="resize-handle bottom" @mousedown="startResize('vertical')"></div>
    <div class="resize-handle corner" @mousedown="startResize('both')"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  widget: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['dragstart', 'dragend', 'remove', 'update:widget'])

const isDragging = ref(false)
const isResizing = ref(false)
const isMinimized = ref(false)
const widgetSize = ref({ width: props.widget.width || 1, height: props.widget.height || 1 })

// Sample data for different widget types
const stats = ref({
  value1: '1,234',
  label1: 'Visitors',
  value2: '567',
  label2: 'Conversions',
  value3: '23.4%',
  label3: 'Growth'
})

const chartData = ref([65, 59, 80, 81, 56, 55, 40, 75, 60, 90, 70, 85])
const tableData = ref([
  { name: 'Project A', status: 'Active', value: '$12,500' },
  { name: 'Project B', status: 'Pending', value: '$8,200' },
  { name: 'Project C', status: 'Completed', value: '$15,000' },
  { name: 'Project D', status: 'Active', value: '$9,750' }
])

const events = ref([
  { time: '10:00 AM', title: 'Team Meeting' },
  { time: '1:30 PM', title: 'Client Call' },
  { time: '3:00 PM', title: 'Project Review' },
  { time: '5:00 PM', title: 'Workshop' }
])

const widgetStyles = computed(() => {
  const baseSize = 200
  return {
    width: `${widgetSize.value.width * baseSize}px`,
    height: isMinimized.value ? '60px' : `${widgetSize.value.height * baseSize}px`,
    'grid-column': `span ${widgetSize.value.width}`,
    'grid-row': `span ${widgetSize.value.height}`
  }
})

const handleDragStart = (event) => {
  isDragging.value = true
  emit('dragstart', event, props.widget)
}

const handleDragEnd = () => {
  isDragging.value = false
  emit('dragend')
}

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value
}

const startResize = (direction) => {
  isResizing.value = true
  const startX = event.clientX
  const startY = event.clientY
  const startWidth = widgetSize.value.width
  const startHeight = widgetSize.value.height
  
  const handleMouseMove = (e) => {
    if (!isResizing.value) return
    
    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY
    
    if (direction === 'horizontal' || direction === 'both') {
      const newWidth = Math.max(1, Math.min(4, startWidth + Math.round(deltaX / 50)))
      widgetSize.value.width = newWidth
    }
    
    if (direction === 'vertical' || direction === 'both') {
      const newHeight = Math.max(1, Math.min(4, startHeight + Math.round(deltaY / 50)))
      widgetSize.value.height = newHeight
    }
  }
  
  const handleMouseUp = () => {
    isResizing.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    emit('update:widget', { ...props.widget, width: widgetSize.value.width, height: widgetSize.value.height })
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

onMounted(() => {
  if (props.widget.width) widgetSize.value.width = props.widget.width
  if (props.widget.height) widgetSize.value.height = props.widget.height
})
</script>

<style scoped>
.widget {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
}

.widget:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  border-color: #3498db;
}

.widget.dragging {
  opacity: 0.5;
  transform: rotate(3deg);
}

.widget.resizing {
  opacity: 0.9;
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.widget-header h3 {
  font-size: 16px;
  color: #2c3e50;
  margin: 0;
}

.widget-controls {
  display: flex;
  gap: 5px;
}

.control-btn {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.control-btn:hover {
  background: #e9ecef;
}

.remove-btn:hover {
  background: #ff6b6b;
  color: white;
}

.widget-content {
  height: calc(100% - 50px);
  overflow: auto;
}

.widget-minimized {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #7f8c8d;
  font-style: italic;
}

/* Widget type specific styles */
.stats-widget {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
}

.stat-label {
  font-size: 12px;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.chart-widget {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-placeholder {
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
  margin-bottom: 10px;
}

.chart-bar {
  width: 20px;
  background: linear-gradient(to top, #3498db, #2ecc71);
  border-radius: 3px 3px 0 0;
  transition: height 0.3s ease;
}

.chart-label {
  text-align: center;
  font-size: 12px;
  color: #7f8c8d;
}

.table-widget {
  overflow: auto;
  max-height: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: #f8f9fa;
  padding: 10px;
  text-align: left;
  font-size: 12px;
  color: #7f8c8d;
  text-transform: uppercase;
  border-bottom: 2px solid #dee2e6;
}

td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.status-badge {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-active {
  background: #d4edda;
  color: #155724;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-completed {
  background: #d1ecf1;
  color: #0c5460;
}

.calendar-widget {
  height: 100%;
}

.calendar-header {
  margin-bottom: 15px;
}

.calendar-header h4 {
  color: #2c3e50;
  font-size: 16px;
}

.event-list {
  list-style: none;
}

.event-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dashed #eee;
}

.event-time {
  font-weight: 600;
  color: #3498db;
}

.event-title {
  color: #2c3e50;
}

.text-widget p {
  line-height: 1.6;
  color: #34495e;
}

.resize-handle {
  position: absolute;
  background: #3498db;
  opacity: 0;
  transition: opacity 0.2s;
}

.widget:hover .resize-handle {
  opacity: 1;
}

.resize-handle.right {
  top: 0;
  right: 0;
  width: 5px;
  height: 100%;
  cursor: col-resize;
}

.resize-handle.bottom {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  cursor: row-resize;
}

.resize-handle.corner {
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  cursor: nwse-resize;
}
</style>