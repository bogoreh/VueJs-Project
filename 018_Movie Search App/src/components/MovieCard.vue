<template>
  <div 
    class="movie-card" 
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="$emit('click')"
  >
    <div class="poster-wrapper">
      <img
        v-if="movie.poster_path"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
        class="poster"
      />
      <div v-else class="no-poster">
        {{ movie.title }}
      </div>
      <div class="rating">
        ⭐ {{ movie.vote_average?.toFixed(1) || 'N/A' }}
      </div>
    </div>
    <div class="movie-info">
      <h3 class="movie-title">{{ movie.title }}</h3>
      <p class="movie-year">{{ getYear(movie.release_date) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'

defineProps({
  movie: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const cardRef = ref(null)

const getYear = (dateString) => {
  if (!dateString) return 'Unknown year'
  return new Date(dateString).getFullYear()
}

const onMouseEnter = (event) => {
  gsap.to(event.currentTarget, {
    duration: 0.3,
    y: -10,
    scale: 1.05,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    ease: 'power2.out'
  })
}

const onMouseLeave = (event) => {
  gsap.to(event.currentTarget, {
    duration: 0.3,
    y: 0,
    scale: 1,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    ease: 'power2.out'
  })
}
</script>

<style scoped>
.movie-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.poster-wrapper {
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.movie-card:hover .poster {
  transform: scale(1.1);
}

.no-poster {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #f06, #9f6);
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.rating {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: #ffd700;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-info {
  padding: 1rem;
}

.movie-title {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.movie-year {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}
</style>