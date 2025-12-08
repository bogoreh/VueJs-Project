<template>
  <div id="app">
    <Dashboard />
    <div class="footer">
      <p>Data Visualization Dashboard</p>
      <p class="note">Note: This dashboard uses mock data for demonstration</p>
    </div>
  </div>
</template>

<script setup>
import Dashboard from './components/Dashboard.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f9fafb;
  color: #374151;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.footer {
  margin-top: auto;
  padding: 2rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  border-top: 1px solid #e5e7eb;
  background-color: white;
}

.footer .note {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.5rem;
}

/* Font Awesome icons (using CDN in HTML) */
.fas {
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
}
</style>