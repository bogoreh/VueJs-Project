<template>
  <div class="app">
    <div class="container">
      <div class="header-section">
        <h1 class="title">Countdown Timer</h1>
        <p class="subtitle">Target Date: {{ targetDateFormatted }}</p>
      </div>
      
      <div class="timer-card">
        <CountdownTimer 
          :target-date="targetDate"
          @countdown-complete="onCountdownComplete"
        />
      </div>
      
      <div class="controls-section">
        <h3 class="section-title">Set Custom Timer</h3>
        <div class="controls">
          <div class="input-group">
            <label for="date-input" class="input-label">
              <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Select Date & Time
            </label>
            <input 
              id="date-input"
              type="datetime-local" 
              v-model="customDate"
              class="date-input"
            >
          </div>
          <div class="button-group">
            <button @click="setCustomDate" class="btn btn-primary">
              <span class="btn-content">
                <svg class="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Set Timer
              </span>
            </button>
            <button @click="resetToDefault" class="btn btn-secondary">
              <span class="btn-content">
                <svg class="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 4v6h-6"></path>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
                Reset to Default
              </span>
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="countdownComplete" class="complete-section">
        <div class="complete-card">
          <div class="complete-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 class="complete-title">Countdown Complete!</h2>
          <p class="complete-message">The target date has been reached.</p>
          <button @click="resetToDefault" class="btn btn-accent">
            Start New Countdown
          </button>
        </div>
      </div>
      
      <div class="footer">
        <p class="footer-text">Countdown Timer</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CountdownTimer from './components/CountdownTimer.vue'

const defaultTargetDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days from now
const targetDate = ref(defaultTargetDate)
const customDate = ref('')
const countdownComplete = ref(false)

const targetDateFormatted = computed(() => {
  return targetDate.value.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

const setCustomDate = () => {
  if (customDate.value) {
    targetDate.value = new Date(customDate.value)
    countdownComplete.value = false
  }
}

const resetToDefault = () => {
  targetDate.value = defaultTargetDate
  customDate.value = ''
  countdownComplete.value = false
}

const onCountdownComplete = () => {
  countdownComplete.value = true
}

onMounted(() => {
  // Set min date for input (tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  customDate.value = tomorrow.toISOString().slice(0, 16)
})
</script>

<style scoped>
.app {
  text-align: center;
  padding: 20px;
}

.header-section {
  margin-bottom: 40px;
}

.title {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #60a5fa 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.1rem;
  color: #94a3b8;
  font-weight: 500;
}

.timer-card {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 30px;
  margin-bottom: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.controls-section {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

.input-group {
  width: 100%;
  max-width: 400px;
}

.input-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #94a3b8;
  margin-bottom: 10px;
  font-weight: 500;
  justify-content: center;
}

.icon {
  opacity: 0.7;
}

.date-input {
  width: 100%;
  padding: 16px 20px;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  color: #e2e8f0;
  transition: all 0.3s ease;
  outline: none;
}

.date-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.date-input:hover {
  background: rgba(30, 41, 59, 0.8);
}

.button-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn:hover::before {
  opacity: 1;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 1;
}

.btn-icon {
  transition: transform 0.3s ease;
}

.btn:hover .btn-icon {
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  background: rgba(30, 41, 59, 0.8);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(30, 41, 59, 1);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.btn-accent {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 14px 32px;
  font-weight: 600;
}

.btn-accent:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
}

.complete-section {
  animation: fadeIn 0.6s ease-out;
}

.complete-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 95, 70, 0.1) 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  backdrop-filter: blur(10px);
}

.complete-icon {
  color: #10b981;
  margin-bottom: 20px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.complete-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: #10b981;
}

.complete-message {
  color: #94a3b8;
  font-size: 1.1rem;
  margin-bottom: 24px;
}

.footer {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-text {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2.2rem;
  }
  
  .timer-card {
    padding: 30px 20px;
  }
  
  .controls-section {
    padding: 24px;
  }
  
  .button-group {
    width: 100%;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
  
  .complete-card {
    padding: 30px 20px;
  }
  
  .complete-title {
    font-size: 1.7rem;
  }
}

@media (max-width: 480px) {
  .app {
    padding: 16px;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}
</style>