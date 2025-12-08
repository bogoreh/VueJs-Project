<template>
  <div class="story" @click="animateStory">
    <div class="story-avatar-container">
      <img 
        :src="avatar" 
        :alt="user" 
        class="story-avatar"
        :class="{ 'your-story': user === 'Your Story' }"
      />
    </div>
    <p class="story-username">{{ user }}</p>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'Story',
  props: {
    user: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  },
  methods: {
    animateStory() {
      gsap.to(this.$el, {
        duration: 0.2,
        scale: 0.95,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      })
      
      if (this.user === 'Your Story') {
        alert("Add to your story")
      } else {
        alert(`View ${this.user}'s story`)
      }
    }
  }
}
</script>

<style scoped>
.story {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
  width: 70px;
}

.story-avatar-container {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  margin-bottom: 6px;
}

.your-story {
  border: 2px solid #dbdbdb;
}

.story-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
}

.story-username {
  margin: 0;
  font-size: 0.75rem;
  color: #262626;
  text-align: center;
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>