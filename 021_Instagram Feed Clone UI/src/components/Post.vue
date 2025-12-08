<template>
  <article class="post">
    <div class="post-header">
      <div class="post-user">
        <img :src="post.avatar" :alt="post.username" class="post-avatar" />
        <span class="post-username">{{ post.username }}</span>
      </div>
      <button class="post-options">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="options-icon">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      </button>
    </div>
    
    <div class="post-image-container">
      <img 
        :src="post.image" 
        :alt="post.caption" 
        class="post-image"
        @load="imageLoaded"
      />
    </div>
    
    <div class="post-actions">
      <div class="action-left">
        <button class="action-button" @click="toggleLike">
          <svg v-if="post.liked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ed4956" class="action-icon liked">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="action-icon">
            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
          </svg>
        </button>
        <button class="action-button" @click="addComment">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="action-icon">
            <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        </button>
        <button class="action-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="action-icon">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
          </svg>
        </button>
      </div>
      <button class="action-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="action-icon">
          <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
        </svg>
      </button>
    </div>
    
    <div class="post-likes">
      <strong>{{ post.likes.toLocaleString() }} likes</strong>
    </div>
    
    <div class="post-caption">
      <strong>{{ post.username }}</strong> {{ post.caption }}
    </div>
    
    <div class="post-comments">
      <button class="view-comments" @click="addComment">
        View all {{ post.comments }} comments
      </button>
    </div>
    
    <div class="post-time">
      {{ post.time }}
    </div>
  </article>
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleLike() {
      this.$emit('like', this.post.id)
      
      // GSAP animation for like button
      if (!this.post.liked) {
        gsap.to(this.$el.querySelector('.liked'), {
          duration: 0.3,
          scale: 1.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.out"
        })
      }
    },
    
    addComment() {
      this.$emit('comment', this.post.id)
    },
    
    imageLoaded() {
      // Animation when image loads
      gsap.from(this.$el.querySelector('.post-image'), {
        duration: 0.5,
        opacity: 0,
        scale: 0.95,
        ease: "power2.out"
      })
    }
  }
}
</script>

<style scoped>
.post {
  background-color: white;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}

.post-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.post-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.post-username {
  font-weight: 600;
  color: #262626;
}

.post-options {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.options-icon {
  width: 24px;
  height: 24px;
  color: #262626;
}

.post-image-container {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}

.action-left {
  display: flex;
  gap: 16px;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.action-button:hover {
  transform: scale(1.1);
}

.action-icon {
  width: 24px;
  height: 24px;
  color: #262626;
}

.post-likes {
  padding: 0 16px 8px;
  font-weight: 600;
  color: #262626;
}

.post-caption {
  padding: 0 16px 8px;
  color: #262626;
  line-height: 1.4;
}

.post-comments {
  padding: 0 16px 8px;
}

.view-comments {
  background: none;
  border: none;
  color: #8e8e8e;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
}

.view-comments:hover {
  color: #262626;
}

.post-time {
  padding: 0 16px 12px;
  color: #8e8e8e;
  font-size: 0.8rem;
  text-transform: uppercase;
}
</style>