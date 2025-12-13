<template>
  <div class="app">
    <header class="app-header">
      <h1>Customizable Dashboard Builder</h1>
      <p>Drag and drop widgets to create your personalized dashboard</p>
    </header>
    
    <div class="app-container">
      <WidgetLibrary
        @add-widget="addWidget"
        @reset-dashboard="resetDashboard"
      />
      
      <Dashboard
        :widgets="dashboardWidgets"
        @update:widgets="updateWidgets"
        @add-widget="addWidget"
        @remove-widget="removeWidget"
        @reorder-widgets="reorderWidgets"
      />
    </div>
    
    <footer class="app-footer">
      <p>Drag widgets to rearrange • Click widget controls to customize</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Dashboard from './components/Dashboard.vue'
import WidgetLibrary from './components/WidgetLibrary.vue'

// Initial dashboard widgets
const initialWidgets = [
  {
    id: 'stats-1',
    type: 'stats',
    title: 'Performance Metrics',
    width: 2,
    height: 2
  },
  {
    id: 'chart-1',
    type: 'chart',
    title: 'Monthly Revenue',
    width: 3,
    height: 2
  },
  {
    id: 'table-1',
    type: 'table',
    title: 'Recent Projects',
    width: 2,
    height: 3
  }
]

const dashboardWidgets = ref([])

// Load saved layout or use initial widgets
onMounted(() => {
  const savedLayout = localStorage.getItem('dashboard-layout')
  if (savedLayout) {
    dashboardWidgets.value = JSON.parse(savedLayout)
  } else {
    dashboardWidgets.value = [...initialWidgets]
  }
})

const addWidget = (widget) => {
  dashboardWidgets.value.push(widget)
  saveLayout()
}

const removeWidget = (widgetId) => {
  dashboardWidgets.value = dashboardWidgets.value.filter(w => w.id !== widgetId)
  saveLayout()
}

const updateWidgets = (widgets) => {
  dashboardWidgets.value = widgets
  saveLayout()
}

const reorderWidgets = (widgets) => {
  dashboardWidgets.value = widgets
  saveLayout()
}

const resetDashboard = () => {
  if (confirm('Are you sure you want to reset the dashboard? This will remove all widgets.')) {
    dashboardWidgets.value = [...initialWidgets]
    saveLayout()
  }
}

const saveLayout = () => {
  localStorage.setItem('dashboard-layout', JSON.stringify(dashboardWidgets.value))
}
</script>

<style scoped>
.app-footer {
  margin-top: 30px;
  text-align: center;
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #7f8c8d;
  font-size: 14px;
}
</style>