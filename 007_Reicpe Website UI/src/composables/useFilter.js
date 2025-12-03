import { ref, computed } from 'vue'

export function useFilter(recipes) {
  const activeFilters = ref({
    category: 'All',
    difficulty: 'All',
    cookingTime: 'All',
    searchQuery: ''
  })

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

  const updateFilter = (filterType, value) => {
    activeFilters.value[filterType] = value
  }

  const resetFilters = () => {
    activeFilters.value = {
      category: 'All',
      difficulty: 'All',
      cookingTime: 'All',
      searchQuery: ''
    }
  }

  return {
    activeFilters,
    filteredRecipes,
    updateFilter,
    resetFilters
  }
}