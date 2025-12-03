<template>
  <div class="filter-bar dark-filter">
    <div class="filter-group">
      <label>Category</label>
      <div class="category-select">
        <select v-model="localFilters.category" @change="updateFilters" class="filter-select">
          <option v-for="category in props.categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <div class="select-arrow">▼</div>
      </div>
    </div>
    
    <div class="filter-group">
      <label>Difficulty Level</label>
      <div class="filter-buttons">
        <button
          v-for="difficulty in props.difficulties"
          :key="difficulty"
          @click="setDifficulty(difficulty)"
          :class="['filter-btn', { active: localFilters.difficulty === difficulty }]"
        >
          {{ difficulty }}
        </button>
      </div>
    </div>
    
    <div class="filter-group">
      <label>Cooking Time</label>
      <div class="filter-buttons">
        <button
          v-for="time in props.cookingTimes"
          :key="time"
          @click="setCookingTime(time)"
          :class="['filter-btn', { active: localFilters.cookingTime === time }]"
        >
          {{ time }}
        </button>
      </div>
    </div>
    
    <button @click="clearFilters" class="clear-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 8px;">
        <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      Clear All
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  categories: Array,
  difficulties: Array,
  cookingTimes: Array
})

const emit = defineEmits(['filter-change'])

const localFilters = ref({
  category: 'All',
  difficulty: 'All',
  cookingTime: 'All',
  searchQuery: ''
})

const setDifficulty = (difficulty) => {
  localFilters.value.difficulty = difficulty
  updateFilters()
}

const setCookingTime = (time) => {
  localFilters.value.cookingTime = time
  updateFilters()
}

const updateFilters = () => {
  emit('filter-change', { ...localFilters.value })
}

const clearFilters = () => {
  localFilters.value = {
    category: 'All',
    difficulty: 'All',
    cookingTime: 'All',
    searchQuery: ''
  }
  emit('filter-change', { ...localFilters.value })
}
</script>

<style scoped>
.filter-bar {
  background: #1a1a1a;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #333;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  align-items: end;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: #b0b0b0;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.category-select {
  position: relative;
}

.filter-select {
  width: 100%;
  padding: 0.75rem;
  background: #0f0f0f;
  border: 1px solid #333;
  border-radius: 8px;
  font-size: 0.9rem;
  color: white;
  cursor: pointer;
  appearance: none;
  transition: all 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1rem;
  background: #0f0f0f;
  border: 1px solid #333;
  color: #888;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  font-weight: 500;
}

.filter-btn:hover {
  border-color: #8b5cf6;
  color: #8b5cf6;
}

.filter-btn.active {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  border-color: transparent;
}

.clear-btn {
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: #888;
  border: 1px solid #333;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  align-self: center;
}

.clear-btn:hover {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .filter-bar {
    grid-template-columns: 1fr;
  }
  
  .filter-buttons {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  .filter-btn {
    flex-shrink: 0;
  }
}
</style>