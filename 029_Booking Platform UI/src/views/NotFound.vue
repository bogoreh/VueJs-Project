<template>
  <div class="not-found">
    <div class="error-container">
      <div class="error-icon">
        <i class="fas fa-map-marked-alt"></i>
      </div>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for seems to have wandered off the map.</p>
      <div class="actions">
        <router-link to="/" class="btn btn-primary">
          <i class="fas fa-home"></i> Back to Home
        </router-link>
        <button class="btn btn-outline" @click="$router.go(-1)">
          <i class="fas fa-arrow-left"></i> Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 40px 20px;
}

.error-container {
  text-align: center;
  max-width: 600px;
}

.error-icon {
  font-size: 100px;
  color: #0071c2;
  margin-bottom: 30px;
  opacity: 0.8;
}

h1 {
  font-size: 48px;
  margin-bottom: 20px;
  color: #333;
}

p {
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  font-size: 16px;
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>