<template>
  <div class="repo-card" ref="repoCard">
    <h4>{{ repo.name }}</h4>
    <p v-if="repo.description">{{ repo.description }}</p>
    <p v-else class="no-description">No description provided</p>
    
    <div class="repo-meta">
      <span class="stars" v-if="repo.stargazers_count">
        ⭐ {{ repo.stargazers_count }}
      </span>
      <span class="forks" v-if="repo.forks_count">
        🍴 {{ repo.forks_count }}
      </span>
      <span class="language" v-if="repo.language">
        ● {{ repo.language }}
      </span>
      <span v-if="repo.updated_at">
        📅 {{ formatDate(repo.updated_at) }}
      </span>
    </div>
    
    <a 
      :href="repo.html_url" 
      target="_blank" 
      rel="noopener noreferrer"
      class="repo-link"
    >
      View on GitHub →
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  repo: {
    type: Object,
    required: true
  }
})

const repoCard = ref(null)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  if (repoCard.value) {
    gsap.from(repoCard.value, {
      duration: 0.6,
      y: 30,
      opacity: 0,
      ease: "back.out(1.7)",
      delay: props.repo.index * 0.1
    })
  }
})
</script>

<style scoped>
.repo-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.repo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.repo-card h4 {
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 10px;
  word-break: break-word;
}

.repo-card p {
  color: #718096;
  font-size: 0.95rem;
  margin-bottom: 15px;
  line-height: 1.5;
  flex-grow: 1;
}

.no-description {
  font-style: italic;
  opacity: 0.7;
}

.repo-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 15px 0;
}

.repo-meta span {
  background: #edf2f7;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #4a5568;
  display: flex;
  align-items: center;
  gap: 5px;
}

.stars {
  color: #f6ad55 !important;
}

.forks {
  color: #68d391 !important;
}

.language {
  color: #667eea !important;
}

.repo-link {
  display: inline-block;
  margin-top: auto;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.repo-link:hover {
  color: #764ba2;
  text-decoration: underline;
}
</style>