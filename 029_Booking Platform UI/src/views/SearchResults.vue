<template>
  <div class="search-results">
    <div class="search-header">
      <h2>Search Results</h2>
      <p>{{ accommodations.length }} properties found</p>
    </div>

    <div class="results-container">
      <!-- Filters Sidebar -->
      <aside class="filters-sidebar">
        <div class="filter-section">
          <h3>Price Range</h3>
          <div class="price-slider">
            <input 
              type="range" 
              min="0" 
              max="1000" 
              v-model="filters.maxPrice"
              class="slider"
            >
            <div class="price-display">Up to ${{ filters.maxPrice }}</div>
          </div>
        </div>

        <div class="filter-section">
          <h3>Star Rating</h3>
          <div class="rating-filters">
            <label v-for="rating in [5,4,3,2,1]" :key="rating">
              <input 
                type="checkbox" 
                :value="rating" 
                v-model="filters.ratings"
              >
              <span class="stars">
                <i 
                  v-for="n in 5" 
                  :key="n" 
                  :class="['fas', 'fa-star', n <= rating ? 'filled' : 'empty']"
                ></i>
              </span>
              & above
            </label>
          </div>
        </div>

        <div class="filter-section">
          <h3>Amenities</h3>
          <div class="amenities-filters">
            <label v-for="amenity in amenities" :key="amenity">
              <input 
                type="checkbox" 
                :value="amenity" 
                v-model="filters.amenities"
              >
              {{ amenity }}
            </label>
          </div>
        </div>

        <button class="btn btn-block" @click="applyFilters">Apply Filters</button>
      </aside>

      <!-- Results List -->
      <main class="results-list">
        <div class="sort-options">
          <select v-model="sortBy" @change="sortResults">
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div class="accommodations-list">
          <AccommodationCard
            v-for="accommodation in filteredAccommodations"
            :key="accommodation.id"
            :accommodation="accommodation"
          />
        </div>

        <div v-if="filteredAccommodations.length === 0" class="no-results">
          <i class="fas fa-search fa-3x"></i>
          <h3>No accommodations found</h3>
          <p>Try adjusting your filters or search criteria</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AccommodationCard from '../components/AccommodationCard.vue'

export default {
  name: 'SearchResults',
  components: {
    AccommodationCard
  },
  data() {
    return {
      accommodations: [
        {
          id: 1,
          name: 'Luxury Villa with Ocean View',
          location: 'Bali, Indonesia',
          description: 'Beautiful villa with private pool and stunning ocean views.',
          rating: 4.8,
          guests: 4,
          bedrooms: 2,
          bathrooms: 2,
          price: 299,
          originalPrice: 399,
          discount: 25,
          amenities: ['Pool', 'WiFi', 'Kitchen', 'AC'],
          image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        // Add more accommodations...
      ],
      filters: {
        maxPrice: 500,
        ratings: [],
        amenities: []
      },
      amenities: ['Pool', 'WiFi', 'Kitchen', 'AC', 'Parking', 'Gym', 'Spa', 'Beachfront'],
      sortBy: 'price-low'
    }
  },
  computed: {
    filteredAccommodations() {
      let filtered = [...this.accommodations]

      // Filter by price
      filtered = filtered.filter(acc => acc.price <= this.filters.maxPrice)

      // Filter by ratings
      if (this.filters.ratings.length > 0) {
        filtered = filtered.filter(acc => 
          this.filters.ratings.some(rating => acc.rating >= rating)
        )
      }

      // Filter by amenities
      if (this.filters.amenities.length > 0) {
        filtered = filtered.filter(acc => 
          this.filters.amenities.every(amenity => acc.amenities.includes(amenity))
        )
      }

      return filtered
    }
  },
  methods: {
    applyFilters() {
      // Filter logic is handled in computed property
    },
    sortResults() {
      this.filteredAccommodations.sort((a, b) => {
        switch (this.sortBy) {
          case 'price-low':
            return a.price - b.price
          case 'price-high':
            return b.price - a.price
          case 'rating':
            return b.rating - a.rating
          default:
            return 0
        }
      })
    }
  },
  mounted() {
    // Simulate fetching search results based on query parameters
    const query = this.$route.query
    console.log('Search query:', query)
  }
}
</script>

<style scoped>
.search-header {
  text-align: center;
  margin-bottom: 40px;
}

.search-header h2 {
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
}

.search-header p {
  color: #666;
  font-size: 18px;
}

.results-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 30px;
}

.filters-sidebar {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.filter-section {
  margin-bottom: 25px;
}

.filter-section h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.price-slider {
  padding: 10px 0;
}

.slider {
  width: 100%;
  margin: 10px 0;
}

.price-display {
  text-align: center;
  font-weight: 500;
  color: #0071c2;
  margin-top: 10px;
}

.rating-filters,
.amenities-filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rating-filters label,
.amenities-filters label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.stars {
  color: #ffc107;
}

.stars .empty {
  color: #ddd;
}

.sort-options {
  margin-bottom: 20px;
  text-align: right;
}

.sort-options select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-width: 200px;
}

.accommodations-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.no-results i {
  margin-bottom: 20px;
  color: #ddd;
}

.no-results h3 {
  margin-bottom: 10px;
  color: #333;
}

@media (max-width: 1024px) {
  .results-container {
    grid-template-columns: 1fr;
  }
  
  .filters-sidebar {
    position: static;
  }
  
  .accommodations-list {
    grid-template-columns: 1fr;
  }
}
</style>