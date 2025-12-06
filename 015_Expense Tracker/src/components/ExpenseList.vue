<template>
  <div class="card">
    <h2 class="card-title">Recent Expenses</h2>
    
    <div v-if="expenses.length > 0">
      <div class="expenses-summary">
        <div class="summary-item">
          <span class="summary-label">Total Expenses:</span>
          <span class="summary-value">${{ totalExpenses.toFixed(2) }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Expenses Count:</span>
          <span class="summary-value">{{ expenses.length }}</span>
        </div>
      </div>

      <div class="expense-filters">
        <select v-model="selectedCategory" class="form-control filter-select">
          <option value="all">All Categories</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search expenses..."
        />
      </div>

      <div class="expenses-list">
        <div
          v-for="expense in filteredExpenses"
          :id="'expense-' + expense.id"
          :key="expense.id"
          class="expense-item"
        >
          <div class="expense-info">
            <h4>{{ expense.description }}</h4>
            <p>
              <span class="badge" :class="'badge-' + expense.category">
                {{ getCategoryName(expense.category) }}
              </span>
              • {{ formatDate(expense.date) }}
            </p>
          </div>
          <div class="expense-actions">
            <span class="expense-amount">${{ expense.amount.toFixed(2) }}</span>
            <button
              @click="deleteExpense(expense.id)"
              class="btn-delete"
              title="Delete expense"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-expenses">
      <div class="empty-state-icon">📊</div>
      <h3>No expenses yet</h3>
      <p>Add your first expense to get started!</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  expenses: Array,
  categories: Array,
  totalExpenses: Number,
  deleteExpense: Function
});

const selectedCategory = ref('all');
const searchQuery = ref('');

const filteredExpenses = computed(() => {
  return props.expenses.filter(expense => {
    const matchesCategory = selectedCategory.value === 'all' || 
                           expense.category === selectedCategory.value;
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

const getCategoryName = (categoryId) => {
  const category = props.categories.find(c => c.id === categoryId);
  return category ? category.name : 'Unknown';
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

onMounted(() => {
  // GSAP animation for list items
  gsap.from('.expense-item', {
    duration: 0.5,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    ease: 'power2.out'
  });
});
</script>

<style scoped>
.expenses-summary {
  display: flex;
  justify-content: space-between;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.summary-item {
  text-align: center;
}

.summary-label {
  display: block;
  color: var(--gray);
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.summary-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.expense-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-select {
  flex: 1;
}

.expenses-list {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 5px;
}

.expense-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-delete {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
  padding: 5px;
  border-radius: 5px;
}

.btn-delete:hover {
  opacity: 1;
  background: rgba(247, 37, 133, 0.1);
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: 15px;
  opacity: 0.3;
}
</style>