<template>
  <div class="product-details">
    <div class="product-header">
      <h2 class="product-title">{{ product.name }}</h2>
      <div class="product-rating">
        <div class="stars">
          <i 
            v-for="star in 5" 
            :key="star" 
            class="fas fa-star"
            :class="{ 'filled': star <= Math.floor(product.rating), 'half': star === Math.ceil(product.rating) && !Number.isInteger(product.rating) }"
          ></i>
        </div>
        <span class="rating-text">{{ product.rating }} ({{ product.reviews }} reviews)</span>
      </div>
    </div>

    <div class="product-price">
      <span class="current-price">${{ product.price.toFixed(2) }}</span>
      <span class="original-price" v-if="product.price < 350">$349.99</span>
      <span class="discount-badge" v-if="product.price < 350">Save $50</span>
    </div>

    <p class="product-description">{{ product.description }}</p>

    <div class="product-features">
      <h3>Key Features</h3>
      <ul>
        <li v-for="(feature, index) in product.features" :key="index">
          <i class="fas fa-check-circle"></i> {{ feature }}
        </li>
      </ul>
    </div>

    <div class="color-selection">
      <h3>Select Color</h3>
      <div class="color-options">
        <div 
          v-for="color in product.colors" 
          :key="color.name"
          class="color-option"
          :class="{ 'selected': selectedColor === color.name }"
          @click="selectColor(color.name)"
          :style="{ backgroundColor: color.value }"
          :title="color.name"
        >
          <i class="fas fa-check" v-if="selectedColor === color.name"></i>
        </div>
      </div>
    </div>

    <div class="stock-status">
      <i class="fas fa-box" :class="{ 'in-stock': product.inStock, 'out-of-stock': !product.inStock }"></i>
      <span v-if="product.inStock" class="in-stock">In Stock - Ready to Ship</span>
      <span v-else class="out-of-stock">Out of Stock</span>
    </div>

    <div class="action-buttons">
      <button 
        class="add-to-cart-btn" 
        @click="handleAddToCart"
        :disabled="!product.inStock"
      >
        <i class="fas fa-shopping-cart"></i>
        Add to Cart
      </button>
      
      <button class="buy-now-btn" :disabled="!product.inStock">
        <i class="fas fa-bolt"></i>
        Buy Now
      </button>
    </div>

    <div class="additional-info">
      <div class="info-item">
        <i class="fas fa-shipping-fast"></i>
        <div>
          <h4>Free Shipping</h4>
          <p>Free delivery on all orders over $50</p>
        </div>
      </div>
      <div class="info-item">
        <i class="fas fa-undo"></i>
        <div>
          <h4>30-Day Returns</h4>
          <p>Hassle-free return policy</p>
        </div>
      </div>
      <div class="info-item">
        <i class="fas fa-shield-alt"></i>
        <div>
          <h4>2-Year Warranty</h4>
          <p>Manufacturer warranty included</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

export default {
  name: 'ProductDetails',
  props: {
    product: {
      type: Object,
      required: true
    },
    selectedImageIndex: {
      type: Number,
      default: 0
    }
  },
  emits: ['add-to-cart'],
  setup(props, { emit }) {
    const selectedColor = ref(props.product.colors[0].name)

    const selectColor = (colorName) => {
      selectedColor.value = colorName
      
      // Animation for color selection
      gsap.to('.color-option.selected', {
        duration: 0.3,
        scale: 1.1,
        boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.3)'
      })
    }

    const handleAddToCart = () => {
      emit('add-to-cart', {
        productId: props.product.id,
        selectedColor: selectedColor.value
      })
      
      // Button animation
      gsap.fromTo('.add-to-cart-btn', 
        { scale: 1 },
        { 
          duration: 0.2, 
          scale: 0.95, 
          yoyo: true, 
          repeat: 1 
        }
      )
    }

    onMounted(() => {
      // Animate elements on mount
      gsap.from('.product-details > *', {
        duration: 0.6,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        delay: 0.3
      })
    })

    return {
      selectedColor,
      selectColor,
      handleAddToCart
    }
  }
}
</script>

<style scoped>
.product-details {
  flex: 1;
  min-width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
}

.product-header {
  margin-bottom: 15px;
}

.product-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.stars {
  color: #ddd;
  font-size: 1rem;
}

.stars .filled {
  color: #f39c12;
}

.stars .half {
  color: #f39c12;
  position: relative;
}

.stars .half:after {
  content: '\f089';
  position: absolute;
  left: 0;
  color: #f39c12;
}

.rating-text {
  color: #666;
  font-size: 0.9rem;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.current-price {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
}

.original-price {
  font-size: 1.2rem;
  color: #95a5a6;
  text-decoration: line-through;
}

.discount-badge {
  background-color: #e74c3c;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
}

.product-description {
  color: #555;
  line-height: 1.7;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.product-features {
  margin-bottom: 25px;
}

.product-features h3 {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  margin-bottom: 15px;
  color: #2c3e50;
}

.product-features ul {
  list-style: none;
}

.product-features li {
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.product-features li i {
  color: #2ecc71;
}

.color-selection {
  margin-bottom: 25px;
}

.color-selection h3 {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  margin-bottom: 15px;
  color: #2c3e50;
}

.color-options {
  display: flex;
  gap: 15px;
}

.color-option {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  color: white;
  font-size: 0.8rem;
}

.color-option.selected {
  border-color: #3498db;
  transform: scale(1.1);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
}

.color-option:hover:not(.selected) {
  border-color: #bdc3c7;
  transform: scale(1.05);
}

.stock-status {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 25px;
  padding: 10px 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.stock-status i {
  font-size: 1.2rem;
}

.in-stock {
  color: #27ae60;
}

.out-of-stock {
  color: #e74c3c;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.add-to-cart-btn, .buy-now-btn {
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s ease;
}

.add-to-cart-btn {
  background-color: #3498db;
  color: white;
}

.add-to-cart-btn:hover:not(:disabled) {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.buy-now-btn {
  background-color: #2c3e50;
  color: white;
}

.buy-now-btn:hover:not(:disabled) {
  background-color: #1a252f;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(44, 62, 80, 0.3);
}

.add-to-cart-btn:disabled, .buy-now-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.additional-info {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.info-item i {
  font-size: 1.5rem;
  color: #3498db;
  width: 40px;
}

.info-item h4 {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  margin-bottom: 5px;
  color: #2c3e50;
}

.info-item p {
  color: #666;
  font-size: 0.9rem;
}
</style>