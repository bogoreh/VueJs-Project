<template>
  <div class="step-indicator">
    <div 
      v-for="(step, index) in steps" 
      :key="index"
      class="step"
      :class="{
        'active': currentStep === index + 1,
        'completed': index + 1 < currentStep
      }"
    >
      <div class="step-number">{{ index + 1 }}</div>
      <div class="step-label">{{ step }}</div>
      <div class="step-line" v-if="index < steps.length - 1"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    required: true
  },
  currentStep: {
    type: Number,
    default: 1
  }
})
</script>

<style scoped>
.step-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  z-index: 1;
}

.step-label {
  font-size: 0.875rem;
  color: #666;
  text-align: center;
}

.step.active .step-number {
  background-color: #42b883;
  color: white;
  transform: scale(1.1);
}

.step.completed .step-number {
  background-color: #35495e;
  color: white;
}

.step-line {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  height: 2px;
  background-color: #e0e0e0;
  z-index: 0;
}
</style>