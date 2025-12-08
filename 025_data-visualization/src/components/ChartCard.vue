<template>
  <div class="chart-card" ref="chartCardRef">
    <div class="chart-header">
      <h3>{{ title }}</h3>
      <select v-model="selectedPeriod" @change="onPeriodChange" class="period-select">
        <option value="yearly">Yearly</option>
        <option value="quarterly">Quarterly</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>
    <div class="chart-container">
      <apexchart 
        v-if="!loading && chartOptions && chartSeries"
        :type="chartType" 
        height="300" 
        :options="chartOptions" 
        :series="chartSeries"
      />
      <div v-if="loading" class="chart-loading">
        <div class="loading-spinner"></div>
        <p>Loading chart data...</p>
      </div>
      <div v-if="error" class="chart-error">
        <p>{{ error }}</p>
        <button @click="onRetry" class="retry-btn">Retry</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  chartType: {
    type: String,
    default: 'line'
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

const emit = defineEmits(['period-change', 'retry'])

const chartCardRef = ref(null)
const selectedPeriod = ref('yearly')

const chartOptions = computed(() => {
  const isDark = false // You can implement dark mode toggle
  
  if (props.chartType === 'line' || props.chartType === 'area') {
    return {
      chart: {
        type: props.chartType,
        height: 300,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        },
        animations: {
          enabled: true,
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          }
        }
      },
      colors: ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      grid: {
        borderColor: isDark ? '#374151' : '#e5e7eb',
        strokeDashArray: 5
      },
      markers: {
        size: 5
      },
      xaxis: {
        categories: props.data.map(item => item.month || item.product),
        labels: {
          style: {
            colors: isDark ? '#9ca3af' : '#6b7280'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function(val) {
            return val >= 1000 ? (val/1000).toFixed(0) + 'K' : val
          },
          style: {
            colors: isDark ? '#9ca3af' : '#6b7280'
          }
        }
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light',
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString()
          }
        }
      }
    }
  }
  
  if (props.chartType === 'bar') {
    return {
      chart: {
        type: 'bar',
        height: 300,
        toolbar: {
          show: true
        }
      },
      colors: ['#4f46e5', '#10b981', '#f59e0b'],
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '60%',
        }
      },
      grid: {
        borderColor: isDark ? '#374151' : '#e5e7eb',
        strokeDashArray: 5
      },
      xaxis: {
        categories: props.data.map(item => item.month || item.product),
        labels: {
          style: {
            colors: isDark ? '#9ca3af' : '#6b7280'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function(val) {
            return val >= 1000 ? (val/1000).toFixed(0) + 'K' : val
          },
          style: {
            colors: isDark ? '#9ca3af' : '#6b7280'
          }
        }
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light',
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString()
          }
        }
      }
    }
  }
  
  if (props.chartType === 'pie' || props.chartType === 'donut') {
    return {
      chart: {
        type: props.chartType,
        height: 300,
        toolbar: {
          show: true
        }
      },
      colors: ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
      labels: props.data.map(item => item.product),
      legend: {
        position: 'bottom'
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light',
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString()
          }
        }
      }
    }
  }
  
  return {}
})

const chartSeries = computed(() => {
  if (props.chartType === 'line' || props.chartType === 'area') {
    return [
      {
        name: 'Sales',
        data: props.data.map(item => item.sales)
      },
      {
        name: 'Revenue',
        data: props.data.map(item => item.revenue)
      }
    ]
  }
  
  if (props.chartType === 'bar') {
    return [
      {
        name: 'Sales',
        data: props.data.map(item => item.sales)
      },
      {
        name: 'Revenue',
        data: props.data.map(item => item.revenue)
      }
    ]
  }
  
  if (props.chartType === 'pie' || props.chartType === 'donut') {
    return props.data.map(item => item.revenue)
  }
  
  return []
})

const onPeriodChange = () => {
  emit('period-change', selectedPeriod.value)
}

const onRetry = () => {
  emit('retry')
}

onMounted(() => {
  // GSAP animation for chart card
  if (chartCardRef.value) {
    gsap.from(chartCardRef.value, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2
    })
  }
})
</script>

<style scoped>
.chart-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.chart-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.period-select {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #374151;
  font-size: 0.875rem;
  outline: none;
  cursor: pointer;
}

.period-select:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.chart-container {
  position: relative;
  min-height: 300px;
}

.chart-loading, .chart-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
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
</style>