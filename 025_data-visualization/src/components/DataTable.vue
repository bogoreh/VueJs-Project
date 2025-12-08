<template>
  <div class="data-table-container" ref="tableRef">
    <div class="table-header">
      <h3>{{ title }}</h3>
      <div class="table-actions">
        <button @click="exportData" class="export-btn">
          <i class="fas fa-download"></i> Export
        </button>
      </div>
    </div>
    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td v-for="column in columns" :key="column.key">
              <span v-if="column.key === 'revenue' || column.key === 'sales'">
                {{ formatNumber(row[column.key]) }}
              </span>
              <span v-else>
                {{ row[column.key] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="loading" class="table-loading">
      <div class="loading-spinner"></div>
      <p>Loading data...</p>
    </div>
    <div v-if="error" class="table-error">
      <p>{{ error }}</p>
      <button @click="onRetry" class="retry-btn">Retry</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Data Table'
  },
  columns: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['retry'])

const tableRef = ref(null)

const formatNumber = (num) => {
  if (typeof num === 'number') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(num)
  }
  return num
}

const exportData = () => {
  const headers = props.columns.map(col => col.label).join(',')
  const rows = props.data.map(row => 
    props.columns.map(col => row[col.key]).join(',')
  ).join('\n')
  
  const csv = `${headers}\n${rows}`
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.title.toLowerCase().replace(/\s+/g, '_')}.csv`
  a.click()
}

const onRetry = () => {
  emit('retry')
}

onMounted(() => {
  if (tableRef.value) {
    gsap.from(tableRef.value, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.3
    })
  }
})
</script>

<style scoped>
.data-table-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.table-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.export-btn {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.export-btn:hover {
  background-color: #e5e7eb;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background-color: #f9fafb;
}

.data-table th {
  padding: 0.875rem 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  color: #6b7280;
}

.data-table tbody tr {
  transition: background-color 0.2s;
}

.data-table tbody tr:hover {
  background-color: #f9fafb;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.table-loading, .table-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.retry-btn:hover {
  background-color: #4338ca;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>