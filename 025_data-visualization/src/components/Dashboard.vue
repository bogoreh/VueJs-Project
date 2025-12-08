<template>
  <div class="dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <div>
        <h1>Data Visualization Dashboard</h1>
        <p>Monitor your business metrics in real-time</p>
      </div>
      <div class="header-actions">
        <button @click="refreshData" class="refresh-btn" :disabled="loading">
          <i class="fas fa-sync-alt" :class="{ 'spin': loading }"></i>
          Refresh
        </button>
      </div>
    </header>

    <!-- Metrics -->
    <div class="metrics-grid">
      <MetricCard 
        title="Total Revenue"
        :value="totalRevenue"
        :change="12.5"
        icon="fas fa-dollar-sign"
        iconBg="#10b981"
      />
      <MetricCard 
        title="Total Sales"
        :value="totalSales"
        :change="8.3"
        icon="fas fa-shopping-cart"
        iconBg="#4f46e5"
      />
      <MetricCard 
        title="Active Users"
        :value="activeUsers"
        :change="5.7"
        icon="fas fa-users"
        iconBg="#f59e0b"
      />
      <MetricCard 
        title="Avg. Order Value"
        :value="avgOrderValue"
        :change="-2.1"
        icon="fas fa-chart-bar"
        iconBg="#ef4444"
      />
    </div>

    <!-- Charts -->
    <div class="charts-grid">
      <div class="col-span-2">
        <ChartCard 
          title="Sales & Revenue Overview"
          chart-type="line"
          :data="salesData"
          :loading="loading"
          :error="error"
          @period-change="handlePeriodChange"
          @retry="refreshData"
        />
      </div>
      <div>
        <ChartCard 
          title="Product Distribution"
          chart-type="donut"
          :data="productData"
          :loading="loading"
          :error="error"
          @period-change="handlePeriodChange"
          @retry="refreshData"
        />
      </div>
    </div>

    <div class="charts-grid">
      <div>
        <ChartCard 
          title="Monthly Sales"
          chart-type="bar"
          :data="salesData"
          :loading="loading"
          :error="error"
          @period-change="handlePeriodChange"
          @retry="refreshData"
        />
      </div>
      <div class="col-span-2">
        <DataTable 
          title="Product Performance"
          :columns="tableColumns"
          :data="productData"
          :loading="loading"
          :error="error"
          @retry="refreshData"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import useFetchData from '../composables/useFetchData'
import MetricCard from './MetricCard.vue'
import ChartCard from './ChartCard.vue'
import DataTable from './DataTable.vue'

// Data fetching
const { salesData, productData, loading, error, fetchData } = useFetchData()

// Table columns
const tableColumns = ref([
  { key: 'product', label: 'Product' },
  { key: 'sales', label: 'Units Sold' },
  { key: 'revenue', label: 'Revenue' }
])

// Computed metrics
const totalRevenue = computed(() => {
  return salesData.value.reduce((sum, item) => sum + item.revenue, 0)
})

const totalSales = computed(() => {
  return salesData.value.reduce((sum, item) => sum + item.sales, 0)
})

const activeUsers = computed(() => {
  const lastMonth = salesData.value[salesData.value.length - 1]
  return lastMonth ? lastMonth.users : 0
})

const avgOrderValue = computed(() => {
  return totalRevenue.value / totalSales.value || 0
})

// Methods
const refreshData = () => {
  fetchData()
}

const handlePeriodChange = (period) => {
  console.log('Period changed to:', period)
  // In a real app, you would fetch new data based on the selected period
}

// Initial animations
onMounted(() => {
  // Animate the header
  gsap.from('.dashboard-header', {
    opacity: 0,
    y: -20,
    duration: 0.8
  })
  
  // Stagger animation for metric cards
  gsap.from('.metrics-grid > *', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.3
  })
})
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  background-color: #f9fafb;
  min-height: 100vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.dashboard-header p {
  font-size: 1rem;
  color: #6b7280;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.refresh-btn {
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.refresh-btn:hover:not(:disabled) {
  background-color: #4338ca;
}

.refresh-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.refresh-btn .fa-sync-alt.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.col-span-2 {
  grid-column: span 2;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .col-span-2 {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>