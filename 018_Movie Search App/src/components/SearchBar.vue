<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        placeholder="Search for movies..."
        class="search-input"
        @keyup.enter="handleSubmit"
      />
      <button @click="handleSubmit" class="search-button">
        🔍
      </button>
      <button v-if="query" @click="clearSearch" class="clear-button">
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['search', 'clear'])
const query = ref('')
const inputRef = ref(null)

onMounted(() => {
  // Animate input on mount
  gsap.from('.search-input-wrapper', {
    duration: 0.8,
    width: 0,
    opacity: 0,
    ease: 'power3.out'
  })
})

const handleSubmit = () => {
  if (query.value.trim()) {
    emit('search', query.value.trim())
  }
}

const clearSearch = () => {
  query.value = ''
  emit('clear')
  
  // Shake animation on clear
  if (inputRef.value) {
    gsap.to(inputRef.value, {
      duration: 0.3,
      x: [-10, 10, -10, 10, 0],
      ease: 'power2.inOut'
    })
  }
}
</script>

<style scoped>
.search-bar {
  max-width: 600px;
  margin: 0 auto;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 1rem 3.5rem 1rem 1.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #f06;
  box-shadow: 0 0 20px rgba(240, 102, 102, 0.3);
  background: rgba(255, 255, 255, 0.15);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-button,
.clear-button {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button {
  right: 50px;
}

.search-button:hover {
  background: rgba(240, 102, 102, 0.2);
  transform: scale(1.1);
}

.clear-button:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}
</style>