<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>Social Media Dashboard</h1>
      <div class="real-time-badge">
        <span class="loading-pulse"></span>
        LIVE DATA UPDATING
      </div>
    </div>
    
    <div class="dashboard-grid">
      <MetricCard
        v-for="metric in metrics"
        :key="metric.title"
        :title="metric.title"
        :value="metric.value"
        :unit="metric.unit"
        :change="metric.change"
        :color="metric.color"
        :icon="metric.icon"
      />
    </div>
    
    <h2 class="section-title">Platform Performance</h2>
    <div class="platforms-grid">
      <PlatformCard
        v-for="platform in platforms"
        :key="platform.name"
        :platform="platform"
      />
    </div>
    
    <div class="last-updated">
      Last updated: {{ lastUpdated }}
      <br>
      <small>Data updates every 10 seconds</small>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import MetricCard from './components/MetricCard.vue';
import PlatformCard from './components/PlatformCard.vue';

export default {
  name: 'App',
  components: {
    MetricCard,
    PlatformCard
  },
  setup() {
    // Mock metrics data
    const metrics = ref([
      { title: 'Total Followers', value: 1254300, unit: 'k', change: 2.3, color: '#6366f1', icon: '👥' },
      { title: 'Engagement Rate', value: 4.2, unit: '%', change: 0.8, color: '#10b981', icon: '📈' },
      { title: 'New Posts', value: 347, unit: '', change: 12.5, color: '#f59e0b', icon: '📝' },
      { title: 'Total Likes', value: 845200, unit: 'k', change: -1.2, color: '#ef4444', icon: '❤️' },
      { title: 'Comments', value: 32900, unit: '', change: 5.7, color: '#8b5cf6', icon: '💬' },
      { title: 'Shares', value: 18700, unit: '', change: 8.9, color: '#06b6d4', icon: '🔄' },
    ]);
    
    // Mock platforms data
    const platforms = ref([
      { 
        name: 'Instagram', 
        handle: '@ourbrand', 
        followers: 542800,
        icon: '📷',
        color: '#e1306c',
        metrics: [
          { name: 'Likes', value: 28400, change: 3.2 },
          { name: 'Comments', value: 1200, change: 5.7 },
          { name: 'Saves', value: 3800, change: 8.1 }
        ],
        engagement: 4.8,
        delay: 0.1
      },
      { 
        name: 'Twitter', 
        handle: '@ourbrand', 
        followers: 389200,
        icon: '🐦',
        color: '#1da1f2',
        metrics: [
          { name: 'Retweets', value: 8400, change: 2.1 },
          { name: 'Likes', value: 19200, change: -0.5 },
          { name: 'Replies', value: 1200, change: 1.8 }
        ],
        engagement: 3.2,
        delay: 0.2
      },
      { 
        name: 'Facebook', 
        handle: 'Our Brand', 
        followers: 723500,
        icon: '📘',
        color: '#1877f2',
        metrics: [
          { name: 'Reactions', value: 43200, change: 1.4 },
          { name: 'Comments', value: 5200, change: 3.2 },
          { name: 'Shares', value: 3100, change: 4.6 }
        ],
        engagement: 2.9,
        delay: 0.3
      },
      { 
        name: 'TikTok', 
        handle: '@ourbrand', 
        followers: 321400,
        icon: '🎵',
        color: '#000000',
        metrics: [
          { name: 'Likes', value: 89200, change: 12.4 },
          { name: 'Comments', value: 3400, change: 8.9 },
          { name: 'Shares', value: 15200, change: 15.3 }
        ],
        engagement: 6.7,
        delay: 0.4
      }
    ]);
    
    const lastUpdated = ref(new Date().toLocaleTimeString());
    let updateInterval;
    
    // Function to simulate real-time data updates
    const updateMetrics = () => {
      metrics.value.forEach(metric => {
        // Generate random change between -2% and 5%
        const randomChange = (Math.random() * 7 - 2).toFixed(1);
        metric.change = parseFloat(randomChange);
        
        // Update value based on change
        const changeFactor = 1 + (metric.change / 100);
        metric.value = Math.round(metric.value * changeFactor);
        
        // Ensure values don't get too large
        if (metric.value > 2000000 && metric.unit === 'k') {
          metric.value = 1000000;
        } else if (metric.value > 1000000 && !metric.unit) {
          metric.value = 500000;
        }
      });
      
      // Update platform metrics
      platforms.value.forEach(platform => {
        platform.metrics.forEach(metric => {
          const randomChange = (Math.random() * 10 - 2).toFixed(1);
          metric.change = parseFloat(randomChange);
          
          const changeFactor = 1 + (metric.change / 100);
          metric.value = Math.round(metric.value * changeFactor);
        });
        
        // Update engagement slightly
        const engagementChange = (Math.random() * 0.4 - 0.2).toFixed(1);
        platform.engagement = Math.max(0.5, Math.min(10, parseFloat((platform.engagement + parseFloat(engagementChange)).toFixed(1))));
        
        // Update followers slightly
        const followerChange = Math.random() > 0.5 ? 1 : -1;
        platform.followers += Math.floor(Math.random() * 100) * followerChange;
        platform.followers = Math.max(100000, platform.followers);
      });
      
      // Update timestamp
      lastUpdated.value = new Date().toLocaleTimeString();
      
      // Add subtle animation to header badge
      gsap.to('.real-time-badge', {
        duration: 0.3,
        scale: 1.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    };
    
    onMounted(() => {
      // Set up interval for real-time updates
      updateInterval = setInterval(updateMetrics, 10000);
      
      // Initial animation for dashboard header
      gsap.from('.dashboard-header', {
        duration: 1,
        y: -30,
        opacity: 0,
        ease: "power3.out"
      });
      
      gsap.from('.section-title', {
        duration: 0.8,
        x: -30,
        opacity: 0,
        delay: 0.5,
        ease: "power3.out"
      });
    });
    
    onUnmounted(() => {
      clearInterval(updateInterval);
    });
    
    return {
      metrics,
      platforms,
      lastUpdated
    };
  }
}
</script>

<style scoped>
.section-title {
  font-size: 1.8rem;
  margin: 40px 0 25px 0;
  color: #f0f0f0;
  font-weight: 600;
}
</style>