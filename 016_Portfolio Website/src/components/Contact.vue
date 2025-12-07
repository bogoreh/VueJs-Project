<template>
  <section class="contact" ref="contactSection">
    <div class="container">
      <h2>Get In Touch</h2>
      <div class="contact-content">
        <div class="contact-info">
          <h3>Let's Work Together</h3>
          <p>
            I'm currently available for freelance work and full-time opportunities. 
            If you have a project that you want to get started, think you need my help 
            with something, or just fancy saying hello, then get in touch.
          </p>
          
          <div class="contact-details">
            <div class="contact-item">
              <div class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>alex@example.com</p>
              </div>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <h4>Phone</h4>
                <p>+1 (123) 456-7890</p>
              </div>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h4>Location</h4>
                <p>San Francisco, CA</p>
              </div>
            </div>
          </div>
          
          <div class="social-links">
            <a href="#" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>
          
          <div class="form-group">
            <label for="subject">Subject</label>
            <input type="text" id="subject" v-model="form.subject" required />
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" rows="5" v-model="form.message" required></textarea>
          </div>
          
          <button type="submit" class="btn" :disabled="submitting">
            {{ submitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      submitting: false
    }
  },
  mounted() {
    this.initAnimations()
  },
  methods: {
    initAnimations() {
      // Animate contact section on scroll
      this.$gsap.from('.contact-content', {
        scrollTrigger: {
          trigger: '.contact',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
    },
    submitForm() {
      // In a real app, you would send the form data to a server
      this.submitting = true
      
      // Simulate API call
      setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.')
        this.form = {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
        this.submitting = false
      }, 1500)
    }
  }
}
</script>

<style scoped>
.contact {
  background-color: #f8f9fa;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.contact-info h3 {
  margin-bottom: 20px;
}

.contact-info p {
  margin-bottom: 30px;
}

.contact-details {
  margin-bottom: 40px;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.contact-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(102, 126, 234, 0.1);
  border-radius: 50%;
  margin-right: 15px;
  color: var(--primary-color);
}

.contact-item h4 {
  font-size: 1rem;
  margin-bottom: 5px;
}

.contact-item p {
  margin-bottom: 0;
  font-weight: 600;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  color: var(--dark-color);
  transition: var(--transition);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.social-link:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-3px);
}

.contact-form {
  background-color: white;
  padding: 40px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--light-gray);
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  transition: var(--transition);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.contact-form .btn {
  width: 100%;
  padding: 15px;
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .contact-form {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>