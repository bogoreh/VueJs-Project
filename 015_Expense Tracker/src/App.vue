<template>
  <div id="app">
    <header>
      <h1>💰 Expense Tracker</h1>
      <p class="subtitle">Track, categorize, and visualize your daily expenses</p>
    </header>

    <div class="total-container" ref="totalRef">
      <p>Total Expenses</p>
      <div class="total-amount">${{ totalExpenses.toFixed(2) }}</div>
      <p>{{ expenses.length }} expenses logged</p>
    </div>

    <main class="container">
      <ExpenseForm
        :categories="categories"
        :add-expense="addExpense"
      />
      
      <ExpenseList
        :expenses="expenses"
        :categories="categories"
        :total-expenses="totalExpenses"
        :delete-expense="deleteExpense"
      />
    </main>

    <ExpenseCharts
      :expenses="expenses"
      :expenses-by-category="expensesByCategory"
      :monthly-expenses="monthlyExpenses"
      :categories="categories"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import ExpenseForm from './components/ExpenseForm.vue';
import ExpenseList from './components/ExpenseList.vue';
import ExpenseCharts from './components/ExpenseCharts.vue';
import { useExpenses } from './composables/useExpenses';

const totalRef = ref(null);

const {
  expenses,
  categories,
  totalExpenses,
  expensesByCategory,
  monthlyExpenses,
  addExpense,
  deleteExpense
} = useExpenses();

onMounted(() => {
  // GSAP animations on page load
  gsap.from('header', {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: 'power2.out'
  });

  gsap.from('.total-container', {
    duration: 0.8,
    scale: 0.8,
    opacity: 0,
    delay: 0.3,
    ease: 'back.out(1.7)'
  });

  // Pulse animation for total amount
  gsap.to('.total-amount', {
    duration: 2,
    scale: 1.05,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
});
</script>

<style scoped>
.container {
  margin: 30px 0;
}

.total-container {
  margin-bottom: 30px;
}
</style>