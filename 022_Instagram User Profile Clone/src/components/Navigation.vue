<template>
  <nav class="navigation">
    <div class="nav-content">
      <div class="logo">Instagram</div>
      <div class="nav-icons">
        <i class="fas fa-home" @click="scrollToTop"></i>
        <i class="fas fa-paper-plane"></i>
        <i class="fas fa-compass"></i>
        <i class="fas fa-heart"></i>
        <img 
          :src="profileImage" 
          alt="Profile" 
          class="profile-pic-nav"
          @click="goToProfile"
        >
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import gsap from 'gsap';

const profileImage = ref('https://images.unsplash.com/photo-1494790108755-2616b786d4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80');

const scrollToTop = () => {
  gsap.to(window, { duration: 0.8, scrollTo: 0, ease: "power2.out" });
};

const goToProfile = () => {
  // In a real app, this would navigate to the profile page
  alert("Navigating to your profile");
};
</script>