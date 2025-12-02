<template>
  <section id="features" class="features section">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">Features</div>
        <h2 class="section-title" ref="sectionTitle">
          Powerful Features for
          <span class="gradient-text">Modern Teams</span>
        </h2>
        <p class="section-subtitle" ref="sectionSubtitle">
          Everything you need to succeed in today's fast-paced digital world
        </p>
      </div>
      
      <div class="features-grid">
        <div v-for="(feature, index) in features" :key="index" 
             class="feature-card glass-effect" 
             :ref="el => featureCards[index] = el"
             @mouseenter="featureHover(index)">
          <div class="feature-icon">
            <div class="icon-wrapper">
              <span>{{ feature.icon }}</span>
            </div>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <div class="feature-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionTitle = ref(null)
const sectionSubtitle = ref(null)
const featureCards = ref([])

const features = ref([
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Optimized performance with sub-second response times'
  },
  {
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'Bank-level encryption and security protocols'
  },
  {
    icon: '🔄',
    title: 'Seamless Integration',
    description: 'Connect with all your favorite tools and platforms'
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Real-time insights and predictive analytics'
  },
  {
    icon: '🎨',
    title: 'Customizable',
    description: 'Tailor every aspect to match your brand identity'
  },
  {
    icon: '🤖',
    title: 'AI Powered',
    description: 'Intelligent automation and smart recommendations'
  },
  {
    icon: '🌐',
    title: 'Global Scale',
    description: 'Deploy and scale across multiple regions instantly'
  },
  {
    icon: '📱',
    title: 'Mobile First',
    description: 'Optimized experience across all devices'
  }
])

onMounted(() => {
  // Animate section header
  gsap.from([sectionTitle.value, sectionSubtitle.value], {
    scrollTrigger: {
      trigger: sectionTitle.value,
      start: 'top 80%',
    },
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.3,
    ease: 'power3.out'
  })

  // Animate feature cards on scroll
  featureCards.value.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      duration: 0.8,
      y: 40,
      opacity: 0,
      delay: index * 0.1,
      ease: 'power3.out',
      onComplete: () => {
        // Add subtle floating animation
        gsap.to(card, {
          y: '-=10',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2
        })
      }
    })
  })
})

const featureHover = (index) => {
  const card = featureCards.value[index]
  
  gsap.to(card, {
    scale: 1.05,
    duration: 0.3,
    ease: 'power2.out',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
  })
  
  gsap.to(card, {
    scale: 1,
    duration: 0.3,
    delay: 0.3,
    ease: 'power2.in',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  })
}
</script>

<style scoped>
.features {
  background: var(--dark-bg);
  position: relative;
  overflow: hidden;
}

.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 80px;
}

.section-badge {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 50px;
  margin-bottom: 20px;
  color: var(--secondary);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
}

.section-title {
  font-size: 2.75rem;
  margin-bottom: 20px;
  color: var(--light-text);
}

.gradient-text {
  background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--light-text-secondary);
  line-height: 1.7;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.feature-card {
  padding: 40px 30px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon {
  margin-bottom: 24px;
}

.icon-wrapper {
  width: 70px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
  border-radius: 50%;
  font-size: 28px;
  transition: transform 0.3s ease;
}

.feature-card:hover .icon-wrapper {
  transform: scale(1.1) rotate(5deg);
}

.feature-title {
  font-size: 1.375rem;
  margin-bottom: 16px;
  color: var(--light-text);
}

.feature-description {
  color: var(--light-text-secondary);
  line-height: 1.6;
  font-size: 0.9375rem;
}

.feature-hint {
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.feature-card:hover .feature-hint {
  opacity: 1;
  transform: translateX(0);
}

.feature-hint svg {
  width: 20px;
  height: 20px;
  color: var(--primary);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.25rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>