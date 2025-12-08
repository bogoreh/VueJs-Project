<template>
  <header class="profile-header">
    <div class="container">
      <div class="profile-container">
        <div class="profile-avatar">
          <div class="avatar-wrapper">
            <img 
              :src="user.avatar" 
              :alt="user.username" 
              class="avatar"
              ref="avatarRef"
            />
          </div>
        </div>
        <div class="profile-info">
          <h1 ref="usernameRef">{{ user.username }}</h1>
          <div class="profile-stats">
            <div class="stat">
              <span class="stat-number">{{ user.posts }}</span>
              <span class="stat-label"> posts</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ user.followers.toLocaleString() }}</span>
              <span class="stat-label"> followers</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ user.following.toLocaleString() }}</span>
              <span class="stat-label"> following</span>
            </div>
          </div>
          <div class="profile-bio">
            <h2>{{ user.fullName }}</h2>
            <p>{{ user.bio }}</p>
            <a :href="user.website" target="_blank">{{ user.websiteDisplay }}</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

const avatarRef = ref(null);
const usernameRef = ref(null);

onMounted(() => {
  // GSAP animations for profile header
  gsap.from(avatarRef.value, {
    duration: 1,
    scale: 0,
    rotation: 360,
    ease: "back.out(1.7)"
  });
  
  gsap.from(usernameRef.value, {
    duration: 0.8,
    y: 20,
    opacity: 0,
    delay: 0.3,
    ease: "power2.out"
  });
});
</script>