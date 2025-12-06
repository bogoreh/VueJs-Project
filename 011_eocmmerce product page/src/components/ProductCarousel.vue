<template>
  <div class="product-carousel">
    <div class="carousel-container">
      <!-- Main Image Display -->
      <div class="main-image-container" ref="mainImageContainer">
        <img 
          :src="images[currentIndex]" 
          :alt="title" 
          class="main-image"
          ref="mainImage"
        />
        
        <!-- Navigation Arrows -->
        <button 
          class="nav-arrow prev" 
          @click="prevImage"
          aria-label="Previous image"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <button 
          class="nav-arrow next" 
          @click="nextImage"
          aria-label="Next image"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      
      <!-- Thumbnail Images -->
      <div class="thumbnails">
        <div 
          v-for="(image, index) in images" 
          :key="index"
          class="thumbnail-container"
          :class="{ active: currentIndex === index }"
          @click="selectImage(index)"
        >
          <img 
            :src="image" 
            :alt="`${title} view ${index + 1}`" 
            class="thumbnail"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'

export default {
  name: 'ProductCarousel',
  props: {
    images: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ['image-change'],
  setup(props, { emit }) {
    const currentIndex = ref(0)
    const mainImage = ref(null)
    const mainImageContainer = ref(null)

    const selectImage = (index) => {
      if (index === currentIndex.value) return
      
      // Animate the image change
      gsap.to(mainImage.value, {
        duration: 0.3,
        opacity: 0,
        scale: 0.95,
        onComplete: () => {
          currentIndex.value = index
          emit('image-change', index)
          
          gsap.fromTo(mainImage.value, 
            { opacity: 0, scale: 1.05 },
            { duration: 0.4, opacity: 1, scale: 1 }
          )
        }
      })
    }

    const nextImage = () => {
      const nextIndex = (currentIndex.value + 1) % props.images.length
      selectImage(nextIndex)
    }

    const prevImage = () => {
      const prevIndex = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1
      selectImage(prevIndex)
    }

    // Auto-rotate carousel
    onMounted(() => {
      // Set up auto-rotation (every 5 seconds)
      const interval = setInterval(() => {
        nextImage()
      }, 5000)
      
      // Clean up on component unmount
      return () => clearInterval(interval)
    })

    // Animate when index changes
    watch(currentIndex, () => {
      // Highlight the active thumbnail
      gsap.to('.thumbnail-container.active', {
        duration: 0.3,
        scale: 1.1,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      })
      
      gsap.to('.thumbnail-container:not(.active)', {
        duration: 0.3,
        scale: 1,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      })
    })

    return {
      currentIndex,
      mainImage,
      mainImageContainer,
      selectImage,
      nextImage,
      prevImage
    }
  }
}
</script>

<style scoped>
.product-carousel {
  flex: 1;
  min-width: 300px;
}

.carousel-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-image-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  background-color: white;
  aspect-ratio: 1/1;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: all 0.2s ease;
  z-index: 10;
}

.nav-arrow:hover {
  background-color: white;
  transform: translateY(-50%) scale(1.1);
}

.nav-arrow.prev {
  left: 15px;
}

.nav-arrow.next {
  right: 15px;
}

.thumbnails {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.thumbnail-container {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.thumbnail-container.active {
  border-color: #3498db;
  transform: scale(1.05);
}

.thumbnail-container:hover:not(.active) {
  border-color: #bdc3c7;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>