<template>
  <div class="recipe-card dark-card" :data-id="recipe.id" @mouseenter="onHover" @mouseleave="onLeave">
    <div class="card-image">
      <img :src="recipe.image" :alt="recipe.title" />
      <div class="image-overlay"></div>
      <div class="card-badge">{{ recipe.category }}</div>
      <div class="card-time">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 4px;">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        {{ recipe.time }}min
      </div>
    </div>
    
    <div class="card-content">
      <div class="card-header">
        <h3 class="card-title">{{ recipe.title }}</h3>
        <div class="card-rating">
          <div class="stars">
            <span v-for="n in 5" :key="n" :class="['star', n <= Math.floor(recipe.rating) ? 'filled' : '']">
              ★
            </span>
          </div>
          <span class="rating-number">{{ recipe.rating }}</span>
        </div>
      </div>
      
      <p class="card-description">{{ recipe.description }}</p>
      
      <div class="card-details">
        <div class="detail-item">
          <span class="detail-label">Difficulty:</span>
          <span :class="['difficulty', recipe.difficulty.toLowerCase()]">
            {{ recipe.difficulty }}
          </span>
        </div>
      </div>
      
      <div class="card-ingredients">
        <div class="ingredients-label">Key Ingredients:</div>
        <div class="ingredients-list">
          <span v-for="ingredient in recipe.ingredients.slice(0, 3)" :key="ingredient" class="ingredient-tag">
            {{ ingredient }}
          </span>
          <span v-if="recipe.ingredients.length > 3" class="ingredient-more">
            +{{ recipe.ingredients.length - 3 }}
          </span>
        </div>
      </div>
      
      <button class="view-recipe-btn" @click="$emit('click')">
        View Full Recipe
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-left: 8px;">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  recipe: Object
})

defineEmits(['click'])

const onHover = (event) => {
  event.currentTarget.style.transform = 'translateY(-8px)'
  event.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)'
}

const onLeave = (event) => {
  event.currentTarget.style.transform = 'translateY(0)'
  event.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
}
</script>

<style scoped>
.recipe-card {
  background: #1a1a1a;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.recipe-card:hover .card-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
}

.card-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-time {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  backdrop-filter: blur(4px);
}

.card-content {
  padding: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin: 0;
  flex: 1;
}

.card-rating {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #333;
  font-size: 0.9rem;
}

.star.filled {
  color: #fbbf24;
}

.rating-number {
  font-size: 0.85rem;
  color: #888;
  font-weight: 600;
}

.card-description {
  color: #b0b0b0;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  height: 2.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-details {
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-label {
  font-weight: 500;
  color: #888;
  font-size: 0.85rem;
}

.difficulty {
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.difficulty.easy {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.difficulty.medium {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.difficulty.hard {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.card-ingredients {
  margin-bottom: 1.5rem;
}

.ingredients-label {
  font-weight: 600;
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ingredients-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ingredient-tag {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  color: #b0b0b0;
  border: 1px solid #333;
}

.ingredient-more {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.view-recipe-btn {
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-recipe-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(139, 92, 246, 0.3);
}
</style>