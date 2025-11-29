<template>
  <div id="app">
    <div class="app-container">
      <header class="app-header">
        <h1 class="app-title">🌤️ Weather Forecast</h1>
        <p class="app-subtitle">Get real-time weather updates</p>
      </header>

      <main class="main-content">
        <div class="search-section">
          <div class="search-container">
            <input
              v-model="city"
              @keyup.enter="fetchWeather"
              type="text"
              placeholder="Enter city name..."
              class="search-input"
            />
            <button @click="fetchWeather" class="search-btn" :disabled="loading">
              {{ loading ? 'Loading...' : 'Search' }}
            </button>
          </div>
        </div>

        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>Fetching weather data...</p>
        </div>

        <div v-if="error" class="error-container">
          <p>{{ error }}</p>
        </div>

        <WeatherCard 
          v-if="weatherData && !loading"
          :weather-data="weatherData"
        />

        <div v-if="!weatherData && !loading" class="welcome-message">
          <div class="welcome-icon">🌎</div>
          <h2>Welcome to Weather App</h2>
          <p>Enter a city name to get started!</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import WeatherCard from './components/WeatherCard.vue'
import { fetchWeatherData } from './utils/api'

export default {
  name: 'App',
  components: {
    WeatherCard
  },
  setup() {
    const city = ref('')
    const weatherData = ref(null)
    const loading = ref(false)
    const error = ref('')

    const fetchWeather = async () => {
      if (!city.value.trim()) {
        error.value = 'Please enter a city name'
        return
      }

      loading.value = true
      error.value = ''
      weatherData.value = null

      try {
        const data = await fetchWeatherData(city.value)
        weatherData.value = data
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    return {
      city,
      weatherData,
      loading,
      error,
      fetchWeather
    }
  }
}
</script>