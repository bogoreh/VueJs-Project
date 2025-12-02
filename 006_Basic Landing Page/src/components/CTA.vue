<template>
  <section id="cta" class="cta section">
    <div class="cta-background">
      <div class="cta-gradient"></div>
    </div>
    
    <div class="container">
      <div class="cta-content glass-effect">
        <h2 class="cta-title" ref="title">
          Ready to Transform Your
          <span class="gradient-text">Business?</span>
        </h2>
        
        <p class="cta-subtitle" ref="subtitle">
          Join thousands of successful companies using our platform to drive growth and innovation.
        </p>
        
        <div class="cta-features">
          <div class="feature-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>30-day free trial</span>
          </div>
          <div class="feature-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>No credit card required</span>
          </div>
          <div class="feature-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
        
        <div class="cta-actions" ref="actions">
          <button class="btn cta-button" ref="button" @click="animateButton">
            <span>Start Free Trial</span>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
          
          <div class="cta-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <span>Secure & encrypted</span>
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
const actions = ref(null)
const button = ref(null)

onMounted(() => {
  // Create a timeline for sequenced animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: title.value,
      start: 'top 80%',
    }
  })

  tl.from(title.value, {
    duration: 1,
    y: 40,
    opacity: 0,
    ease: 'power3.out'
  })
  .from(subtitle.value, {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: 'power3.out'
  }, '-=0.5')
  .from(actions.value, {
    duration: 0.8,
    y: 20,
    opacity: 0,
    ease: 'power3.out'
  }, '-=0.3')

  // Continuous subtle animation for gradient background
  gsap.to('.cta-gradient', {
    duration: 10,
    backgroundPosition: '200% 200%',
    repeat: -1,
    ease: 'linear'
  })

  // Pulsing animation for CTA
  gsap.to(button.value, {
    duration: 2,
    scale: 1.05,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
})

const animateButton = () => {
  // Create ripple effect
  const ripple = document.createElement('span')
  ripple.className = 'ripple'
  button.value.appendChild(ripple)
  
  gsap.fromTo(ripple,
    {
      scale: 0,
      opacity: 1
    },
    {
      scale: 3,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      onComplete: () => ripple.remove()
    }
  )
  
  // Button animation
  gsap.to(button.value, {
    duration: 0.3,
    scale: 0.95,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut',
    onComplete: () => {
      // Add your signup logic here
      console.log('Starting free trial...')
      // window.location.href = '/signup'
    }
  })
}
</script>

<style scoped>
.cta {
  position: relative;
  overflow: hidden;
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.cta-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    rgba(139, 92, 246, 0.1) 0%,
    rgba(245, 158, 11, 0.1) 25%,
    rgba(16, 185, 129, 0.1) 50%,
    rgba(139, 92, 246, 0.1) 75%,
    rgba(245, 158, 11, 0.1) 100%
  );
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 60px;
  border-radius: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%);
  z-index: -1;
}

.cta-title {
  font-size: 3rem;
  margin-bottom: 20px;
  color: var(--light-text);
}

.cta-subtitle {
  font-size: 1.125rem;
  color: var(--light-text-secondary);
  margin-bottom: 40px;
  line-height: 1.7;
}

.cta-features {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--light-text);
  font-weight: 500;
}

.feature-item svg {
  width: 20px;
  height: 20px;
  color: var(--secondary);
}

.cta-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.cta-button {
  font-size: 1.125rem;
  padding: 18px 48px;
  position: relative;
  overflow: hidden;
}

.ripple {
  position: absolute;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.cta-note {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--light-text-secondary);
  font-size: 0.875rem;
}

.cta-note svg {
  width: 16px;
  height: 16px;
  color: var(--secondary);
}

@media (max-width: 768px) {
  .cta-content {
    padding: 60px 30px;
  }
  
  .cta-title {
    font-size: 2.25rem;
  }
  
  .cta-features {
    flex-direction: column;
    gap: 16px;
  }
  
  .cta-button {
    width: 100%;
    justify-content: center;
  }
}
</style>