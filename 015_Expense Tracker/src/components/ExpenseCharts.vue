<template>
  <div class="card">
    <h2 class="card-title">Expense Analytics</h2>
    
    <div v-if="expenses.length > 0" class="charts-container">
      <div class="chart-wrapper">
        <h3>By Category</h3>
        <div class="chart-container">
          <canvas ref="categoryChart"></canvas>
        </div>
      </div>

      <div class="chart-wrapper">
        <h3>Monthly Overview</h3>
        <div class="chart-container">
          <canvas ref="monthlyChart"></canvas>
        </div>
      </div>

      <div class="chart-wrapper full-width">
        <h3>Top Expenses</h3>
        <div class="top-expenses">
          <div
            v-for="expense in topExpenses"
            :key="expense.id"
            class="top-expense-item"
          >
            <div class="expense-bar">
              <div
                class="bar-fill"
                :style="{ width: (expense.amount / maxExpense) * 100 + '%' }"
              ></div>
            </div>
            <div class="expense-details">
              <span class="expense-name">{{ expense.description }}</span>
              <span class="expense-amount">${{ expense.amount.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-data">
      <div class="no-data-icon">📈</div>
      <h3>No data to display</h3>
      <p>Add some expenses to see charts and analytics</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { Chart, registerables } from 'chart.js';
import { gsap } from 'gsap';

Chart.register(...registerables);

const props = defineProps({
  expenses: Array,
  expensesByCategory: Object,
  monthlyExpenses: Object,
  categories: Array
});

const categoryChart = ref(null);
const monthlyChart = ref(null);
let categoryChartInstance = null;
let monthlyChartInstance = null;

const topExpenses = computed(() => {
  return [...props.expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);
});

const maxExpense = computed(() => {
  return Math.max(...topExpenses.value.map(e => e.amount));
});

const initCharts = () => {
  if (categoryChartInstance) categoryChartInstance.destroy();
  if (monthlyChartInstance) monthlyChartInstance.destroy();

  // Category Chart
  const categoryData = {
    labels: props.categories.map(c => c.name),
    datasets: [{
      data: props.categories.map(c => props.expensesByCategory[c.id] || 0),
      backgroundColor: props.categories.map(c => c.color),
      borderWidth: 2,
      borderColor: 'white'
    }]
  };

  categoryChartInstance = new Chart(categoryChart.value, {
    type: 'doughnut',
    data: categoryData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  });

  // Monthly Chart
  const monthlyLabels = Object.keys(props.monthlyExpenses)
    .sort()
    .map(date => {
      const [year, month] = date.split('-');
      return new Date(year, month - 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    });

  const monthlyData = Object.keys(props.monthlyExpenses)
    .sort()
    .map(date => props.monthlyExpenses[date]);

  monthlyChartInstance = new Chart(monthlyChart.value, {
    type: 'line',
    data: {
      labels: monthlyLabels,
      datasets: [{
        label: 'Monthly Expenses',
        data: monthlyData,
        borderColor: '#4361ee',
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value;
            }
          }
        }
      }
    }
  });

  // Animate chart entrance
  gsap.from('.chart-container', {
    duration: 1,
    opacity: 0,
    y: 20,
    stagger: 0.2,
    ease: 'power2.out'
  });
};

watch(() => props.expenses, () => {
  if (props.expenses.length > 0) {
    initCharts();
  }
}, { deep: true });

onMounted(() => {
  if (props.expenses.length > 0) {
    initCharts();
  }
});
</script>

<style scoped>
.charts-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.chart-wrapper {
  background: var(--light);
  padding: 15px;
  border-radius: 10px;
}

.chart-wrapper h3 {
  margin-bottom: 15px;
  color: var(--secondary);
  font-size: 1.2rem;
}

.chart-wrapper.full-width {
  grid-column: 1 / -1;
}

.chart-container {
  height: 250px;
}

.top-expenses {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.top-expense-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.expense-bar {
  flex: 1;
  height: 20px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--success));
  border-radius: 10px;
  transition: width 1s ease;
}

.expense-details {
  display: flex;
  justify-content: space-between;
  width: 200px;
}

.expense-name {
  font-weight: 600;
  color: var(--dark);
}

.expense-amount {
  font-weight: 700;
  color: var(--primary);
}

.no-data {
  text-align: center;
  padding: 40px;
}

.no-data-icon {
  font-size: 4rem;
  opacity: 0.3;
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .charts-container {
    grid-template-columns: 1fr;
  }
}
</style>