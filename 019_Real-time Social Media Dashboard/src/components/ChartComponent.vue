<template>
  <div class="chart-component" ref="chartContainer">
    <div class="chart-header">
      <h3>{{ title }}</h3>
      <div class="chart-legend">
        <span v-for="(item, index) in dataset" :key="index" class="legend-item">
          <span class="legend-color" :style="{ backgroundColor: colors[index] }"></span>
          {{ item.label }}
        </span>
      </div>
    </div>
    <div class="chart-container" ref="chartElement">
      <svg :width="width" :height="height" class="chart-svg">
        <!-- Grid lines -->
        <g v-for="i in 5" :key="'grid-' + i" class="grid-line">
          <line 
            :x1="padding" 
            :y1="padding + (i * (height - 2*padding)/5)" 
            :x2="width - padding" 
            :y2="padding + (i * (height - 2*padding)/5)"
          />
          <text 
            :x="padding - 10" 
            :y="padding + (i * (height - 2*padding)/5)" 
            text-anchor="end" 
            class="grid-label"
          >
            {{ Math.round(maxValue - (i * maxValue/5)) }}{{ unit }}
          </text>
        </g>
        
        <!-- X-axis labels -->
        <g v-for="(label, index) in labels" :key="'label-' + index" class="x-label">
          <text 
            :x="padding + (index * (width - 2*padding)/(labels.length - 1))" 
            :y="height - padding + 20" 
            text-anchor="middle"
          >
            {{ label }}
          </text>
        </g>
        
        <!-- Data lines -->
        <g v-for="(dataSet, setIndex) in dataset" :key="'dataset-' + setIndex">
          <path 
            :d="generatePath(dataSet.data)" 
            fill="none" 
            :stroke="colors[setIndex]" 
            stroke-width="3"
            class="data-line"
            ref="linePath"
          />
          
          <!-- Data points -->
          <g v-for="(point, pointIndex) in dataSet.data" :key="'point-' + setIndex + '-' + pointIndex">
            <circle 
              :cx="padding + (pointIndex * (width - 2*padding)/(labels.length - 1))" 
              :cy="height - padding - (point / maxValue * (height - 2*padding))"
              r="4"
              :fill="colors[setIndex]"
              class="data-point"
              @mouseenter="showTooltip(point, labels[pointIndex], dataSet.label, $event)"
              @mouseleave="hideTooltip"
            />
          </g>
        </g>
      </svg>
      
      <!-- Tooltip -->
      <div v-if="tooltip.visible" class="chart-tooltip" :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
        <div class="tooltip-title">{{ tooltip.label }}</div>
        <div class="tooltip-value">{{ tooltip.value }}{{ unit }}</div>
        <div class="tooltip-dataset">{{ tooltip.dataset }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { gsap } from 'gsap';

export default {
  name: 'ChartComponent',
  props: {
    title: {
      type: String,
      default: 'Performance Chart'
    },
    labels: {
      type: Array,
      default: () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    dataset: {
      type: Array,
      default: () => [
        { label: 'Likes', data: [120, 190, 300, 500, 200, 300, 450] },
        { label: 'Shares', data: [70, 150, 200, 350, 150, 250, 400] }
      ]
    },
    colors: {
      type: Array,
      default: () => ['#6366f1', '#10b981', '#f59e0b', '#ef4444']
    },
    unit: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const chartElement = ref(null);
    const chartContainer = ref(null);
    const linePath = ref([]);
    const tooltip = ref({
      visible: false,
      x: 0,
      y: 0,
      value: 0,
      label: '',
      dataset: ''
    });
    
    const width = ref(500);
    const height = ref(300);
    const padding = 60;
    
    // Calculate maximum value for scaling
    const maxValue = computed(() => {
      let max = 0;
      props.dataset.forEach(dataSet => {
        const dataMax = Math.max(...dataSet.data);
        if (dataMax > max) max = dataMax;
      });
      // Round up to nearest 100 for nice grid lines
      return Math.ceil(max / 100) * 100;
    });
    
    // Generate SVG path for a dataset
    const generatePath = (data) => {
      if (data.length === 0) return '';
      
      const points = data.map((value, index) => {
        const x = padding + (index * (width.value - 2*padding) / (props.labels.length - 1));
        const y = height.value - padding - (value / maxValue.value * (height.value - 2*padding));
        return `${x},${y}`;
      });
      
      return `M ${points.join(' L ')}`;
    };
    
    // Show tooltip on hover
    const showTooltip = (value, label, dataset, event) => {
      tooltip.value = {
        visible: true,
        x: event.clientX - chartContainer.value.getBoundingClientRect().left,
        y: event.clientY - chartContainer.value.getBoundingClientRect().top - 80,
        value,
        label,
        dataset
      };
    };
    
    // Hide tooltip
    const hideTooltip = () => {
      tooltip.value.visible = false;
    };
    
    // Generate random data updates
    const updateChartData = () => {
      const newDataset = props.dataset.map(dataSet => {
        const newData = [...dataSet.data];
        // Remove first element and add new random element
        newData.shift();
        const lastValue = newData[newData.length - 1];
        const randomChange = Math.random() * 100 - 30; // -30 to +70
        newData.push(Math.max(0, Math.round(lastValue + randomChange)));
        
        return {
          ...dataSet,
          data: newData
        };
      });
      
      return newDataset;
    };
    
    // Animate chart updates
    const animateChartUpdate = () => {
      if (linePath.value && linePath.value.length > 0) {
        linePath.value.forEach((path, index) => {
          if (path) {
            const newPath = generatePath(props.dataset[index].data);
            gsap.to(path, {
              duration: 1,
              attr: { d: newPath },
              ease: "power2.out"
            });
          }
        });
      }
    };
    
    onMounted(() => {
      // Set chart dimensions based on container
      if (chartContainer.value) {
        width.value = chartContainer.value.offsetWidth;
      }
      
      // Animate chart entrance
      gsap.from(chartContainer.value, {
        duration: 0.8,
        y: 30,
        opacity: 0,
        delay: 0.2,
        ease: "power3.out"
      });
      
      // Animate lines drawing
      if (linePath.value && linePath.value.length > 0) {
        linePath.value.forEach((path, index) => {
          if (path) {
            const length = path.getTotalLength();
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length
            });
            
            gsap.to(path, {
              strokeDashoffset: 0,
              duration: 1.5,
              delay: 0.3 + (index * 0.2),
              ease: "power3.out"
            });
          }
        });
      }
      
      // Animate points
      gsap.from('.data-point', {
        duration: 0.5,
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        delay: 1,
        ease: "back.out(1.2)"
      });
      
      // Update chart data periodically
      setInterval(() => {
        // In a real app, this would update props.dataset
        // For now, we'll just trigger animation
        animateChartUpdate();
      }, 15000);
    });
    
    return {
      chartElement,
      chartContainer,
      linePath,
      tooltip,
      width,
      height,
      padding,
      maxValue,
      generatePath,
      showTooltip,
      hideTooltip,
      updateChartData,
      animateChartUpdate
    };
  }
}
</script>

<style scoped>
.chart-component {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 25px;
  grid-column: 1 / -1;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.chart-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #f0f0f0;
}

.chart-legend {
  display: flex;
  gap: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #aaa;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.chart-container {
  position: relative;
  width: 100%;
  overflow: visible;
}

.chart-svg {
  width: 100%;
  height: auto;
}

.grid-line line {
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 1;
  stroke-dasharray: 4;
}

.grid-label {
  fill: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
}

.x-label text {
  fill: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.data-line {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.data-point {
  cursor: pointer;
  transition: r 0.2s;
}

.data-point:hover {
  r: 6;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
}

.chart-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  font-size: 0.9rem;
  pointer-events: none;
  z-index: 100;
  min-width: 140px;
  transform: translateX(-50%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chart-tooltip::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid rgba(0, 0, 0, 0.8);
}

.tooltip-title {
  font-weight: 600;
  margin-bottom: 5px;
  color: #ccc;
}

.tooltip-value {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 3px;
}

.tooltip-dataset {
  color: #aaa;
  font-size: 0.85rem;
}
</style>