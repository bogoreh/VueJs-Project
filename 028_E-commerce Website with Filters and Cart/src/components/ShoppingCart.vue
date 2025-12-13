<template>
  <div class="cart-overlay" @click="$emit('close-cart')">
    <div class="cart-container" @click.stop>
      <div class="cart-header">
        <h2>Shopping Cart</h2>
        <button class="close-btn" @click="$emit('close-cart')">×</button>
      </div>
      
      <div class="cart-items" v-if="cart.length > 0">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="cart-item-image" />
          
          <div class="cart-item-info">
            <h4>{{ item.name }}</h4>
            <p class="cart-item-price">${{ item.price.toFixed(2) }}</p>
          </div>
          
          <div class="cart-item-controls">
            <button @click="$emit('update-quantity', item.id, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="$emit('update-quantity', item.id, item.quantity + 1)">+</button>
          </div>
          
          <div class="cart-item-total">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </div>
          
          <button class="remove-btn" @click="$emit('remove-item', item.id)">
            Remove
          </button>
        </div>
      </div>
      
      <div v-else class="empty-cart">
        <p>Your cart is empty</p>
      </div>
      
      <div class="cart-footer" v-if="cart.length > 0">
        <div class="cart-total">
          <span>Total:</span>
          <span class="total-amount">${{ totalAmount.toFixed(2) }}</span>
        </div>
        
        <div class="cart-actions">
          <button class="btn btn-outline" @click="$emit('clear-cart')">
            Clear Cart
          </button>
          <button class="btn">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  }
})

defineEmits(['update-quantity', 'remove-item', 'close-cart', 'clear-cart'])

const totalAmount = computed(() => {
  return props.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
})
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.cart-container {
  width: 400px;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cart-header {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-header h2 {
  color: #1e293b;
  font-size: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #64748b;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-btn:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.cart-item {
  display: grid;
  grid-template-columns: 60px 1fr auto auto;
  gap: 15px;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f1f5f9;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.cart-item-info {
  min-width: 0;
}

.cart-item-info h4 {
  font-size: 14px;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-item-price {
  color: #2563eb;
  font-weight: 600;
  font-size: 14px;
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-item-controls button {
  width: 30px;
  height: 30px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.cart-item-controls button:hover {
  background: #f1f5f9;
}

.cart-item-controls span {
  min-width: 20px;
  text-align: center;
}

.cart-item-total {
  font-weight: 600;
  color: #1e293b;
  min-width: 60px;
  text-align: right;
}

.remove-btn {
  background: #fef2f2;
  color: #dc2626;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.remove-btn:hover {
  background: #fee2e2;
}

.empty-cart {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

.cart-footer {
  padding: 20px;
  border-top: 1px solid #e2e8f0;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
}

.total-amount {
  color: #2563eb;
  font-size: 24px;
}

.cart-actions {
  display: flex;
  gap: 10px;
}

.cart-actions .btn {
  flex: 1;
  padding: 12px;
}
</style>