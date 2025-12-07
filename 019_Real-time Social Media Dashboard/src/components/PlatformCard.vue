<template>
  <div class="platform-card" ref="cardElement">
    <div class="platform-header">
      <div class="platform-info">
        <div class="platform-icon" :style="{ backgroundColor: platform.color }">
          <span>{{ platform.icon }}</span>
        </div>
        <div>
          <h3>{{ platform.name }}</h3>
          <p class="platform-handle">{{ platform.handle }}</p>
        </div>
      </div>
      <div class="platform-followers">
        <span class="followers-count">{{ platform.followers.toLocaleString() }}</span>
        <span class="followers-label">Followers</span>
      </div>
    </div>
    
    <div class="platform-metrics">
      <div class="metric" v-for="metric in platform.metrics" :key="metric.name">
        <div class="metric-name">{{ metric.name }}</div>
        <div class="metric-value">{{ metric.value.toLocaleString() }}</div>
        <div class="metric-change" :class="{ positive: metric.change >= 0, negative: metric.change < 0 }">
          {{ metric.change >= 0 ? '+' : '' }}{{ metric.change }}%
        </div>
      </div>
    </div>
    
    <div class="platform-engagement">
      <div class="engagement-label">Engagement Rate</div>
      <div class="engagement-bar">
        <div class="engagement-fill" :style="{ width: platform.engagement + '%', backgroundColor: platform.color }"></div>
      </div>
      <div class="engagement-value">{{ platform.engagement }}%</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

export default {
  name: 'PlatformCard',
  props: {
    platform: Object
  },
  setup(props) {
    const cardElement = ref(null);
    
    onMounted(() => {
      // Animate card entrance with stagger
      gsap.from(cardElement.value, {
        duration: 0.7,
        y: 40,
        opacity: 0,
        ease: "power3.out",
        delay: props.platform.delay || 0
      });
      
      // Animate engagement bar
      gsap.from(cardElement.value.querySelector('.engagement-fill'), {
        duration: 1.5,
        width: "0%",
        ease: "power2.out",
        delay: 0.5 + (props.platform.delay || 0)
      });
    });
    
    return {
      cardElement
    };
  }
}
</script>

<style scoped>
.platform-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.platform-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.platform-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
}

.platform-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.platform-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.platform-info h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.platform-handle {
  color: #aaa;
  font-size: 0.9rem;
}

.platform-followers {
  text-align: right;
}

.followers-count {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
}

.followers-label {
  color: #aaa;
  font-size: 0.9rem;
}

.platform-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 25px;
}

.metric {
  text-align: center;
}

.metric-name {
  color: #aaa;
  font-size: 0.85rem;
  margin-bottom: 8px;
}

.metric-value {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.metric-change {
  font-size: 0.9rem;
  font-weight: 600;
}

.positive {
  color: #4ade80;
}

.negative {
  color: #f87171;
}

.platform-engagement {
  display: flex;
  align-items: center;
  gap: 15px;
}

.engagement-label {
  color: #aaa;
  font-size: 0.9rem;
  min-width: 120px;
}

.engagement-bar {
  flex-grow: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.engagement-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 1s ease;
}

.engagement-value {
  font-weight: 600;
  min-width: 40px;
  text-align: right;
}
</style>