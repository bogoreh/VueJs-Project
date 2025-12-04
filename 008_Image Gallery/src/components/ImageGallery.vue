<template>
  <div class="container">
    <header>
      <h1>📸 Vue Image Gallery</h1>
      <p class="subtitle">Click on any image to view in lightbox • Use arrow keys to navigate</p>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      Loading images...
    </div>

    <!-- Gallery Grid -->
    <div v-else class="gallery">
      <div 
        v-for="(image, index) in images" 
        :key="image.id"
        class="gallery-item"
        @click="openLightbox(index)"
      >
        <img 
          :src="image.thumbnail" 
          :alt="image.title"
          class="gallery-image"
          loading="lazy"
        >
        <div class="image-overlay">
          <h3 class="image-title">{{ image.title }}</h3>
          <p class="image-caption">{{ image.caption }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div 
      class="lightbox" 
      :class="{ active: lightboxActive }"
      @click="closeLightbox"
    >
      <button class="close-btn" @click="closeLightbox">×</button>
      
      <button 
        v-if="lightboxActive" 
        class="nav-btn prev" 
        @click.stop="prevImage"
      >
        ‹
      </button>
      
      <div class="lightbox-content" @click.stop>
        <img 
          :src="currentImage.full" 
          :alt="currentImage.title"
          class="lightbox-image"
          ref="lightboxImage"
        >
        <div class="lightbox-info">
          <h2 class="lightbox-title">{{ currentImage.title }}</h2>
          <p class="lightbox-caption">{{ currentImage.caption }}</p>
          <p class="lightbox-counter">{{ currentIndex + 1 }} / {{ images.length }}</p>
        </div>
      </div>
      
      <button 
        v-if="lightboxActive" 
        class="nav-btn next" 
        @click.stop="nextImage"
      >
        ›
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'

// Using Pexels CDN images
const images = ref([
  {
    id: 1,
    title: "Mountain Landscape",
    caption: "Beautiful mountain range during sunset",
    thumbnail: "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    full: "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1920"
  },
  {
    id: 2,
    title: "Beach Waves",
    caption: "Serene beach with crystal clear water",
    thumbnail: "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    full: "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=1920"
  },
  {
    id: 3,
    title: "Forest Path",
    caption: "Sunlight filtering through the forest",
    thumbnail: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    full: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&w=1920"
  },
  {
    id: 4,
    title: "City Lights",
    caption: "Urban skyline at night",
    thumbnail: "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    full: "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&w=1920"
  },
  {
    id: 5,
    title: "Desert Dunes",
    caption: "Golden sand dunes under blue sky",
    thumbnail: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    full: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1920"
  },
  {
    id: 6,
    title: "Northern Lights",
    caption: "Aurora borealis in the arctic sky",
    thumbnail: "https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    full: "https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=1920"
  },
  {
    id: 7,
    title: "Waterfall",
    caption: "Majestic waterfall in the jungle",
    thumbnail: "https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    full: "https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=1920"
  },
  {
    id: 8,
    title: "Wildlife",
    caption: "Lion in its natural habitat",
    thumbnail: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    full: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=1920"
  },
  {
    id: 9,
    title: "Underwater",
    caption: "Colorful coral reef ecosystem",
    thumbnail: "https://images.pexels.com/photos/2823971/pexels-photo-2823971.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    full: "https://images.pexels.com/photos/2823971/pexels-photo-2823971.jpeg?auto=compress&cs=tinysrgb&w=1920"
  }
])

const loading = ref(false)
const lightboxActive = ref(false)
const currentIndex = ref(0)
const lightboxImage = ref(null)

const currentImage = ref({
  title: '',
  caption: '',
  full: ''
})

// Open lightbox with animation
const openLightbox = (index) => {
  currentIndex.value = index
  currentImage.value = images.value[index]
  lightboxActive.value = true
  
  // Animate lightbox opening
  gsap.fromTo('.lightbox',
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
  )
  
  // Animate image entrance
  gsap.fromTo(lightboxImage.value,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' }
  )
}

// Close lightbox with animation
const closeLightbox = () => {
  gsap.to('.lightbox', {
    opacity: 0,
    scale: 0.9,
    duration: 0.3,
    ease: 'power3.in',
    onComplete: () => {
      lightboxActive.value = false
    }
  })
}

// Navigation functions
const nextImage = () => {
  if (currentIndex.value < images.value.length - 1) {
    currentIndex.value++
    animateImageChange()
  }
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    animateImageChange()
  }
}

// Animate image transition
const animateImageChange = () => {
  gsap.to(lightboxImage.value, {
    opacity: 0,
    scale: 0.95,
    duration: 0.2,
    onComplete: () => {
      currentImage.value = images.value[currentIndex.value]
      gsap.fromTo(lightboxImage.value,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
      )
    }
  })
}

// Keyboard navigation
const handleKeydown = (e) => {
  if (!lightboxActive.value) return
  
  switch(e.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowRight':
      nextImage()
      break
    case 'ArrowLeft':
      prevImage()
      break
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  
  // Simulate loading
  loading.value = true
  setTimeout(() => {
    loading.value = false
    
    // Animate gallery items on load
    gsap.from('.gallery-item', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.3,
      ease: 'power3.out'
    })
  }, 800)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Watch for index changes to preload next image
watch(currentIndex, (newIndex) => {
  const nextIndex = (newIndex + 1) % images.value.length
  const nextImage = new Image()
  nextImage.src = images.value[nextIndex].full
})
</script>