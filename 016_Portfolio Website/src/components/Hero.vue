<template>
  <section class="hero" ref="heroSection">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h3 class="greeting">Hello, I'm</h3>
          <h1 class="name">Alex Morgan</h1>
          <h2 class="title">Full Stack Developer</h2>
          <p class="description">
            I create beautiful, functional websites and applications with modern technologies.
            Passionate about clean code, user experience, and innovative solutions.
          </p>
          <div class="hero-buttons">
            <a href="#projects" class="btn">View My Work</a>
            <a href="#contact" class="btn btn-outline">Contact Me</a>
          </div>
        </div>
        <div class="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
            alt="Alex Morgan - Full Stack Developer"
          />
        </div>
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="scroll-indicator" @click="scrollToAbout">
      <span></span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  mounted() {
    this.animateHero()
  },
  methods: {
    animateHero() {
      const tl = this.$gsap.timeline()
      
      tl.from('.greeting', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
      })
      .from('.name', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.title', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.description', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.hero-buttons', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.hero-image', {
        duration: 1,
        x: 50,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.8')
    },
    scrollToAbout() {
      document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
      })
    }
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
  padding-top: 80px;
}

.hero:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  z-index: -1;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-text {
  max-width: 600px;
}

.greeting {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 10px;
}

.name {
  font-size: 3.5rem;
  margin-bottom: 10px;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.title {
  font-size: 2rem;
  color: var(--dark-color);
  margin-bottom: 20px;
  text-align: left;
}

.title:after {
  left: 0;
  transform: none;
}

.description {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 30px;
}

.hero-buttons {
  display: flex;
  gap: 20px;
}

.hero-image {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.hero-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.hero-image:hover img {
  transform: scale(1.05);
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}

.scroll-indicator span {
  display: block;
  width: 24px;
  height: 40px;
  border: 2px solid var(--primary-color);
  border-radius: 12px;
  position: relative;
}

.scroll-indicator span:before {
  content: '';
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 10px;
  background-color: var(--primary-color);
  border-radius: 2px;
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  80% {
    transform: translateX(-50%) translateY(15px);
    opacity: 0;
  }
  100% {
    transform: translateX(-50%) translateY(0);
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 992px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-text {
    max-width: 100%;
  }
  
  .title {
    text-align: center;
  }
  
  .title:after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-image {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 576px) {
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .name {
    font-size: 2.8rem;
  }
  
  .title {
    font-size: 1.8rem;
  }
}
</style>