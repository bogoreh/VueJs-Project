<template>
  <div class="app">
    <Header :cartItemCount="cart.length" @toggle-cart="showCart = !showCart" />
    
    <div class="container main-content">
      <div class="sidebar">
        <ProductFilters 
          :categories="categories"
          :priceRange="priceRange"
          :selectedCategory="filters.category"
          :selectedPrice="filters.maxPrice"
          @update:category="updateFilter('category', $event)"
          @update:price="updateFilter('maxPrice', $event)"
        />
      </div>
      
      <div class="product-grid">
        <div class="sort-controls">
          <select v-model="sortBy" class="sort-select">
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
        
        <div class="products">
          <ProductCard 
            v-for="product in filteredAndSortedProducts" 
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
      </div>
    </div>
    
    <ShoppingCart 
      v-if="showCart"
      :cart="cart"
      @update-quantity="updateQuantity"
      @remove-item="removeFromCart"
      @close-cart="showCart = false"
      @clear-cart="clearCart"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from './components/Header.vue'
import ProductFilters from './components/ProductFilters.vue'
import ProductCard from './components/ProductCard.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import { useCart } from './composables/useCart'

// Sample product data
const products = ref([
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 99.99, image: 'https://picsum.photos/300/200?random=1' },
  { id: 2, name: 'Running Shoes', category: 'Fashion', price: 79.99, image: 'https://picsum.photos/300/200?random=2' },
  { id: 3, name: 'Coffee Maker', category: 'Home', price: 49.99, image: 'https://picsum.photos/300/200?random=3' },
  { id: 4, name: 'Laptop Stand', category: 'Electronics', price: 34.99, image: 'https://picsum.photos/300/200?random=4' },
  { id: 5, name: 'T-shirt', category: 'Fashion', price: 19.99, image: 'https://picsum.photos/300/200?random=5' },
  { id: 6, name: 'Desk Lamp', category: 'Home', price: 29.99, image: 'https://picsum.photos/300/200?random=6' },
  { id: 7, name: 'Smart Watch', category: 'Electronics', price: 199.99, image: 'https://picsum.photos/300/200?random=7' },
  { id: 8, name: 'Backpack', category: 'Fashion', price: 59.99, image: 'https://picsum.photos/300/200?random=8' },
  { id: 9, name: 'Blender', category: 'Home', price: 89.99, image: 'https://picsum.photos/300/200?random=9' },
  { id: 10, name: 'Gaming Mouse', category: 'Electronics', price: 49.99, image: 'https://picsum.photos/300/200?random=10' },
])

// Filters
const filters = ref({
  category: 'all',
  maxPrice: 500
})

const sortBy = ref('name')

// Cart
const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart()
const showCart = ref(false)

// Computed properties
const categories = computed(() => {
  const cats = ['all', ...new Set(products.value.map(p => p.category))]
  return cats
})

const priceRange = computed(() => ({
  min: 0,
  max: 500
}))

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesCategory = filters.value.category === 'all' || product.category === filters.value.category
    const matchesPrice = product.price <= filters.value.maxPrice
    return matchesCategory && matchesPrice
  })
})

const filteredAndSortedProducts = computed(() => {
  const sorted = [...filteredProducts.value]
  
  switch(sortBy.value) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price)
    default:
      return sorted
  }
})

// Methods
const updateFilter = (filterType, value) => {
  filters.value[filterType] = value
}
</script>

<style scoped>
.app {
  min-height: 100vh;
}

.main-content {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 30px;
  padding: 30px 20px;
  min-height: calc(100vh - 70px);
}

.sidebar {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  height: fit-content;
}

.product-grid {
  flex: 1;
}

.sort-controls {
  margin-bottom: 20px;
}

.sort-select {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  font-size: 14px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>