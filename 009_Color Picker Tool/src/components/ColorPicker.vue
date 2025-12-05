<template>
  <div class="color-picker">
    <div class="color-grid">
      <div class="color-display">
        <div 
          class="color-preview" 
          :style="{ backgroundColor: currentColor }"
          ref="previewRef"
        ></div>
        <div class="controls">
          <div class="slider-container">
            <label>Red: {{ red }}</label>
            <input 
              type="range" 
              v-model="red" 
              min="0" 
              max="255" 
              class="slider"
              @input="updateColor"
            >
          </div>
          
          <div class="slider-container">
            <label>Green: {{ green }}</label>
            <input 
              type="range" 
              v-model="green" 
              min="0" 
              max="255" 
              class="slider"
              @input="updateColor"
            >
          </div>
          
          <div class="slider-container">
            <label>Blue: {{ blue }}</label>
            <input 
              type="range" 
              v-model="blue" 
              min="0" 
              max="255" 
              class="slider"
              @input="updateColor"
            >
          </div>
        </div>
      </div>
      
      <div class="color-info">
        <h3>Color Values</h3>
        
        <div class="color-value">
          <h4>HEX</h4>
          <p>{{ hexColor }}</p>
        </div>
        
        <div class="color-value">
          <h4>RGB</h4>
          <p>{{ rgbColor }}</p>
        </div>
        
        <div class="color-value">
          <h4>Preview</h4>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div :style="{
              width: '40px',
              height: '40px',
              backgroundColor: currentColor,
              borderRadius: '8px',
              border: '2px solid #e0e0e0'
            }"></div>
            <span>{{ currentColor }}</span>
          </div>
        </div>
        
        <button class="copy-btn" @click="copyHex">📋 Copy HEX</button>
        <button class="copy-btn" @click="copyRGB">📋 Copy RGB</button>
      </div>
    </div>
    
    <div class="toast" ref="toastRef">Copied to clipboard!</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'

const red = ref(74)
const green = ref(111)
const blue = ref(165)
const toastRef = ref(null)
const previewRef = ref(null)

// Convert to hex with proper formatting
const toHex = (value) => {
  const hex = value.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

// Computed properties
const hexColor = computed(() => {
  return `#${toHex(red.value)}${toHex(green.value)}${toHex(blue.value)}`
})

const rgbColor = computed(() => {
  return `rgb(${red.value}, ${green.value}, ${blue.value})`
})

const currentColor = computed(() => {
  return `rgb(${red.value}, ${green.value}, ${blue.value})`
})

// Update color function
const updateColor = () => {
  // Animate the color preview
  if (previewRef.value) {
    gsap.to(previewRef.value, {
      backgroundColor: currentColor.value,
      duration: 0.3,
      ease: "power2.out"
    })
  }
}

// Copy functions with GSAP animations
const copyHex = async () => {
  try {
    await navigator.clipboard.writeText(hexColor.value)
    showToast()
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const copyRGB = async () => {
  try {
    await navigator.clipboard.writeText(rgbColor.value)
    showToast()
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Show toast notification with GSAP animation
const showToast = () => {
  if (toastRef.value) {
    gsap.killTweensOf(toastRef.value)
    
    gsap.timeline()
      .to(toastRef.value, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(toastRef.value, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
        delay: 1.5
      })
  }
}

// Initialize with some animation
onMounted(() => {
  // Animate the initial color display
  if (previewRef.value) {
    gsap.from(previewRef.value, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)"
    })
  }
  
  // Animate sliders appearance
  gsap.from('.slider-container', {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.5,
    delay: 0.3
  })
  
  // Animate color info cards
  gsap.from('.color-value', {
    x: -20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.5,
    delay: 0.5
  })
})
</script>