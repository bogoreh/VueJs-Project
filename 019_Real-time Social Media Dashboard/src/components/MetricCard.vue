<template>
  <div class="metric-card" ref="cardElement">
    <div class="metric-header">
      <h3>{{ title }}</h3>
      <div class="metric-icon" :style="{ backgroundColor: color }">
        <span>{{ icon }}</span>
      </div>
    </div>
    <div class="metric-value">
      <span class="value">{{ formattedValue }}</span>
      <span class="unit">{{ unit }}</span>
    </div>
    <div class="metric-change" :class="changeClass">
      <span class="change-arrow">{{ changeArrow }}</span>
      <span class="change-value">{{ Math.abs(change) }}%</span>
      <span class="change-label">from last hour</span>
    </div>
    <div class="metric-chart">
      <div class="chart-bar" :style="{ width: Math.min(Math.abs(change) * 5, 100) + '%', backgroundColor: color }"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { gsap } from 'gsap';

export default {
  name: 'MetricCard',
  props: {
    title: String,
    value: Number,
    unit: String,
    change: Number,
    color: String,
    icon: String
  },
  setup(props) {
    const cardElement = ref(null);
    
    const changeClass = computed(() => {
      return props.change >= 0 ? 'positive' : 'negative';
    });
    
    const changeArrow = computed(() => {
      return props.change >= 0 ? '↗' : '↘';
    });
    
    const formattedValue = computed(() => {
      if (props.unit === 'k' || props.unit === 'K') {
        return (props.value / 1000).toFixed(1);
      }
      return props.value.toLocaleString();
    });
    
    onMounted(() => {
      // Animate card entrance
      gsap.from(cardElement.value, {
        duration: 0.6,
        y: 30,
        opacity: 0,
        ease: "back.out(1.2)"
      });
      
      // Animate value counter
      gsap.from(cardElement.value.querySelector('.value'), {
        duration: 1,
        textContent: 0,
        snap: { textContent: 1 },
        stagger: 1,
        ease: "power2.out"
      });
    });
    
    return {
      cardElement,
      changeClass,
      changeArrow,
      formattedValue
    };
  }
}
</script>

<style scoped>
.metric-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.metric-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.metric-header h3 {
  font-size: 1.1rem;
  color: #ccc;
  font-weight: 500;
}

.metric-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
}

.metric-value {
  margin-bottom: 15px;
}

.value {
  font-size: 2.8rem;
  font-weight: 700;
  margin-right: 5px;
}

.unit {
  font-size: 1.2rem;
  color: #aaa;
}

.metric-change {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.change-arrow {
  font-size: 1.2rem;
}

.positive {
  color: #4ade80;
}

.negative {
  color: #f87171;
}

.change-label {
  color: #aaa;
  margin-left: auto;
}

.metric-chart {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.chart-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 1s ease;
}
</style>