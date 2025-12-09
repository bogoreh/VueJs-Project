<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container" ref="modalContainer">
      <button class="modal-close" @click="$emit('close')">
        <i class="fas fa-times"></i>
      </button>
      
      <div class="modal-hero" :style="{ backgroundImage: `linear-gradient(to bottom, transparent 0%, #141414 100%), url(${movie.banner})` }">
        <div class="modal-hero-content">
          <h1 class="modal-title">{{ movie.title }}</h1>
          <div class="modal-actions">
            <button class="btn btn-modal-play" @click="playMovie">
              <i class="fas fa-play"></i> Play
            </button>
            <button class="btn-icon" title="Add to My List">
              <i class="fas fa-plus"></i>
            </button>
            <button class="btn-icon" title="Like">
              <i class="fas fa-thumbs-up"></i>
            </button>
            <button class="btn-icon" title="Share">
              <i class="fas fa-share"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="modal-details">
        <div class="modal-meta">
          <span class="meta-rating">{{ movie.rating }}</span>
          <span class="meta-year">{{ movie.year }}</span>
          <span class="meta-duration">{{ movie.duration }}</span>
          <span class="meta-hd">HD</span>
        </div>
        
        <div class="modal-description">
          <p>{{ movie.description }}</p>
        </div>
        
        <div class="modal-info">
          <div class="info-item">
            <span class="info-label">Cast:</span>
            <span class="info-value">Millie Bobby Brown, Finn Wolfhard, Winona Ryder</span>
          </div>
          <div class="info-item">
            <span class="info-label">Genres:</span>
            <div class="info-tags">
              <span v-for="genre in movie.genre" :key="genre" class="info-tag">{{ genre }}</span>
            </div>
          </div>
          <div class="info-item">
            <span class="info-label">This show is:</span>
            <div class="info-tags">
              <span class="info-tag">Ominous</span>
              <span class="info-tag">Suspenseful</span>
              <span class="info-tag">Nostalgic</span>
            </div>
          </div>
        </div>
        
        <div class="modal-similar">
          <h3 class="similar-title">More Like This</h3>
          <div class="similar-items">
            <div v-for="i in 3" :key="i" class="similar-item">
              <img :src="`https://image.tmdb.org/t/p/w200${similarMovies[i-1]?.poster}`" alt="Similar" class="similar-poster" />
              <div class="similar-info">
                <h4 class="similar-name">{{ similarMovies[i-1]?.title }}</h4>
                <div class="similar-meta">
                  <span class="similar-rating">{{ similarMovies[i-1]?.rating }}</span>
                  <span class="similar-year">{{ similarMovies[i-1]?.year }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

export default {
  name: 'MovieModal',
  props: {
    movie: Object
  },
  emits: ['close'],
  setup(props, { emit }) {
    const modalContainer = ref(null)
    
    const similarMovies = ref([
      { title: 'Dark', year: 2017, rating: 'TV-MA', poster: '/5Lo4e7aWe0IMC8y5g80TzI24kHL.jpg' },
      { title: 'The Umbrella Academy', year: 2019, rating: 'TV-14', poster: '/scZlQQYnDVlnpxFTxaIv2g0BWnL.jpg' },
      { title: 'Locke & Key', year: 2020, rating: 'TV-14', poster: '/1uegRjNKleAYBwLQx6mUnM5pQHE.jpg' }
    ])
    
    const playMovie = () => {
      console.log('Playing from modal:', props.movie.title)
      // In a real app, this would trigger video playback
    }
    
    // Animation on open
    onMounted(() => {
      gsap.from(modalContainer.value, {
        duration: 0.5,
        scale: 0.8,
        opacity: 0,
        ease: "back.out(1.7)"
      })
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    })
    
    // Cleanup on close
    const closeModal = () => {
      gsap.to(modalContainer.value, {
        duration: 0.3,
        scale: 0.8,
        opacity: 0,
        ease: "power2.in",
        onComplete: () => {
          emit('close')
          document.body.style.overflow = 'auto'
        }
      })
    }
    
    return {
      modalContainer,
      similarMovies,
      playMovie,
      closeModal
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-container {
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  background-color: #141414;
  border-radius: 8px;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background-color: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

.modal-hero {
  height: 400px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 40px;
}

.modal-hero-content {
  width: 100%;
}

.modal-title {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.modal-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-modal-play {
  background-color: white;
  color: black;
  padding: 12px 35px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.btn-modal-play:hover {
  background-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.05);
}

.btn-icon {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-icon:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.modal-details {
  padding: 30px;
}

.modal-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.meta-rating {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 3px 10px;
  border-radius: 3px;
  font-weight: 600;
}

.meta-hd {
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 0.9rem;
}

.modal-description {
  margin-bottom: 25px;
  font-size: 1.1rem;
  line-height: 1.6;
}

.modal-info {
  margin-bottom: 30px;
}

.info-item {
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
}

.info-label {
  min-width: 100px;
  color: #a3a3a3;
  font-weight: 600;
}

.info-value {
  flex: 1;
}

.info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.info-tag {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.modal-similar {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
}

.similar-title {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #e5e5e5;
}

.similar-items {
  display: flex;
  gap: 15px;
}

.similar-item {
  flex: 1;
  display: flex;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.similar-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
}

.similar-poster {
  width: 80px;
  height: 100px;
  object-fit: cover;
}

.similar-info {
  padding: 10px;
  flex: 1;
}

.similar-name {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.similar-meta {
  display: flex;
  gap: 10px;
  font-size: 0.8rem;
  color: #a3a3a3;
}

@media (max-width: 768px) {
  .modal-container {
    max-height: 95vh;
  }
  
  .modal-hero {
    height: 300px;
    padding: 20px;
  }
  
  .modal-title {
    font-size: 2rem;
  }
  
  .modal-details {
    padding: 20px;
  }
  
  .info-item {
    flex-direction: column;
    gap: 5px;
  }
  
  .similar-items {
    flex-direction: column;
  }
}
</style>