import { ref } from 'vue'

export function useCart() {
  const cart = ref([])

  const addToCart = (product) => {
    const existingItem = cart.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.value.push({
        ...product,
        quantity: 1
      })
    }
  }

  const updateQuantity = (productId, newQuantity) => {
    const item = cart.value.find(item => item.id === productId)
    
    if (item) {
      if (newQuantity < 1) {
        removeFromCart(productId)
      } else {
        item.quantity = newQuantity
      }
    }
  }

  const removeFromCart = (productId) => {
    cart.value = cart.value.filter(item => item.id !== productId)
  }

  const clearCart = () => {
    cart.value = []
  }

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  }
}