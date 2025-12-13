<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <h1>E-commerce</h1>
        </div>
        
        <nav class="nav">
          <button class="cart-btn" @click="$emit('toggle-cart')">
            <span class="cart-icon">🛒</span>
            <span class="cart-count">{{ cartItemCount }}</span>
            <span>Cart</span>
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  cartItemCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['toggle-cart'])
</script>

<style scoped>
.header {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.logo h1 {
  color: #2563eb;
  font-size: 24px;
}

.cart-btn {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 8px 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.cart-btn:hover {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.cart-icon {
  font-size: 18px;
}

.cart-count {
  background: #ef4444;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
</style>