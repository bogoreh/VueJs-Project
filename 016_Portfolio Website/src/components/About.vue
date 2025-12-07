<template>
  <section class="about" ref="aboutSection">
    <div class="container">
      <h2>About Me</h2>
      <div class="about-content">
        <div class="about-image">
          <img 
            src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80" 
            alt="About Me"
          />
        </div>
        <div class="about-text">
          <h3>Passionate Developer with 5+ Years of Experience</h3>
          <p>
            I'm a full stack developer specializing in modern web technologies. 
            I enjoy turning complex problems into simple, beautiful, and intuitive designs.
          </p>
          <p>
            My expertise includes building responsive web applications, creating seamless 
            user experiences, and implementing efficient back-end solutions.
          </p>
          
          <div class="about-info">
            <div class="info-item">
              <h4>Name:</h4>
              <p>Alex Morgan</p>
            </div>
            <div class="info-item">
              <h4>Email:</h4>
              <p>alex@example.com</p>
            </div>
            <div class="info-item">
              <h4>Location:</h4>
              <p>San Francisco, CA</p>
            </div>
            <div class="info-item">
              <h4>Available:</h4>
              <p>For Freelance Work</p>
            </div>
          </div>
          
          <a href="#" class="btn">Download Resume</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
  mounted() {
    this.initAnimations()
  },
  methods: {
    initAnimations() {
      // Create ScrollTrigger for the about section
      this.$gsap.from('.about-content', {
        scrollTrigger: {
          trigger: '.about',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
    }
  }
}
</script>

<style scoped>
.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.about-image {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.about-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.about-image:hover img {
  transform: scale(1.03);
}

.about-text h3 {
  margin-bottom: 20px;
}

.about-text p {
  margin-bottom: 15px;
}

.about-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 30px 0;
}

.info-item h4 {
  font-size: 1rem;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.info-item p {
  font-weight: 600;
  color: var(--dark-color);
}

/* Responsive */
@media (max-width: 992px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .about-image {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 576px) {
  .about-info {
    grid-template-columns: 1fr;
  }
}
</style>