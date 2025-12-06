<template>
  <div id="app">
    <div class="app-container">
      <header class="app-header">
        <h1>Harmony<span>Stream</span></h1>
        <p class="subtitle">A Vue.js & GSAP Music Player</p>
      </header>
      <main class="app-content">
        <MusicPlayer />
        <div class="player-info">
          <h2>Features</h2>
          <ul>
            <li>Play/Pause functionality with animations</li>
            <li>Track progress visualization</li>
            <li>Next/Previous track navigation</li>
            <li>Volume control with visual feedback</li>
            <li>Smooth GSAP animations</li>
            <li>Responsive design</li>
          </ul>
          <p class="note">Note: This is a UI demonstration without actual audio streaming.</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import MusicPlayer from './components/MusicPlayer.vue'

export default {
  name: 'App',
  components: {
    MusicPlayer
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-container {
  max-width: 900px;
  width: 100%;
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 40px;
}

.app-header h1 {
  font-size: 3.2rem;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.app-header h1 span {
  color: #7ee8fa;
  -webkit-text-fill-color: #7ee8fa;
}

.subtitle {
  font-size: 1.1rem;
  color: #a0a0c0;
  font-weight: 300;
}

.app-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.player-info {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.player-info h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #7ee8fa;
}

.player-info ul {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 20px;
}

.player-info li {
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #d0d0e0;
  position: relative;
  padding-left: 28px;
}

.player-info li:before {
  content: "♪";
  position: absolute;
  left: 0;
  color: #6a11cb;
}

.note {
  font-style: italic;
  color: #a0a0c0;
  font-size: 0.9rem;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

@media (min-width: 768px) {
  .app-content {
    flex-direction: row;
  }
  
  .player-info {
    flex: 1;
  }
}
</style>