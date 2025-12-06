<template>
  <div class="card">
    <h2 class="card-title">Add New Expense</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label">Description</label>
        <input
          v-model="form.description"
          type="text"
          class="form-control"
          placeholder="What did you spend on?"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label">Amount ($)</label>
        <input
          v-model.number="form.amount"
          type="number"
          class="form-control"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label">Category</label>
        <div class="category-grid">
          <div
            v-for="category in categories"
            :key="category.id"
            class="category-option"
            :class="{ selected: form.category === category.id }"
            @click="form.category = category.id"
          >
            <span class="category-icon">{{ category.icon }}</span>
            <span class="category-name">{{ category.name }}</span>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Date</label>
        <input
          v-model="form.date"
          type="date"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary" style="width: 100%">
        Add Expense
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  categories: Array,
  addExpense: Function
});

const form = ref({
  description: '',
  amount: null,
  category: 'food',
  date: new Date().toISOString().split('T')[0]
});

onMounted(() => {
  // GSAP animation for form entrance
  gsap.from('.card', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
  });
});

const handleSubmit = () => {
  props.addExpense({
    description: form.value.description,
    amount: parseFloat(form.value.amount),
    category: form.value.category,
    date: form.value.date
  });

  // Reset form
  form.value.description = '';
  form.value.amount = null;
  form.value.category = 'food';
  form.value.date = new Date().toISOString().split('T')[0];

  // GSAP button animation
  gsap.to('.btn-primary', {
    duration: 0.3,
    scale: 0.95,
    yoyo: true,
    repeat: 1
  });
};
</script>

<style scoped>
.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.category-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 5px;
  border: 2px solid var(--light-gray);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-option:hover {
  transform: translateY(-3px);
  border-color: var(--primary);
}

.category-option.selected {
  border-color: var(--primary);
  background-color: rgba(67, 97, 238, 0.1);
}

.category-icon {
  font-size: 1.8rem;
  margin-bottom: 5px;
}

.category-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--dark);
}
</style>