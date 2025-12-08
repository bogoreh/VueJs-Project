<template>
  <div id="app">
    <Navigation />
    <ProfileHeader :user="userData" />
    <PostGrid />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navigation from './components/Navigation.vue';
import ProfileHeader from './components/ProfileHeader.vue';
import PostGrid from './components/PostGrid.vue';

const userData = ref({
  username: 'jessica.wilson',
  fullName: 'Jessica Wilson',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b786d4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  posts: 156,
  followers: 12543,
  following: 342,
  bio: 'Photographer & Travel enthusiast 📸🌎 • Living life one adventure at a time • Based in NYC',
  website: 'https://jessicawilson.com',
  websiteDisplay: 'jessicawilson.com'
});
</script>