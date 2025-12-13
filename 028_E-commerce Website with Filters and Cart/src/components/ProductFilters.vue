<template>
  <div class="filters">
    <h2>Filters</h2>
    
    <div class="filter-section">
      <h3>Category</h3>
      <div class="category-list">
        <label 
          v-for="category in categories" 
          :key="category"
          class="category-item"
        >
          <input 
            type="radio" 
            :value="category" 
            :checked="selectedCategory === category"
            @change="$emit('update:category', category)"
          />
          <span>{{ category }}</span>
        </label>
      </div>
    </div>
    
    <div class="filter-section">
      <h3>Price Range</h3>
      <div class="price-filter">
        <input 
          type="range" 
          :min="priceRange.min" 
          :max="priceRange.max" 
          :value="selectedPrice"
          @input="$emit('update:price', $event.target.value)"
          class="price-slider"
        />
        <div class="price-display">
          <span>Up to ${{ selectedPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  priceRange: {
    type: Object,
    default: () => ({ min: 0, max: 100 })
  },
  selectedCategory: {
    type: String,
    default: 'all'
  },
  selectedPrice: {
    type: Number,
    default: 100
  }
})

defineEmits(['update:category', 'update:price'])
</script>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.filters h2 {
  color: #1e293b;
  font-size: 20px;
  margin-bottom: 10px;
}

.filter-section h3 {
  color: #475569;
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 500;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.category-item:hover {
  background: #f1f5f9;
}

.category-item input {
  margin: 0;
}

.category-item span {
  text-transform: capitalize;
  font-size: 14px;
}

.price-filter {
  padding: 10px 0;
}

.price-slider {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #e2e8f0;
  outline: none;
  -webkit-appearance: none;
}

.price-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #2563eb;
  cursor: pointer;
}

.price-display {
  margin-top: 10px;
  font-size: 14px;
  color: #64748b;
}
</style>