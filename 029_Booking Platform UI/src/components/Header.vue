<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <router-link to="/" class="logo">
          <i class="fas fa-plane"></i>
          <span>TravelBook</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <a href="#" class="nav-link">Hotels</a>
          <a href="#" class="nav-link">Flights</a>
          <a href="#" class="nav-link">Car Rentals</a>
          <a href="#" class="nav-link">Activities</a>
        </div>
        <div class="nav-actions">
          <button class="btn btn-outline">
            <i class="fas fa-user"></i>
            Sign In
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #0071c2;
  text-decoration: none;
}

.logo i {
  margin-right: 10px;
  font-size: 28px;
}

.nav-links {
  display: flex;
  gap: 25px;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #0071c2;
}

.nav-actions .btn-outline {
  background-color: transparent;
  border: 1px solid #0071c2;
  color: #0071c2;
}

.nav-actions .btn-outline:hover {
  background-color: #0071c2;
  color: white;
}
</style>