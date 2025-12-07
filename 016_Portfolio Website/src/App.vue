<template>
  <div id="app">
    <Header />
    <main>
      <Hero id="home" />
      <About id="about" />
      <Skills id="skills" />
      <Projects id="projects" />
      <Contact id="contact" />
    </main>
    <Footer />
    
    <!-- Scroll to top button -->
    <button 
      v-if="showScrollTop" 
      @click="scrollToTop" 
      class="scroll-top-btn"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Hero,
    About,
    Skills,
    Projects,
    Contact,
    Footer
  },
  data() {
    return {
      showScrollTop: false
    }
  },
  mounted() {
    // Setup scroll event listener
    window.addEventListener('scroll', this.handleScroll)
    
    // Initialize smooth scrolling for anchor links
    this.initSmoothScrolling()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.showScrollTop = window.scrollY > 500
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    initSmoothScrolling() {
      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault()
          const targetId = this.getAttribute('href')
          if (targetId === '#') return
          
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
        })
      })
    }
  }
}
</script>

<style>
.scroll-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-top-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}
</style>