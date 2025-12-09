<template>
  <div class="hero-banner">
    <div class="hero-backdrop">
      <img :src="featuredMovie.banner" :alt="featuredMovie.title" class="backdrop-image" />
      <div class="backdrop-overlay"></div>
    </div>
    
    <div class="hero-content">
      <h1 class="hero-title">{{ featuredMovie.title }}</h1>
      <div class="hero-meta">
        <span class="rating">{{ featuredMovie.rating }}</span>
        <span class="year">{{ featuredMovie.year }}</span>
        <span class="duration">{{ featuredMovie.duration }}</span>
        <span class="quality">HD</span>
      </div>
      <p class="hero-description">{{ featuredMovie.description }}</p>
      <div class="hero-actions">
        <button class="btn btn-play" @click="playMovie">
          <i class="fas fa-play"></i> Play
        </button>
        <button class="btn btn-info" @click="showInfo">
          <i class="fas fa-info-circle"></i> More Info
        </button>
      </div>
      <div class="hero-genres">
        <span v-for="genre in featuredMovie.genre" :key="genre" class="genre-tag">{{ genre }}</span>
      </div>
    </div>
    
    <button class="volume-control">
      <i class="fas fa-volume-up"></i>
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

export default {
  name: 'HeroBanner',
  setup() {
    const featuredMovie = ref({
      id: 1,
      title: 'Stranger Things',
      year: 2016,
      rating: 'TV-14',
      duration: '4 Seasons',
      description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
      banner: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
      genre: ['Sci-Fi', 'Horror', 'Drama']
    })

    const playMovie = () => {
      console.log('Playing:', featuredMovie.value.title)
      // In a real app, this would trigger video playback
    }

    const showInfo = () => {
      console.log('Showing info for:', featuredMovie.value.title)
      // In a real app, this would open a modal with more details
    }

    onMounted(() => {
      // Hero banner entrance animation
      gsap.from('.hero-title', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        delay: 0.5,
        ease: "power3.out"
      })
      
      gsap.from('.hero-description', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        delay: 0.8,
        ease: "power3.out"
      })
      
      gsap.from('.hero-actions', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 1.2,
        ease: "power3.out"
      })
      
      gsap.from('.hero-meta span', {
        duration: 1,
        x: -20,
        opacity: 0,
        stagger: 0.1,
        delay: 0.6,
        ease: "power3.out"
      })
    })

    return {
      featuredMovie,
      playMovie,
      showInfo
    }
  }
}
</script>

<style scoped>
.hero-banner {
  height: 80vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.backdrop-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.backdrop-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #141414 0%, transparent 50%),
              linear-gradient(to right, #141414 0%, transparent 30%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 40%;
  padding: 0 4%;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.hero-meta span {
  display: flex;
  align-items: center;
}

.rating {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 3px;
  font-weight: 600;
}

.quality {
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 0.9rem;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.hero-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 2rem;
}

.btn {
  padding: 10px 30px;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.btn-play {
  background-color: white;
  color: black;
}

.btn-play:hover {
  background-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.05);
}

.btn-info {
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
}

.btn-info:hover {
  background-color: rgba(109, 109, 110, 0.9);
  transform: scale(1.05);
}

.hero-genres {
  display: flex;
  gap: 10px;
}

.genre-tag {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.volume-control {
  position: absolute;
  right: 4%;
  bottom: 20%;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.volume-control:hover {
  background-color: rgba(0, 0, 0, 0.7);
  transform: scale(1.1);
}

@media (max-width: 1024px) {
  .hero-content {
    max-width: 60%;
  }
  
  .hero-title {
    font-size: 2.8rem;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    height: 70vh;
  }
  
  .hero-content {
    max-width: 90%;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>