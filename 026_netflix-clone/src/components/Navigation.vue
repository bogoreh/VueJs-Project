<template>
  <nav class="navigation">
    <div class="nav-container">
      <div class="nav-left">
        <a href="#" class="logo">
          <span class="netflix-red">NETFLIX</span> CLONE
        </a>
        <ul class="nav-links">
          <li><a href="#" class="active">Home</a></li>
          <li><a href="#">TV Shows</a></li>
          <li><a href="#">Movies</a></li>
          <li><a href="#">New & Popular</a></li>
          <li><a href="#">My List</a></li>
        </ul>
      </div>
      <div class="nav-right">
        <button class="nav-icon">
          <i class="fas fa-search"></i>
        </button>
        <button class="nav-icon">
          <i class="fas fa-bell"></i>
        </button>
        <div class="profile-menu">
          <img src="https://i.pravatar.cc/40" alt="Profile" class="profile-img">
          <i class="fas fa-caret-down"></i>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { onMounted } from 'vue'
import gsap from 'gsap'

export default {
  name: 'Navigation',
  setup() {
    onMounted(() => {
      // Navbar animation on scroll
      let lastScroll = 0
      const navbar = document.querySelector('.navigation')
      
      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset
        
        if (currentScroll <= 0) {
          navbar.classList.remove('scroll-up')
          return
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
          navbar.classList.remove('scroll-up')
          navbar.classList.add('scroll-down')
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
          navbar.classList.remove('scroll-down')
          navbar.classList.add('scroll-up')
        }
        
        lastScroll = currentScroll
      })
      
      // Initial animation
      gsap.from('.navigation', {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: "power3.out"
      })
    })
    
    return {}
  }
}
</script>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px 4%;
  z-index: 1000;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, transparent);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.navigation.scroll-down {
  transform: translateY(-100%);
}

.navigation.scroll-up {
  background-color: rgba(20, 20, 20, 0.95);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  font-size: 1.8rem;
  font-weight: 900;
  text-decoration: none;
  color: white;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 20px;
}

.nav-links a {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover,
.nav-links a.active {
  color: white;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-icon {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.nav-icon:hover {
  transform: scale(1.1);
}

.profile-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .navigation {
    padding: 15px 3%;
  }
  
  .nav-links {
    display: none;
  }
  
  .logo {
    font-size: 1.5rem;
  }
}
</style>