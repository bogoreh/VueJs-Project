<template>
  <div class="app">
    <header class="header">
      <h1 class="title" ref="titleRef">🎬 Movie Search</h1>
      <SearchBar 
        @search="handleSearch" 
        @clear="handleClear"
      />
    </header>

    <main class="main-content">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading movies...</p>
      </div>

      <div v-else-if="movies.length === 0 && !searchQuery" class="empty-state">
        <p>Search for your favorite movies!</p>
      </div>

      <div v-else-if="movies.length === 0" class="empty-state">
        <p>No movies found for "{{ searchQuery }}"</p>
      </div>

      <div v-else class="movies-grid">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @click="showMovieDetail(movie)"
        />
      </div>
    </main>

    <MovieDetail
      v-if="selectedMovie"
      :movie="selectedMovie"
      :is-visible="isDetailVisible"
      @close="closeMovieDetail"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import SearchBar from './components/SearchBar.vue'
import MovieCard from './components/MovieCard.vue'
import MovieDetail from './components/MovieDetail.vue'
import { searchMovies, getMovieDetails } from './composables/useMovies'

const titleRef = ref(null)
const movies = ref([])
const selectedMovie = ref(null)
const searchQuery = ref('')
const loading = ref(false)
const isDetailVisible = ref(false)

onMounted(() => {
  // Animate title on mount
  if (titleRef.value) {
    gsap.from(titleRef.value, {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: 'bounce.out'
    })
  }
})

const handleSearch = async (query) => {
  if (!query.trim()) return
  
  searchQuery.value = query
  loading.value = true
  
  try {
    const results = await searchMovies(query)
    movies.value = results
    
    // Animate movie cards entrance
    gsap.from('.movie-card', {
      duration: 0.5,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out'
    })
  } catch (error) {
    console.error('Search error:', error)
  } finally {
    loading.value = false
  }
}

const handleClear = () => {
  searchQuery.value = ''
  movies.value = []
}

const showMovieDetail = async (movie) => {
  loading.value = true
  try {
    const details = await getMovieDetails(movie.id)
    selectedMovie.value = details
    isDetailVisible.value = true
  } catch (error) {
    console.error('Error fetching movie details:', error)
  } finally {
    loading.value = false
  }
}

const closeMovieDetail = () => {
  isDetailVisible.value = false
  setTimeout(() => {
    selectedMovie.value = null
  }, 300)
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  color: white;
}

.header {
  padding: 2rem 1rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.title {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #f06, #9f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.loading {
  text-align: center;
  padding: 4rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #f06;
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 4rem;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

@media (max-width: 768px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
}
</style>