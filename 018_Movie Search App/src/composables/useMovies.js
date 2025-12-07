import axios from 'axios'

// Replace with your TMDB API key
const API_KEY = '3dfc9465df99b0515a51e6a0b4b1b2f5'
const BASE_URL = 'https://api.themoviedb.org/3'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US'
  }
})

export const searchMovies = async (query) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        include_adult: false
      }
    })
    return response.data.results
  } catch (error) {
    console.error('Error searching movies:', error)
    throw error
  }
}

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching movie details:', error)
    throw error
  }
}

// Optional: Get popular movies for initial display
export const getPopularMovies = async () => {
  try {
    const response = await api.get('/movie/popular')
    return response.data.results
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    throw error
  }
}