<template>
  <section class="posts-section">
    <div class="container">
      <div class="posts-header">
        <div class="tab active">
          <i class="fas fa-th"></i>
          <span>POSTS</span>
        </div>
        <div class="tab">
          <i class="fas fa-tv"></i>
          <span>REELS</span>
        </div>
        <div class="tab">
          <i class="fas fa-bookmark"></i>
          <span>SAVED</span>
        </div>
        <div class="tab">
          <i class="fas fa-user-tag"></i>
          <span>TAGGED</span>
        </div>
      </div>
      <div class="posts-grid">
        <div 
          v-for="(post, index) in posts" 
          :key="post.id" 
          class="post-item"
          :ref="el => { if (el) postRefs[index] = el }"
        >
          <img :src="post.image" :alt="`Post ${post.id}`">
          <div class="post-overlay">
            <div class="post-stat">
              <i class="fas fa-heart"></i>
              <span>{{ post.likes.toLocaleString() }}</span>
            </div>
            <div class="post-stat">
              <i class="fas fa-comment"></i>
              <span>{{ post.comments.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const posts = ref([
  { id: 1, image: 'https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', likes: 1250, comments: 45 },
  { id: 2, image: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', likes: 892, comments: 32 },
  { id: 3, image: 'https://images.unsplash.com/photo-1682685797742-42c9987a2c34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', likes: 2103, comments: 78 },
  { id: 4, image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', likes: 567, comments: 21 },
  { id: 5, image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', likes: 3421, comments: 120 },
  { id: 6, image: 'https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', likes: 789, comments: 34 },
  { id: 7, image: 'https://images.unsplash.com/photo-1682687982502-1529b3b33f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', likes: 1502, comments: 56 },
  { id: 8, image: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', likes: 943, comments: 29 },
  { id: 9, image: 'https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', likes: 2765, comments: 92 },
]);

const postRefs = ref([]);

onMounted(() => {
  // Staggered animation for posts grid
  gsap.from(postRefs.value, {
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: {
      amount: 0.5,
      grid: [3, 3],
      from: "center"
    },
    ease: "power2.out",
    delay: 0.5
  });
});
</script>