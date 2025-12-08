<template>
  <div id="app">
    <header class="app-header">
      <h1>Multi-Step Registration Wizard</h1>
      <p>Complete the form below to create your account</p>
    </header>
    <main class="app-main">
      <MultiStepForm />
    </main>
    <footer class="app-footer">
      <p>Secure & Professional Registration System • All data is encrypted</p>
    </footer>
  </div>
</template>

<script setup>
import MultiStepForm from './components/MultiStepForm.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  min-height: 100vh;
  padding: 1rem;
  color: #e2e8f0;
}

#app {
  max-width: 800px;
  margin: 0 auto;
}

.app-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.app-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, #60a5fa 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.app-header p {
  font-size: 1.1rem;
  color: #94a3b8;
  font-weight: 300;
}

.app-footer {
  text-align: center;
  margin-top: 3rem;
  padding: 1.5rem;
  font-size: 0.875rem;
  color: #64748b;
  border-top: 1px solid rgba(100, 116, 139, 0.2);
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2rem;
  }
  
  body {
    padding: 0.5rem;
  }
}
</style>