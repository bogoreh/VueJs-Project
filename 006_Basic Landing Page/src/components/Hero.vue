<template>
  <section class="hero">
    <div class="hero-background">
      <div class="gradient-circle"></div>
      <div class="gradient-circle"></div>
      <div class="particles" ref="particles"></div>
    </div>
    
    <div class="container">
      <div class="hero-content">
        <div class="badge" ref="badge">
          <span>✨ Premium Product</span>
        </div>
        
        <h1 class="hero-title" ref="title">
          Transform Your Digital
          <span class="gradient-text">Experience</span>
        </h1>
        
        <p class="hero-subtitle" ref="subtitle">
          A cutting-edge solution designed for modern businesses. 
          Streamline workflows, boost productivity, and drive growth 
          with our intelligent platform.
        </p>
        
        <div class="hero-buttons" ref="buttons">
          <a href="#features" class="btn">
            <span>Explore Features</span>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          <a href="#cta" class="btn btn-outline">
            <span>Start Free Trial</span>
          </a>
        </div>
        
        <div class="hero-stats" ref="stats">
          <div class="stat-item">
            <div class="stat-number">99.9%</div>
            <div class="stat-label">Uptime</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">10K+</div>
            <div class="stat-label">Happy Clients</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Support</div>
          </div>
        </div>
      </div>
      
      <div class="hero-visual" ref="visual">
        <div class="dashboard-preview glass-effect">
          <div class="dashboard-header">
            <div class="dashboard-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="dashboard-content">
            <div class="metric-chart"></div>
            <div class="metric-chart"></div>
            <div class="metric-chart"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const title = ref(null)
const subtitle = ref(null)
const buttons = ref(null)
const visual = ref(null)
const badge = ref(null)
const stats = ref(null)
const particles = ref(null)

onMounted(() => {
  // Badge animation
  gsap.from(badge.value, {
    duration: 1,
    y: -20,
    opacity: 0,
    ease: 'back.out(1.7)'
  })

  // Title animation
  gsap.from(title.value, {
    duration: 1.2,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
  })

  // Subtitle animation
  gsap.from(subtitle.value, {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.3,
    ease: 'power3.out'
  })

  // Buttons animation
  gsap.from(buttons.value.children, {
    duration: 0.8,
    y: 20,
    opacity: 0,
    stagger: 0.2,
    delay: 0.6,
    ease: 'power3.out'
  })

  // Stats animation
  gsap.from(stats.value.children, {
    duration: 0.8,
    y: 20,
    opacity: 0,
    stagger: 0.1,
    delay: 0.9,
    ease: 'power3.out'
  })

  // Dashboard preview animation
  gsap.from(visual.value, {
    duration: 1.5,
    scale: 0.8,
    opacity: 0,
    delay: 1.2,
    ease: 'back.out(1.7)'
  })

  // Create floating particles
  createParticles()
})

const createParticles = () => {
  const particleCount = 20
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.width = `${Math.random() * 4 + 2}px`
    particle.style.height = particle.style.width
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`
    particle.style.backgroundColor = i % 3 === 0 ? 'var(--primary)' : 
                                   i % 3 === 1 ? 'var(--secondary)' : 'var(--accent)'
    particle.style.opacity = Math.random() * 0.3 + 0.1
    
    particles.value.appendChild(particle)
    
    // Animate particle
    gsap.to(particle, {
      y: `+=${Math.random() * 100 - 50}px`,
      x: `+=${Math.random() * 100 - 50}px`,
      duration: Math.random() * 10 + 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 40px 0;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.gradient-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
}

.gradient-circle:nth-child(1) {
  width: 500px;
  height: 500px;
  background: var(--primary);
  top: -200px;
  right: -100px;
}

.gradient-circle:nth-child(2) {
  width: 400px;
  height: 400px;
  background: var(--accent);
  bottom: -150px;
  left: -100px;
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  border-radius: 50%;
  filter: blur(1px);
}

.hero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.hero-content {
  max-width: 600px;
}

.badge {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 50px;
  margin-bottom: 30px;
}

.badge span {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  color: var(--light-text);
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--light-text-secondary);
  margin-bottom: 40px;
  line-height: 1.7;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 60px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.btn:hover .btn-icon {
  transform: translateX(4px);
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 32px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--light-text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--dark-border);
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dashboard-preview {
  width: 500px;
  height: 400px;
  border-radius: 20px;
  padding: 20px;
  transform: perspective(1000px) rotateY(-10deg) rotateX(5deg);
}

.dashboard-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}

.dashboard-dots {
  display: flex;
  gap: 8px;
}

.dashboard-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--light-text-secondary);
}

.dashboard-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  height: calc(100% - 50px);
}

.metric-chart {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
  border-radius: 12px;
  border: 1px solid var(--dark-border);
}

@media (max-width: 1024px) {
  .hero .container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 60px;
  }
  
  .hero-title {
    font-size: 2.75rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .dashboard-preview {
    width: 400px;
    height: 300px;
    transform: none;
    margin: 0 auto;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 2.25rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .hero-stats {
    flex-wrap: wrap;
    gap: 24px;
  }
  
  .stat-divider {
    display: none;
  }
  
  .dashboard-preview {
    width: 100%;
    max-width: 300px;
  }
}
</style>