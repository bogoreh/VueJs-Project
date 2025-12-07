<template>
  <section class="projects" ref="projectsSection">
    <div class="container">
      <h2>My Projects</h2>
      <div class="projects-content">
        <div class="projects-grid">
          <div 
            v-for="project in projects" 
            :key="project.id" 
            class="project-card"
            :ref="'projectCard' + project.id"
          >
            <div class="project-image">
              <img :src="project.image" :alt="project.title" />
              <div class="project-overlay">
                <a :href="project.link" class="btn btn-view" target="_blank">View Project</a>
              </div>
            </div>
            <div class="project-info">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {
      projects: [
        { 
          id: 1, 
          title: 'E-commerce Platform', 
          description: 'A full-featured online store with cart, payment integration, and admin dashboard.',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
          tags: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
          link: 'https://example.com'
        },
        { 
          id: 2, 
          title: 'Task Management App', 
          description: 'Collaborative task management tool with real-time updates and team features.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
          tags: ['React', 'Firebase', 'Material UI'],
          link: 'https://example.com'
        },
        { 
          id: 3, 
          title: 'Travel Blog', 
          description: 'Content-rich travel blog with interactive maps, photo galleries, and user accounts.',
          image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
          tags: ['Vue.js', 'Express', 'PostgreSQL', 'Mapbox'],
          link: 'https://example.com'
        },
        { 
          id: 4, 
          title: 'Fitness Tracker', 
          description: 'Mobile-first fitness application with workout plans, progress tracking, and analytics.',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
          tags: ['React Native', 'GraphQL', 'AWS'],
          link: 'https://example.com'
        }
      ]
    }
  },
  mounted() {
    this.initAnimations()
  },
  methods: {
    initAnimations() {
      // Stagger animation for project cards
      this.$gsap.utils.toArray('.project-card').forEach((card, i) => {
        this.$gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out'
        })
      })
    }
  }
}
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.project-card {
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.btn-view {
  padding: 10px 20px;
  font-size: 0.9rem;
}

.project-info {
  padding: 25px;
}

.project-info h3 {
  margin-bottom: 10px;
}

.project-info p {
  font-size: 0.95rem;
  margin-bottom: 15px;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-block;
  padding: 5px 12px;
  background-color: rgba(102, 126, 234, 0.1);
  color: var(--primary-color);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}
</style>