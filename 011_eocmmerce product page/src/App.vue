<template>
  <div>
    <header>
      <h1>AudioPro Store</h1>
      <p>Premium Audio Experience</p>
    </header>

    <div class="container">
      <!-- Product Image Carousel -->
      <ProductCarousel 
        :images="product.images" 
        :title="product.name"
        @image-change="handleImageChange"
      />
      
      <!-- Product Details -->
      <ProductDetails 
        :product="product"
        :selected-image-index="currentImageIndex"
        @add-to-cart="addToCart"
      />
    </div>

    <!-- Cart Notification -->
    <div v-if="showCartNotification" class="cart-notification">
      <i class="fas fa-check-circle"></i>
      <span>Added to cart successfully!</span>
    </div>

    <footer>
      <p>AudioPro Store &copy; 2023 | Premium Audio Products</p>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import ProductCarousel from './components/ProductCarousel.vue'
import ProductDetails from './components/ProductDetails.vue'
import gsap from 'gsap'

export default {
  name: 'App',
  components: {
    ProductCarousel,
    ProductDetails
  },
  setup() {
    const product = ref({
      id: 1,
      name: 'AudioPro X9 Wireless Headphones',
      price: 299.99,
      description: 'Experience premium sound quality with our flagship wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort.',
      features: [
        'Active Noise Cancellation',
        '30-hour battery life',
        'Bluetooth 5.2 with multipoint connection',
        'Premium memory foam ear cushions',
        'Built-in voice assistant support',
        'Quick charge (10 min = 3 hours of playback)'
      ],
      colors: [
        { name: 'Matte Black', value: '#2c3e50' },
        { name: 'Slate Gray', value: '#7f8c8d' },
        { name: 'Ocean Blue', value: '#3498db' }
      ],
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80'
      ],
      rating: 4.5,
      reviews: 128,
      inStock: true
    })

    const currentImageIndex = ref(0)
    const showCartNotification = ref(false)
    const cartItems = ref([])

    const handleImageChange = (index) => {
      currentImageIndex.value = index
    }

    const addToCart = () => {
      cartItems.value.push({
        ...product.value,
        selectedColor: product.value.colors[0].name,
        quantity: 1
      })
      
      showCartNotification.value = true
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        showCartNotification.value = false
      }, 3000)
      
      // Animation for cart notification
      gsap.from('.cart-notification', {
        duration: 0.5,
        x: 100,
        opacity: 0,
        ease: 'power2.out'
      })
    }

    onMounted(() => {
      // Initial animation for page content
      gsap.from('.container', {
        duration: 0.8,
        opacity: 0,
        y: 20,
        delay: 0.2
      })
    })

    return {
      product,
      currentImageIndex,
      showCartNotification,
      cartItems,
      handleImageChange,
      addToCart
    }
  }
}
</script>