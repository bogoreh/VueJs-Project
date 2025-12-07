<template>
  <header class="header" :class="{ 'scrolled': scrolled }">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <a href="#home">Portfolio</a>
        </div>
        
        <nav class="nav" :class="{ 'active': mobileMenuOpen }">
          <ul>
            <li v-for="item in navItems" :key="item.id">
              <a :href="item.link" @click="closeMobileMenu">{{ item.name }}</a>
            </li>
          </ul>
          <a href="#contact" class="btn btn-contact" @click="closeMobileMenu">Contact Me</a>
        </nav>
        
        <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      scrolled: false,
      mobileMenuOpen: false,
      navItems: [
        { id: 1, name: 'Home', link: '#home' },
        { id: 2, name: 'About', link: '#about' },
        { id: 3, name: 'Skills', link: '#skills' },
        { id: 4, name: 'Projects', link: '#projects' },
        { id: 5, name: 'Contact', link: '#contact' }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 50
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  padding: 20px 0;
  z-index: 1000;
  transition: var(--transition);
}

.header.scrolled {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 15px 0;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav ul {
  display: flex;
  list-style: none;
  gap: 30px;
  align-items: center;
}

.nav a {
  font-weight: 600;
  transition: var(--transition);
  position: relative;
}

.nav a:hover {
  color: var(--primary-color);
}

.nav a:after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: var(--transition);
}

.nav a:hover:after {
  width: 100%;
}

.btn-contact {
  margin-left: 30px;
  padding: 10px 25px;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.mobile-menu-btn span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: var(--dark-color);
  border-radius: 3px;
  transition: var(--transition);
}

/* Responsive */
@media (max-width: 992px) {
  .nav ul {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }
  
  .nav {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: white;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
  }
  
  .nav.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav ul {
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .btn-contact {
    margin-left: 0;
    display: block;
    text-align: center;
  }
}
</style>