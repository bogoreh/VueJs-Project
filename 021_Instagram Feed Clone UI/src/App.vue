<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <div class="stories-container">
        <Story 
          v-for="story in stories" 
          :key="story.id"
          :user="story.user"
          :avatar="story.avatar"
        />
      </div>
      <div class="feed-container">
        <Post 
          v-for="post in posts" 
          :key="post.id"
          :post="post"
          @like="handleLike"
          @comment="handleComment"
        />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Post from './components/Post.vue'
import Story from './components/Story.vue'
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Post,
    Story
  },
  setup() {
    const posts = ref([
      {
        id: 1,
        username: 'alex_johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        caption: 'Beautiful mountains view from my hike today! #nature #hiking',
        likes: 245,
        comments: 32,
        time: '2 hours ago',
        liked: false
      },
      {
        id: 2,
        username: 'sophia_williams',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b786d4d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        caption: 'Morning coffee with a view ☕️ #coffee #morning',
        likes: 189,
        comments: 18,
        time: '5 hours ago',
        liked: true
      },
      {
        id: 3,
        username: 'travel_dude',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        caption: 'City lights from above 🌃 #city #night',
        likes: 512,
        comments: 45,
        time: '1 day ago',
        liked: false
      },
      {
        id: 4,
        username: 'foodie_girl',
        avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        caption: 'Homemade avocado toast with cherry tomatoes! #food #healthy',
        likes: 324,
        comments: 29,
        time: '2 days ago',
        liked: true
      },
      {
        id: 5,
        username: 'code_master',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        caption: 'Late night coding session 💻 #developer #coding',
        likes: 156,
        comments: 12,
        time: '3 days ago',
        liked: false
      }
    ])

    const stories = ref([
      { id: 1, user: 'Your Story', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
      { id: 2, user: 'jane_doe', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
      { id: 3, user: 'mike_tyson', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
      { id: 4, user: 'lisa_ray', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
      { id: 5, user: 'travel_buddy', avatar: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
      { id: 6, user: 'fitness_guru', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' }
    ])

    const handleLike = (postId) => {
      const post = posts.value.find(p => p.id === postId)
      if (post) {
        post.liked = !post.liked
        post.likes += post.liked ? 1 : -1
      }
    }

    const handleComment = (postId) => {
      const comment = prompt('Add a comment:')
      if (comment && comment.trim()) {
        const post = posts.value.find(p => p.id === postId)
        if (post) {
          post.comments++
          alert(`Comment added to ${post.username}'s post!`)
        }
      }
    }

    // GSAP animations on mount
    onMounted(() => {
      gsap.from('.stories-container', {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: 'power2.out'
      })

      gsap.from('.feed-container', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.2,
        stagger: 0.1,
        ease: 'power2.out'
      })
    })

    return {
      posts,
      stories,
      handleLike,
      handleComment
    }
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #fafafa;
}

.main-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 80px; /* Space for footer */
}

.stories-container {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  margin-bottom: 20px;
  gap: 15px;
}

.stories-container::-webkit-scrollbar {
  display: none;
}

.feed-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
</style>