<template>
  <div class="container">
    <!-- Search Section -->
    <div class="search-section">
      <h1>GitHub Profile Finder</h1>
      <p>Search for any GitHub user to view their profile and repositories</p>
      
      <div class="search-box">
        <input
          type="text"
          v-model="username"
          @keyup.enter="fetchUserData"
          placeholder="Enter GitHub username..."
          ref="searchInput"
        />
        <button @click="fetchUserData" :disabled="loading">
          {{ loading ? 'Searching...' : 'Search' }}
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error" ref="errorMessage">
      {{ error }}
    </div>

    <!-- Loading State -->
    <div v-if="loading && !user" class="loading">
      Loading user data...
    </div>

    <!-- User Profile -->
    <div v-if="user" class="profile-section">
      <!-- Profile Card -->
      <div class="profile-card" ref="profileCard">
        <div class="avatar">
          <img :src="user.avatar_url" :alt="user.name || user.login">
        </div>
        <h2>{{ user.name || user.login }}</h2>
        <p>@{{ user.login }}</p>
        
        <p class="bio" v-if="user.bio">{{ user.bio }}</p>
        <p class="bio" v-else>No bio available</p>
        
        <div class="stats">
          <div class="stat">
            <span class="count">{{ user.public_repos }}</span>
            <span class="label">Repos</span>
          </div>
          <div class="stat">
            <span class="count">{{ user.followers }}</span>
            <span class="label">Followers</span>
          </div>
          <div class="stat">
            <span class="count">{{ user.following }}</span>
            <span class="label">Following</span>
          </div>
        </div>
        
        <div class="profile-info">
          <div v-if="user.location">
            📍 {{ user.location }}
          </div>
          <div v-if="user.company">
            🏢 {{ user.company }}
          </div>
          <div v-if="user.blog">
            🔗 <a :href="user.blog" target="_blank">{{ user.blog }}</a>
          </div>
          <div v-if="user.twitter_username">
            🐦 @{{ user.twitter_username }}
          </div>
        </div>
        
        <a 
          :href="user.html_url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="profile-link"
        >
          View Full Profile on GitHub
        </a>
      </div>

      <!-- Repositories -->
      <div class="repos-section" ref="reposSection">
        <h3>Repositories ({{ user.public_repos }})</h3>
        
        <div v-if="reposLoading" class="loading">
          Loading repositories...
        </div>
        
        <div v-else-if="repos.length === 0" class="no-data">
          No repositories found
        </div>
        
        <div v-else class="repos-grid">
          <RepoCard 
            v-for="(repo, index) in repos" 
            :key="repo.id" 
            :repo="{ ...repo, index }"
          />
        </div>
        
        <div v-if="repos.length > 0 && repos.length < user.public_repos" class="load-more">
          <button @click="loadMoreRepos" :disabled="reposLoading">
            Load More Repositories
          </button>
        </div>
      </div>
    </div>

    <!-- Initial State -->
    <div v-if="!user && !loading" class="no-data" ref="initialState">
      <p>Search for a GitHub user to see their profile and repositories</p>
      <p>Try searching for: "vuejs", "torvalds", "octocat"</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import RepoCard from './components/RepoCard.vue'

const username = ref('')
const user = ref(null)
const repos = ref([])
const loading = ref(false)
const reposLoading = ref(false)
const error = ref('')
const page = ref(1)
const perPage = ref(9)

const searchInput = ref(null)
const profileCard = ref(null)
const reposSection = ref(null)
const errorMessage = ref(null)
const initialState = ref(null)

onMounted(() => {
  if (initialState.value) {
    gsap.from(initialState.value, {
      duration: 1,
      opacity: 0,
      y: 20,
      ease: "power2.out"
    })
  }
})

const fetchUserData = async () => {
  if (!username.value.trim()) {
    error.value = 'Please enter a GitHub username'
    animateError()
    return
  }

  resetState()
  loading.value = true
  error.value = ''

  try {
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username.value}`)
    
    if (!userResponse.ok) {
      if (userResponse.status === 404) {
        throw new Error('User not found')
      }
      throw new Error(`Error: ${userResponse.status}`)
    }
    
    user.value = await userResponse.json()
    await fetchRepositories()
    
    // Animate profile card
    if (profileCard.value) {
      gsap.from(profileCard.value, {
        duration: 0.8,
        x: -50,
        opacity: 0,
        ease: "back.out(1.7)"
      })
    }
    
  } catch (err) {
    error.value = err.message
    animateError()
  } finally {
    loading.value = false
  }
}

const fetchRepositories = async () => {
  reposLoading.value = true
  page.value = 1
  
  try {
    const response = await fetch(
      `https://api.github.com/users/${username.value}/repos?page=${page.value}&per_page=${perPage.value}&sort=updated`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch repositories')
    }
    
    const data = await response.json()
    repos.value = data
    
    // Animate repos section
    if (reposSection.value) {
      gsap.from(reposSection.value, {
        duration: 0.8,
        x: 50,
        opacity: 0,
        ease: "back.out(1.7)",
        delay: 0.3
      })
    }
    
  } catch (err) {
    error.value = `Failed to load repositories: ${err.message}`
    animateError()
  } finally {
    reposLoading.value = false
  }
}

const loadMoreRepos = async () => {
  reposLoading.value = true
  page.value++
  
  try {
    const response = await fetch(
      `https://api.github.com/users/${username.value}/repos?page=${page.value}&per_page=${perPage.value}&sort=updated`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch more repositories')
    }
    
    const newRepos = await response.json()
    repos.value = [...repos.value, ...newRepos]
    
  } catch (err) {
    error.value = `Failed to load more repositories: ${err.message}`
    animateError()
  } finally {
    reposLoading.value = false
  }
}

const resetState = () => {
  user.value = null
  repos.value = []
  error.value = ''
  page.value = 1
}

const animateError = () => {
  if (errorMessage.value) {
    gsap.from(errorMessage.value, {
      duration: 0.6,
      scale: 0.8,
      opacity: 0,
      ease: "back.out(1.7)"
    })
  }
}
</script>

<style scoped>
.profile-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.profile-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.load-more {
  text-align: center;
  margin-top: 30px;
}

.load-more button {
  padding: 12px 30px;
  background: #2d3748;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more button:hover:not(:disabled) {
  background: #1a202c;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.load-more button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>