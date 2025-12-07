<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <a href="#home">Portfolio</a>
          <p>Creating beautiful, functional digital experiences.</p>
        </div>
        
        <div class="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li v-for="item in navItems" :key="item.id">
              <a :href="item.link">{{ item.name }}</a>
            </li>
          </ul>
        </div>
        
        <div class="footer-contact">
          <h4>Contact Info</h4>
          <p>alex@example.com</p>
          <p>+1 (123) 456-7890</p>
          <p>San Francisco, CA</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Alex Morgan. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      navItems: [
        { id: 1, name: 'Home', link: '#home' },
        { id: 2, name: 'About', link: '#about' },
        { id: 3, name: 'Skills', link: '#skills' },
        { id: 4, name: 'Projects', link: '#projects' },
        { id: 5, name: 'Contact', link: '#contact' }
      ]
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: var(--dark-color);
  color: white;
  padding: 60px 0 30px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 50px;
}

.footer-logo a {
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  margin-bottom: 15px;
  display: inline-block;
}

.footer-logo p {
  color: rgba(255, 255, 255, 0.7);
}

.footer-links h4,
.footer-contact h4 {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: white;
}

.footer-links ul {
  list-style: none;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  transition: var(--transition);
}

.footer-links a:hover {
  color: white;
  padding-left: 5px;
}

.footer-contact p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
}

/* Responsive */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .footer-links ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
}
</style>