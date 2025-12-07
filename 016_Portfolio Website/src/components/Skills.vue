<template>
  <section class="skills" ref="skillsSection">
    <div class="container">
      <h2>My Skills</h2>
      <div class="skills-content">
        <div class="skills-intro">
          <h3>Technologies I Work With</h3>
          <p>
            I continuously learn and adapt to new technologies to build modern, 
            scalable applications. Here are some of my core competencies:
          </p>
        </div>
        
        <div class="skills-grid">
          <div 
            v-for="skill in skills" 
            :key="skill.id" 
            class="skill-card"
            :ref="'skillCard' + skill.id"
          >
            <div class="skill-icon">
              <img :src="skill.icon" :alt="skill.name" />
            </div>
            <h4>{{ skill.name }}</h4>
            <p>{{ skill.description }}</p>
            <div class="skill-level">
              <div class="level-bar">
                <div 
                  class="level-progress" 
                  :style="{ width: skill.level + '%' }"
                  :ref="'skillProgress' + skill.id"
                ></div>
              </div>
              <span class="level-text">{{ skill.level }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Skills',
  data() {
    return {
      skills: [
        { id: 1, name: 'Vue.js', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', description: 'Frontend framework' },
        { id: 2, name: 'React', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', description: 'UI library' },
        { id: 3, name: 'JavaScript', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', description: 'Programming language' },
        { id: 4, name: 'Node.js', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', description: 'Backend runtime' },
        { id: 5, name: 'HTML/CSS', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', description: 'Markup & styling' },
        { id: 6, name: 'GSAP', level: 75, icon: 'https://gsap.com/_img/brand/gsap-logo.svg', description: 'Animation library' },
        { id: 7, name: 'Git', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', description: 'Version control' },
        { id: 8, name: 'MongoDB', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', description: 'Database' }
      ]
    }
  },
  mounted() {
    this.initAnimations()
  },
  methods: {
    initAnimations() {
      // Animate skill cards on scroll
      this.$gsap.utils.toArray('.skill-card').forEach((card, i) => {
        this.$gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out'
        })
        
        // Animate progress bars
        const progress = this.$refs[`skillProgress${i+1}`][0]
        if (progress) {
          this.$gsap.from(progress, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            width: 0,
            duration: 1.5,
            delay: 0.3,
            ease: 'power3.out'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.skills {
  background-color: #f8f9fa;
}

.skills-intro {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 50px;
}

.skills-intro h3 {
  margin-bottom: 15px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.skill-card {
  background-color: white;
  padding: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.skill-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.skill-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(102, 126, 234, 0.1);
  border-radius: 50%;
  margin-bottom: 20px;
}

.skill-icon img {
  width: 30px;
  height: 30px;
}

.skill-card h4 {
  margin-bottom: 10px;
}

.skill-card p {
  font-size: 0.9rem;
  margin-bottom: 20px;
  color: var(--gray-color);
}

.skill-level {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
}

.level-bar {
  flex-grow: 1;
  height: 8px;
  background-color: var(--light-gray);
  border-radius: 4px;
  overflow: hidden;
  margin-right: 15px;
}

.level-progress {
  height: 100%;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  border-radius: 4px;
}

.level-text {
  font-weight: 600;
  color: var(--dark-color);
}
</style>