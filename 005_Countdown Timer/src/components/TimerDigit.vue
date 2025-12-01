<template>
  <div class="digit-container">
    <div class="digit" :data-value="currentValue">
      {{ currentValue }}
    </div>
    <div class="digit-label">{{ label }}</div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    default: ''
  }
})

const currentValue = ref(props.value)

watch(() => props.value, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    const digitEl = document.querySelector(`[data-value="${oldValue}"]`)
    
    if (digitEl) {
      gsap.fromTo(digitEl,
        {
          y: 0,
          opacity: 1
        },
        {
          y: -30,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            currentValue.value = newValue
            gsap.fromTo(digitEl,
              {
                y: 30,
                opacity: 0
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.3
              }
            )
          }
        }
      )
    } else {
      currentValue.value = newValue
    }
  }
})

onMounted(() => {
  const digitEl = document.querySelector(`[data-value="${props.value}"]`)
  if (digitEl) {
    gsap.from(digitEl, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
  }
})
</script>

<style scoped>
.digit-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 500px;
}

.digit {
  font-size: 5rem;
  font-weight: 800;
  background: linear-gradient(135deg, 
    rgba(30, 41, 59, 0.9) 0%, 
    rgba(15, 23, 42, 0.9) 100%);
  padding: 25px 35px;
  border-radius: 16px;
  margin: 10px;
  min-width: 110px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 
    0 15px 30px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  color: #60a5fa;
  position: relative;
  overflow: hidden;
}

.digit::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(59, 130, 246, 0.5), 
    transparent);
}

.digit::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  border-radius: 15px;
  background: linear-gradient(180deg, 
    rgba(255, 255, 255, 0.05) 0%, 
    rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
}

.digit-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-top: 15px;
  font-weight: 600;
  color: #94a3b8;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .digit {
    font-size: 3.5rem;
    padding: 20px 25px;
    min-width: 85px;
  }
  
  .digit-label {
    font-size: 0.8rem;
    letter-spacing: 2px;
  }
}

@media (max-width: 480px) {
  .digit {
    font-size: 2.8rem;
    padding: 15px 20px;
    min-width: 70px;
  }
}
</style>