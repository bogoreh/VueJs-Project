<template>
  <div class="app dark-theme">
    <HeroSection @search="handleSearch" />
    <div class="container">
      <FilterBar 
        :categories="categories"
        :difficulties="difficulties"
        :cookingTimes="cookingTimes"
        @filter-change="handleFilterChange"
      />
      
      <div class="recipes-grid">
        <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
          @click="animateCard(recipe.id)"
        />
      </div>
      
      <div v-if="filteredRecipes.length === 0" class="no-results">
        <h3>No recipes found matching your filters</h3>
        <button @click="resetFilters" class="reset-btn">Reset Filters</button>
      </div>
    </div>
    
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>RecipeHub</h4>
          <p>Discover culinary delights from around the world</p>
        </div>
        <div class="footer-section">
          <h4>Categories</h4>
          <div class="footer-links">
            <a href="#">Italian</a>
            <a href="#">Asian</a>
            <a href="#">Desserts</a>
            <a href="#">Vegetarian</a>
          </div>
        </div>
        <div class="footer-section">
          <h4>Connect</h4>
          <div class="social-icons">
            <span>📘</span>
            <span>📸</span>
            <span>🐦</span>
            <span>📺</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 RecipeHub. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import HeroSection from './components/HeroSection.vue'
import FilterBar from './components/FilterBar.vue'
import RecipeCard from './components/RecipeCard.vue'

// Sample recipe data - updated for dark theme
const recipes = ref([
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    description: "A rich and creamy pasta with garlic and Parmesan",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&auto=format&fit=crop",
    category: "Pasta",
    difficulty: "Easy",
    time: 20,
    rating: 4.5,
    ingredients: ["Pasta", "Garlic", "Cream", "Parmesan", "Parsley"]
  },
  {
    id: 2,
    title: "Spicy Chicken Curry",
    description: "Aromatic Indian curry with tender chicken pieces",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop",
    category: "Curry",
    difficulty: "Medium",
    time: 45,
    rating: 4.8,
    ingredients: ["Chicken", "Curry Powder", "Coconut Milk", "Onions", "Spices"]
  },
  {
    id: 3,
    title: "Mediterranean Salad",
    description: "Fresh salad with feta cheese and olives",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop",
    category: "Salad",
    difficulty: "Easy",
    time: 15,
    rating: 4.3,
    ingredients: ["Tomatoes", "Cucumber", "Feta", "Olives", "Olive Oil"]
  },
  {
    id: 4,
    title: "Grilled Ribeye Steak",
    description: "Perfectly grilled steak with herb butter",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&auto=format&fit=crop",
    category: "Meat",
    difficulty: "Medium",
    time: 30,
    rating: 4.7,
    ingredients: ["Ribeye Steak", "Butter", "Rosemary", "Garlic", "Thyme"]
  },
  {
    id: 5,
    title: "Vegetable Stir Fry",
    description: "Colorful vegetables in a savory sauce",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop",
    category: "Vegetarian",
    difficulty: "Easy",
    time: 25,
    rating: 4.4,
    ingredients: ["Bell Peppers", "Broccoli", "Carrots", "Soy Sauce", "Ginger"]
  },
  {
    id: 6,
    title: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop",
    category: "Dessert",
    difficulty: "Hard",
    time: 60,
    rating: 4.9,
    ingredients: ["Dark Chocolate", "Flour", "Eggs", "Sugar", "Butter"]
  },
  {
    id: 7,
    title: "Seafood Paella",
    description: "Spanish rice dish with mixed seafood",
    image: "https://images.unsplash.com/photo-1533157950006-3e6d3f5e7b3b?w=400&auto=format&fit=crop",
    category: "Seafood",
    difficulty: "Hard",
    time: 50,
    rating: 4.6,
    ingredients: ["Rice", "Shrimp", "Mussels", "Bell Peppers", "Saffron"]
  },
  {
    id: 8,
    title: "Avocado Toast",
    description: "Simple breakfast with smashed avocado",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&auto=format&fit=crop",
    category: "Breakfast",
    difficulty: "Easy",
    time: 10,
    rating: 4.2,
    ingredients: ["Avocado", "Sourdough", "Lemon", "Chili Flakes", "Egg"]
  }
])

// Filter options
const categories = ['All', 'Pasta', 'Curry', 'Salad', 'Meat', 'Vegetarian', 'Dessert', 'Seafood', 'Breakfast']
const difficulties = ['All', 'Easy', 'Medium', 'Hard']
const cookingTimes = ['All', 'Quick (<30min)', 'Medium (30-45min)', 'Long (>45min)']

// Filter state
const activeFilters = ref({
  category: 'All',
  difficulty: 'All',
  cookingTime: 'All',
  searchQuery: ''
})

// Handle filter changes
const handleFilterChange = (filters) => {
  activeFilters.value = { ...filters }
}

// Handle search from HeroSection
const handleSearch = (query) => {
  activeFilters.value.searchQuery = query
}

// Filter recipes
const filteredRecipes = computed(() => {
  return recipes.value.filter(recipe => {
    // Category filter
    if (activeFilters.value.category !== 'All' && 
        recipe.category !== activeFilters.value.category) {
      return false
    }
    
    // Difficulty filter
    if (activeFilters.value.difficulty !== 'All' && 
        recipe.difficulty !== activeFilters.value.difficulty) {
      return false
    }
    
    // Cooking time filter
    if (activeFilters.value.cookingTime !== 'All') {
      const time = recipe.time
      switch(activeFilters.value.cookingTime) {
        case 'Quick (<30min)':
          if (time >= 30) return false
          break
        case 'Medium (30-45min)':
          if (time < 30 || time > 45) return false
          break
        case 'Long (>45min)':
          if (time <= 45) return false
          break
      }
    }
    
    // Search filter
    if (activeFilters.value.searchQuery) {
      const query = activeFilters.value.searchQuery.toLowerCase()
      return recipe.title.toLowerCase().includes(query) ||
             recipe.description.toLowerCase().includes(query) ||
             recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
    }
    
    return true
  })
})

// Animation function (CSS-based for now)
const animateCard = (id) => {
  const card = document.querySelector(`[data-id="${id}"]`)
  if (card) {
    card.style.transform = 'scale(0.95)'
    setTimeout(() => {
      card.style.transform = 'scale(1)'
    }, 150)
  }
}

// Reset all filters
const resetFilters = () => {
  activeFilters.value = {
    category: 'All',
    difficulty: 'All',
    cookingTime: 'All',
    searchQuery: ''
  }
}

onMounted(() => {
  // Simple CSS animation on mount
  setTimeout(() => {
    const grid = document.querySelector('.recipes-grid')
    if (grid) {
      grid.style.opacity = '1'
      grid.style.transform = 'translateY(0)'
    }
  }, 100)
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #0f0f0f;
  color: #e0e0e0;
}

.dark-theme {
  --bg-primary: #0f0f0f;
  --bg-secondary: #1a1a1a;
  --bg-card: #1f1f1f;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --text-muted: #888888;
  --accent-primary: #8b5cf6;
  --accent-secondary: #10b981;
  --accent-danger: #ef4444;
  --border-color: #333333;
  --shadow-color: rgba(0, 0, 0, 0.3);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.no-results {
  text-align: center;
  padding: 4rem;
  background: var(--bg-card);
  border-radius: 12px;
  margin-top: 2rem;
  border: 1px solid var(--border-color);
}

.no-results h3 {
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.reset-btn {
  background: var(--accent-primary);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px var(--shadow-color);
}

.reset-btn:hover {
  background: #7c3aed;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px var(--shadow-color);
}

.footer {
  background: var(--bg-secondary);
  margin-top: 5rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border-color);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
}

.footer-section h4 {
  color: var(--text-primary);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.footer-section p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--accent-primary);
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icons span {
  background: var(--bg-card);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-icons span:hover {
  background: var(--accent-primary);
  transform: translateY(-3px);
}

.footer-bottom {
  text-align: center;
  padding: 2rem;
  margin-top: 3rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .recipes-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>