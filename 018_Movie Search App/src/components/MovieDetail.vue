<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay" @click.self="handleClose">
      <div class="modal-content" ref="modalRef">
        <button class="close-button" @click="handleClose">✕</button>
        
        <div v-if="movie" class="movie-detail">
          <div class="detail-header">
            <img
              v-if="movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
              class="detail-poster"
            />
            <div class="detail-info">
              <h2 class="detail-title">{{ movie.title }}</h2>
              <p class="detail-tagline">{{ movie.tagline }}</p>
              
              <div class="detail-meta">
                <span class="rating">
                  ⭐ {{ movie.vote_average?.toFixed(1) }} ({{ movie.vote_count }} votes)
                </span>
                <span class="year">{{ getYear(movie.release_date) }}</span>
                <span class="runtime">{{ movie.runtime }} min</span>
              </div>
              
              <div class="genres">
                <span 
                  v-for="genre in movie.genres" 
                  :key="genre.id"
                  class="genre-tag"
                >
                  {{ genre.name }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="detail-body">
            <div class="overview-section">
              <h3>Overview</h3>
              <p class="overview">{{ movie.overview }}</p>
            </div>
            
            <div v-if="movie.production_companies?.length" class="companies-section">
              <h3>Production Companies</h3>
              <div class="companies">
                <div 
                  v-for="company in movie.production_companies" 
                  :key="company.id"
                  class="company"
                >
                  <img 
                    v-if="company.logo_path"
                    :src="`https://image.tmdb.org/t/p/w200${company.logo_path}`"
                    :alt="company.name"
                    class="company-logo"
                  />
                  <span v-else>{{ company.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  movie: Object,
  isVisible: Boolean
})

const emit = defineEmits(['close'])

const modalRef = ref(null)

watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    nextTick(() => {
      gsap.from(modalRef.value, {
        duration: 0.5,
        scale: 0.8,
        opacity: 0,
        y: 50,
        ease: 'back.out(1.7)'
      })
    })
  }
})

const getYear = (dateString) => {
  if (!dateString) return 'Unknown year'
  return new Date(dateString).getFullYear()
}

const handleClose = () => {
  if (modalRef.value) {
    gsap.to(modalRef.value, {
      duration: 0.3,
      scale: 0.8,
      opacity: 0,
      y: 50,
      ease: 'power2.in',
      onComplete: () => emit('close')
    })
  } else {
    emit('close')
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: #f06;
  transform: rotate(90deg);
}

.movie-detail {
  padding: 2rem;
}

.detail-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.detail-poster {
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.detail-info {
  flex: 1;
}

.detail-title {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(45deg, #f06, #9f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.detail-tagline {
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 1rem 0;
}

.detail-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.rating,
.year,
.runtime {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.rating {
  color: #ffd700;
}

.genres {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.genre-tag {
  background: linear-gradient(45deg, #f06, #9f6);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.detail-body {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
}

.overview-section {
  margin-bottom: 2rem;
}

.overview-section h3,
.companies-section h3 {
  color: #f06;
  margin-bottom: 1rem;
}

.overview {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.companies {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.company {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.company-logo {
  height: 50px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

@media (max-width: 768px) {
  .detail-header {
    flex-direction: column;
  }
  
  .detail-poster {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .detail-title {
    font-size: 2rem;
  }
  
  .modal-content {
    padding: 1rem;
  }
}
</style>