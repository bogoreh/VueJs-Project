const API_KEY = 'ce1dea0f76a8f0b3bfe4dad260cbef10' // Get free API key from openweathermap.org
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.')
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.')
      } else {
        throw new Error('Failed to fetch weather data. Please try again later.')
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error. Please check your internet connection.')
    }
    throw error
  }
}