<template>
  <div class="movie-row">
    <h2 class="row-title">{{ title }}</h2>
    <div class="row-container" ref="rowContainer">
      <button class="scroll-btn scroll-left" @click="scrollRow(-1)" :style="{ opacity: showLeftScroll ? 1 : 0 }">
        <i class="fas fa-chevron-left"></i>
      </button>
      
      <div class="row-content" ref="rowContent">
        <div 
          v-for="movie in movies" 
          :key="movie.id" 
          class="movie-card"
          @mouseenter="handleMouseEnter(movie)"
          @mouseleave="handleMouseLeave"
          @click="selectMovie(movie)"
        >
          <div class="card-image">
            <img :src="movie.poster" :alt="movie.title" />
            <div class="card-hover">
              <button class="card-play">
                <i class="fas fa-play"></i>
              </button>
              <button class="card-add">
                <i class="fas fa-plus"></i>
              </button>
              <button class="card-like">
                <i class="fas fa-thumbs-up"></i>
              </button>
            </div>
          </div>
          <div class="card-info">
            <h3 class="card-title">{{ movie.title }}</h3>
            <div class="card-meta">
              <span class="card-rating">{{ movie.rating }}</span>
              <span class="card-year">{{ movie.year }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <button class="scroll-btn scroll-right" @click="scrollRow(1)" :style="{ opacity: showRightScroll ? 1 : 0 }">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

export default {
  name: 'MovieRow',
  props: {
    title: String,
    movies: Array,
    rowIndex: Number
  },
  emits: ['select-movie'],
  setup(props, { emit }) {
    const rowContainer = ref(null)
    const rowContent = ref(null)
    const showLeftScroll = ref(false)
    const showRightScroll = ref(true)
    
    const selectMovie = (movie) => {
      emit('select-movie', movie)
    }
    
    const handleMouseEnter = (movie) => {
      // Scale up animation on hover
      const card = event.currentTarget
      gsap.to(card, {
        duration: 0.3,
        scale: 1.05,
        zIndex: 10,
        ease: "power2.out"
      })
    }
    
    const handleMouseLeave = (event) => {
      // Scale back on mouse leave
      const card = event.currentTarget
      gsap.to(card, {
        duration: 0.3,
        scale: 1,
        zIndex: 1,
        ease: "power2.out"
      })
    }
    
    const scrollRow = (direction) => {
      if (!rowContainer.value) return
      
      const container = rowContainer.value
      const scrollAmount = container.offsetWidth * 0.8 * direction
      
      gsap.to(rowContent.value, {
        duration: 0.5,
        scrollLeft: rowContent.value.scrollLeft + scrollAmount,
        ease: "power2.out"
      })
      
      // Update scroll button visibility after a short delay
      setTimeout(updateScrollButtons, 100)
    }
    
    const updateScrollButtons = () => {
      if (!rowContent.value) return
      
      const { scrollLeft, scrollWidth, clientWidth } = rowContent.value
      showLeftScroll.value = scrollLeft > 0
      showRightScroll.value = scrollLeft < scrollWidth - clientWidth - 10
    }
    
    // Animation on mount
    onMounted(() => {
      // Staggered animation for cards in this row
      gsap.from(rowContent.value.querySelectorAll('.movie-card'), {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.05,
        delay: 0.2 + (props.rowIndex * 0.1),
        ease: "power3.out"
      })
      
      updateScrollButtons()
      window.addEventListener('resize', updateScrollButtons)
      rowContent.value.addEventListener('scroll', updateScrollButtons)
    })
    
    onUnmounted(() => {
      window.removeEventListener('resize', updateScrollButtons)
      if (rowContent.value) {
        rowContent.value.removeEventListener('scroll', updateScrollButtons)
      }
    })
    
    return {
      rowContainer,
      rowContent,
      showLeftScroll,
      showRightScroll,
      selectMovie,
      handleMouseEnter,
      handleMouseLeave,
      scrollRow
    }
  }
}
</script>

<style scoped>
.movie-row {
  margin-bottom: 50px;
}

.row-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #e5e5e5;
}

.row-container {
  position: relative;
  display: flex;
  align-items: center;
}

.row-content {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding: 10px 0;
  scrollbar-width: none;
}

.row-content::-webkit-scrollbar {
  display: none;
}

.movie-card {
  flex: 0 0 auto;
  width: 220px;
  transition: transform 0.3s ease;
  cursor: pointer;
  position: relative;
}

.card-image {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.card-image img {
  width: 100%;
  height: 330px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.card-hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.movie-card:hover .card-hover {
  opacity: 1;
}

.movie-card:hover .card-image img {
  transform: scale(1.1);
}

.card-hover button {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card-hover button:hover {
  background-color: white;
  color: black;
  transform: scale(1.1);
}

.card-info {
  padding: 10px 5px 0;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-meta {
  display: flex;
  gap: 10px;
  font-size: 0.9rem;
  color: #a3a3a3;
}

.card-rating {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1px 5px;
  border-radius: 3px;
}

.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition: all 0.3s ease;
  opacity: 0;
}

.scroll-btn:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.scroll-left {
  left: 0;
}

.scroll-right {
  right: 0;
}

.row-container:hover .scroll-btn {
  opacity: 1;
}

@media (max-width: 768px) {
  .movie-card {
    width: 160px;
  }
  
  .card-image img {
    height: 240px;
  }
  
  .scroll-btn {
    display: none;
  }
}
</style>