<template>
  <div class="countdown-timer">
    <div class="timer-grid">
      <TimerDigit 
        v-for="(digit, index) in timeDigits" 
        :key="index"
        :value="digit.value"
        :label="digit.label"
        class="timer-digit"
      />
    </div>
    
    <div class="progress-container">
      <div class="progress-track"></div>
      <div class="progress-bar" :style="{ width: progress + '%' }">
        <div class="progress-glow"></div>
      </div>
      <div class="progress-labels">
        <span class="progress-start">Start</span>
        <span class="progress-value">{{ progress.toFixed(1) }}%</span>
        <span class="progress-end">Target</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import TimerDigit from './TimerDigit.vue'

const props = defineProps({
  targetDate: {
    type: Date,
    required: true
  }
})

const emit = defineEmits(['countdown-complete'])

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const totalSeconds = ref(0)
const progress = ref(0)

const timeDigits = computed(() => [
  { value: days.value, label: 'Days' },
  { value: hours.value, label: 'Hours' },
  { value: minutes.value, label: 'Minutes' },
  { value: seconds.value, label: 'Seconds' }
])

let intervalId = null
let totalDuration = 0

const updateCountdown = () => {
  const now = new Date().getTime()
  const target = new Date(props.targetDate).getTime()
  const distance = target - now
  
  if (distance < 0) {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    progress.value = 100
    
    emit('countdown-complete')
    clearInterval(intervalId)
    
    celebrate()
    return
  }
  
  days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
  
  totalSeconds.value = Math.floor(distance / 1000)
  
  if (totalDuration > 0) {
    const elapsed = totalDuration - totalSeconds.value
    progress.value = Math.min(100, (elapsed / totalDuration) * 100)
  }
}

const celebrate = () => {
  const digits = document.querySelectorAll('.timer-digit')
  
  gsap.to(digits, {
    y: -20,
    scale: 1.1,
    duration: 0.5,
    stagger: 0.1,
    repeat: 3,
    yoyo: true,
    ease: "power2.inOut"
  })
  
  // Dark theme confetti
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement('div')
    confetti.className = 'confetti'
    const hue = Math.random() * 60 + 200; // Blue-purple range
    confetti.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      background: hsl(${hue}, 80%, 60%);
      top: 50%;
      left: 50%;
      border-radius: 50%;
      z-index: 1000;
      filter: drop-shadow(0 0 8px hsl(${hue}, 80%, 60%));
    `
    document.querySelector('.countdown-timer').appendChild(confetti)
    
    gsap.to(confetti, {
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => confetti.remove()
    })
  }
}

onMounted(() => {
  const now = new Date().getTime()
  const target = new Date(props.targetDate).getTime()
  totalDuration = Math.floor((target - now) / 1000)
  
  updateCountdown()
  
  gsap.from('.timer-grid', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out"
  })
  
  intervalId = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

watch(() => props.targetDate, () => {
  const now = new Date().getTime()
  const target = new Date(props.targetDate).getTime()
  totalDuration = Math.floor((target - now) / 1000)
  
  if (intervalId) {
    clearInterval(intervalId)
  }
  
  intervalId = setInterval(updateCountdown, 1000)
})
</script>

<style scoped>
.countdown-timer {
  position: relative;
  overflow: hidden;
}

.timer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 50px;
}

.progress-container {
  height: 60px;
  background: rgba(30, 41, 59, 0.4);
  border-radius: 30px;
  position: relative;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.progress-track {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, 
    rgba(30, 41, 59, 0.6) 0%, 
    rgba(30, 41, 59, 0.3) 50%, 
    rgba(30, 41, 59, 0.6) 100%);
  border-radius: 30px;
}

.progress-bar {
  height: 40px;
  background: linear-gradient(90deg, 
    #3b82f6 0%, 
    #8b5cf6 50%, 
    #3b82f6 100%);
  border-radius: 20px;
  position: absolute;
  top: 10px;
  left: 10px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.progress-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.2) 50%, 
    transparent 100%);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.progress-labels {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #94a3b8;
}

.progress-value {
  color: #60a5fa;
  font-size: 1.1rem;
  text-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
  background: rgba(15, 23, 42, 0.8);
  padding: 4px 12px;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

@media (max-width: 768px) {
  .timer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .progress-container {
    height: 50px;
  }
  
  .progress-bar {
    height: 30px;
    top: 10px;
  }
  
  .progress-labels {
    font-size: 0.8rem;
    padding: 0 15px;
  }
  
  .progress-value {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .timer-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .progress-container {
    height: 45px;
  }
  
  .progress-labels {
    flex-direction: column;
    justify-content: center;
    gap: 5px;
  }
}
</style>