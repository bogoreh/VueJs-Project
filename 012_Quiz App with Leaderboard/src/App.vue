<template>
  <div id="app" class="dark-theme">
    <header class="header">
      <div class="header-content">
        <h1 class="title">🧠 Quiz Challenge Pro</h1>
        <p class="subtitle">Test Your Knowledge • Climb the Ranks • Master the Game</p>
      </div>
      <div class="particles-container">
        <div class="particle" v-for="n in 20" :key="n"></div>
      </div>
    </header>
    
    <main class="main-container">
      <Quiz 
        @quiz-completed="handleQuizCompleted"
        @play-again="handlePlayAgain"
        v-if="!quizCompleted"
      />
      
      <Leaderboard 
        :scores="leaderboard"
        :currentScore="currentScore"
        v-if="quizCompleted"
      />
    </main>
    
    <footer class="footer">
      <div class="footer-content">
        <p>Built with Vue</p>
        <div class="footer-links">
          <span class="version">v1.0.0</span>
          <span class="stats">Players Online: {{ onlinePlayers }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Quiz from './components/Quiz.vue'
import Leaderboard from './components/Leaderboard.vue'

export default {
  name: 'App',
  components: {
    Quiz,
    Leaderboard
  },
  setup() {
    const quizCompleted = ref(false)
    const currentScore = ref(0)
    const onlinePlayers = ref(1248)
    const leaderboard = ref([
      { id: 1, name: 'NeoMatrix', score: 995, date: '2024-01-15', avatar: '👑' },
      { id: 2, name: 'CyberPunk', score: 940, date: '2024-01-14', avatar: '⚡' },
      { id: 3, name: 'Quantum', score: 895, date: '2024-01-14', avatar: '🌀' },
      { id: 4, name: 'Synapse', score: 850, date: '2024-01-13', avatar: '🧠' },
      { id: 5, name: 'Vortex', score: 810, date: '2024-01-13', avatar: '🌪️' },
      { id: 6, name: 'Nova', score: 780, date: '2024-01-12', avatar: '🌟' },
      { id: 7, name: 'Phantom', score: 750, date: '2024-01-12', avatar: '👻' },
      { id: 8, name: 'Zero', score: 720, date: '2024-01-11', avatar: '🕶️' },
      { id: 9, name: 'Catalyst', score: 690, date: '2024-01-11', avatar: '⚗️' },
      { id: 10, name: 'Pulse', score: 650, date: '2024-01-10', avatar: '💓' }
    ])

    const handleQuizCompleted = (score) => {
      currentScore.value = score
      quizCompleted.value = true
      
      const playerName = prompt('Enter your display name for the leaderboard:', 'New Challenger')
      if (playerName) {
        const avatars = ['👨‍💻', '👩‍💻', '🦸', '🦹', '🧙', '🧚', '🧛', '🧜', '🧝', '🤖', '👽', '👾', '🤡', '💀', '☠️', '🤖', '🎃']
        const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]
        
        leaderboard.value.push({
          id: Date.now(),
          name: playerName.trim() || 'Anonymous',
          score: score,
          date: new Date().toISOString().split('T')[0],
          avatar: randomAvatar
        })
        
        leaderboard.value.sort((a, b) => b.score - a.score)
        leaderboard.value = leaderboard.value.slice(0, 15)
      }
    }

    const handlePlayAgain = () => {
      quizCompleted.value = false
      currentScore.value = 0
    }

    // Simulate live player count
    onMounted(() => {
      const interval = setInterval(() => {
        const change = Math.floor(Math.random() * 21) - 10
        onlinePlayers.value = Math.max(1000, onlinePlayers.value + change)
      }, 5000)
      
      return () => clearInterval(interval)
    })

    return {
      quizCompleted,
      currentScore,
      onlinePlayers,
      leaderboard,
      handleQuizCompleted,
      handlePlayAgain
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: #1a1a2e;
  --bg-tertiary: #252542;
  --accent-primary: #6366f1;
  --accent-secondary: #8b5cf6;
  --accent-tertiary: #10b981;
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-muted: #94a3b8;
  --border-color: #2d2d5a;
  --shadow-color: rgba(0, 0, 0, 0.5);
  --gradient-primary: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  --gradient-secondary: linear-gradient(135deg, var(--accent-secondary), #ec4899);
  --gradient-dark: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: var(--bg-primary);
  min-height: 100vh;
  color: var(--text-primary);
  overflow-x: hidden;
}

.dark-theme {
  background: var(--bg-primary);
}

#app {
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Header Styles */
.header {
  position: relative;
  padding: 3rem 2rem;
  text-align: center;
  background: var(--gradient-dark);
  border-bottom: 1px solid var(--border-color);
  overflow: hidden;
}

.header-content {
  position: relative;
  z-index: 2;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  animation: titleGlow 3s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  0% {
    text-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  }
  100% {
    text-shadow: 0 0 30px rgba(139, 92, 246, 0.5),
                 0 0 40px rgba(99, 102, 241, 0.2);
  }
}

.subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  font-weight: 400;
  letter-spacing: 0.5px;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Particles Animation */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: var(--accent-primary);
  border-radius: 50%;
  animation: float 15s infinite linear;
}

@keyframes float {
  0% {
    transform: translateY(100vh) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-100px) translateX(calc(100vw * var(--x, 0.5)));
    opacity: 0;
  }
}

/* Main Container */
.main-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  position: relative;
}

/* Footer Styles */
.footer {
  padding: 2rem;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.footer p {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.version, .stats {
  font-size: 0.85rem;
  color: var(--text-muted);
  padding: 0.25rem 0.75rem;
  background: var(--bg-tertiary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1rem;
    padding: 0 1rem;
  }
  
  .main-container {
    padding: 1rem;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2rem;
  }
  
  .header {
    padding: 2rem 1rem;
  }
  
  .main-container {
    padding: 0.5rem;
  }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-primary);
}
</style>