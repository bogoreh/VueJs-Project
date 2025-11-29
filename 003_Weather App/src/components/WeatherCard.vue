<template>
  <div class="weather-card">
    <div class="weather-header">
      <h2 class="city-name">{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <p class="current-date">{{ currentDate }}</p>
    </div>

    <div class="weather-main">
      <div class="temperature-section">
        <div class="current-temp">
          <span class="temp-value">{{ Math.round(weatherData.main.temp) }}</span>
          <span class="temp-unit">°C</span>
        </div>
        <div class="weather-condition">
          <img 
            :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" 
            :alt="weatherData.weather[0].description"
            class="weather-icon"
          />
          <p class="condition-text">{{ weatherData.weather[0].description }}</p>
        </div>
      </div>

      <div class="weather-details">
        <div class="detail-item">
          <span class="detail-label">Feels like</span>
          <span class="detail-value">{{ Math.round(weatherData.main.feels_like) }}°C</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Humidity</span>
          <span class="detail-value">{{ weatherData.main.humidity }}%</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Wind</span>
          <span class="detail-value">{{ Math.round(weatherData.wind.speed) }} m/s</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Pressure</span>
          <span class="detail-value">{{ weatherData.main.pressure }} hPa</span>
        </div>
      </div>
    </div>

    <div class="additional-info">
      <div class="info-item">
        <span class="info-label">Min Temp</span>
        <span class="info-value">{{ Math.round(weatherData.main.temp_min) }}°C</span>
      </div>
      <div class="info-item">
        <span class="info-label">Max Temp</span>
        <span class="info-value">{{ Math.round(weatherData.main.temp_max) }}°C</span>
      </div>
      <div class="info-item">
        <span class="info-label">Visibility</span>
        <span class="info-value">{{ (weatherData.visibility / 1000).toFixed(1) }} km</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'WeatherCard',
  props: {
    weatherData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const currentDate = computed(() => {
      return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    })

    return {
      currentDate
    }
  }
}
</script>

<style scoped>
.weather-card {
  background: linear-gradient(135deg, var(--card-gradient-start), var(--card-gradient-end));
  border-radius: 20px;
  padding: 2.5rem;
  color: #ffffff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.weather-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-color-1), var(--accent-color-2));
}

.weather-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  opacity: 0.1;
}

.weather-header {
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 2;
}

.city-name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.current-date {
  opacity: 0.7;
  font-size: 1rem;
  color: #a0a0a0;
  font-weight: 400;
}

.weather-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.temperature-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.current-temp {
  display: flex;
  align-items: flex-start;
}

.temp-value {
  font-size: 4rem;
  font-weight: 300;
  line-height: 1;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.temp-unit {
  font-size: 1.8rem;
  margin-top: 0.8rem;
  opacity: 0.7;
  color: #a0a0a0;
}

.weather-condition {
  text-align: center;
}

.weather-icon {
  width: 90px;
  height: 90px;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3)) brightness(1.1);
}

.condition-text {
  text-transform: capitalize;
  margin-top: 0.8rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.weather-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 2;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.detail-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
}

.detail-label {
  font-size: 0.85rem;
  opacity: 0.7;
  font-weight: 500;
  color: #a0a0a0;
}

.detail-value {
  font-weight: 600;
  font-size: 1.1rem;
  color: #ffffff;
}

.additional-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  position: relative;
  z-index: 2;
}

.info-item {
  text-align: center;
  padding: 1.2rem 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.info-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.1);
}

.info-label {
  display: block;
  font-size: 0.75rem;
  opacity: 0.7;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #a0a0a0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  display: block;
  font-weight: 600;
  font-size: 1rem;
  color: #ffffff;
}

/* Dark Professional Color Schemes */
.weather-card.cold {
  --card-gradient-start: #1e3c72;
  --card-gradient-end: #2a5298;
  --accent-color-1: #4facfe;
  --accent-color-2: #00f2fe;
}

.weather-card.moderate {
  --card-gradient-start: #2c3e50;
  --card-gradient-end: #3498db;
  --accent-color-1: #667eea;
  --accent-color-2: #764ba2;
}

.weather-card.warm {
  --card-gradient-start: #556270;
  --card-gradient-end: #ff6b6b;
  --accent-color-1: #f093fb;
  --accent-color-2: #f5576c;
}

.weather-card.hot {
  --card-gradient-start: #ff6b6b;
  --card-gradient-end: #ff8e53;
  --accent-color-1: #ff9a9e;
  --accent-color-2: #fecfef;
}

.weather-card.very-hot {
  --card-gradient-start: #ff8a00;
  --card-gradient-end: #ff2070;
  --accent-color-1: #ff6b6b;
  --accent-color-2: #ff8e53;
}

@media (max-width: 768px) {
  .weather-main {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .temperature-section {
    flex-direction: column;
    gap: 1rem;
  }
  
  .weather-details {
    grid-template-columns: 1fr;
  }
  
  .additional-info {
    grid-template-columns: 1fr;
  }
  
  .weather-card {
    padding: 2rem 1.5rem;
    margin: 0 1rem;
  }
  
  .temp-value {
    font-size: 3.5rem;
  }
}
</style>