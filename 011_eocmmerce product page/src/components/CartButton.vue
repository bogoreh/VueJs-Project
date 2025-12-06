<template>
  <div class="cart-button-component">
    <!-- Cart Icon with Item Count -->
    <div class="cart-icon-container" @click="toggleCartDropdown" ref="cartIcon">
      <i class="fas fa-shopping-cart"></i>
      <span class="cart-count" v-if="itemCount > 0">{{ itemCount }}</span>
      
      <!-- Cart Dropdown -->
      <div v-if="showDropdown" class="cart-dropdown" ref="cartDropdown">
        <div class="dropdown-header">
          <h3>Your Cart</h3>
          <button class="close-dropdown" @click="toggleCartDropdown">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="cart-items" v-if="cartItems.length > 0">
          <div 
            v-for="(item, index) in cartItems" 
            :key="index" 
            class="cart-item"
            :ref="el => { if (el) cartItemRefs[index] = el }"
          >
            <div class="item-image">
              <img :src="item.images[0]" :alt="item.name" />
            </div>
            <div class="item-details">
              <h4>{{ item.name }}</h4>
              <p class="item-color">Color: {{ item.selectedColor }}</p>
              <div class="item-price-quantity">
                <span class="item-price">${{ item.price.toFixed(2) }}</span>
                <div class="quantity-controls">
                  <button 
                    class="quantity-btn decrease" 
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    :disabled="item.quantity <= 1"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button 
                    class="quantity-btn increase" 
                    @click="updateQuantity(item.id, item.quantity + 1)"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <button class="remove-item" @click="removeItem(item.id)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        
        <div class="empty-cart" v-else>
          <i class="fas fa-shopping-cart"></i>
          <p>Your cart is empty</p>
        </div>
        
        <div class="dropdown-footer" v-if="cartItems.length > 0">
          <div class="cart-total">
            <span>Total:</span>
            <span class="total-price">${{ cartTotal.toFixed(2) }}</span>
          </div>
          <div class="cart-actions">
            <button class="view-cart-btn" @click="viewCart">View Cart</button>
            <button class="checkout-btn" @click="checkout">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import gsap from 'gsap'

export default {
  name: 'CartButton',
  props: {
    cartItems: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update-cart', 'remove-from-cart'],
  setup(props, { emit }) {
    const showDropdown = ref(false)
    const cartIcon = ref(null)
    const cartDropdown = ref(null)
    const cartItemRefs = ref([])

    // Computed properties
    const itemCount = computed(() => {
      return props.cartItems.reduce((total, item) => total + item.quantity, 0)
    })

    const cartTotal = computed(() => {
      return props.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    // Methods
    const toggleCartDropdown = () => {
      showDropdown.value = !showDropdown.value
      
      if (showDropdown.value) {
        // Animate dropdown opening
        gsap.fromTo(cartDropdown.value,
          { opacity: 0, y: -10, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
        )
      }
    }

    const updateQuantity = (itemId, newQuantity) => {
      if (newQuantity < 1) return
      
      emit('update-cart', { itemId, newQuantity })
      
      // Animate the quantity change
      const itemIndex = props.cartItems.findIndex(item => item.id === itemId)
      if (itemIndex >= 0 && cartItemRefs.value[itemIndex]) {
        gsap.fromTo(cartItemRefs.value[itemIndex].querySelector('.quantity'),
          { scale: 1.2 },
          { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' }
        )
      }
    }

    const removeItem = (itemId) => {
      emit('remove-from-cart', itemId)
      
      // Animate removal
      const itemIndex = props.cartItems.findIndex(item => item.id === itemId)
      if (itemIndex >= 0 && cartItemRefs.value[itemIndex]) {
        gsap.to(cartItemRefs.value[itemIndex], {
          duration: 0.3,
          opacity: 0,
          x: -20,
          onComplete: () => {
            // After animation, remove from array
            const updatedItems = props.cartItems.filter(item => item.id !== itemId)
            emit('update-cart', updatedItems)
          }
        })
      }
    }

    const viewCart = () => {
      alert(`You have ${itemCount.value} item(s) in your cart. Total: $${cartTotal.value.toFixed(2)}`)
      showDropdown.value = false
    }

    const checkout = () => {
      alert('Proceeding to checkout...')
      showDropdown.value = false
    }

    const handleClickOutside = (event) => {
      if (
        showDropdown.value && 
        cartDropdown.value && 
        !cartDropdown.value.contains(event.target) &&
        cartIcon.value &&
        !cartIcon.value.contains(event.target)
      ) {
        // Animate dropdown closing
        gsap.to(cartDropdown.value, {
          duration: 0.2,
          opacity: 0,
          y: -10,
          scale: 0.95,
          onComplete: () => {
            showDropdown.value = false
          }
        })
      }
    }

    // Watch for cart count changes to animate the cart icon
    watch(itemCount, (newCount, oldCount) => {
      if (newCount > oldCount) {
        // Animate cart icon when items are added
        gsap.fromTo(cartIcon.value,
          { scale: 1 },
          { 
            scale: 1.3, 
            duration: 0.2, 
            yoyo: true, 
            repeat: 1,
            ease: 'power2.out'
          }
        )
        
        // Animate cart count badge
        const countBadge = cartIcon.value.querySelector('.cart-count')
        if (countBadge) {
          gsap.fromTo(countBadge,
            { scale: 0 },
            { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
          )
        }
      }
    })

    // Lifecycle hooks
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      showDropdown,
      cartIcon,
      cartDropdown,
      cartItemRefs,
      itemCount,
      cartTotal,
      toggleCartDropdown,
      updateQuantity,
      removeItem,
      viewCart,
      checkout
    }
  }
}
</script>

<style scoped>
.cart-button-component {
  position: relative;
}

.cart-icon-container {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #3498db;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  z-index: 1000;
  transition: all 0.2s ease;
}

.cart-icon-container:hover {
  background-color: #2980b9;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
}

.cart-icon-container i {
  font-size: 1.5rem;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e74c3c;
  color: white;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
}

.cart-dropdown {
  position: absolute;
  top: 70px;
  right: 0;
  width: 350px;
  max-height: 500px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1001;
  display: flex;
  flex-direction: column;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #2c3e50;
  color: white;
}

.dropdown-header h3 {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 1.3rem;
}

.close-dropdown {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.close-dropdown:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  max-height: 350px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  gap: 15px;
  transition: all 0.3s ease;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item:hover {
  background-color: #f9f9f9;
}

.item-image {
  width: 70px;
  height: 70px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-details h4 {
  margin: 0 0 5px 0;
  font-size: 1rem;
  font-weight: 500;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-color {
  margin: 0 0 10px 0;
  font-size: 0.85rem;
  color: #7f8c8d;
}

.item-price-quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-weight: 600;
  color: #2c3e50;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-btn {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.7rem;
  transition: all 0.2s;
}

.quantity-btn:hover:not(:disabled) {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.remove-item {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.remove-item:hover {
  background-color: rgba(231, 76, 60, 0.1);
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #95a5a6;
}

.empty-cart i {
  font-size: 3rem;
  margin-bottom: 15px;
}

.empty-cart p {
  margin: 0;
  font-size: 1.1rem;
}

.dropdown-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  background-color: #f8f9fa;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.total-price {
  color: #27ae60;
  font-size: 1.4rem;
}

.cart-actions {
  display: flex;
  gap: 10px;
}

.view-cart-btn, .checkout-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.view-cart-btn {
  background-color: white;
  color: #3498db;
  border: 1px solid #3498db;
}

.view-cart-btn:hover {
  background-color: #f0f8ff;
}

.checkout-btn {
  background-color: #27ae60;
  color: white;
}

.checkout-btn:hover {
  background-color: #219955;
}

/* Scrollbar styling */
.cart-items::-webkit-scrollbar {
  width: 6px;
}

.cart-items::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.cart-items::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.cart-items::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}
</style>