<template>
  <div class="metric-card" ref="cardRef">
    <div class="metric-icon" :style="{ backgroundColor: iconBg }">
      <i :class="icon" />
    </div>
    <div class="metric-content">
      <div class="metric-value">{{ formatValue(value) }}</div>
      <div class="metric-title">{{ title }}</div>
      <div class="metric-change" :class="changeType">
        <i :class="changeIcon" />
        {{ change }}%
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  change: {
    type: Number,
    default: 0
  },
  icon: {
    type: String,
    default: 'fas fa-chart-line'
  },
  iconBg: {
    type: String,
    default: '#4f46e5'
  }
})

const cardRef = ref(null)

const changeType = computed(() => {
  return props.change >= 0 ? 'positive' : 'negative'
})

const changeIcon = computed(() => {
  return props.change >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'
})

const formatValue = (val) => {
  if (typeof val === 'number') {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`
    return `$${val.toLocaleString()}`
  }
  return val
}

onMounted(() => {
  // GSAP animation on mount
  if (cardRef.value) {
    gsap.from(cardRef.value, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.1
    })
  }
})
</script>

<style scoped>
.metric-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.metric-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.metric-content {
  flex: 1;
}

.metric-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.metric-title {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.metric-change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.metric-change.positive {
  color: #10b981;
}

.metric-change.negative {
  color: #ef4444;
}
</style>