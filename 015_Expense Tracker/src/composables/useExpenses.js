import { ref, computed } from 'vue';
import { gsap } from 'gsap';

export function useExpenses() {
  const expenses = ref(JSON.parse(localStorage.getItem('expenses')) || []);
  const categories = ref([
    { id: 'food', name: 'Food', color: '#ffb3c1', icon: '🍔' },
    { id: 'transport', name: 'Transport', color: '#b5e6ff', icon: '🚗' },
    { id: 'shopping', name: 'Shopping', color: '#c7f9cc', icon: '🛍️' },
    { id: 'bills', name: 'Bills', color: '#ffd6ff', icon: '💰' },
    { id: 'entertainment', name: 'Entertainment', color: '#ffef9f', icon: '🎬' },
    { id: 'other', name: 'Other', color: '#e0e1dd', icon: '📦' }
  ]);

  const totalExpenses = computed(() => {
    return expenses.value.reduce((sum, expense) => sum + expense.amount, 0);
  });

  const expensesByCategory = computed(() => {
    const result = {};
    categories.value.forEach(category => {
      result[category.id] = expenses.value
        .filter(expense => expense.category === category.id)
        .reduce((sum, expense) => sum + expense.amount, 0);
    });
    return result;
  });

  const monthlyExpenses = computed(() => {
    const monthly = {};
    expenses.value.forEach(expense => {
      const date = new Date(expense.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!monthly[monthYear]) {
        monthly[monthYear] = 0;
      }
      monthly[monthYear] += expense.amount;
    });
    return monthly;
  });

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      date: expense.date || new Date().toISOString().split('T')[0]
    };
    
    expenses.value.unshift(newExpense);
    saveToLocalStorage();
    
    // GSAP animation for new expense
    gsap.from('.expense-item:first-child', {
      duration: 0.5,
      y: -20,
      opacity: 0,
      ease: 'back.out(1.7)'
    });
  };

  const deleteExpense = (id) => {
    const index = expenses.value.findIndex(expense => expense.id === id);
    if (index !== -1) {
      // GSAP animation for deletion
      gsap.to(`#expense-${id}`, {
        duration: 0.3,
        opacity: 0,
        x: -50,
        onComplete: () => {
          expenses.value.splice(index, 1);
          saveToLocalStorage();
        }
      });
    }
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('expenses', JSON.stringify(expenses.value));
  };

  return {
    expenses,
    categories,
    totalExpenses,
    expensesByCategory,
    monthlyExpenses,
    addExpense,
    deleteExpense
  };
}