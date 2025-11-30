<template>
  <div id="app">
    <header>
      <h1>Daily Inspiration</h1>
      <p>Get your daily dose of motivation</p>
    </header>
    <main>
      <QuoteGenerator />
    </main>
  </div>
</template>

<script>
import QuoteGenerator from './components/QuoteGenerator.vue'

export default {
  name: 'App',
  components: {
    QuoteGenerator
  }
}
</script>

<style scoped>
#app {
  text-align: center;
  min-height: 100vh;
}

header {
  background: #1f2937; /* Dark gray */
  color: white;
  padding: 2rem 0;
  margin-bottom: 2rem;
}

header h1 {
  margin: 0;
  font-size: 2.5rem;
}

header p {
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
}
</style>